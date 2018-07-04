define("CasePage", ["BusinessRuleModule", "ConfigurationConstants",
"ProcessModuleUtilities", "CaseServiceUtility", "ServiceHelper", "CasesEstimateLabel", "ServiceDeskConstants"],
function(BusinessRuleModule, ConfigurationConstants, ProcessModuleUtilities,
CaseServiceUtility, ServiceHelper, CasesEstimateLabel, ServiceDeskConstants) {
	return {
		entitySchemaName: "Case",
		messages: {
			"ButtonClickMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ButtonVisibilityMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"ChangeDetailReady": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"ChangeDetailMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			"isGroupEnabled": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isToWorkButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isStopButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isAppointToGroupButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isDoButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isCloseButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"Owner": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"lookupListConfig": {
					"filters": [
						function() {
							var filterGroup = Ext.create("Terrasoft.FilterGroup");
							var group = " ";
							if (this.get("Group")) {
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
						"methodName": "cleanOwner"
					}
				]
			},
			"Category": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"dependencies": [
					{
						"columns": ["Category"],
						"methodName": "changeDetailSender"
					}
				]
			},
			"Status": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"dependencies": [
					{
						"columns": ["Status"],
						"methodName": "onStatusChanged"
					}
				]
			},
			"BusinessService": {
				lookupListConfig: {
					filter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						if (this.get("ServicePact") == null) {
							filterGroup.add(
								"ServiceItemByNULL",
								this.Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL,
									"Id",
									Terrasoft.GUID_EMPTY
								)
							);
							return filterGroup;
						}
						filterGroup.add("INFBisServiceByServicePact", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"[ServiceInServicePact:ServiceItem:Id].ServicePact", this.get("ServicePact").value));
						return filterGroup;
					}
				}
			},
			"ServiceItem": {
				columns: ["ServiceItem"],
				lookupListConfig: {
					filter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.add(
						"BusinessServiceFilter",
							this.Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"[ServiceRelationship:ServiceItemA:Id].[ServiceItem:Id:ServiceItemB]." +
								"[ServiceInServicePact:ServiceItem:Id].ServiceItem",
								this.get("BusinessService").value
							)
						);
						
						filterGroup.add(
						"ServicePactFilter",
							this.Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"[ServiceRelationship:ServiceItemA:Id].[ServiceItem:Id:ServiceItemB]." +
								"[ServiceInServicePact:ServiceItem:Id].ServicePact",
								this.get("ServicePact").value
							)
						);
						return filterGroup;
					}
				}
			},
			"TechService": {
				lookupListConfig: {
					filter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.add(
						"ServiceBizItemFilter",
							this.Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL,
								"[ServiceRelationship:ServiceItemA:Id].ServiceItemB",
								this.get("ServiceItem").value
							)
						);
						return filterGroup;
					}
				}
			}
		},
		details: /**SCHEMA_DETAILS*/{
			"Schema1Detaild6db5270": {
				"schemaName": "Schema1Detail",
				"entitySchemaName": "INFDtlStopAttempt",
				"filter": {
					"detailColumn": "Case",
					"masterColumn": "Id"
				}
			},
			"Schema2Detailb9e8651d": {
				"schemaName": "Schema2Detail",
				"entitySchemaName": "Change",
				"filter": {
					"detailColumn": "Case",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ToWorkButton",
				"values": {
					"itemType": 5,
					"caption": "Взять в работу",
					"click": {
						"bindTo": "onToWorkButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {
						"bindTo": "isToWorkButtonVisible"
					},
					"visible": {
						"bindTo": "isToWorkButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "StopButton",
				"values": {
					"itemType": 5,
					"caption": "Приостановить",
					"click": {
						"bindTo": "onStopButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {
						"bindTo": "isStopButtonVisible"
					},
					"visible": {
						"bindTo": "isStopButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "AppointToGroupButton",
				"values": {
					"itemType": 5,
					"caption": "Направить в группу",
					"click": {
						"bindTo": "onAppointToGroupButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {
						"bindTo": "isAppointToGroupButtonVisible"
					},
					"visible": {
						"bindTo": "isAppointToGroupButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "DoButton",
				"values": {
					"itemType": 5,
					"caption": "Выполнить",
					"click": {
						"bindTo": "onDoButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {
						"bindTo": "isDoButtonVisible"
					},
					"visible": {
						"bindTo": "isDoButtonVisible"
					}
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "ToCloseButton",
				"values": {
					"itemType": 5,
					"caption": "Закрыть",
					"click": {
						"bindTo": "onCloseButtonClick"
					},
					"style": "green",
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": false,
					"visible": false
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "merge",
				"name": "ServicePact",
				"values": {
					"contentType": 5,
					"enabled": true
				}
			},
			{
				"operation": "move",
				"name": "ServicePact",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUP4956359c-cdf4-4fc4-8c3f-277610c7ad6b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "BusinessService",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "ServiceItem",
				"values": {
					"enabled": true,
					"contentType": 5
				}
			},
			{
				"operation": "move",
				"name": "ServiceItem",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "LOOKUPe7771ef2-284e-4208-ac62-807a2513b7cc",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 7,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "TechService",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "merge",
				"name": "CaseCategory",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 8
					}
				}
			},
			{
				"operation": "merge",
				"name": "ConfItem",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 9
					}
				}
			},
			{
				"operation": "move",
				"name": "ConfItem",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "merge",
				"name": "CaseGroup",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 10
					},
					"enabled": {
						"bindTo": "isGroupEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "CaseOwner",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 11
					}
				}
			},
			{
				"operation": "insert",
				"name": "Schema2Detailb9e8651d",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "SolutionTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "SatisfactionLevelComment",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "insert",
				"name": "Tab2c83318cTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab2c83318cTabLabelTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab2c83318cTabLabelGroup7fbd9f32",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab2c83318cTabLabelGroup7fbd9f32GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab2c83318cTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab2c83318cTabLabelGridLayout6a3e9c24",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab2c83318cTabLabelGroup7fbd9f32",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StopReason35213cfd-af17-4fd1-adda-7685c3d27212",
				"values": {
					"layout": {
						"colSpan": 9,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab2c83318cTabLabelGridLayout6a3e9c24"
					},
					"bindTo": "StopReason"
				},
				"parentName": "Tab2c83318cTabLabelGridLayout6a3e9c24",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "RenewalDate7329855b-eceb-46b7-a84a-6b4bbdf1e65f",
				"values": {
					"layout": {
						"colSpan": 15,
						"rowSpan": 1,
						"column": 9,
						"row": 0,
						"layoutName": "Tab2c83318cTabLabelGridLayout6a3e9c24"
					},
					"bindTo": "RenewalDate"
				},
				"parentName": "Tab2c83318cTabLabelGridLayout6a3e9c24",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Commentb99a355f-1ed2-46e5-8ccf-e80b84ea014c",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab2c83318cTabLabelGridLayout6a3e9c24"
					},
					"bindTo": "Comment"
				},
				"parentName": "Tab2c83318cTabLabelGridLayout6a3e9c24",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Schema1Detaild6db5270",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab2c83318cTabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab2c83318cTabLabelGroupbdb2efee",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab2c83318cTabLabelGroupbdb2efeeGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab2c83318cTabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab2c83318cTabLabelGridLayout3b19913e",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab2c83318cTabLabelGroupbdb2efee",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INFPauseTime7c43e609-3331-4bf1-bedb-2ba6457c8ccc",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab2c83318cTabLabelGridLayout3b19913e"
					},
					"bindTo": "INFPauseTime",
					"enabled": false
				},
				"parentName": "Tab2c83318cTabLabelGridLayout3b19913e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INFPause100c9d31-2371-4644-b34f-44c9915fc21d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Tab2c83318cTabLabelGridLayout3b19913e"
					},
					"bindTo": "INFPause",
					"enabled": false
				},
				"parentName": "Tab2c83318cTabLabelGridLayout3b19913e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "INFPauseTimeOutc1324e79-186e-4d1b-afa4-7e858383612f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab2c83318cTabLabelGridLayout3b19913e"
					},
					"bindTo": "INFPauseTimeOut",
					"enabled": false
				},
				"parentName": "Tab2c83318cTabLabelGridLayout3b19913e",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "INFPauseMina04499ff-811d-47b2-8cbc-ff435f1bf4c8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Tab2c83318cTabLabelGridLayout3b19913e"
					},
					"bindTo": "INFPauseMin",
					"enabled": false
				},
				"parentName": "Tab2c83318cTabLabelGridLayout3b19913e",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "ResponseCaptionContainer",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 4,
						"row": 4
					}
				}
			},
			{
				"operation": "merge",
				"name": "SolutionCaptionContainer",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 16,
						"row": 4
					}
				}
			},
			{
				"operation": "merge",
				"name": "ClosureDate",
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
				"name": "INFLastTimeInGroupb90b6c79-6a84-4af4-8281-6985eda9646c",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "TermsControlGroup_GridLayout"
					},
					"bindTo": "INFLastTimeInGroup",
					"enabled": false
				},
				"parentName": "TermsControlGroup_GridLayout",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "remove",
				"name": "CasePriority"
			},
			{
				"operation": "remove",
				"name": "CaseAssignToMeButton"
			},
			{
				"operation": "remove",
				"name": "NewCaseProfileInfoContainer"
			},
			{
				"operation": "remove",
				"name": "SupportLevelValue"
			},
			{
				"operation": "remove",
				"name": "CaseCreatedOnValue"
			},
			{
				"operation": "move",
				"name": "SolutionCaptionProfile",
				"parentName": "ResolutionGridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "SolutionFieldContainer",
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "move",
				"name": "FirstSolutionProvidedOn",
				"parentName": "TermsControlGroup_GridLayout",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onStatusChanged: function() {
				var currentState = this.get("Status").displayValue;
				if (currentState === "В работе") {
					this.set("isGroupEnabled", true);
					this.setCurrentUser();
				} else if (currentState === "Направлено в группу") {
					this.cleanOwner();
					this.set("isGroupEnabled", false);
				} else {
					this.set("isGroupEnabled", false);
				}
			},
			setCurrentUser: function() {
				if (!this.get("Owner")) {
					this.set("Owner", Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT);
				}
			},
			cleanOwner: function() {
				this.set("Owner", null);
			},
			CaseTerm: function() {
				var idEntry = this.get("Id");
				var service = this.get("ServiceItem").value;
				var group = this.get("Group").value;
				var datein = this.get("RegisteredOn");
				var pause = this.get("INFPauseMin");
				var cat = this.get("Category").displayValue;
				var dx = 0;
				var args = {
					sysProcessName: "CasePageTimeTerms",
					parameters: {
						CaseId: idEntry,
						itservice: service,
						Group: group,
						RegOn : datein,
						TimeInPause : pause,
						CategoryName: cat,
						Index: dx
					}
				};
				if (service != null && cat != null) {
					//ProcessModuleUtilities.executeProcess(args);
					//setTimeout(this.reloadEntity(), 1000);
				}
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.scope = this;
				if (this.isAddMode() || this.isCopyMode()) {
					this.set("isGroupEnabled", true);
					this.Terrasoft.SysSettings.querySysSettingsItem("DefaultGroup",
					function(value) {
						this.set("Group", value);
					}, this);
				}
				this.setButtonsVisible();
				this.sandbox.subscribe("ButtonClickMessage",
					function(method) {
						this[method]();
					}.bind(this),
					["ButtonClickMessageKey"]
				);
				this.sandbox.subscribe("ChangeDetailReady",
					this.changeDetailSender.bind(this),
					["ChangeDetailReadyKey"]
				);
			},
			changeDetailSender: function() {
				var flag = false;
				if (this.get("Category")) {
					if (this.get("Category").displayValue === "Запрос на изменение") {
						flag = true;
					}
				}
				this.sandbox.publish("ChangeDetailMessage",
						flag,
						["ChangeDetailMessageKey"]
				);
			},
			setButtonsVisible: function() {
				var currentState = this.get("Status").value;
				var visibleButtons = {};
				//Направлено в группу
				if (currentState === "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38") {
					visibleButtons = {
						"isToWorkButtonVisible": true,
						"isStopButtonVisible": false,
						"isAppointToGroupButtonVisible": false,
						"isDoButtonVisible": false,
						"isCloseButtonVisible": false
					};
				//В работе
				} else if (currentState === "7e9f1204-f46b-1410-fb9a-0050ba5d6c38") {
					visibleButtons = {
						"isToWorkButtonVisible": false,
						"isStopButtonVisible": true,
						"isAppointToGroupButtonVisible": true,
						"isDoButtonVisible": true,
						"isCloseButtonVisible": false
					};
				//Приостановлено	
				} else if (currentState === "c3e56835-572f-4fc5-aecd-3f72e29286a8") {
					visibleButtons = {
						"isToWorkButtonVisible": true,
						"isStopButtonVisible": false,
						"isAppointToGroupButtonVisible": false,
						"isDoButtonVisible": false,
						"isCloseButtonVisible": false
					};
				//Выполнено	
				} else if (currentState === "1f3f61d6-ff88-423e-bcf8-31b3bee6426b") {
					visibleButtons = {
						"isToWorkButtonVisible": true,
						"isStopButtonVisible": false,
						"isAppointToGroupButtonVisible": false,
						"isDoButtonVisible": false,
						"isCloseButtonVisible": true
					};
				}
				for (var key in visibleButtons) {
					this.set(key, visibleButtons[key]);
				}
				this.sandbox.publish("ButtonVisibilityMessage", visibleButtons,
						["ButtonVisibilityMessageKey"]
				);
			},
			onToWorkButtonClick: function() {
				var status = {
					IsFinal: false,
					IsPaused: false,
					IsResolved: false,
					displayValue: "В работе",
					primaryImageValue: "",
					value: "7e9f1204-f46b-1410-fb9a-0050ba5d6c38"
				};
				this.set("Status", status);
				this.save();
			},
			onStopButtonClick: function() {
				var status = {
					IsFinal: false,
					IsPaused: true,
					IsResolved: false,
					displayValue: "Приостановлено",
					primaryImageValue: "",
					value: "c3e56835-572f-4fc5-aecd-3f72e29286a8"
				};
				this.set("Status", status);
				this.save();
			},
			onAppointToGroupButtonClick: function() {
				var status = {
					IsFinal: false,
					IsPaused: false,
					IsResolved: false,
					displayValue: "Направлено в группу",
					primaryImageValue: "",
					value: "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38"
				};
				this.set("Status", status);
				this.save();
			},
			onDoButtonClick: function() {
				var status = {
					IsFinal: false,
					IsPaused: false,
					IsResolved: true,
					displayValue: "Выполнено",
					primaryImageValue: "",
					value: "1f3f61d6-ff88-423e-bcf8-31b3bee6426b"
				};
				this.set("Status", status);
				this.save();
			},
			onCloseButtonClick: function() {
				var status = {
					value: "3e7f420c-f46b-1410-fc9a-0050ba5d6c38"
				};
				this.set("Status", status);
				this.save();
			},
			onSaved: function() {
				this.callParent(arguments);
				this.setButtonsVisible();
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Change": {
				"8e0668ee-5862-4180-b4fd-835a6f763da9": {
					"uId": "8e0668ee-5862-4180-b4fd-835a6f763da9",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "7e9f1204-f46b-1410-fb9a-0050ba5d6c38",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ServiceItem": {
				"BindingServiceItemToOriginalServiceItem": {
					"uId": "a92ecd18-b0fc-43b9-ad13-51b637ba349d",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "OriginalServiceItem"
							}
						}
					]
				},
				"BindingServiceItemToServicePact": {
					"uId": "998bd75d-beb4-454e-8213-f1f9cd7ac9fd",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "ServicePact"
							}
						},
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "OriginalServiceItem"
							}
						}
					]
				}
			},
			"ServicePact": {
				"EnableServicePactOnAdd": {
					"uId": "b6405675-ddd0-4451-acab-f13904be9423",
					"enabled": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "OriginalServiceItem"
							}
						}
					]
				}
			},
			"Group": {
				"2c42805d-cf10-4ec1-b88f-c634f595f958": {
					"uId": "2c42805d-cf10-4ec1-b88f-c634f595f958",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"StopReason": {
				"4b816c4b-1572-4a6e-8fcc-4d43359c764a": {
					"uId": "4b816c4b-1572-4a6e-8fcc-4d43359c764a",
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
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "c3e56835-572f-4fc5-aecd-3f72e29286a8",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"Comment": {
				"10cbf32c-395b-4b42-9978-278ff408e627": {
					"uId": "10cbf32c-395b-4b42-9978-278ff408e627",
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
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "c3e56835-572f-4fc5-aecd-3f72e29286a8",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"RenewalDate": {
				"e81390d5-9911-4395-9eca-e04cef0357fb": {
					"uId": "e81390d5-9911-4395-9eca-e04cef0357fb",
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
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "c3e56835-572f-4fc5-aecd-3f72e29286a8",
								"dataValueType": 10
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
