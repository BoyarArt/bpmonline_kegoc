define("InfNextActivitiesDetail", ["ConfigurationEnums"], function(configurationEnums) {
	return {
		entitySchemaName: "InfNextActivities",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				// Тип операции — слияние.
				"operation": "merge",
				// Название элемента схемы, над которым производится действие.
				"name": "DataGrid",
				// Объект, свойства которого будут объединены со свойствами элемента схемы.
				"values": {
					"rowDataItemMarkerColumnName": "Activity"
				}
			},
			{
				// Тип операции — слияние.
				"operation": "merge",
				// Название элемента схемы, над которым производится действие.
				"name": "AddRecordButton",
				// Объект, свойства которого будут объединены со свойствами элемента схемы.
				"values": {
					"visible": true
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onGridLoaded: function() {
				this.callParent(arguments);
				
				/*this.sandbox.subscribe("hideOptions", function(arg) {
					this.set("hiddenOption", arg.bValue);
				}, this, ["TeamAccountDetailMessage"]);
				
				this.sandbox.publish("AccountTeamGridIsLoad", true, ["TeamAccountDetailMessage"]);*/
			},
			//Возвращает колонки, которые выбираются запросом.
			getGridDataColumns: function() {
				return {
					"Id": {path: "Id"},
					"Activity": {path: "Activity"},
					"Activity.Title": {path: "Activity.Title"}
				};
			},
			//Конфигурирует и отображает модальное окно справочника.
			openDocumentLookup: function() {
				var FilterGroup = this.Terrasoft.createFilterGroup();
				
				FilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				var stageNumber = document.thisActivityPage.get("StageNumber");
				var filterStageNumber;
				
				if (stageNumber !== 0) {
					filterStageNumber = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"StageNumber",
						document.thisActivityPage.get("StageNumber") + 1
					);
				} else {
					filterStageNumber = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.GREATER_OR_EQUAL,
						"StageNumber",
						2
					);
				}
				
				FilterGroup.addItem(filterStageNumber);
				
				var filterChange;
				var change = document.thisActivityPage.get("Change");
				if (change !== undefined && change.hasOwnProperty("value") === true) {
					filterChange = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"Change",
						change.value
					);
				} else {
					filterChange = this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"Change",
						Terrasoft.GUID_EMPTY
					);
				}
				FilterGroup.addItem(filterChange);
				
				//Конфигурационный объект
				var config = {
					// Название схемы объекта, записи которого будут отображены в справочнике.
					entitySchemaName: "Activity",
					// Возможность множественного выбора.
					multiSelect: stageNumber === 0 ? false : true,
					// Колонки, которые будут отображены в справочнике 
					columns: ["Title"],
					filters: FilterGroup
				};
				var ActivityId = this.get("MasterRecordId");
				if (this.Ext.isEmpty(ActivityId)) {
					return;
				}
				// Экземпляр класса [EntitySchemaQuery].
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					// Установка корневой схемы.
					rootSchemaName: this.entitySchemaName
				});
				// Добавление колонки [Id].
				esq.addColumn("Id");
				// Добавление колонки [Id] из схемы [SysAdminUnit].
				esq.addColumn("NextActivity.Id", "NextActivityId");
				// Создание и добавление фильтров в коллекцию запроса.
				esq.filters.add("filterProduct", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Activity", ActivityId));
				// Получение всей коллекции записей и отображение ее в модальном окне справочника.
				esq.getEntityCollection(function(result) {
					var existsActivityCollection = [];
					if (result.success) {
						result.collection.each(function(item) {
							existsActivityCollection.push(item.get("NextActivityId"));
						});
					}
					//Добавление фильтра в конфигурационный объект.
					if (existsActivityCollection.length > 0) {
						var existsFilter = this.Terrasoft.createColumnInFilterWithParameters("Id",
							existsActivityCollection);
						existsFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
						existsFilter.Name = "existsFilter";
						config.filters.addItem(existsFilter);
					}
					// Вызов модального окна справочника
					this.openLookup(config, this.addCallBack, this);
				}, this);
			},

			// Обработчик события сохранения страницы редактирования.
			onCardSaved: function() {
				this.openDocumentLookup();
			},

			addRecord: function() {
				var masterCardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
				var isNewRecord = (masterCardState.state === configurationEnums.CardStateV2.ADD ||
				masterCardState.state === configurationEnums.CardStateV2.COPY);
				if (isNewRecord === true) {
					var args = {
						isSilent: true,
						messageTags: [this.sandbox.id]
					};
					this.sandbox.publish("SaveRecord", args, [this.sandbox.id]);
					return;
				}
				this.openDocumentLookup();
			},

			// Добавление выбранных продуктов.
			addCallBack: function(args) {
				// Экземпляр класса пакетного запроса BatchQuery.
				var bq = this.Ext.create("Terrasoft.BatchQuery");
				var ActivityId = this.get("MasterRecordId");
				// Коллекция выбранных в справочнике документов.
				this.selectedRows = args.selectedRows.getItems();
				// Коллекция, передаваемая в запрос.
				this.selectedItems = [];
				// Копирование необходимых данных.
				this.selectedRows.forEach(function(item) {
					item.ActivityId = ActivityId;
					item.NextActivityId = item.value;
					bq.add(this.getDocumentInsertQuery(item));
					this.selectedItems.push(item.value);
				}, this);
				// Выполнение пакетного запроса, если он не пустой.
				if (bq.queries.length) {
					this.showBodyMask.call(this);
					bq.execute(this.onDocumentInsert, this);
				}
			},

			//Возвращает запрос на добавление текущего объекта.
			getDocumentInsertQuery: function(item) {
				var insert = Ext.create("Terrasoft.InsertQuery", {
					rootSchemaName: this.entitySchemaName
				});
				insert.setParameterValue("Activity", item.ActivityId, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("NextActivity", item.NextActivityId, this.Terrasoft.DataValueType.GUID);
				return insert;
			},

			//Метод, вызываемый при добавлении записей в реестр детали.
			onDocumentInsert: function(response) {
				this.hideBodyMask.call(this);
				this.beforeLoadGridData();
				var filterCollection = [];
				response.queryResults.forEach(function(item) {
					filterCollection.push(item.id);
				});
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: this.entitySchemaName
				});
				this.initQueryColumns(esq);
				esq.filters.add("recordId", Terrasoft.createColumnInFilterWithParameters("Id", filterCollection));
				esq.getEntityCollection(function(response) {
					this.afterLoadGridData();
					if (response.success) {
						var responseCollection = response.collection;
						this.prepareResponseCollection(responseCollection);
						this.getGridData().loadAll(responseCollection);
						setTimeout(document.thisActivityPage.reloadEntity.bind(document.thisActivityPage), 1000);
					}
				}, this);
			},

			// Метод, вызываемый при удалении выбранных записей детали.
			deleteRecords: function() {
				var selectedRows = this.getSelectedItems();
				if (selectedRows.length > 0) {
					this.set("SelectedRows", selectedRows);
					this.callParent(arguments);
				}
			},

			// Скрыть пункт меню [Копировать].
			getCopyRecordMenuItem: Terrasoft.emptyFn,
			// Скрыть пункт меню [Изменить].
			getEditRecordMenuItem: Terrasoft.emptyFn,
			// Возвращает имя колонки по умолчанию для фильтра.
			getFilterDefaultColumnName: function() {
				return "NextActivity";
			}
		}
	};
});
