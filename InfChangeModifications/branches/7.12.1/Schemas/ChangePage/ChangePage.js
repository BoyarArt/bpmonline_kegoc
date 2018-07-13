define("ChangePage", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
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
				"operation": "insert",
				"name": "DATE23ce736c-8e30-4778-a51d-337dc7700b21",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "PlannedDateCoordinationOfChange",
					"enabled": true
				},
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
				"operation": "insert",
				"name": "DATE621a1bb3-a81d-40df-a540-667deb2c78c0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "ExpirationDateAnalysisIntroduction",
					"enabled": true
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "INTEGER99830b74-e1e1-4641-9b4e-68939038043f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "NumberReturnsFromAcceptance",
					"enabled": true
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "merge",
				"name": "ActualLabor",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				}
			},
			{
				"operation": "move",
				"name": "ActualLabor",
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "merge",
				"name": "PlannedLabor",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4
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
						"column": 0,
						"row": 5
					}
				}
			},
			{
				"operation": "insert",
				"name": "PerformanceCode758a8ffe-3b69-4797-b782-315fc1005224",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "PerformanceCode"
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "LOOKUP2db80a45-f709-455a-9da2-09abbdec982d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "Customer",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "LOOKUP18f63dbf-d0de-48f8-93ac-94d65c9fc400",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 6,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "Account",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "STRINGe4ac03b9-dc87-44f5-8f22-d3e20c3a1013",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 7,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "ChangeRealizationPurpose",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "insert",
				"name": "STRING36969dd7-d1bb-4e91-b389-ed16e3e2f1be",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 8,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "PlannedEffectOfChangeRealization",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 15
			},
			{
				"operation": "insert",
				"name": "STRINGad7bcb1d-6d32-47d6-934d-94b07804d147",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 9,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "PlanOfReturnToPreviousState",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 16
			},
			{
				"operation": "insert",
				"name": "STRING95936904-a8f0-4be4-9016-55bb3de1dfb9",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 10,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "CommentsOnExpansion",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 17
			},
			{
				"operation": "insert",
				"name": "STRING60bbc653-e43b-4440-bca8-7a0744e80d1a",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 11,
						"layoutName": "Execution_GridLayout"
					},
					"bindTo": "SpecialConditionsOfIntroduction",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Execution_GridLayout",
				"propertyName": "items",
				"index": 18
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
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
