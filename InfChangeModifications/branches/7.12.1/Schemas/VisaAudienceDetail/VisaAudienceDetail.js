define("VisaAudienceDetail", ["ConfigurationEnums"], function(configurationEnums) {
	return {
		entitySchemaName: "VisaAudience",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			onGridLoaded: function() {
				this.callParent(arguments);
			},
			//Возвращает колонки, которые выбираются запросом.
			getGridDataColumns: function() {
				return {
					"Id": {path: "Id"},
					"VisaOwner": {path: "VisaOwner"}
				};
			},
			//Конфигурирует и отображает модальное окно справочника.
			openDocumentLookup: function() {
				var TemplateId = this.get("MasterRecordId");
				if (this.Ext.isEmpty(TemplateId)) {
					return;
				}
				
				var FilterGroup = this.Terrasoft.createFilterGroup();
				FilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				var filterUnitType = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"SysAdminUnitTypeValue",
					"4"
				);
				FilterGroup.addItem(filterUnitType);
				
				//Конфигурационный объект
				var config = {
					// Название схемы объекта, записи которого будут отображены в справочнике.
					entitySchemaName: "SysAdminUnit",
					// Возможность множественного выбора.
					multiSelect: true,
					// Колонки, которые будут отображены в справочнике 
					columns: ["Name"],
					filters: FilterGroup
				};
				
				// Экземпляр класса [EntitySchemaQuery].
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					// Установка корневой схемы.
					rootSchemaName: this.entitySchemaName
				});
				// Добавление колонки [Id].
				esq.addColumn("Id");
				// Добавление колонки [Id] из схемы [SysAdminUnit].
				esq.addColumn("VisaOwner.Id", "VisaOwnerId");
				// Создание и добавление фильтров в коллекцию запроса.
				esq.filters.add("filterProduct", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Template", TemplateId));
				// Получение всей коллекции записей и отображение ее в модальном окне справочника.
				esq.getEntityCollection(function(result) {
					var existsActivityCollection = [];
					if (result.success) {
						result.collection.each(function(item) {
							existsActivityCollection.push(item.get("VisaOwnerId"));
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
				var TemplateId = this.get("MasterRecordId");
				// Коллекция выбранных в справочнике документов.
				this.selectedRows = args.selectedRows.getItems();
				// Коллекция, передаваемая в запрос.
				this.selectedItems = [];
				// Копирование необходимых данных.
				this.selectedRows.forEach(function(item) {
					item.TemplateId = TemplateId;
					item.VisaOwnerId = item.value;
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
				insert.setParameterValue("Template", item.TemplateId, this.Terrasoft.DataValueType.GUID);
				insert.setParameterValue("VisaOwner", item.VisaOwnerId, this.Terrasoft.DataValueType.GUID);
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
				return "VisaOwner";
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				// Тип операции — слияние.
				"operation": "merge",
				// Название элемента схемы, над которым производится действие.
				"name": "DataGrid",
				// Объект, свойства которого будут объединены со свойствами элемента схемы.
				"values": {
					"rowDataItemMarkerColumnName": "SysAdminUnit"
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
		]/**SCHEMA_DIFF*/
	};
});
