define("GetParamReport", ["terrasoft", "BusinessRuleModule", "ConfigurationConstants",
	"GetParamReportResources", "LookupUtilities"],
function(terrasoft, BusinessRuleModule, ConfigurationConstants, resources, LookupUtilities) {
	return {
		entitySchemaName: "Case",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			"multipleLookup": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isLookup: true,
				referenceSchemaName: "ServiceItem",
				lookupListConfig: {
					multiSelect: true,
					hideActions: true
				}
			},
			"SxStartDate": {
				dataValueType: Terrasoft.DataValueType.DATE,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},
			"SxDueDate": {
				dataValueType: Terrasoft.DataValueType.DATE,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true
			},
			"ServiceFilterEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			"CategoryFilterEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			},
			"GroupfilterEnabled": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},
		methods: {
			/**
			 * Возвращает заголовок страницы
			 * @overridden
			 * @return {String}
			 */
			
			getHeader: function() {
				return resources.localizableStrings.HeaderString;
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				var myDate = new Date();
				this.set("SxDueDate", myDate);
			},
			PrintReport: function() {
				var SxStartDate = this.get("SxStartDate");
				var SxDueDate = this.get("SxDueDate");
				var SxServices = "";
				if (this.get("multipleLookup")) {
					SxServices = this.get("multipleLookup");
				}
				if (this.Ext.isEmpty(SxStartDate) ||
					this.Ext.isEmpty(SxDueDate)) {
					Terrasoft.showInformation(resources.localizableStrings.RequiredFieldsError);
				} else {
					if (SxStartDate > SxDueDate) {
						Terrasoft.showInformation(resources.localizableStrings.StartDateMoreThatDueDateError);
					} else {
						SxDueDate.setDate(SxDueDate.getDate() + 1);
						var sd1 = Ext.Date.format(SxStartDate, "Y-m-d");
						var sd2 = new Date(sd1 + " 00:00:00");
						var sd3 = sd2.toUTCString().replace(" GMT", "");
						var StartDate = Ext.Date.format(new Date(sd3), "Y-m-d H:i:s");
						
						var dd1 = Ext.Date.format(SxDueDate, "Y-m-d");
						var dd2 = new Date(dd1 + " 00:00:00");
						var dd3 = dd2.toUTCString().replace(" GMT", "");
						var DueDate = Ext.Date.format(new Date(dd3), "Y-m-d H:i:s");
						
	
						var location = "";
						var dataSend = {
							StartDate: StartDate,
							DueDate: DueDate,
							location: location,
							services: SxServices
						};
	
						Terrasoft.AjaxProvider.request({
							url: "../rest/CaseReport/GetReportURL",
							headers: {
								"Accept": "application/json",
								"Content-Type": "application/json"
							},
							method: "POST",
							jsonData: dataSend,
							callback: function(request, success, response) {
								var responseObject = {};
								if (success) {
									responseObject = Terrasoft.decode(response.responseText);
									var key = "/" + responseObject.GetReportURLResult;
									/*var reportCaption = "КСРО отчет с " + StartDate + " по " + DueDate + ".xlsx";
									var report = document.createElement("a");
									report.href = "../rest/CaseReport/" + "GenerateSalaryReport" + key;
									report.download = reportCaption;
									document.body.appendChild(report);
									report.click();
									document.body.removeChild(report);*/
									
									var csvFile = document.createElement("a");
									csvFile.href = "../rest/CaseReport/" + "GenerateSalaryReport" + key;
									csvFile.download = "Case report" + ".xlsx";
									document.body.appendChild(csvFile);
									csvFile.click();
									document.body.removeChild(csvFile);
									Terrasoft.showInformation("Отчёт формируется, пожалуйста подождите." +
									"\n" + "Не закрывайте это окно до начала загрузки.");
									this.sandbox.publish("BackHistoryState");
								}
							},
							scope: this
						});
					}
				}
			},
			onLookupSelected: function(config) {
				var ext = this.Ext;
				var columnName = config.columnName;
				var items = config.selectedRows.collection.items;
				var columnValue = this.get(columnName);
				if (ext.isEmpty(columnValue)) {
					columnValue = "";
				} else {
					columnValue = columnValue.trim();
					var addSymbol = "";
					var symbol = columnValue[columnValue.length - 1];
					if (symbol === ";") {
						addSymbol = " ";
					} else {
						addSymbol = "; ";
					}
					columnValue = columnValue + addSymbol;
				}
				Terrasoft.each(items, function(item) {
					var displayValue = item.displayValue;
					var idx = columnValue.indexOf(displayValue + ";");
					if (idx !== 0 && idx < 0) {
						columnValue += displayValue + "; ";
					}
				}, this);
				this.set(columnName, columnValue);
			},
			onLookupClickedHandler: function() {
				var lookup = this.getLookupConfig();
				lookup.config.actionsButtonVisible = false;
				LookupUtilities.Open(this.sandbox, lookup.config, lookup.callback, this, null, false, false);
			},
			
			getLookupConfig: function(columnName) {
				var scope = this;
				var callback = function(args) {
					scope.onLookupSelected(args);
				};
				return {
					config: {
						entitySchemaName: "ServiceItem",
						columnName: "multipleLookup",
						//columns: ["ContactId"],
						//filters: Terrasoft.createColumnIsNotNullFilter("ContactId"),
						multiSelect: true
					},
					callback: callback
				};
			}
		},
		diff: /**SCHEMA_DIFF*/[
				{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "Report",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
							"classes": {"textClass": "actions-button-margin-right"},
							"click": {"bindTo": "PrintReport"},
							"style": Terrasoft.controls.ButtonEnums.style.GREEN,
							"visible": true
						}
					},
					{
						"operation": "insert",
						"parentName": "LeftContainer",
						"propertyName": "items",
						"name": "INFCloseButton",
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"style": Terrasoft.controls.ButtonEnums.style.BLUE,
							"caption": {"bindTo": "Resources.Strings.CloseButtonCaption"},
							"classes": {"textClass": "actions-button-margin-right"},
							"click": {"bindTo": "onCloseClick"},
							"visible": true
						}
					},
					{
						"operation": "remove",
						"parentName": "ProcessActionButtons",
						"propertyName": "items",
						"index": 0,
						"name": "Button-be6148b819154a0791eaee8f1635d859",
						"alias": {
							"name": "SaveButton"
						},
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"id": "f073e66a-36ec-47d7-9c6a-e5952dbf05a3",
							"style": "green",
							"tag": "SaveData",
							"caption": {"bindTo": "getProcessActionButtonCaption"},
							"click": {"bindTo": "onProcessActionButtonClick"}
						}
					},
					{
						"operation": "remove",
						"parentName": "ProcessActionButtons",
						"propertyName": "items",
						"index": 1,
						"name": "Button-3a8ac667899d4aa68021a07eb1c7c49c",
						"alias": {
							"name": "CloseButton"
						},
						"values": {
							"itemType": Terrasoft.ViewItemType.BUTTON,
							"id": "c4841740-ff8c-406f-8626-1c78f78608bf",
							"style": "blue",
							"tag": "ClosePage",
							"caption": {"bindTo": "getProcessActionButtonCaption"},
							"click": {"bindTo": "onProcessActionButtonClick"},
							"visible": false
						}
					},
					{
						"operation": "remove",
						"parentName": "Tabs",
						"propertyName": "tabs",
						"name": "NewTab1",
						"values": {
							"caption": {"bindTo": "Resources.Strings.NewTab1Caption"},
							"items": []
						}
					},
					{
						"operation": "remove",
						"parentName": "NewTab1",
						"propertyName": "items",
						"name": "NewTab1Group1",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
							"caption": {"bindTo": "Resources.Strings.NewTab1Group1Caption"},
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "ReportParamsContainer",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": [],
							"markerValue": "ReportParamsContainer"
						}
					},
					{
						"operation": "insert",
						"name": "GetParamParam",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"values": {
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"name": "SxStartDate",
						"index": 6,
						"values": {
							"caption": {"bindTo": "Resources.Strings.StartDate"},
							"styles": {"width": "25%"},
							"isRequired": true
						}
					},
					{
						"operation": "insert",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"name": "SxDueDate",
						"index": 7,
						"values": {
							"caption": {"bindTo": "Resources.Strings.DueDate"},
							"styles": {"width": "25%"},
							"isRequired": true
						}
					},
					{
						"operation": "insert",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"name": "multipleLookup",
						"index": 9,
						"values": {
							"caption": "Множественный выбор",
							"bindTo": "multipleLookup",
							"controlConfig": {
								"className": "Terrasoft.TextEdit",
								"rightIconClasses": ["custom-right-item", "lookup-edit-right-icon"],
								"rightIconClick": {
									"bindTo": "onLookupClickedHandler"
								}
							}
						}
					},
					{
						"operation": "insert",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"name": "ServiceFilterEnabled",
						"index": 8,
						"values": {
							"caption": "Сгенерировать отчет по всем ИТ-услугам",
							"styles": {"width": "100%"}
						}
					},
					{
						"operation": "insert",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"name": "CategoryFilterEnabled",
						"index": 10,
						"values": {
							"caption": "Сгенерировать отчет по всем категориям обращений",
							"styles": {"width": "100%"}
						}
					},
					{
						"operation": "insert",
						"parentName": "ReportParamsContainer",
						"propertyName": "items",
						"name": "GroupfilterEnabled",
						"index": 11,
						"values": {
							"caption": "Сгенерировать отчет по всем группам исполнителей",
							"styles": {"width": "100%"}
						}
					}
				],/**SCHEMA_DIFF*/
				rules: {}
			};
});
