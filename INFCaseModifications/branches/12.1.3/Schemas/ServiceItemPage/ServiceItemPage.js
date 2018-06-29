define("ServiceItemPage", [], function() {
	return {
		entitySchemaName: "ServiceItem",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Calendar46ee865d-3943-490d-9615-98d0a63fc660",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "Calendar"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "remove",
				"name": "ReactionTimeUnit"
			},
			{
				"operation": "remove",
				"name": "ReactionTimeValue"
			},
			{
				"operation": "remove",
				"name": "SolutionTimeValue"
			},
			{
				"operation": "remove",
				"name": "SolutionTimeUnit"
			},
			{
				"operation": "remove",
				"name": "CaseCategory"
			},
			{
				"operation": "move",
				"name": "Status",
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Calendar": {
				"8ac14a18-a480-4139-87e9-7beee170a182": {
					"uId": "8ac14a18-a480-4139-87e9-7beee170a182",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Category"
							},
							"rightExpression": {
								"type": 0,
								"value": "d6e894fe-05df-49cd-a9bd-385be1d4d6fb",
								"dataValueType": 10
							}
						}
					]
				},
				"45893333-cf60-40e1-a9e3-313ccd3fd400": {
					"uId": "45893333-cf60-40e1-a9e3-313ccd3fd400",
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
								"attribute": "Category"
							},
							"rightExpression": {
								"type": 0,
								"value": "d6e894fe-05df-49cd-a9bd-385be1d4d6fb",
								"dataValueType": 10
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
