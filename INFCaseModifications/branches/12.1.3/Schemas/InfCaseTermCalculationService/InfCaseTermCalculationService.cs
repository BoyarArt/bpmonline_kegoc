namespace Terrasoft.Configuration.Calendars
{
	using System;
	using System.Collections.Generic;
	using System.Runtime.Serialization;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using System.Web;
	using Core;
	using Core.Factories;
	using Newtonsoft.Json;
	using TermCalculationService;
	using Terrasoft.Configuration.ServiceTerm;
	using CalendarTimeUnit = Terrasoft.Configuration.Calendars.TimeUnit;
	using System.Linq;
	using Terrasoft.Common;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Scheduler;
	using System.Data;
	using Column = Terrasoft.Core.DB.Column;
	
	/// <summary>
	/// A class-service for case term calculation.
	/// </summary>
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class InfCaseTermCalculationService
	{
		protected class CalculatedDates
		{
			#region Properties: Public

			[DataMember(Name = "SolutionTime")]
			public DateTime SolutionTime {
				get;
				set;
			}
			
			[DataMember(Name = "ReactionTime")]
			public DateTime ReactionTime {
				get;
				set;
			}

			#endregion

		}
		
		#region Fields : Private
		
		private static readonly string _dateFormat = "yyyy'-'MM'-'dd HH':'mm':'ss";
		private UserConnection _userConnection;
		private string CalendarId = "f0ff1f0e-f46b-1410-1787-0026185bfcd3"; // По умолчанию Типовой календарь
		//private string _reactionUnitType = "";
		private int _reactionUnitValue = 0;
		private string _solutionUnitType = "";
		private int _solutionUnitValue = 0;
	
		#endregion
		
		//Конструктор по умолчанию, необходим для реализации класса как веб-сервиса
		public InfCaseTermCalculationService() {}
		
		//конструктор класса InfCaseTermCalculationService
		public InfCaseTermCalculationService (UserConnection userConnection) {
			_userConnection = userConnection;
		}
		
		
		#region Properties : Private
	
		/// <summary>
		/// User connection.
		/// </summary>
		private UserConnection UserConnection {
			get {
				return _userConnection ??
					(_userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"]);
			}
		}
	
		#endregion
	
	
		#region Methods: Public
		
		public void FindCriterion (string ITServiceId) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "INFslo");
			
			esq.AddColumn("IncidentTimeUnit");
			esq.AddColumn("IncidentTimeValue");
			
			esq.Filters.Add(
				esq.CreateFilterWithParameters(
				FilterComparisonType.Equal,
				"Id",
				new Guid(ITServiceId)
				)
			);
			
			var units = esq.GetEntityCollection(UserConnection);
			
			if (units.Count > 0) {
				foreach (var unit in units) {
					_solutionUnitType = unit.GetTypedColumnValue<Guid>("SolutionTimeUnitId").ToString();
					_solutionUnitValue = unit.GetTypedColumnValue<int>("SolutionTimeValue");
				}
			}

		}
		
		public void FindGroup (string GroupId) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "InfCaseGroupReactionTime");
			
			esq.AddColumn("TimeValue");
			esq.AddColumn("INFCalendar");
			
			esq.Filters.Add(
				esq.CreateFilterWithParameters(
				FilterComparisonType.Equal,
				"SysAdminUnit",
				new Guid(GroupId)
				)
			);
			
			var units = esq.GetEntityCollection(UserConnection);
			
			if (units.Count > 0) {
				foreach (var unit in units) {
					_reactionUnitValue = unit.GetTypedColumnValue<int>("TimeValue");
					CalendarId = unit.GetTypedColumnValue<Guid>("INFCalendarId").ToString();
				}
			}

		}
		
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
			ResponseFormat = WebMessageFormat.Json)]
		public string CalculateTerms(string ITServiceId, string GroupId, string dateInput, int timeinpause) {

			DateTime RegTime = DateTime.Parse(dateInput);

			FindCriterion(ITServiceId);
			
			GroupId = "b157e016-99d0-4eb1-8096-3fda7af06210";
			_solutionUnitType = "bdcbb819-9b26-4627-946f-d00645a2d401";
			
			TimeTerm timeTerm = new TimeTerm();
			
			if (_solutionUnitType == "bdcbb819-9b26-4627-946f-d00645a2d401") {
				//Для рабочего дня
				timeTerm.Type = CalendarTimeUnit.WorkingDay;
			} else if (_solutionUnitType == "2a608ed7-d118-402a-99c0-2f583291ed2e") {
				//Для рабочего часа
				timeTerm.Type = CalendarTimeUnit.WorkingHour;
			} else if (_solutionUnitType == "3ab432a6-ca84-4315-ba33-f343c758a8f0") {
				//Для рабочей минуты
				timeTerm.Type = CalendarTimeUnit.WorkingMinute;
			} else {
				return "Единица времени не найдена";
			}
			
			timeTerm.Value = _solutionUnitValue;
			timeTerm.CalendarId = new Guid(CalendarId);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			var startDate = DateTime.Now;
			
			timeinpause = timeinpause;
			
			CalculatedDates calculatedDates = new CalculatedDates();

			calculatedDates.SolutionTime = calendarUtility.Add(RegTime, timeTerm, System.TimeZoneInfo.Local);
			if (timeinpause != 0 && timeinpause != null) {
				calculatedDates.SolutionTime = AddMinutesInPauseToSolutionDate(calculatedDates.SolutionTime, timeinpause);
			}
			//FindGroup(GroupId);
			TimeTerm ReactionTimeTerm = new TimeTerm();
			
			if (GroupId == "b157e016-99d0-4eb1-8096-3fda7af06210" || _reactionUnitValue == 0) {
				//Id указан группы "Диспетчеры" т.к. она по умолчанию, а так же если группа не указана в справочнике _reactionUnitValue == 0
				// TimeZoneInfo info = System.TimeZoneInfo.Local;
				// var dateToConvert = DateTime.Now;
				// DateTime ReactionTime = TimeZoneInfo.ConvertTimeToUtc(dateToConvert, info);
				
				ReactionTimeTerm.Type = CalendarTimeUnit.Minute;
				ReactionTimeTerm.Value = 20;
				ReactionTimeTerm.CalendarId = new Guid(CalendarId);
				
				calculatedDates.ReactionTime = calendarUtility.Add(startDate, ReactionTimeTerm, System.TimeZoneInfo.Local);
			} else {
				// TimeZoneInfo info = System.TimeZoneInfo.Local;
				// var _dateToConvert = DateTime.Now;
				// DateTime nowTime = TimeZoneInfo.ConvertTimeToUtc(_dateToConvert, info);
				
				ReactionTimeTerm.Type = CalendarTimeUnit.WorkingMinute;
				ReactionTimeTerm.Value = _reactionUnitValue;
				ReactionTimeTerm.CalendarId = new Guid(CalendarId);
				
				calculatedDates.ReactionTime = calendarUtility.Add(startDate, ReactionTimeTerm, System.TimeZoneInfo.Local);
			}
			
			string json = JsonConvert.SerializeObject(calculatedDates);
			return json;
		}
		
		public DateTime _CalculateTermsByGroup(string groupId) {

			FindGroup(groupId);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			var startDate = DateTime.Now;
			
			TimeTerm ReactionTimeTerm = new TimeTerm();
			
			DateTime ReactionTime = new DateTime();
			
			if (groupId == "b157e016-99d0-4eb1-8096-3fda7af06210" || _reactionUnitValue == 0) {
				//Id указан группы "Диспетчеры" т.к. она по умолчанию, а так же если группа не указана в справочнике _reactionUnitValue == 0
				// TimeZoneInfo info = System.TimeZoneInfo.Local;
				// var dateToConvert = DateTime.Now;
				// DateTime ReactionTime = TimeZoneInfo.ConvertTimeToUtc(dateToConvert, info);
				
				ReactionTimeTerm.Type = CalendarTimeUnit.Minute;
				ReactionTimeTerm.Value = 20;
				ReactionTimeTerm.CalendarId = new Guid(CalendarId);
				
				ReactionTime = calendarUtility.Add(startDate, ReactionTimeTerm, System.TimeZoneInfo.Local);
			} else {
				// TimeZoneInfo info = System.TimeZoneInfo.Local;
				// var _dateToConvert = DateTime.Now;
				// DateTime nowTime = TimeZoneInfo.ConvertTimeToUtc(_dateToConvert, info);
				
				ReactionTimeTerm.Type = CalendarTimeUnit.WorkingMinute;
				ReactionTimeTerm.Value = _reactionUnitValue;
				ReactionTimeTerm.CalendarId = new Guid(CalendarId);
				
				ReactionTime = calendarUtility.Add(startDate, ReactionTimeTerm, System.TimeZoneInfo.Local);
			}
			
			//string json = JsonConvert.SerializeObject(calculatedDates);
			return ReactionTime;
		}
		
		public DateTime _CalculateTerms(string ITServiceId) {

			FindCriterion(ITServiceId);
			
			TimeTerm timeTerm = new TimeTerm();
			
			if (_solutionUnitType == "bdcbb819-9b26-4627-946f-d00645a2d401") {
				//Для рабочего дня
				timeTerm.Type = CalendarTimeUnit.WorkingDay;
			} else if (_solutionUnitType == "2a608ed7-d118-402a-99c0-2f583291ed2e") {
				//Для рабочего часа
				timeTerm.Type = CalendarTimeUnit.WorkingHour;
			} else if (_solutionUnitType == "3ab432a6-ca84-4315-ba33-f343c758a8f0") {
				//Для рабочей минуты
				timeTerm.Type = CalendarTimeUnit.WorkingMinute;
			} else {
				return DateTime.MinValue;
			}
			
			timeTerm.Value = _solutionUnitValue;
			timeTerm.CalendarId = new Guid(CalendarId);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			var startDate = DateTime.Now;
			
			
			CalculatedDates calculatedDates = new CalculatedDates();

			DateTime SolutionTime = calendarUtility.Add(startDate, timeTerm, System.TimeZoneInfo.Local);
			
			//string json = JsonConvert.SerializeObject(calculatedDates);
			return SolutionTime;
		}
		
		public DateTime CalculateAnotherTerms(int value) {
			
			TimeTerm timeTerm = new TimeTerm();
			
			timeTerm.Type = CalendarTimeUnit.WorkingMinute;

			
			timeTerm.Value = value;
			timeTerm.CalendarId = new Guid(CalendarId);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			var startDate = DateTime.Now;
			
			
			CalculatedDates calculatedDates = new CalculatedDates();

			DateTime SolutionTime = calendarUtility.Add(startDate, timeTerm, System.TimeZoneInfo.Local);
			
			//string json = JsonConvert.SerializeObject(calculatedDates);
			return SolutionTime;
		}
		
		public DateTime AddMinutesInPauseToSolutionDate(DateTime SolDate, int value) {
			
			TimeTerm timeTerm = new TimeTerm();
			
			timeTerm.Type = CalendarTimeUnit.WorkingMinute;
			
			timeTerm.Value = value;
			
			timeTerm.CalendarId = new Guid(CalendarId);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			CalculatedDates calculatedDates = new CalculatedDates();

			DateTime SolutionTime = calendarUtility.Add(SolDate, timeTerm, System.TimeZoneInfo.Local);
			
			//string json = JsonConvert.SerializeObject(calculatedDates);
			return SolutionTime;
		}
	
		#endregion
	
	}
}