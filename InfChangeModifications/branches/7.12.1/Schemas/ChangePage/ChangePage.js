define("ChangePage", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "Change",
		attributes: {
			"Owner": {
				lookupListConfig: {
					filter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						if (this.get("Group") == null) {
							filterGroup.add(
								"OwnerFilterByGroup",
								this.Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL,
									"Id",
									Terrasoft.GUID_EMPTY
								)
							);
							return filterGroup;
						}
						filterGroup.add(
							"OwnerFilter",
							this.Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"[SysAdminUnit:Contact:Id].[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Id",
								this.get("Group").value
							)
						);
						return filterGroup;
					}
				}
			}
		},
		messages: {
			"msgVisaMenuButtonClick": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		details: /**SCHEMA_DETAILS*/{
			"VisaDetailV215bfeb8e": {
				"schemaName": "VisaDetailV2",
				"entitySchemaName": "ChangeVisa",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "Change"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Name",
				"values": {
					"layout": {
						"colSpan": 16,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "insert",
				"name": "ScheduledStartDatecdb3555c-e322-4ace-99b0-923bff5f1be8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "ScheduledStartDate"
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ScheduledClosureDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "insert",
				"name": "ScheduledImplantationDate2499156d-5cac-4c94-8b8c-c55c58e1bdb0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "ScheduledImplantationDate"
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ScheduledCustomerDate383fbb3e-ebf4-42ba-934e-58c8c1134d4f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "ScheduledCustomerDate"
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "PlannedLabor",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			},
			{
				"operation": "move",
				"name": "PlannedLabor",
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "ClosureDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "ActualLabor",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					}
				}
			},
			{
				"operation": "merge",
				"name": "ParentChange",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3
					}
				}
			},
			{
				"operation": "insert",
				"name": "Tabc4028671TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabVisaCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "VisaDetailV215bfeb8e",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabc4028671TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "Number",
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "Release",
				"parentName": "Classification_GridLayout",
				"propertyName": "items",
				"index": 4
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.thisChangeScope = this;
				this.sandbox.subscribe("msgVisaMenuButtonClick", function(arg) {
					this.getVisaGoal();
				}, this, ["ChangeVisaSandbox"]);
			},
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getActionsMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: "Согласование",
					"Visible": true
				}));
				actionMenuItems.addItem(this.getActionsMenuItem({
					"Caption": "Отправить на согласование",
					"Click":  {"bindTo": "getVisaGoal"},
					"Visible": true
				}));
				return actionMenuItems;
			},
			getVisaGoal: function() {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ChangeVisa"
				});
			
				var greatestStageNumber = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"StageNumber", this.get("StageNumber") !== 1 ? this.get("StageNumber") - 1 : 1);

				var idFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Change", this.get("Id"));
					
				var StatusFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Status.Name", "Ожидает визирования");


				esq.filters.addItem(greatestStageNumber);
				esq.filters.addItem(idFilter);
				esq.filters.addItem(StatusFilter);
				
				esq.getEntityCollection(function(result) {
						if (result.collection.collection.length !== 0) {
							this.showInformationDialog(
								"Невозможно отправить Изменение на согласование, так как предыдущий этап согласования ещё не закончился."
							);
						} else {
							Terrasoft.utils.inputBox(
								"Заголовок окна ввода",
								function(args) {
									if (args === "Next") {
										this.sendVisaMethod.call(this, arguments[1].text.value);
									}
								}.bind(this),
								[{
									className: "Terrasoft.Button",
									returnCode: "Next",
									style: "green",
									caption: "Далее"
								}, {
									className: "Terrasoft.Button",
									returnCode: "Exit",
									style: "red",
									caption: "Отмена"
								}],
								this,
								{
									text: {
										dataValueType: Terrasoft.DataValueType.TEXT,
										caption: "Цель",
										value: ""
									}
								}
							);
						}
					},
					this
				);
			},
			sendVisaMethod: function(goalText) {
				var FilterGroup = this.Terrasoft.createFilterGroup();
				FilterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				var filterUnitType = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL,
					"SysAdminUnitTypeValue",
					"4"
				);
				FilterGroup.addItem(filterUnitType);
				var filterRoleType = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL,
					"[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Id",
					"720b771c-e7a7-4f31-9cfb-52cd21c3739f" //все пользователи портала
				);
				FilterGroup.addItem(filterRoleType);
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
				// Вызов модального окна справочника
				this.goalText = goalText;
				this.openLookup(config, function(args) {
					_.forEach(args.selectedRows.collection.items, function(item) {
						var args = {
							sysProcessName: "VisaChangeProcess",
							parameters: {
								ChangeId: this.get("Id"),
								VisaOwner: item.value,
								VisaGoal: this.goalText,
								StageNumber: this.get("StageNumber")
							}
						};
						ProcessModuleUtilities.executeProcess(args);
					}.bind(this));
					this.set("StageNumber", this.get("StageNumber") + 1);
					this.save();
				}, this);
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
