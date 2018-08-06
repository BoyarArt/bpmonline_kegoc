define("PortalCasePage", [
	"ModalBox", "FormatUtils", "PortalCasePageResources", "BusinessRuleModule",
	"ConfigurationEnums", "ServiceDeskConstants", "PortalMessageConstants", "TimezoneUtils",
	"RightUtilities", "CaseTermUtilities", "CaseMessageHistoryUtility", "CaseServiceUtility",
	"PortalCaseSectionActionsDashboard", "ESNHtmlEditModule", "css!CasesEstimateLabel", "css!PortalModulesCSS",
	"css!CasePageCSS, ServiceHelper"
],
function(ModalBox, FormatUtils, resources, BusinessRuleModule, Enums, Constant, portalMessageConstants,
		TimezoneUtils, RightUtilities, ServiceHelper) {
	return {
		messages: {},
		entitySchemaName: "Case",
		mixins: {},
		attributes: {
			"isSaveButtonVisible": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
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
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"BusinessService": {
				"a1809055-5d80-47c8-9853-dde568e77afb": {
					"uId": "a1809055-5d80-47c8-9853-dde568e77afb",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 1,
								"attribute": "Operation"
							},
							"rightExpression": {
								"type": 0,
								"value": "edit",
								"dataValueType": 1
							}
						}
					]
				}
			},
			"Subject": {
				"a1809055-5d80-47c8-9853-dde568e72afb": {
					"uId": "a1809055-5d80-47c8-9853-dde568e72afb",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 1,
								"attribute": "Operation"
							},
							"rightExpression": {
								"type": 0,
								"value": "edit",
								"dataValueType": 1
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "BusinessService",
				"values": {
					"bindTo": "BusinessService",
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"contentType": 3
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "ServiceItem",
				"values": {
					"contentType": 5,
					"enabled": true
				}
			},
			{
				"operation": "insert",
				"name": "Subjectca331dfa-51eb-46be-b639-fc272cef80a0",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Subject",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
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
				"operation": "remove",
				"name": "SaveButton"
			},
			{
				"operation": "insert",
				"parentName": "LeftContainer",
				"propertyName": "items",
				"name": "SaveButtonINF",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.SaveButtonCaption"},
					"classes": {"textClass": "actions-button-margin-right"},
					"click": {"bindTo": "save"},
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"visible": {"bindTo": "isSaveButtonVisible"},
					"tag": "save",
					"markerValue": "SaveButton"
				}
			},
			{
				"operation": "remove",
				"name": "ComplainButton"
			},
			{
				"operation": "remove",
				"name": "ServicePact"
			},
			{
				"operation": "remove",
				"name": "ResponseContainer"
			},
			{
				"operation": "remove",
				"name": "ResponseGridLayout"
			},
			{
				"operation": "remove",
				"name": "ResponseDateProfile"
			},
			{
				"operation": "remove",
				"name": "ResponseCaptionProfile"
			},
			{
				"operation": "remove",
				"name": "ResponseCaptionValueMinutesProfile"
			},
			{
				"operation": "remove",
				"name": "ResponseCaptionValueMinutesDelimiterProfile"
			},
			{
				"operation": "remove",
				"name": "ResponseCaptionValueProfile"
			},
			{
				"operation": "remove",
				"name": "SolutionContainer"
			},
			{
				"operation": "remove",
				"name": "SolutionGridLayout"
			},
			{
				"operation": "remove",
				"name": "SolutionDateProfile"
			},
			{
				"operation": "remove",
				"name": "SolutionCaptionProfile"
			},
			{
				"operation": "remove",
				"name": "SolutionCaptionValueMinutesProfile"
			},
			{
				"operation": "remove",
				"name": "SolutionCaptionValueMinutesDelimiterProfile"
			},
			{
				"operation": "remove",
				"name": "SolutionCaptionValueProfile"
			},
			{
				"operation": "remove",
				"name": "ConfItem"
			},
			{
				"operation": "move",
				"name": "CaseCategory",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			getActions: function() {
				var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
				return actionMenuItems;
			},
			CleanItService: function() {
				this.set("ServiceItem", Terrasoft.GUID_EMPTY);
			},
			setSubject: function() {
				return true;
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.scope = this;
				if (this.get("Status").displayValue === "Выполнено") {
					this.set("isSaveButtonVisible", true);
				}
				if (this.isAddMode()) {
					var cat = {
						displayValue: "Запрос на обслуживание",
						primaryImageValue: "",
						value: "1c0bc159-150a-e111-a31b-00155d04c01d"
					};
					this.set("Category", cat);
				}
			},
			save: function() {
				this.callParent(arguments);
				if (this.get("Status").displayValue === "Выполнено") {
					this.set("isSaveButtonVisible", true);
				} else {
					this.set("isSaveButtonVisible", false);
				}
			},
			initActionButtonMenu: function() {
				this.publishPropertyValueToSection("IsCardInEditMode", this.isEditMode());
				var actionMenuItems = this.getActions();
				this.set("ActionsButtonMenuItems", actionMenuItems);
				var actionsButtonVisible = false;
				this.set("ActionsButtonVisible", actionsButtonVisible);
				this.sandbox.publish("GetCardActions", actionMenuItems, [this.sandbox.id]);
			}
		},
		rules: {}
	};
});
