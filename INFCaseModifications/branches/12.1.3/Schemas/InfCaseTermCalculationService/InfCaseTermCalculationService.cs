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
		private string ITServiceByTechService = "";
	
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
		
		public void FindITService (string ITServiceId, string catName) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "INFslo");
			
			esq.AddColumn("IncidentTimeUnit");
			esq.AddColumn("IncidentTimeValue");
			esq.AddColumn("RequestTimeUnit");
			esq.AddColumn("RequestTimeValue");
			esq.AddColumn("ChangeTimeUnit");
			esq.AddColumn("ChangeTimeValue");
			esq.AddColumn("ReactionTimeValue");
			var serviceId = new Guid(ITServiceId);
			
			esq.Filters.Add(
				esq.CreateFilterWithParameters(
				FilterComparisonType.Equal,
				"ITService",
				serviceId
				)
			);
			
			var units = esq.GetEntityCollection(UserConnection);
			
			if (catName == "Инцидент") {
				if (units.Count > 0) {
					foreach (var unit in units) {
						_solutionUnitType = unit.GetTypedColumnValue<Guid>("IncidentTimeUnitId").ToString();
						_solutionUnitValue = unit.GetTypedColumnValue<int>("IncidentTimeValue");
						_reactionUnitValue = unit.GetTypedColumnValue<int>("ReactionTimeValue");
					}
				}
			} else if (catName == "Запрос на обслуживание") {
				if (units.Count > 0) {
					foreach (var unit in units) {
						_solutionUnitType = unit.GetTypedColumnValue<Guid>("RequestTimeUnitId").ToString();
						_solutionUnitValue = unit.GetTypedColumnValue<int>("RequestTimeValue");
						_reactionUnitValue = unit.GetTypedColumnValue<int>("ReactionTimeValue");
					}
				}
			} else if (catName == "Запрос на изменение") {
				if (units.Count > 0) {
					foreach (var unit in units) {
						_solutionUnitType = unit.GetTypedColumnValue<Guid>("ChangeTimeUnitId").ToString();
						_solutionUnitValue = unit.GetTypedColumnValue<int>("ChangeTimeValue");
						_reactionUnitValue = unit.GetTypedColumnValue<int>("ReactionTimeValue");
					}
				}
			}
		}
		
		public void FindTechService (string ITServiceId, string catName) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "TechSLO");
			
			esq.AddColumn("IncidentTimeUnit");
			esq.AddColumn("IncidentTimeValue");
			esq.AddColumn("RequestTimeUnit");
			esq.AddColumn("RequestTimeValue");
			esq.AddColumn("ChangeTimeUnit");
			esq.AddColumn("ChangeTimeValue");
			esq.AddColumn("ReactionTimeValue");
			var serviceId = new Guid(ITServiceId);
			
			esq.Filters.Add(
				esq.CreateFilterWithParameters(
				FilterComparisonType.Equal,
				"TechService",
				serviceId
				)
			);
			
			var units = esq.GetEntityCollection(UserConnection);
			
			if (catName == "Инцидент") {
				if (units.Count > 0) {
					foreach (var unit in units) {
						_solutionUnitType = unit.GetTypedColumnValue<Guid>("IncidentTimeUnitId").ToString();
						_solutionUnitValue = unit.GetTypedColumnValue<int>("IncidentTimeValue");
						_reactionUnitValue = unit.GetTypedColumnValue<int>("ReactionTimeValue");
					}
				}
			} else if (catName == "Запрос на обслуживание") {
				if (units.Count > 0) {
					foreach (var unit in units) {
						_solutionUnitType = unit.GetTypedColumnValue<Guid>("RequestTimeUnitId").ToString();
						_solutionUnitValue = unit.GetTypedColumnValue<int>("RequestTimeValue");
						_reactionUnitValue = unit.GetTypedColumnValue<int>("ReactionTimeValue");
					}
				}
			} else if (catName == "Запрос на изменение") {
				if (units.Count > 0) {
					foreach (var unit in units) {
						_solutionUnitType = unit.GetTypedColumnValue<Guid>("ChangeTimeUnitId").ToString();
						_solutionUnitValue = unit.GetTypedColumnValue<int>("ChangeTimeValue");
						_reactionUnitValue = unit.GetTypedColumnValue<int>("ReactionTimeValue");
					}
				}
			}
		}
		
		public void FindGroup (string GroupId) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "CaseGroupReactionTime");
			
			esq.AddColumn("TimeValue");
			
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
				}
			}
		}
		
		public void FindITServiceByTechService (string ServiceId) {
				var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ServiceRelationship");
				
				esq.AddColumn("ServiceItemA");
				esq.AddColumn("ServiceItemB");
				
				esq.Filters.Add(
					esq.CreateFilterWithParameters(
					FilterComparisonType.Equal,
					"ServiceItemA",
					new Guid(ServiceId)
					)
				);
				
				var units = esq.GetEntityCollection(UserConnection);
				
				if (units.Count > 0) {
					foreach (var unit in units) {
						ITServiceByTechService = unit.GetTypedColumnValue<Guid>("ServiceItemBId").ToString();
					}
				}
		}
		
		public void FindCalendar (string ServiceId, int indx) {
			if (indx == 0) {
				var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ServiceItem");
				
				esq.AddColumn("Calendar");
				
				esq.Filters.Add(
					esq.CreateFilterWithParameters(
					FilterComparisonType.Equal,
					"Id",
					new Guid(ServiceId)
					)
				);
				
				var units = esq.GetEntityCollection(UserConnection);
				
				if (units.Count > 0) {
					foreach (var unit in units) {
						CalendarId = unit.GetTypedColumnValue<Guid>("CalendarId").ToString();
					}
				}
			} else if (indx == 1) {
				FindITServiceByTechService(ServiceId);
				var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ServiceItem");
				
				esq.AddColumn("Calendar");
				
				esq.Filters.Add(
					esq.CreateFilterWithParameters(
					FilterComparisonType.Equal,
					"Id",
					new Guid(ITServiceByTechService)
					)
				);
				
				var units = esq.GetEntityCollection(UserConnection);
				
				if (units.Count > 0) {
					foreach (var unit in units) {
						CalendarId = unit.GetTypedColumnValue<Guid>("CalendarId").ToString();
					}
				}
			}
		}
		
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
			ResponseFormat = WebMessageFormat.Json)]
			
			
		public string CalculateTerms(string ITServiceId, string GroupId, string dateInput, int timeinpause, string categoryname, int indx) {

			DateTime RegTime = DateTime.Parse(dateInput);
			FindCalendar(ITServiceId, indx);
			
			if (indx == 0) {
				FindITService(ITServiceId, categoryname);
			} else if (indx == 1) {
				FindTechService(ITServiceId, categoryname);
			} else {
				string errormes = "Не найдены сервисы по индексу: " + indx.ToString();
				return errormes;
			}
			
			
			//GroupId = "b157e016-99d0-4eb1-8096-3fda7af06210";
			//_solutionUnitType = "bdcbb819-9b26-4627-946f-d00645a2d401";
			//_solutionUnitValue = 2;
			
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
				string errormes = "Единица времени по категории не найдена: " + categoryname;
				return errormes;
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
			
			if (_reactionUnitValue == 0) {
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
		
		public string PercentDiff(string ITServiceId, string GroupId, string dateInput, int timeinpause, string categoryname, int indx) {

			DateTime RegTime = DateTime.Parse(dateInput);
			FindCalendar(ITServiceId, indx);
			
			if (indx == 0) {
				FindITService(ITServiceId, categoryname);
			} else if (indx == 1) {
				FindTechService(ITServiceId, categoryname);
			} else {
				string errormes = "Не найдены сервисы по индексу: " + indx.ToString();
				return errormes;
			}
			TimeTerm timeTerm = new TimeTerm();
			
			if (_solutionUnitType == "bdcbb819-9b26-4627-946f-d00645a2d401") {
				//Для рабочего дня
				timeTerm.Type = CalendarTimeUnit.WorkingMinute;
				_solutionUnitValue = _solutionUnitValue * 60 * 24;
			} else if (_solutionUnitType == "2a608ed7-d118-402a-99c0-2f583291ed2e") {
				//Для рабочего часа
				timeTerm.Type = CalendarTimeUnit.WorkingMinute;
				_solutionUnitValue = _solutionUnitValue * 60;
			} else if (_solutionUnitType == "3ab432a6-ca84-4315-ba33-f343c758a8f0") {
				//Для рабочей минуты
				timeTerm.Type = CalendarTimeUnit.WorkingMinute;
			} else {
				string errormes = "Единица времени по категории не найдена: " + categoryname;
				return errormes;
			}
		
			var calendarUtility = new CalendarUtility(UserConnection);
			var startDate = DateTime.Now;
			int _solutionUnitValue50 = _solutionUnitValue/2;
			timeTerm.Value = _solutionUnitValue50;
			timeTerm.CalendarId = new Guid(CalendarId);
			
			timeinpause = timeinpause;
			
			CalculatedDates calculatedDates = new CalculatedDates();

			calculatedDates.SolutionTime = calendarUtility.Add(RegTime, timeTerm, System.TimeZoneInfo.Local);
			if (timeinpause != 0 && timeinpause != null) {
				calculatedDates.SolutionTime = AddMinutesInPauseToSolutionDate(calculatedDates.SolutionTime, timeinpause);
			}
			
			int _solutionUnitValue70 = Convert.ToInt16(_solutionUnitValue*0.70);
			TimeTerm ReactionTimeTerm = new TimeTerm();
			ReactionTimeTerm.Value = _solutionUnitValue70;
			ReactionTimeTerm.CalendarId = new Guid(CalendarId);
			ReactionTimeTerm.Type = CalendarTimeUnit.WorkingMinute;

			calculatedDates.ReactionTime = calendarUtility.Add(RegTime, ReactionTimeTerm, System.TimeZoneInfo.Local);
			if (timeinpause != 0 && timeinpause != null) {
				calculatedDates.ReactionTime = AddMinutesInPauseToSolutionDate(calculatedDates.ReactionTime, timeinpause);
			}
			string json = JsonConvert.SerializeObject(calculatedDates);
			return json;
		}
		
		
		public DateTime _CalculateTermsByGroup(string groupId, string ServiceId, int indx) {

			FindGroup(groupId);
			FindCalendar(ServiceId, indx);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			var startDate = DateTime.Now;
			
			TimeTerm ReactionTimeTerm = new TimeTerm();
			
			DateTime ReactionTime = new DateTime();
			
			if (_reactionUnitValue == 0) {
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
		
		public DateTime CalculateArchiveTime(int wHours, string ServiceId, int indx) {

			FindCalendar(ServiceId, indx);
			
			var calendarUtility = new CalendarUtility(UserConnection);
			
			var startDate = DateTime.Now;
			
			TimeTerm ReactionTimeTerm = new TimeTerm();
			
			DateTime ReactionTime = new DateTime();
			
				ReactionTimeTerm.Type = CalendarTimeUnit.WorkingHour;
				ReactionTimeTerm.Value = wHours;
				ReactionTimeTerm.CalendarId = new Guid(CalendarId);
				
				ReactionTime = calendarUtility.Add(startDate, ReactionTimeTerm, System.TimeZoneInfo.Local);
			
			return ReactionTime;
		}
		
		public DateTime _CalculateTerms(string ITServiceId, string categoryname) {

			FindITService(ITServiceId, categoryname);
			
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