define("ChangePage", ["ProcessModuleUtilities", "ServiceDeskConstants"],
function(ProcessModuleUtilities, ServiceDeskConstants) {
	return {
		entitySchemaName: "Change",
		attributes: {
			"VisaMenuVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"Customer": {
				"lookupListConfig": {
					"columns": ["Account"],
					"filters": [
						function() {
							var filterGroup = Ext.create("Terrasoft.FilterGroup");
							var account = this.get("Account");
							if (account !== undefined && account !== null) {
								filterGroup.add("accountFilter",
								Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
								"Account",
								account.value));
							}
							return filterGroup;
						}
					]
				},
				"dependencies": [
					{
						"columns": ["Customer"],
						"methodName": "onCustomerChanged"
					}
				]
			},
			"Account": {
				"dependencies": [
					{
						"columns": ["Account"],
						"methodName": "onAccountChanged"
					}
				]
			},
			"Case": {
				lookupListConfig: {
					columns: ["Owner", "Group", "Contact", "Account"]
				}
			},
			"Owner": {
				"lookupListConfig": {
					"filters": [
						function() {
							var filterGroup = Ext.create("Terrasoft.FilterGroup");
							var group = " ";
							if (this.get("Group") !== undefined) {
								group = this.get("Group").displayValue;
							}
							filterGroup.add("IsUser",
							Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
							"[SysAdminUnit:Contact:Id].[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Name",
							group));
							return filterGroup;
						}
					]
				},
				"dependencies": [
					{
						"columns": ["Group"],
						"methodName": "onGroupChanged"
					}
				]
			},
			"Group": {
				lookupListConfig: {
					filter: function() {
						return this.Terrasoft.createColumnInFilterWithParameters("SysAdminUnitTypeValue", [
							ServiceDeskConstants.SysAdminUnitType.Organization.Value,
							ServiceDeskConstants.SysAdminUnitType.Division.Value,
							ServiceDeskConstants.SysAdminUnitType.Managers.Value,
							ServiceDeskConstants.SysAdminUnitType.Team.Value
						]);
					}
				}
			},
			"isFirstAnalysisButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isApprovalButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isScheduledButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isRealizationButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isPendingButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isImplementedButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isAcceptedByCustomerButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isImplantationButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isInOperationButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isClosedButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			}
		},
		messages: {
			"msgActivityMenuButtonClick" : {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"msgVisaMenuButtonClick": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ButtonClickMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ButtonVisibilityMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
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
			},
			"GanttDiagramDetail": {
				"schemaName": "ChangeDetail1",
				"entitySchemaName": "Change",
				"filter": {
					"detailColumn": "Id",
					"masterColumn": "Id"
				},
				"customConfig": {
					"displayColumn": "Number",
					"endDateColumn": "ScheduledClosureDate",
					"startDateColumn": "ScheduledStartDate"
				}
			},
			"ActivityChangeDetail7ac05fe5": {
				"schemaName": "ActivityChangeDetail",
				"entitySchemaName": "Activity",
				"filter": {
					"detailColumn": "Change",
					"masterColumn": "Id"
				}
			},
			"EmailDetailV27873d2d3": {
				"schemaName": "EmailDetailV2",
				"entitySchemaName": "Activity",
				"filter": {
					"detailColumn": "Change",
					"masterColumn": "Id"
				}
			},
			"Schema5Detail432ed961": {
				"schemaName": "Schema5Detail",
				"entitySchemaName": "Case",
				"filter": {
					"detailColumn": "Change",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "FirstAnalysis",
				"values": {
					"itemType": 5,
					"caption": "Первичный анализ",
					"click": {
						"bindTo": "onFirstAnalysisButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isFirstAnalysisButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "Approval",
				"values": {
					"itemType": 5,
					"caption": "Утверждение",
					"click": {
						"bindTo": "onApprovalButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isApprovalButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "Scheduled",
				"values": {
					"itemType": 5,
					"caption": "Запланировано",
					"click": {
						"bindTo": "onScheduledButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isScheduledButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "Realization",
				"values": {
					"itemType": 5,
					"caption": "Реализация",
					"click": {
						"bindTo": "onRealizationButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isRealizationButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "Pending",
				"values": {
					"itemType": 5,
					"caption": "В ожидании",
					"click": {
						"bindTo": "onPendingButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isPendingButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "Implemented",
				"values": {
					"itemType": 5,
					"caption": "Реализовано",
					"click": {
						"bindTo": "onImplementedButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isImplementedButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "insert",
				"name": "AcceptedByCustomer",
				"values": {
					"itemType": 5,
					"caption": "Принято заказчиком",
					"click": {
						"bindTo": "onAcceptedByCustomerButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isAcceptedByCustomerButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 15
			},
			{
				"operation": "insert",
				"name": "Implantation",
				"values": {
					"itemType": 5,
					"caption": "Внедрение",
					"click": {
						"bindTo": "onImplantationButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isImplantationButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 16
			},
			{
				"operation": "insert",
				"name": "InOperation",
				"values": {
					"itemType": 5,
					"caption": "В эксплуатации",
					"click": {
						"bindTo": "onInOperationButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isInOperationButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 17
			},
			{
				"operation": "insert",
				"name": "Closed",
				"values": {
					"itemType": 5,
					"caption": "Закрыто",
					"click": {
						"bindTo": "onClosedButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {
						"bindTo": "isClosedButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 18
			},
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
				"name": "InfStatus54df2ab8-0743-471d-ac3b-013a53b8b6e2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"enabled": false,
					"bindTo": "InfStatus"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "Group",
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
				"operation": "move",
				"name": "Group",
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Customer8c294ba0-1039-4dcb-9ca7-77a878cd8882",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "Customer"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "Owner",
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
				"name": "Accountb4ece46b-9edf-48be-b645-24dba2f8bb7a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "Account"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Author2ee1333a-7c6a-414b-a715-26484aed7580",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "Author"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "STRING3a07728a-bee5-47f3-832f-ed128ff7e50c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "Header"
					},
					"bindTo": "Risks",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "STRING7f589b1c-c3ba-422a-8d4d-87d09b5fb497",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "Requirements",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "STRINGbb549328-030f-4768-8d3c-c5d45f3a2bde",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 7,
						"layoutName": "Header"
					},
					"bindTo": "AcceptCriterion",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "LOOKUP6fecd767-bd16-48f0-9f28-91d88d0b8897",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 8,
						"layoutName": "Header"
					},
					"bindTo": "Type",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "STRING9ea65925-043c-4655-aa0a-11e1bdff4257",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 8,
						"layoutName": "Header"
					},
					"bindTo": "Cost",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "Caseaa4587bd-372f-47ef-845d-297365892c38",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 9,
						"layoutName": "Header"
					},
					"bindTo": "Case",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.Caseaa4587bd372f47ef845d297365892c38LabelCaption"
						}
					},
					"enabled": false,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "insert",
				"name": "PerformanceCode758a8ffe-3b69-4797-b782-315fc1005224",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "PerformanceCode"
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NumberReturnsFromAcceptancecaaf164c-0e4b-4884-954d-a5e9f258c10a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "NumberReturnsFromAcceptance",
					"enabled": false
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ClouseCommentaae54de4-1feb-4562-ada3-e8542cf9ee2c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "ClouseComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab9cce6275TabLabelTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabelGroupa1dafcd4",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab9cce6275TabLabelGroupa1dafcd4GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab9cce6275TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabelGridLayoutdb8d48e7",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab9cce6275TabLabelGroupa1dafcd4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ChangeRealizationPurposef101c551-7cfc-45fb-b20d-8967dea039e6",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab9cce6275TabLabelGridLayoutdb8d48e7"
					},
					"bindTo": "ChangeRealizationPurpose",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutdb8d48e7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PlannedEffectOfChangeRealization5014acac-d32b-4d9a-803a-8bc010e839f7",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab9cce6275TabLabelGridLayoutdb8d48e7"
					},
					"bindTo": "PlannedEffectOfChangeRealization",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutdb8d48e7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PlanOfReturnToPreviousState1fddd330-0bb4-4e91-b019-d39d38ca7e88",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab9cce6275TabLabelGridLayoutdb8d48e7"
					},
					"bindTo": "PlanOfReturnToPreviousState",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutdb8d48e7",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CommentsOnExpansion554e3462-081f-4ce5-ae25-8550e0b71b01",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Tab9cce6275TabLabelGridLayoutdb8d48e7"
					},
					"bindTo": "CommentsOnExpansion",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutdb8d48e7",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SpecialConditionsOfIntroduction1214da5b-fc1d-4cc8-88ef-39664a881f70",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Tab9cce6275TabLabelGridLayoutdb8d48e7"
					},
					"bindTo": "SpecialConditionsOfIntroduction",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutdb8d48e7",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabelGroup46a3b203",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab9cce6275TabLabelGroup46a3b203GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab9cce6275TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab9cce6275TabLabelGroup46a3b203",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StartOfJobadfb2715-b7a7-49d8-a2cc-550324303156",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "StartOfJob"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ScheduledStartDate67134710-7acd-4a84-8ab5-5580c641e590",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "ScheduledStartDate"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ScheduledImplantationDate83eff6fd-f046-4246-b57b-2d282bb85084",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "ScheduledImplantationDate"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ScheduledClosureDateb4e6f393-3d5c-4535-bd66-6bc77af2ba89",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "ScheduledClosureDate"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "PlannedDateCoordinationOfChangef4ee94f5-e2f3-4f95-941f-5bbfe1dbea33",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "PlannedDateCoordinationOfChange"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ScheduledCustomerDate8eaf0981-c99b-49e7-b806-4e807fb53dd4",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "ScheduledCustomerDate"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "ExpirationDateAnalysisIntroductionf886aba7-016c-4a30-9dfc-f2f71e8ab58b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "ExpirationDateAnalysisIntroduction"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "ClosureDate10fda513-12a8-48aa-b078-c90920962f80",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "Tab9cce6275TabLabelGridLayout21f47cc5"
					},
					"bindTo": "ClosureDate"
				},
				"parentName": "Tab9cce6275TabLabelGridLayout21f47cc5",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabelGroup54b20f1b",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab9cce6275TabLabelGroup54b20f1bGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab9cce6275TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab9cce6275TabLabelGridLayoutc29cd69a",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab9cce6275TabLabelGroup54b20f1b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ActualLaborac7f266b-71dd-4cb9-8a38-d28b50d542a7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab9cce6275TabLabelGridLayoutc29cd69a"
					},
					"bindTo": "ActualLabor"
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutc29cd69a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PlannedLaborf2910cee-1404-4d1e-8b0e-4469e4477a1a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Tab9cce6275TabLabelGridLayoutc29cd69a"
					},
					"bindTo": "PlannedLabor"
				},
				"parentName": "Tab9cce6275TabLabelGridLayoutc29cd69a",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ActivityChangeDetail7ac05fe5",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab9cce6275TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "EmailDetailV27873d2d3",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab9cce6275TabLabel",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Schema5Detail432ed961",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab9cce6275TabLabel",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "Release",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "move",
				"name": "Release",
				"parentName": "Classification_GridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "RegisteredOn",
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
				"name": "GanttDiagramDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "ClassificationTab",
				"propertyName": "items",
				"index": 5
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
				"index": 6
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
				"operation": "remove",
				"name": "Status"
			},
			{
				"operation": "remove",
				"name": "Priority"
			},
			{
				"operation": "remove",
				"name": "Purpose"
			},
			{
				"operation": "remove",
				"name": "Source"
			},
			{
				"operation": "remove",
				"name": "Category"
			},
			{
				"operation": "remove",
				"name": "Author"
			},
			{
				"operation": "remove",
				"name": "ScheduledClosureDate"
			},
			{
				"operation": "remove",
				"name": "ClosureDate"
			},
			{
				"operation": "remove",
				"name": "PlannedLabor"
			},
			{
				"operation": "remove",
				"name": "ActualLabor"
			},
			{
				"operation": "remove",
				"name": "ParentChange"
			},
			{
				"operation": "remove",
				"name": "Activity"
			},
			{
				"operation": "remove",
				"name": "EmailDetailV2"
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
				"name": "ExecutionTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			disabledAllFieldsOfChangePage: function() {
				Ext.ComponentMgr.all.each(function(c) {
					var cmp = Ext.ComponentMgr.all.map[c];
					if (cmp.className) {
						if (cmp.className.indexOf("Edit") !== -1) {
							if (cmp.setEnabled) {
								cmp.setEnabled(false);
							}
						}
					}
				});
			},
			onCustomerChanged: function() {
				if (this.get("Customer") !== undefined && this.get("Customer") !== null) {
					this.set("Account", this.get("Customer").Account);
				}
			},
			onAccountChanged: function() {
				if (this.get("Account") === undefined || this.get("Account") === null) {
					this.set("Customer", null);
				}
			},
			onGroupChanged: function() {
				this.set("Owner", null);
			},
			setButtonsVisible: function() {
				var status = this.get("InfStatus");
				var visibleButtons = {};
				
				if (status.displayValue === "Регистрация") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: true,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: false
					};
				} else if (status.displayValue === "Первичный анализ") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: true,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: true
					};
				} else if (status.displayValue === "Утверждение") {
					visibleButtons = {
						VisaMenuVisible: true,
						isFirstAnalysisButtonVisible: true,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: true,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: true
					};
				} else if (status.displayValue === "Запланировано") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: true,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: false
					};
				} else if (status.displayValue === "Реализация") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: true,
						isImplementedButtonVisible: true,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: true
					};
				} else if (status.displayValue === "В ожидании") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: true,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: false
					};
				} else if (status.displayValue === "Реализовано") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: true,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: true,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: false
					};
				} else if (status.displayValue === "Принято заказчиком") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: true,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: false
					};
				} else if (status.displayValue === "Внедрение") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: true,
						isClosedButtonVisible: false
					};
				} else if (status.displayValue === "В эксплуатации") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: true
					};
				} else if (status.displayValue === "Закрыто") {
					visibleButtons = {
						VisaMenuVisible: false,
						isFirstAnalysisButtonVisible: false,
						isApprovalButtonVisible: false,
						isScheduledButtonVisible: false,
						isRealizationButtonVisible: false,
						isPendingButtonVisible: false,
						isImplementedButtonVisible: false,
						isAcceptedByCustomerButtonVisible: false,
						isImplantationButtonVisible: false,
						isInOperationButtonVisible: false,
						isClosedButtonVisible: false
					};
				}
				
				for (var key in visibleButtons) {
					this.set(key, visibleButtons[key]);
				}
				
				this.sandbox.publish("ButtonVisibilityMessage", visibleButtons,
						["ButtonVisibilityMessageKey_Change"]
				);
			},
			//Первичный анализ
			onFirstAnalysisButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "Первичный анализ",
					primaryImageValue: "",
					value: "efa36621-f825-4d86-903a-0115099f19ff"
				});
				this.set("Phase", {
					displayValue: "Первичный анализ",
					primaryImageValue: "",
					value: "c480b4a7-27ed-420d-a9cd-b62f45c6548b"
				});
				this.save();
			},
			//Утверждение
			onApprovalButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "Утверждение",
					primaryImageValue: "",
					value: "20367af9-c1bf-4691-a4e1-b9b115bd4c3f"
				});
				this.set("Phase", {
					displayValue: "Утверждение",
					primaryImageValue: "",
					value: "53ac4643-e6ef-4bb6-b6f4-01c89065cc2c"
				});
				this.save();
			},
			//Запланировано
			onScheduledButtonClick: function() {
				this.checkVisaAcceptedCount.call(this, function() {
					this.set("InfStatus", {
						displayValue: "Запланировано",
						primaryImageValue: "",
						value: "bc93fb1a-33b0-491a-b421-ae6c865a606d"
					});
					this.set("Phase", {
						displayValue: "Реализация",
						primaryImageValue: "",
						value: "044c2fe7-c46b-440c-ae2c-5f2faf9c6521"
					});
					this.save();
				});
			},
			checkVisaAcceptedCount: function(callback) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ChangeVisa"
				});
			
				var greatestStageNumber = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"StageNumber", this.get("StageNumber") - 1);

				var idFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Change", this.get("Id"));
					
				var StatusFilter = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.NOT_EQUAL,
					"Status.Name", "Положительная");


				esq.filters.addItem(greatestStageNumber);
				esq.filters.addItem(idFilter);
				esq.filters.addItem(StatusFilter);
				
				esq.getEntityCollection(function(result) {
						if (result.collection.collection.length === 0) {
							this.callback.call(this.scope);
						} else {
							this.scope.showInformationDialog(
								"Не все визы предыдущего этапа положительны. В переходе на статус Реализация отказано."
							);
						}
					}.bind({callback: callback, scope: this}), this);
			},
			//Реализация
			onRealizationButtonClick: function() {
					this.set("InfStatus", {
						displayValue: "Реализация",
						primaryImageValue: "",
						value: "41164114-afb6-4ecf-af69-1a959158d6ff"
					});
					this.set("Phase", {
						displayValue: "Реализация",
						primaryImageValue: "",
						value: "044c2fe7-c46b-440c-ae2c-5f2faf9c6521"
					});
					if (this.get("Type").displayValue !== "Срочное" && this.get("Type")) {
						this.set("StartOfJob", new Date());
					}
					if (document.prevStatus !== undefined) {
						var NumberReturnsFromAcceptance = this.get("NumberReturnsFromAcceptance");
						this.set("NumberReturnsFromAcceptance", ++NumberReturnsFromAcceptance);
						document.prevStatus = undefined;
					}
					this.save();
				},
			//В ожидании
			onPendingButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "В ожидании",
					primaryImageValue: "",
					value: "35e78c71-7811-470c-9a62-513a409b86bd"
				});
				this.set("Phase", {
					displayValue: "Реализация",
					primaryImageValue: "",
					value: "044c2fe7-c46b-440c-ae2c-5f2faf9c6521"
				});
				this.save();
			},
			//Реализовано
			onImplementedButtonClick: function() {
				document.prevStatus = {
					displayValue: "Реализовано",
					primaryImageValue: "",
					value: "1113ecc1-1a83-40ab-af56-329e417a469c"
				};
				this.set("InfStatus", {
					displayValue: "Реализовано",
					primaryImageValue: "",
					value: "1113ecc1-1a83-40ab-af56-329e417a469c"
				});
				this.set("Phase", {
					displayValue: "Реализация",
					primaryImageValue: "",
					value: "044c2fe7-c46b-440c-ae2c-5f2faf9c6521"
				});
				this.save();
			},
			//Принято заказчиком
			onAcceptedByCustomerButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "Принято заказчиком",
					primaryImageValue: "",
					value: "d9f8f0b4-975c-45c0-9005-6437f460a1ed"
				});
				this.set("Phase", {
					displayValue: "Реализация",
					primaryImageValue: "",
					value: "044c2fe7-c46b-440c-ae2c-5f2faf9c6521"
				});
				this.save();
			},
			//Внедрение
			onImplantationButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "Внедрение",
					primaryImageValue: "",
					value: "ad0bf55d-bdf5-406b-ae2c-be4c7f1d6af7"
				});
				this.set("Phase", {
					displayValue: "Внедрение",
					primaryImageValue: "",
					value: "70d13508-1907-44e2-a97e-e3fbfa14f245"
				});
				this.save();
			},
			//В эксплуатации
			onInOperationButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "В эксплуатации",
					primaryImageValue: "",
					value: "6eef2f0f-545b-4644-bc1d-27283e61c5ea"
				});
				if (this.get("Type").displayValue !== "Срочное" && this.get("Type")) {
					this.set("ClosureDate", new Date());
				}
				this.set("Phase", {
					displayValue: "PIR",
					primaryImageValue: "",
					value: "0fa98930-0907-4833-becd-4b4617490eb3"
				});
				this.save();
			},
			//Закрыто
			onClosedButtonClick: function() {
				this.set("InfStatus", {
					displayValue: "Закрыто",
					primaryImageValue: "",
					value: "6fc17cb3-9e85-47ec-9154-de1052c11789"
				});
				this.set("Phase", {
					displayValue: "PIR",
					primaryImageValue: "",
					value: "0fa98930-0907-4833-becd-4b4617490eb3"
				});
				this.save();
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.thisChangeScope = this;
				this.sandbox.subscribe("msgVisaMenuButtonClick", function(arg) {
					this.mainVisaMethod();
				}, this, ["ChangeVisaSandbox"]);
				this.setButtonsVisible();
				
				this.sandbox.subscribe("msgActivityMenuButtonClick", function(arg) {
					this.createActivityFlow();
				}, this, ["ActivityMenuSandbox"]);
				
				this.sandbox.subscribe("ButtonClickMessage",
					function(method) {
						this[method]();
					}.bind(this),
					["ButtonClickMessageKey_Change"]
				);
				
				var _case = this.get("Case");
				if (_case !== undefined) {
					if (this.isAddMode() === true) {
						this.set("Owner", _case.Owner);
						this.set("Group", _case.Group);
						this.set("Customer", _case.Contact);
						this.set("Account", _case.Account);
					}
				}
				
				var status = this.get("InfStatus");
				if (status === null || status === undefined || status === "") {
					return;
				}
				if (status.displayValue === "Закрыто") {
					setTimeout(this.disabledAllFieldsOfChangePage, 1000);
				}
			},
			onRender: function() {
				this.callParent(arguments);
				
				var status = this.get("InfStatus");
				if (status === null || status === undefined || status === "") {
					return;
				}
				if (status.displayValue === "Закрыто") {
					setTimeout(this.disabledAllFieldsOfChangePage, 1000);
				}
			},
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getActionsMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: "Согласование",
					"Visible": {bindTo: "VisaMenuVisible"}
				}));
				actionMenuItems.addItem(this.getActionsMenuItem({
					"Caption": "Отправить на согласование",
					"Click":  {"bindTo": "mainVisaMethod"},
					"Visible": {bindTo: "VisaMenuVisible"}
				}));
				actionMenuItems.addItem(this.getActionsMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: "Активности",
					"Visible": true
				}));
				actionMenuItems.addItem(this.getActionsMenuItem({
					"Caption": "Создать поток активностей",
					"Click":  {"bindTo": "createActivityFlow"},
					"Visible": true
				}));
				return actionMenuItems;
			},
			createActivityFlow: function() {
				var args = {
					sysProcessName: "InfCreateActivityFlowProcess",
					parameters: {
						Change: this.get("Id")
					}
				};
				ProcessModuleUtilities.executeProcess(args);
			},
			getVisaTemplate: function() {
				var FilterGroup = this.Terrasoft.createFilterGroup();
				//Конфигурационный объект
				var config = {
					// Название схемы объекта, записи которого будут отображены в справочнике.
					entitySchemaName: "VisaTemplates",
					// Возможность множественного выбора.
					multiSelect: false,
					// Колонки, которые будут отображены в справочнике 
					columns: ["Name", "Goal"],
					filters: FilterGroup
				};
				// Вызов модального окна справочника
				this.openLookup(config, function(args) {
					this.TemplateGoal = args.selectedRows.collection.items[0].Goal;
					var TemplateId = args.selectedRows.collection.items[0].value;
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "VisaAudience"
					});
					esq.addColumn("VisaOwner");
					var templateFilter = esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL,
						"Template", TemplateId);
					esq.filters.addItem(templateFilter);
					esq.getEntityCollection(function(result) {
						var stageNumber = this.get("StageNumber");
						result.collection.collection.each(function(item) {
							var args = {
								sysProcessName: "VisaChangeProcess",
								parameters: {
									ChangeId: this.get("Id"),
									VisaOwner: item.values.VisaOwner.value,
									VisaGoal: this.TemplateGoal,
									StageNumber: this.get("StageNumber")
								},
								callback: function() {
									this.updateDetails();
								},
								scope: this
							};
							ProcessModuleUtilities.executeProcess(args);
						},
							this
						);
						this.set("StageNumber", stageNumber + 1);
						this.save();
					}, this);
				}, this);
			},
			mainVisaMethod: function() {
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
						this.showConfirmationDialog(
							"Создать согласование по шаблону?",
							function(arg) {
								if (arg === "yes") {
									this.getVisaTemplate.call(this);
								} else {
									this.getVisaGoal.call(this);
								}
							}.bind(this),
							["yes", "no"]
						);
					}
				}, this);
			},
			getVisaGoal: function() {
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
				/* filterRoleType = this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.NOT_EQUAL,
					"[SysUserInRole:SysUser:Id].[SysAdminUnit:Id:SysRole].Id",
					"720b771c-e7a7-4f31-9cfb-52cd21c3739f" //все пользователи портала
				);
				FilterGroup.addItem(filterRoleType);*/
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
					var stageNumber = this.get("StageNumber");
					_.forEach(args.selectedRows.collection.items, function(item) {
						var args = {
							sysProcessName: "VisaChangeProcess",
							parameters: {
								ChangeId: this.get("Id"),
								VisaOwner: item.value,
								VisaGoal: this.goalText,
								StageNumber: stageNumber
							},
							callback: function() {
								this.updateDetails();
								//setTimeout(this.reloadEntity(), 3000);
							},
							scope: this
						};
						ProcessModuleUtilities.executeProcess(args);
					}.bind(this));
					this.set("StageNumber", stageNumber + 1);
					this.save();
				}, this);
			},
			onSaved: function() {
				this.callParent(arguments);
				this.setButtonsVisible();
				
				var status = this.get("InfStatus");
				if (status === null || status === undefined || status === "") {
					return;
				} else if (status.displayValue === "Закрыто") {
					this.disabledAllFieldsOfChangePage();
				}
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"PerformanceCode": {
				"364a0f06-1257-47a2-82d3-8125ce9a6c1b": {
					"uId": "364a0f06-1257-47a2-82d3-8125ce9a6c1b",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "6fc17cb3-9e85-47ec-9154-de1052c11789",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ScheduledStartDate": {
				"cf4ffb5e-0f64-4f74-a6e2-ec6f4fc8bf34": {
					"uId": "cf4ffb5e-0f64-4f74-a6e2-ec6f4fc8bf34",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "bc93fb1a-33b0-491a-b421-ae6c865a606d",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ScheduledClosureDate": {
				"0750a9bb-b678-462f-a34c-ed519c737e26": {
					"uId": "0750a9bb-b678-462f-a34c-ed519c737e26",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "bc93fb1a-33b0-491a-b421-ae6c865a606d",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ScheduledImplantationDate": {
				"219f13e1-2a39-4d2c-ab0e-dc9b894a54f8": {
					"uId": "219f13e1-2a39-4d2c-ab0e-dc9b894a54f8",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "bc93fb1a-33b0-491a-b421-ae6c865a606d",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ScheduledCustomerDate": {
				"4876d790-2264-4d80-9377-969777e2acb3": {
					"uId": "4876d790-2264-4d80-9377-969777e2acb3",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "bc93fb1a-33b0-491a-b421-ae6c865a606d",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"PlannedDateCoordinationOfChange": {
				"e31933ef-9028-45ca-9ecf-f518881db79e": {
					"uId": "e31933ef-9028-45ca-9ecf-f518881db79e",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "bc93fb1a-33b0-491a-b421-ae6c865a606d",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ClouseComment": {
				"16cbf4d6-5c0d-4a52-bda9-fc36777261d8": {
					"uId": "16cbf4d6-5c0d-4a52-bda9-fc36777261d8",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "6fc17cb3-9e85-47ec-9154-de1052c11789",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"Case": {
				"a08727d2-c338-463e-9df7-f3606677c383": {
					"uId": "a08727d2-c338-463e-9df7-f3606677c383",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "Case"
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
