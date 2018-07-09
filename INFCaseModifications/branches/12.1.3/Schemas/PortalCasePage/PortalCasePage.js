define("PortalCasePage", [
	"ModalBox", "FormatUtils", "PortalCasePageResources", "BusinessRuleModule",
	"ConfigurationEnums", "ServiceDeskConstants", "PortalMessageConstants", "TimezoneUtils",
	"RightUtilities", "CaseTermUtilities", "CaseMessageHistoryUtility", "CaseServiceUtility",
	"PortalCaseSectionActionsDashboard", "ESNHtmlEditModule", "css!CasesEstimateLabel", "css!PortalModulesCSS",
	"css!CasePageCSS"
],
		function(ModalBox, FormatUtils, resources, BusinessRuleModule, Enums, Constant, portalMessageConstants,
				TimezoneUtils, RightUtilities) {
			return {
				messages: {},
				entitySchemaName: "Case",
				mixins: {},
				attributes: {
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
					}
				},
				details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "remove",
						"name": "ComplainButton",
						"parentName": "LeftContainer",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "ResponseContainer",
						"parentName": "ProfileContainer",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "ResponseGridLayout",
						"parentName": "ResponseContainer",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "ResponseDateProfile",
						"parentName": "ResponseGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "SolutionContainer",
						"parentName": "ProfileContainer",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "SolutionGridLayout",
						"parentName": "SolutionContainer",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "SolutionDateProfile",
						"parentName": "SolutionGridLayout",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "ConfItem",
						"parentName": "ProfileContainer",
						"propertyName": "items"
					},
					{
						"operation": "remove",
						"name": "ServicePact",
						"parentName": "ProfileContainer",
						"propertyName": "items"
					},
					{
						"operation": "insert",
						"name": "BusinessService",
						"values": {
							"bindTo": "BusinessService",
							"layout": {
								"column": 0,
								"row": 3,
								"colSpan": 24,
								"rowSpan": 1
							},
							"contentType": this.Terrasoft.ContentType.ENUM
						},
						"parentName": "ProfileContainer",
						"propertyName": "items",
						"index": 0
					}
				]/**SCHEMA_DIFF*/,
				modules: {},
				methods: {
					getActions: function() {
						var actionMenuItems = this.Ext.create("Terrasoft.BaseViewModelCollection");
						return actionMenuItems;
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
