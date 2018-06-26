define("CasePage", [], function() {
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
				"name": "ResoluitonContainer",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "ServiceItem",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "move",
				"name": "ConfItem",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "move",
				"name": "ServicePact",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
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
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "ToWorkButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Взять в работу",
					"click": {bindTo: "onToWorkButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {bindTo: "isToWorkButtonVisible"},
					"visible": {bindTo: "isToWorkButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "StopButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Приостановить",
					"click": {bindTo: "onStopButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {bindTo: "isStopButtonVisible"},
					"visible": {bindTo: "isStopButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "AppointToGroupButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Направить в группу",
					"click": {bindTo: "onAppointToGroupButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {bindTo: "isAppointToGroupButtonVisible"},
					"visible": {bindTo: "isAppointToGroupButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "DoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Выполнить",
					"click": {bindTo: "onDoButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {bindTo: "isDoButtonVisible"},
					"visible": {bindTo: "isDoButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "ToCloseButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": "Заклыть",
					"click": {bindTo: "onCloseButtonClick"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"styles": {
						"textStyle": {
							"margin-left": "5px",
							"margin-right": "5px"
						}
					},
					"enabled": {bindTo: "isCloseButtonVisible"},
					"visible": {bindTo: "isCloseButtonVisible"}
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			cleanOwner: function() {
				this.set("Owner", null);
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.scope = this;
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
						"ChangeDetailMessageKey"
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
								"value": "7e9f1204-f46b-1410-fb9a-0050ba5d6c38",
								"dataValueType": 10
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
