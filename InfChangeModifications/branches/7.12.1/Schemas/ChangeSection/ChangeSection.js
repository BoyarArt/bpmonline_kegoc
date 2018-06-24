define("ChangeSection", [], function() {
	return {
		entitySchemaName: "Change",
		attributes: {
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
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},
			"ButtonClickMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"ButtonVisibilityMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			init: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("ButtonVisibilityMessage",
					function(items) {
						this.setButtonVisible(items);
					}.bind(this),
					["ButtonVisibilityMessageKey_Change"]
				);
			},
			setButtonVisible: function(items) {
				for (var item in items) {
					this.set(item, items[item]);
				}
			},
			"getVisaGoal": function() {
				this.sandbox.publish("msgVisaMenuButtonClick", null, ["ChangeVisaSandbox"]);
			},
			//Первичный анализ
			onFirstAnalysisButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onFirstAnalysisButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Утверждение
			onApprovalButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onApprovalButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Запланировано
			onScheduledButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onScheduledButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Реализация
			onRealizationButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onRealizationButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//В ожидании
			onPendingButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onPendingButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Реализовано
			onImplementedButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onImplementedButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Принято заказчиком
			onAcceptedByCustomerButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onAcceptedByCustomerButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Внедрение
			onImplantationButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onImplantationButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//В эксплуатации
			onInOperationButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onInOperationButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			},
			//Закрыто
			onClosedButtonClick: function() {
				this.sandbox.publish("ButtonClickMessage", "onClosedButtonClick",
					["ButtonClickMessageKey_Change"]
				);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
				"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
			}
		]/**SCHEMA_DIFF*/
	};
});
