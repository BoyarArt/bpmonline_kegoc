namespace Terrasoft.Configuration
{
	using System;
	using System.Collections.Generic;
	using Common;
	using Core;
	using Core.Entities;
	using Terrasoft.Configuration.Calendars;
	using Terrasoft.Configuration.SLMExtensions;
	using CalendarsTimeUnit = Calendars.TimeUnit;
	using SystemSettings = Core.Configuration.SysSettings;

	#region Class: INFTermStrategy

	/// <summary>
	/// Base class for case term strategies.
	/// </summary>
	public abstract class INFTermStrategy : BaseTermStrategy<CaseTermInterval, CaseTermStates>
	{

		#region Struct: TimeColumn

		/// <summary>
		/// Struct for time column data.
		/// </summary>
		protected struct TimeColumn
		{
			/// <summary>
			/// Time unit column name.
			/// </summary>
			public string UnitCode;

			/// <summary>
			/// Value column name.
			/// </summary>
			public string Value;
		}

		#endregion

		#region Class: TimeColumnData

		/// <summary>
		/// Nested class-container for time column data.
		/// </summary>
		protected class TimeColumnData
		{
			/// <summary>
			/// Reaction time column data.
			/// </summary>
			public TimeColumn ReactionColumn {
				get;
				set;
			}
			/// <summary>
			/// Solution time column data.
			/// </summary>
			public TimeColumn SolutionColumn {
				get;
				set;
			}
		}

		#endregion

		#region Class: InfBaseStrategyData

		/// <summary>
		/// Nested class-container for specific strategy data.
		/// </summary>
		protected class InfBaseStrategyData
		{
			public Guid PriorityId {
				get;
				set;
			}
			public Guid ServiceItemId {
				get;
				set;
			}
			public Guid ServicePactId {
				get;
				set;
			}
			public Guid SupportLevelId {
				get;
				set;
			}
			public Guid INFCriterionId {
				get;
				set;
			}
		}

		#endregion

		#region Fields: Protected

		/// <summary>
		/// Specific strategy data.
		/// </summary>
		protected InfBaseStrategyData InfBaseStrategyDataItem;

		/// <summary>
		/// Entity schema name.
		/// </summary>
		protected string EntitySchemaName;

		#endregion

		#region Constructors: Protected

		/// <summary>
		/// Initializes a new instance of the <see cref="BaseTermStrategy{TTermInterval, TMask}"/> class.
		/// </summary>
		/// <param name="userConnection">The user connection.</param>
		protected INFTermStrategy(UserConnection userConnection)
			: base(userConnection) {
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="INFTermStrategy"/> class.
		/// </summary>
		/// <param name="userConnection">The user connection.</param>
		/// <param name="args">The arguments.</param>
		protected INFTermStrategy(UserConnection userConnection, Dictionary<string, object> args)
			: this(userConnection) {
			InfBaseStrategyDataItem = args.ToObject<InfBaseStrategyData>();
		}

		#endregion

		#region Methods: Protected

		/// <summary>
		/// Gets the calendar identifier.
		/// </summary>
		/// <returns>Calendar identifier from system settings.</returns>
		protected virtual Guid GetBaseCalendarFromSysSettings() {
			return SystemSettings.GetValue(UserConnection, CalendarConsts.BaseCalendarCode, default(Guid));
		}

		/// <summary>
		/// Try to set calendar from SericeInServicePact table.
		/// </summary>
		/// <param name="calendarId">reference to CalendarId.</param>
		/// <returns>Result of operation.</returns>
		protected bool TrySetCalendarFromServiceInServicePact(ref Guid calendarId) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ServiceInServicePact");
			var calendarIdColumnName = esq.AddColumn("Calendar.Id").Name;
			esq.Filters.LogicalOperation = LogicalOperationStrict.And;
			esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "ServiceItem",
				InfBaseStrategyDataItem.ServiceItemId));
			esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "ServicePact",
				InfBaseStrategyDataItem.ServicePactId));
			EntityCollection collection = esq.GetEntityCollection(UserConnection);
			if (collection.IsNotEmpty()) {
				calendarId = collection[0].GetTypedColumnValue<Guid>(calendarIdColumnName);
			}
			return calendarId != default(Guid);
		}
		
			/// <summary>
		/// Try to set calendar from SericeInServicePact table.
		/// </summary>
		/// <param name="calendarId">reference to CalendarId.</param>param name="calendarId">reference to CalendarId.</param>param name="calendarId">reference to CalendarId.</param>param name="calendarId">reference to CalendarId.</param>
		/// <returns>Result of operation.</returns>
		protected bool INFCaseTermStrategyByINFslo(ref Guid calendarId) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "INFslo");
			var calendarIdColumnName = esq.AddColumn("INFServiceCalendar.Id").Name;
			esq.Filters.LogicalOperation = LogicalOperationStrict.And;
			esq.Filters.Add(esq.CreateFilterWithParameters(FilterComparisonType.Equal, "INFCriterion",
				InfBaseStrategyDataItem.INFCriterionId));
			EntityCollection collection = esq.GetEntityCollection(UserConnection);
			if (collection.IsNotEmpty()) {
				calendarId = collection[0].GetTypedColumnValue<Guid>(calendarIdColumnName);
			}
			return calendarId != default(Guid);
		}

		/// <summary>
		/// Tries to set calendar identifier from service pact.
		/// </summary>
		/// <param name="calendarId">Reference to calendar identifier.</param>
		/// <returns>Success.</returns>
		protected bool TrySetCalendarFromServicePact(ref Guid calendarId) {
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "ServicePact");
			var calendarIdColumnName = esq.AddColumn("Calendar.Id").Name;
			Entity servicePact = esq.GetEntity(UserConnection, InfBaseStrategyDataItem.ServicePactId);
			if (servicePact != null) {
				calendarId = servicePact.GetTypedColumnValue<Guid>(calendarIdColumnName);
			}
			return calendarId != default(Guid);
		}

		/// <summary>
		/// Gets the calendar identifier.
		/// </summary>
		/// <returns>Calendar identifier from system settings.</returns>
		protected virtual Guid GetCalendarId() {
			return GetBaseCalendarFromSysSettings();
		}

		/// <summary>
		/// Adds time columns to given entity schema query.
		/// </summary>
		/// <param name="esq">Reference to <seealso cref="EntitySchemaQuery"/> instance.</param>
		/// <returns>Added time column data.</returns>
		protected TimeColumnData InfAddTimeColumns(ref EntitySchemaQuery esq) {
			var timeColumns = new TimeColumnData {
				ReactionColumn = new TimeColumn {
					UnitCode = esq.AddColumn("ReactionTimeUnit.Code").Name,
					Value = esq.AddColumn("ReactionTimeValue").Name
				},
				SolutionColumn = new TimeColumn {
					UnitCode = esq.AddColumn("INFTimeUnitExec.Code").Name,
					Value = esq.AddColumn("INFTimeExec").Name
				}
			};
			return timeColumns;
		}

		/// <summary>
		/// Prepares result as an interval (<seealso cref="CaseTermInterval"/>).
		/// </summary>
		/// <param name="entity">Entity.</param>
		/// <param name="state">Case term state.</param>
		/// <param name="timeColumns">Time columns.</param>
		/// <param name="calendarId">Calendar identifier.</param>
		/// <returns>Case term interval.</returns>
		protected CaseTermInterval PrepareResult(Entity entity, CaseTermStates state, TimeColumnData timeColumns,
				Guid calendarId) {
			var result = new CaseTermInterval();
			if (!state.HasFlag(CaseTermStates.ContainsResponse)) {
				var reactionTimeUnitName = entity.GetTypedColumnValue<string>(timeColumns.ReactionColumn.UnitCode);
				CalendarsTimeUnit timeUnit;
				Enum.TryParse(reactionTimeUnitName, out timeUnit);
				var term = new TimeTerm {
					Type = timeUnit,
					Value = entity.GetTypedColumnValue<int>(timeColumns.ReactionColumn.Value),
					CalendarId = calendarId
				};
				result.ResponseTerm = term.ConvertToMinutes();
			}
			if (!state.HasFlag(CaseTermStates.ContainsResolve)) {
				var solutionTimeUnitName = entity.GetTypedColumnValue<string>(timeColumns.SolutionColumn.UnitCode);
				CalendarsTimeUnit timeUnit;
				Enum.TryParse(solutionTimeUnitName, out timeUnit);
				var term = new TimeTerm {
					Type = timeUnit,
					Value = entity.GetTypedColumnValue<int>(timeColumns.SolutionColumn.Value),
					CalendarId = calendarId
				};
				result.ResolveTerm = term.ConvertToMinutes();
			}
			return result;
		}

		/// <summary>
		/// Applies filters to given entity schema query.
		/// </summary>
		/// <param name="esq">Reference to <seealso cref="EntitySchemaQuery"/> instance.</param>
		protected abstract void ApplyFilters(ref EntitySchemaQuery esq);

		#endregion

		#region Methods: Public

		/// <summary>
		/// Returns case term interval for this strategy.
		/// </summary>
		/// <param name="state">Case term state.</param>
		/// <returns>Case term interval.</returns>
		public override CaseTermInterval GetTermInterval(CaseTermStates state) {
			var result = new CaseTermInterval();
			Guid calendarId = GetCalendarId();
			if (calendarId == default(Guid)) {
				return result;
			}
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, EntitySchemaName);
			TimeColumnData timeColumns = InfAddTimeColumns(ref esq);
			ApplyFilters(ref esq);
			EntityCollection entityCollection = esq.GetEntityCollection(UserConnection);
			if (entityCollection.IsNotEmpty()) {
				result = PrepareResult(entityCollection[0], state, timeColumns, calendarId);
			}
			return result;
		}

		#endregion

	}

	#endregion

}
