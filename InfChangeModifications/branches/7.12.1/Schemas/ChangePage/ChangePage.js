define("ChangePage", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "Change",
		attributes: {
			"Case": {
				lookupListConfig: {
					columns: ["Owner", "Group"]
				}
			},
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
				"name": "GanttDiagramDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "ClassificationTab",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "FirstAnalysis",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Первичный анализ",
					"click": {bindTo: "onFirstAnalysisButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isFirstAnalysisButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Approval",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Утверждение",
					"click": {bindTo: "onApprovalButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isApprovalButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Scheduled",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Запланировано",
					"click": {bindTo: "onScheduledButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isScheduledButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Realization",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Реализация",
					"click": {bindTo: "onRealizationButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isRealizationButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Pending",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "В ожидании",
					"click": {bindTo: "onPendingButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isPendingButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Implemented",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Реализовано",
					"click": {bindTo: "onImplementedButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isImplementedButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "AcceptedByCustomer",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Принято заказчиком",
					"click": {bindTo: "onAcceptedByCustomerButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isAcceptedByCustomerButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Implantation",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Внедрение",
					"click": {bindTo: "onImplantationButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isImplantationButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "InOperation",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "В эксплуатации",
					"click": {bindTo: "onInOperationButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isInOperationButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "Closed",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Закрыто",
					"click": {bindTo: "onClosedButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"visible": {bindTo: "isClosedButtonVisible"}
				}
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
				"index": 6
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
				"name": "Release",
				"parentName": "Classification_GridLayout",
				"propertyName": "items",
				"index": 4
			}
		]/**SCHEMA_DIFF*/,
		methods: {
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
						isClosedButtonVisible: false
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
						isRealizationButtonVisible: false,
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
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
