define("Activity1Page", [], function() {
	return {
		entitySchemaName: "Activity",
		details: /**SCHEMA_DETAILS*/{
			"InfPrevActivitiesDetailb9bc02de": {
				"schemaName": "InfPrevActivitiesDetail",
				"entitySchemaName": "InfPrevActivities",
				"filter": {
					"detailColumn": "Activity",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Title7fb19ab4-c55f-444e-a49a-407a682dbbd9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Title"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Owner48180673-6dc1-4245-92fa-31c1abcff7b7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Owner"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "StartDate7abab8e6-d7a0-4257-9346-5c701adaf00a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "StartDate"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "DueDateaf3b7524-09cf-418c-ad79-13911eef66a6",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "DueDate"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Description3f362e17-2088-4cdb-b10f-b2a7ea2a24b7",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "Description",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab65fcf59cTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab65fcf59cTabLabelTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InfPrevActivitiesDetailb9bc02de",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab65fcf59cTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "ChangesHistoryTab"
			},
			{
				"operation": "remove",
				"name": "SmrLoggingRecordDetailV2"
			},
			{
				"operation": "remove",
				"name": "ESNTab"
			},
			{
				"operation": "remove",
				"name": "ESNFeedContainer"
			},
			{
				"operation": "remove",
				"name": "ESNFeed"
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.thisActivityPage = this;
				
				this.set("Title", "");
				this.set("Type", {
					Name: "Задача",
					Id: "fbe0acdc-cfc0-df11-b00f-001d60e938c6",
					value: "fbe0acdc-cfc0-df11-b00f-001d60e938c6",
					displayValue: "Задача"
				});
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
