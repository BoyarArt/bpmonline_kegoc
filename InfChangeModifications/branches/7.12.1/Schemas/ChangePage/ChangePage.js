define("ChangePage", ["ProcessModuleUtilities", "ServiceDeskConstants"],
function(ProcessModuleUtilities, ServiceDeskConstants) {
	return {
		entitySchemaName: "Change",
		attributes: {
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
					"bindTo": "NumberReturnsFromAcceptance"
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
				"name": "ExecutionTabGroupfe7e8f47",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ExecutionTabGroupfe7e8f47GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "ExecutionTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ExecutionTabGridLayout7988c9f9",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "ExecutionTabGroupfe7e8f47",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ScheduledStartDate74e31858-f7f0-4686-95e7-a0c53ce46ba9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "ScheduledStartDate"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ScheduledClosureDate695d204c-2249-4690-8b09-4b634186fec8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "ScheduledClosureDate"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ScheduledImplantationDated5f11815-f974-47db-9af0-fe161ab7b812",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "ScheduledImplantationDate"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ScheduledCustomerDate4f8fd35f-6ec2-4000-91bd-55291c24e386",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "ScheduledCustomerDate"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "PlannedDateCoordinationOfChangea23b4b50-5282-4efa-9544-9f6596e1b04f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "PlannedDateCoordinationOfChange"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ClosureDateafd07c76-fed2-40e6-b73e-ec38f3e9c414",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "ClosureDate"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "ExpirationDateAnalysisIntroduction59ac467c-bc18-4f50-a4c2-a9ea6a634cfd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ExecutionTabGridLayout7988c9f9"
					},
					"bindTo": "ExpirationDateAnalysisIntroduction"
				},
				"parentName": "ExecutionTabGridLayout7988c9f9",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "ExecutionTabGroup4e8dd99a",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ExecutionTabGroup4e8dd99aGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "ExecutionTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ExecutionTabGridLayout385ceff2",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "ExecutionTabGroup4e8dd99a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ChangeRealizationPurposee4df274a-b190-4ded-9e9b-371cfea9840c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ExecutionTabGridLayout385ceff2"
					},
					"bindTo": "ChangeRealizationPurpose",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "ExecutionTabGridLayout385ceff2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PlannedEffectOfChangeRealization77dfd7a4-dc92-459e-a290-7344192b4365",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ExecutionTabGridLayout385ceff2"
					},
					"bindTo": "PlannedEffectOfChangeRealization",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "ExecutionTabGridLayout385ceff2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PlanOfReturnToPreviousState19f2f869-0ace-4db9-907f-dec808571eef",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ExecutionTabGridLayout385ceff2"
					},
					"bindTo": "PlanOfReturnToPreviousState",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "ExecutionTabGridLayout385ceff2",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CommentsOnExpansion4a89f53a-1260-40da-aefe-367549606140",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ExecutionTabGridLayout385ceff2"
					},
					"bindTo": "CommentsOnExpansion",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "ExecutionTabGridLayout385ceff2",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SpecialConditionsOfIntroduction12f63d8e-fc43-414e-8f58-d7db9022b143",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ExecutionTabGridLayout385ceff2"
					},
					"bindTo": "SpecialConditionsOfIntroduction",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "ExecutionTabGridLayout385ceff2",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ExecutionTabGroupd4cb3017",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ExecutionTabGroupd4cb3017GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "ExecutionTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ExecutionTabGridLayoutc2377b46",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "ExecutionTabGroupd4cb3017",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ActualLabor3ac36a25-23b6-454b-81e7-91016901f751",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ExecutionTabGridLayoutc2377b46"
					},
					"bindTo": "ActualLabor"
				},
				"parentName": "ExecutionTabGridLayoutc2377b46",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PlannedLabor6370182b-74c7-4f27-b373-2a75ae0830b0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "ExecutionTabGridLayoutc2377b46"
					},
					"bindTo": "PlannedLabor"
				},
				"parentName": "ExecutionTabGridLayoutc2377b46",
				"propertyName": "items",
				"index": 1
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
				"name": "Author",
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
				"operation": "merge",
				"name": "RegisteredOn",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
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
				if (this.get("Group") === undefined || this.get("Group") === null) {
					this.set("Owner", null);
				}
			},
			setButtonsVisible: function() {
				var status = this.get("InfStatus");
				var visibleButtons = {};
				
				if (status.displayValue === "Регистрация") {
					visibleButtons = {
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
						isFirstAnalysisButtonVisible: false,
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
					this.getVisaGoal();
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
				if (status.hasOwnProperty("displayValue") === true) {
					if (status.displayValue === "Закрыто") {
						setTimeout(this.disabledAllFieldsOfChangePage, 1000);
					}
				}
			},
			onRender: function() {
				this.callParent(arguments);
				
				var status = this.get("InfStatus");
				if (status.hasOwnProperty("displayValue") === true) {
					if (status.displayValue === "Закрыто") {
						setTimeout(this.disabledAllFieldsOfChangePage, 1000);
					}
				}
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
			},
			onSaved: function() {
				this.callParent(arguments);
				this.setButtonsVisible();
				
				var status = this.get("InfStatus");
				if (status.hasOwnProperty("displayValue") === true) {
					if (status.displayValue === "Закрыто") {
						this.disabledAllFieldsOfChangePage();
					}
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
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "35e78c71-7811-470c-9a62-513a409b86bd",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "20367af9-c1bf-4691-a4e1-b9b115bd4c3f",
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
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "35e78c71-7811-470c-9a62-513a409b86bd",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "41164114-afb6-4ecf-af69-1a959158d6ff",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "20367af9-c1bf-4691-a4e1-b9b115bd4c3f",
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
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "35e78c71-7811-470c-9a62-513a409b86bd",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "41164114-afb6-4ecf-af69-1a959158d6ff",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "1113ecc1-1a83-40ab-af56-329e417a469c",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "d9f8f0b4-975c-45c0-9005-6437f460a1ed",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "ad0bf55d-bdf5-406b-ae2c-be4c7f1d6af7",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "20367af9-c1bf-4691-a4e1-b9b115bd4c3f",
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
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "35e78c71-7811-470c-9a62-513a409b86bd",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "41164114-afb6-4ecf-af69-1a959158d6ff",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "1113ecc1-1a83-40ab-af56-329e417a469c",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "InfStatus"
							},
							"rightExpression": {
								"type": 0,
								"value": "20367af9-c1bf-4691-a4e1-b9b115bd4c3f",
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
								"value": "20367af9-c1bf-4691-a4e1-b9b115bd4c3f",
								"dataValueType": 10
							}
						},
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
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
