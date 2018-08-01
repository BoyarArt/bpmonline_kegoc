define("CasePage", ["BusinessRuleModule", "ConfigurationConstants",
"ProcessModuleUtilities", "CaseServiceUtility", "ServiceHelper",
"CasesEstimateLabel", "ServiceDeskConstants", "CasePageResources"],
function(BusinessRuleModule, ConfigurationConstants, ProcessModuleUtilities,
CaseServiceUtility, ServiceHelper, CasesEstimateLabel, ServiceDeskConstants, resourses) {
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
			"isOwnerEnabled": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isOwnerToBeChanged": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": true
			},
			"isUserInGroup": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isUserInDefaultGroup": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"DefaultGroup": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isUserGroupSupervisor": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isGroupEnabled": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"isFieldsEnabled": {
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
			"CurrentGroup": {
				"dataValueType": Terrasoft.DataValueType.TEXT,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			"isDoButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false,
				"dependencies": [
					{
						"columns": ["Owner"],
						"methodName": "onOwnerChanged"
					}
				]
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
				}
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
						"methodName": "onStatusChangedHandler"
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
				},
				"dependencies": [
					{
						"columns": ["BusinessService"],
						"methodName": "BusinessServiceChanged"
					}
				]
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
				},
				"dependencies": [
					{
						"columns": ["ServiceItem"],
						"methodName": "CaseTermByITService"
					},
					{
						"columns": ["ServiceItem"],
						"methodName": "ServiceItemChanged"
					}
				]
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
				},
				"dependencies": [
					{
						"columns": ["TechService"],
						"methodName": "CaseTermByTechService"
					}
				]
			},
			"Group": {
				//columns: ["Group", "Id"],
				lookupListConfig: {
					filter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						if (this.get("ServiceItem") == null) {
							filterGroup.add(
							"GroupFilterByServiceItem",
							this.Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL,
							"Id",
							this.get("DefaultGroup").value
							)
							);
							return filterGroup;
						}
						filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.OR;
						filterGroup.add(
							"GroupFilterByServiceItem",
							this.Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL,
							"[ServiceEngineer:Engineer].ServiceItem",
							this.get("ServiceItem").value
							)
						);
						filterGroup.add(
							"GroupFilterByServiceItemDef",
							this.Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL,
							"Id",
							this.get("DefaultGroup").value
							)
						);
						return filterGroup;
					}
				},
				"dependencies": [
					{
						"columns": ["Group"],
						"methodName": "onGroupChanged"
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
			},
			"Schema1Detaild2262c3e": {
				"schemaName": "Schema1Detail",
				"entitySchemaName": "INFDtlStopAttempt",
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
				"name": "CaseContact",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 5
				}
			},
			{
				"operation": "merge",
				"name": "CaseAccount",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 5
				}
			},
			{
				"operation": "merge",
				"name": "ServicePact",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"contentType": 5,
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
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
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "CaseCategory",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					},
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "ServiceItem",
				"values": {
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 5
				}
			},
			{
				"operation": "move",
				"name": "ServiceItem",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
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
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "merge",
				"name": "ConfItem",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 8
					},
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 5
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
						"row": 9
					},
					"enabled": {
						"bindTo": "isGroupEnabled"
					},
					"contentType": 5
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
						"row": 10
					},
					"enabled": {
						"bindTo": "isOwnerEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "Subject",
				"values": {
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "Symptoms",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 1
					},
					"contentType": 0,
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "Origin",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				}
			},
			{
				"operation": "insert",
				"name": "StopReasonbd51fa91-2f06-4f2c-a942-1737216f63f2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "CaseInformation_gridLayout"
					},
					"bindTo": "StopReason",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "RenewalDatec1ce9d97-7a18-446d-9e94-3e86289217e2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "CaseInformation_gridLayout"
					},
					"bindTo": "RenewalDate",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Comment9f698343-9f49-4d11-9b52-85c286dc8c47",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 5,
						"layoutName": "CaseInformation_gridLayout"
					},
					"bindTo": "Comment",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 0
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Schema1Detaild2262c3e",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "CaseInformationTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "CaseInformationTabGroup1d56a6e6",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.CaseInformationTabGroup1d56a6e6GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "CaseInformationTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CaseInformationTabGridLayout339197db",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "CaseInformationTabGroup1d56a6e6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ClosureCode416279a1-2eba-491c-ae46-e03d7f36f243",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "CaseInformationTabGridLayout339197db"
					},
					"bindTo": "ClosureCode",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				},
				"parentName": "CaseInformationTabGridLayout339197db",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Solution92d5230a-45f5-4fbd-8a08-409727e428dc",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 1,
						"layoutName": "CaseInformationTabGridLayout339197db"
					},
					"bindTo": "Solution",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 0
				},
				"parentName": "CaseInformationTabGridLayout339197db",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "ResponseDate",
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
				"name": "ResponseDate",
				"parentName": "TermsControlGroup_GridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ResponseCaptionContainer",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 4,
						"row": 1
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
						"row": 1
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
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Change",
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
				"name": "Change",
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ProcessingTabGroup1c74fb7a",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.ProcessingTabGroup1c74fb7aGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "ProcessingTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ProcessingTabGridLayout0e8e16f6",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "ProcessingTabGroup1c74fb7a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SatisfactionLevel6480f52e-c450-4959-b85a-49343d8ea18f",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProcessingTabGridLayout0e8e16f6"
					},
					"bindTo": "SatisfactionLevel",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					}
				},
				"parentName": "ProcessingTabGridLayout0e8e16f6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SatisfactionLevelCommenta9d7e36a-c52d-4b70-a678-7e671de1d9c8",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 1,
						"layoutName": "ProcessingTabGridLayout0e8e16f6"
					},
					"bindTo": "SatisfactionLevelComment",
					"enabled": {
						"bindTo": "isFieldsEnabled"
					},
					"contentType": 0
				},
				"parentName": "ProcessingTabGridLayout0e8e16f6",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabca6a6731TabLabelTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabelGroup8b8f2b96",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabca6a6731TabLabelGroup8b8f2b96GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tabca6a6731TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabelGridLayout725faa65",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tabca6a6731TabLabelGroup8b8f2b96",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CreatedOn8692bfb8-f121-4ec9-87cf-2afdc95d8708",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "CreatedOn",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FirstSolutionProvidedOn4806c57b-2be2-447c-bd56-0f6cef8cf399",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "FirstSolutionProvidedOn",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "INFPauseTime65b5500f-7f01-4a66-a8e6-ae9c4ada0b25",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "INFPauseTime",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "INFPauseTimeOut1bcfad16-e9b6-4a2b-8f12-49387f43060a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "INFPauseTimeOut",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "INFLastTimeInGroup11701ac3-5844-4e72-ad9b-e5b832f6acf3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "INFLastTimeInGroup",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "INFReopened70c04490-c451-4398-b5c6-8c147185a852",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "INFReopened",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "ResponseDate3ff9d21d-f096-45fb-b1ef-a84d775c076a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "ResponseDate",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "SolutionDate60b9d4de-5353-4568-9496-aeb0fc28de5e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "SolutionDate",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "RespondedOn5dcb6ba1-4c6a-45ca-8255-679834140297",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "RespondedOn",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "SolutionProvidedOn92e306e7-341a-4984-af70-fe16f3bd77b2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "SolutionProvidedOn",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "ClosureDate6ff346de-86ca-4a5e-b320-76ea7b83f457",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "ClosureDate",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "ArchiveDate652ccbdc-dcbc-48ab-85ef-3a15713d72cd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 6,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "ArchiveDate",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "ResponseOverdue8e677a8d-5eb0-4b84-a3fd-7175bd87e866",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 8,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "ResponseOverdue",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "SolutionOverdue8d1ada3f-9226-464b-b2ea-16548592616c",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 8,
						"layoutName": "Tabca6a6731TabLabelGridLayout725faa65"
					},
					"bindTo": "SolutionOverdue",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout725faa65",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabelGroup4f370306",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabca6a6731TabLabelGroup4f370306GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tabca6a6731TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabelGridLayoutf36769d7",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tabca6a6731TabLabelGroup4f370306",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INFTimeBeforeWorkd73334b4-ba3c-48e9-974e-2a1aeccaf81b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tabca6a6731TabLabelGridLayoutf36769d7"
					},
					"bindTo": "INFTimeBeforeWork",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayoutf36769d7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INFTimeInLife85be6150-a7da-46bd-bf84-f07bc12ab7c5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Tabca6a6731TabLabelGridLayoutf36769d7"
					},
					"bindTo": "INFTimeInLife",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayoutf36769d7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "INFTimeBeforeLastWork8885dcc2-27d4-4502-9275-7d5a8ec8dfe8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tabca6a6731TabLabelGridLayoutf36769d7"
					},
					"bindTo": "INFTimeBeforeLastWork",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayoutf36769d7",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "TimeInLifeWithoutPausef5c61e30-8c00-44a0-a52c-acdce18b0981",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Tabca6a6731TabLabelGridLayoutf36769d7"
					},
					"bindTo": "TimeInLifeWithoutPause",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayoutf36769d7",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "INFPause05a3e2c0-db91-4857-b13e-0820e21f1286",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tabca6a6731TabLabelGridLayoutf36769d7"
					},
					"bindTo": "INFPause",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayoutf36769d7",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabelGroup37a96e92",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabca6a6731TabLabelGroup37a96e92GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tabca6a6731TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tabca6a6731TabLabelGridLayout9a192682",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tabca6a6731TabLabelGroup37a96e92",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INFReGroup2c6463b8-efc0-4f6a-bbf0-36295f19c431",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tabca6a6731TabLabelGridLayout9a192682"
					},
					"bindTo": "INFReGroup",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout9a192682",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INFReResponcea9fe81c4-7e37-4ef7-bc72-68399a4ea596",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tabca6a6731TabLabelGridLayout9a192682"
					},
					"bindTo": "INFReResponce",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout9a192682",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "INFReInit318786f1-0511-4226-9940-a2b6f9c04b93",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tabca6a6731TabLabelGridLayout9a192682"
					},
					"bindTo": "INFReInit",
					"enabled": false
				},
				"parentName": "Tabca6a6731TabLabelGridLayout9a192682",
				"propertyName": "items",
				"index": 2
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
				"operation": "remove",
				"name": "ClosureCode"
			},
			{
				"operation": "remove",
				"name": "SolutionFieldContainer"
			},
			{
				"operation": "remove",
				"name": "SolutionFieldLabel_wrap"
			},
			{
				"operation": "remove",
				"name": "SolutionLabelValue"
			},
			{
				"operation": "remove",
				"name": "SolutionFieldControl_wrap"
			},
			{
				"operation": "remove",
				"name": "Solution"
			},
			{
				"operation": "remove",
				"name": "SolvedOnSupportLevel"
			},
			{
				"operation": "remove",
				"name": "FeedbackControlGroup"
			},
			{
				"operation": "remove",
				"name": "FeedbackControlGroup_GridLayout"
			},
			{
				"operation": "remove",
				"name": "SatisfactionLevel"
			},
			{
				"operation": "remove",
				"name": "SatisfactionLevelComment"
			},
			{
				"operation": "remove",
				"name": "ProblemInCase"
			},
			{
				"operation": "remove",
				"name": "KnowledgeBaseCase"
			},
			{
				"operation": "remove",
				"name": "DeclarerCommentsDetail"
			},
			{
				"operation": "remove",
				"name": "SupportLevel"
			},
			{
				"operation": "remove",
				"name": "RegisteredOn"
			},
			{
				"operation": "remove",
				"name": "RespondedOn"
			},
			{
				"operation": "remove",
				"name": "FirstSolutionProvidedOn"
			},
			{
				"operation": "remove",
				"name": "SolutionProvidedOn"
			},
			{
				"operation": "remove",
				"name": "ClosureDate"
			},
			{
				"operation": "remove",
				"name": "ConfItemInCase"
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
				"operation": "remove",
				"name": "Calls"
			},
			{
				"operation": "remove",
				"name": "CaseLifecycle"
			},
			{
				"operation": "remove",
				"name": "TimelineTab"
			},
			{
				"operation": "remove",
				"name": "TimelineTabContainer"
			},
			{
				"operation": "remove",
				"name": "Timeline"
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
				"name": "ProcessingTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 3
			},
			{
				"operation": "move",
				"name": "CaseInformationTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			getActions: function() {
				var menuItems = this.callParent(arguments);
				var newMenuItems = menuItems.filterByFn(function(item, key) {
					if (item.values.Tag === "runEscalation" ||
					item.values.Tag === "runReclassification" ||
					item.values.Tag === "runSearchForSimilarCases" ||
					item.values.Tag === "editRights") {
						return false;
					} else {
						return true;
					}
				});
				return newMenuItems;
			},
			getDefaultGroup: function() {
				this.Terrasoft.SysSettings.querySysSettingsItem("DefaultGroup",
				function(value) {
					this.set("DefaultGroup", value);
					this.isUserInDefaultGroup();
				}, this);
			},
			onGroupChanged: function() {
				if (this.get("CurrentGroup") !== this.get("Group").displayValue) {
					this.set("isOwnerToBeChanged", false);
					this.cleanOwner();
					this.isUserInGroup();
					var status = {
						IsFinal: false,
						IsPaused: false,
						IsResolved: false,
						displayValue: "Направлено в группу",
						primaryImageValue: "",
						value: "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38"
					};
					this.set("Status", status);
				}
			},
			BusinessServiceChanged: function() {
				this.set("ServiceItem", null);
			},
			ServiceItemChanged: function() {
				this.set("TechService", null);
			},
			isUserInDefaultGroup: function() {
				var currentUserId = Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value;
				var groupId;
				if (this.get("Group")) {
					groupId = this.get("DefaultGroup").value;
				} else {
					return false;
				}
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysAdminUnit"
				});
				esq.addColumn("[SysUserInRole:SysUser:Id].SysRole.Id", "RoleId");

				var f1 = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Contact.Id",
					currentUserId
				);
				
				esq.filters.addItem(f1);
				
				esq.getEntityCollection(function(result) {
					if (!result.success) {
						this.showInformationDialog("Ошибка запроса данных");
						return;
					}
					result.collection.each(function(item) {
						if (item.get("RoleId") === groupId) {
							this.set("isUserInDefaultGroup", true);
						}
					}.bind(this));
				}, this);
			},
			isUserInGroup: function() {
				var currentUserId = Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value;
				var groupId;
				if (this.get("Group")) {
					groupId = this.get("Group").value;
				} else {
					this.set("isUserInGroup", false);
					this.isUserGroupSupervisor();
					return false;
				}
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysAdminUnit"
				});
				esq.addColumn("[SysUserInRole:SysUser:Id].SysRole.Id", "RoleId");

				var f1 = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Contact.Id",
					currentUserId
				);
				
				esq.filters.addItem(f1);
				
				esq.getEntityCollection(function(result) {
					if (!result.success) {
						this.showInformationDialog("Ошибка запроса данных");
						return;
					}
					var values = [];
					result.collection.each(function(item) {
						values.push(item.get("RoleId"));
					});
					if (values.indexOf(groupId) !== -1) {
						this.set("isUserInGroup", true);
					} else {
						this.set("isUserInGroup", false);
					}
					this.isUserGroupSupervisor();
				}, this);
			},
			isUserGroupSupervisor: function() {
				var currentUserId = Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value;
				var groupId;
				if (this.get("Group")) {
					groupId = this.get("Group").value;
				} else {
					this.set("isUserGroupSupervisor", false);
					this.setButtonsVisible();
					this.setOwnerEnabled();
					return false;
				}
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "SysAdminUnit"
				});
				esq.addColumn("[SysAdminUnit:ParentRole:Id].[SysUserInRole:SysRole:Id]." +
				"[SysAdminUnit:Id:SysUser].Contact.Id", "ContactId");
				var f1 = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"Id",
					groupId
				);

				var f2 = esq.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					"[SysAdminUnit:ParentRole:Id].SysAdminUnitTypeValue",
					2
				);

				esq.filters.addItem(f1);
				esq.filters.addItem(f2);
				
				esq.getEntityCollection(function(result) {
					if (!result.success) {
						this.showInformationDialog("Ошибка запроса данных");
						return;
					}
					var values = [];
					result.collection.each(function(item) {
						values.push(item.get("ContactId"));
					});
					if (values.indexOf(currentUserId) !== -1) {
						this.set("isUserGroupSupervisor", true);
					} else {
						this.set("isUserGroupSupervisor", false);
					}
					this.setButtonsVisible();
					this.setOwnerEnabled();
				}, this);
			},
			setOwnerEnabled: function() {
				var currentState = this.get("Status").value;
				//Направлено в группу
				if (currentState === "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38" && this.get("isUserGroupSupervisor")) {
					this.set("isOwnerEnabled", true);
				//} else if (currentState === "7e9f1204-f46b-1410-fb9a-0050ba5d6c38" && this.get("isUserGroupSupervisor")) {
				//	this.set("isOwnerEnabled", true);
				} else {
					this.set("isOwnerEnabled", false);
				}
			},
			setGroupEnabled: function() {
				if (this.isAddMode() || this.isCopyMode()) {
					this.set("isGroupEnabled", true);
				} else {
					var currentState = this.get("Status").displayValue;
					var currentUser = this.get("Owner") ? this.get("Owner").value : null;
					if (currentState === "В работе" && (currentUser === Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value ||
					this.get("isUserGroupSupervisor"))) {
						this.set("isGroupEnabled", true);
					} else if (currentState === "Направлено в группу") {
						this.set("isGroupEnabled", false);
					} else {
						this.set("isGroupEnabled", false);
					}
				}
			},
			setFieldsEnabled: function() {
				if (this.isAddMode() || this.isCopyMode()) {
					this.set("isFieldsEnabled", true);
				} else {
					var currentState = this.get("Status").displayValue;
					if (currentState === "Выполнено" || currentState === "Закрыто") {
						this.set("isFieldsEnabled", false);
					} else {
						this.set("isFieldsEnabled", true);
					}
				}
			},
			onOwnerChanged: function() {
				this.setButtonsVisible();
			},
			onStatusChangedHandler: function() {
				//this.setGroupEnabled();
				this.setOwnerEnabled();
				var currentState = this.get("Status").displayValue;
				if (currentState === "В работе") {
					this.setCurrentUser();
				} else if (currentState === "Направлено в группу") {
					this.cleanOwner();
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
			CaseTermByITService: function() {
				if (this.get("ServiceItem") && this.get("Category") &&
				this.get("Category").displayValue !== "Запрос на изменение") {
					var dx = 0;
					ServiceHelper.callService({
						serviceName: "InfCaseTermCalculationService",
						methodName: "CalculateTerms",
						data: {
							ITServiceId: this.get("ServiceItem").value,
							GroupId: this.get("Group").value,
							dateInput: this.get("RegisteredOn"),
							timeinpause : this.get("INFPauseMin"),
							categoryname: this.get("Category").displayValue,
							indx: dx
							
						},
						callback: this.onRecalculateCaseTerms,
						scope: this
					});
				} else {
					this.set("ResponseDate", null);
					this.set("SolutionDate", null);
				}
			},
			
			CaseTermByTechService: function() {
				if (this.get("TechService") && this.get("Category") &&
				this.get("Category").displayValue !== "Запрос на изменение") {
					var dx = 1;
					ServiceHelper.callService({
						serviceName: "InfCaseTermCalculationService",
						methodName: "CalculateTerms",
						data: {
							ITServiceId: this.get("TechService").value,
							GroupId: this.get("Group").value,
							dateInput: this.get("RegisteredOn"),
							timeinpause : this.get("INFPauseMin"),
							categoryname: this.get("Category").displayValue,
							indx: dx
							
						},
						callback: this.onRecalculateCaseTerms,
						scope: this
					});
				} else {
					this.CaseTermByITService();
				}
			},
			
			onRecalculateCaseTerms: function(response) {
					var result = this.Terrasoft.decode(response.CalculateTermsResult);
					var reactionTime = result.ReactionTime ? this.Terrasoft.parseDate(result.ReactionTime) : null;
					var solutionTime = result.SolutionTime ? this.Terrasoft.parseDate(result.SolutionTime) : null;
					this.setCalculatedResponseDate(reactionTime);
					this.setCalculatedSolutionDate(solutionTime);
				},
			
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.scope = this;
				this.isUserInGroup();
				this.getDefaultGroup();
				this.setGroupEnabled();
				this.setFieldsEnabled();
				this.set("CurrentGroup", this.get("Group").displayValue);
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
				if (!this.get("isOwnerToBeChanged")) {
					return;
				}
				var currentState = this.get("Status").value;
				var visibleButtons = {};
				var isDoButtonVisible;
				var isAppointToGroupButtonVisible;
				var isStopButtonVisible;
				var isToWorkButtonVisible;
				//Направлено в группу
				if (currentState === "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38") {
					isToWorkButtonVisible = this.get("isUserInGroup");
					visibleButtons = {
						"isToWorkButtonVisible": isToWorkButtonVisible,
						"isStopButtonVisible": false,
						"isAppointToGroupButtonVisible": false,
						"isDoButtonVisible": false,
						"isCloseButtonVisible": false
					};
				//В работе
				} else if (currentState === "7e9f1204-f46b-1410-fb9a-0050ba5d6c38") {
					isDoButtonVisible = false;
					isAppointToGroupButtonVisible = false;
					isStopButtonVisible = false;
					if (this.get("Owner") && (this.get("Owner").value === Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value)) {
						isDoButtonVisible = true;
						isAppointToGroupButtonVisible = true;
						isStopButtonVisible = true;
					} else {
						isDoButtonVisible = false;
						isAppointToGroupButtonVisible = false;
						isStopButtonVisible = false;
					}//руководитель группы
					if (this.get("isUserGroupSupervisor")) {
						isAppointToGroupButtonVisible = true;
					}
					visibleButtons = {
						"isToWorkButtonVisible": false,
						"isStopButtonVisible": isStopButtonVisible,
						"isAppointToGroupButtonVisible": isAppointToGroupButtonVisible,
						"isDoButtonVisible": isDoButtonVisible,
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
					isToWorkButtonVisible = false;
					if (this.get("Owner")) {
						if (this.get("Owner").value === Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value) {
							isToWorkButtonVisible = true;
						}
					}
					if (this.get("isUserGroupSupervisor") || this.get("isUserInDefaultGroup")) {
						isToWorkButtonVisible = true;
					}
					visibleButtons = {
						"isToWorkButtonVisible": isToWorkButtonVisible,
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
				if (this.get("Status").displayValue === "Приостановлено") {
					if (this.get("ServiceItem") && this.get("TechService")) {
						this.CaseTermByTechService();
					} else if (this.get("ServiceItem") && !this.get("TechService")) {
						this.CaseTermByITService();
					}
				}
				this.set("Status", status);
				this.setFieldsEnabled();
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
				if (this.get("ClosureCode") && this.get("Solution")) {
					this.setFieldsEnabled();
				}
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
				this.setGroupEnabled();
				this.set("isOwnerToBeChanged", true);
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
			},
			"Owner": {
				"1a832faa-e461-4984-b30a-9181a539bb18": {
					"uId": "1a832faa-e461-4984-b30a-9181a539bb18",
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
			},
			"Category": {
				"64ea9dd7-1296-4a0f-8a1d-7fb22b4478ae": {
					"uId": "64ea9dd7-1296-4a0f-8a1d-7fb22b4478ae",
					"enabled": true,
					"removed": true,
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
			"ClosureCode": {
				"7f63e2fb-b604-48e5-b8db-d604dace6cca": {
					"uId": "7f63e2fb-b604-48e5-b8db-d604dace6cca",
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
								"value": "1f3f61d6-ff88-423e-bcf8-31b3bee6426b",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"Solution": {
				"57d53b49-4b0f-4120-96a1-c08048a8174e": {
					"uId": "57d53b49-4b0f-4120-96a1-c08048a8174e",
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
								"value": "1f3f61d6-ff88-423e-bcf8-31b3bee6426b",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"ParentCase": {
				"ParentCaseRequired": {
					"uId": "47f09f56-3af4-45f7-8851-ad0a55588252",
					"enabled": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 0,
								"value": "7ce9843e-6855-4412-9282-ec55edf6d05b"
							},
							"rightExpression": {
								"type": 1,
								"attribute": "ClosureCode"
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
