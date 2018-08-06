define("CaseSection", [],
		function() {
			return {
				entitySchemaName: "Case",
				mixins: {},
				messages: {
					"ButtonClickMessage": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.PUBLISH
					},
					"ButtonVisibilityMessage": {
						mode: this.Terrasoft.MessageMode.PTP,
						direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
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
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
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
						"parentName": "CombinedModeActionButtonsCardLeftContainer",
						"propertyName": "items",
						"name": "ToCloseButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": "Закрыть",
							"click": {bindTo: "onCloseButtonClick"},
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"styles": {
								"textStyle": {
									"margin-left": "5px",
									"margin-right": "5px"
								}
							},
							"enabled": false,
							"visible": false
						}
					}
				]/**SCHEMA_DIFF*/,
				methods: {
					"ServerChannelSubscriber": function(scope, message) {
						if (message) {
							//Глобальные оповещения
							if (message.Header.Sender === "ExecuteReloadCaseGridGlobal") {
								this.reloadGridData();
							}
						}
					},
					init: function() {
						this.callParent(arguments);
						//Подписка на широковещательные сообщения по websocket протоколу
						Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.ServerChannelSubscriber, this);
						this.sandbox.subscribe("ButtonVisibilityMessage",
							function(items) {
								this.setButtonVisible(items);
							}.bind(this),
							["ButtonVisibilityMessageKey"]
						);
					},
					setButtonVisible: function(items) {
						for (var item in items) {
							this.set(item, items[item]);
						}
					},
					onToWorkButtonClick: function() {
						this.sandbox.publish("ButtonClickMessage", "onToWorkButtonClick",
							["ButtonClickMessageKey"]
						);
					},
					onStopButtonClick: function() {
						this.sandbox.publish("ButtonClickMessage", "onStopButtonClick",
							["ButtonClickMessageKey"]
						);
					},
					onAppointToGroupButtonClick: function() {
						this.sandbox.publish("ButtonClickMessage", "onAppointToGroupButtonClick",
							["ButtonClickMessageKey"]
						);
					},
					onDoButtonClick: function() {
						this.sandbox.publish("ButtonClickMessage", "onDoButtonClick",
							["ButtonClickMessageKey"]
						);
					},
					onCloseButtonClick: function() {
						this.sandbox.publish("ButtonClickMessage", "onCloseButtonClick",
							["ButtonClickMessageKey"]
						);
					}
				}
			};
		});
