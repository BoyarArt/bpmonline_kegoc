define("ChangePortalPage", ["BaseFiltersGenerateModule", "ServiceDeskConstants", "ConfigurationConstants",
	"ChangePortalPageResources"],
	function(BaseFiltersGenerateModule, ServiceDeskConstants, ConfigurationConstants) {
		return {
			entitySchemaName: "Change",
			details: /**SCHEMA_DETAILS*/{
				"VisaDetailV215bfeb8e": {
					"schemaName": "VisaDetailV2",
					"entitySchemaName": "ChangeVisa",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Change"
					}
				}
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"parentName": "Header",
					"propertyName": "items",
					"name": "Name",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 16
						},
						"bindTo": "Name",
						"caption": "Тема",
						"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "Number",
					"values": {
						"layout": {
							"column": 16,
							"row": 0,
							"colSpan": 8,
							"rowSpan": 1
						},
						"bindTo": "Number",
						"caption": "Номер",
						"contentType": this.Terrasoft.ContentType.SHORT_TEXT,
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 1
				},
				{
					"operation": "insert",
					"name": "Description",
					"values": {
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24,
							"rowSpan": 1
						},
						"bindTo": "Description",
						"caption": "Описание",
						"contentType": this.Terrasoft.ContentType.LONG_TEXT,
						"labelConfig": {
							"visible": true
						},
						"enabled": false
					},
					"parentName": "Header",
					"propertyName": "items",
					"index": 2
				},
				{
					"operation": "insert",
					"name": "Tabc4028671TabLabel",
					"values": {
						"caption": "Визы",
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0
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
					"name": "ESNTab"
				},
				{
					"operation": "merge",
					"name": "DcmActionsDashboardContainer",
					"values": {
						"visible": false
					}
				}
			]/**SCHEMA_DIFF*/,
			attributes: {},
			methods: {
				onEntityInitialized: function() {
					this.callParent(arguments);
					document.thisChangeScope = this;
				}
			},
			rules: {},
			userCode: {}
		};
	}
);