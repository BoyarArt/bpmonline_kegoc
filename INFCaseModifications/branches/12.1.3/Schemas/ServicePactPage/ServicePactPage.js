define("ServicePactPage", [], function() {
	return {
		entitySchemaName: "ServicePact",
		details: /**SCHEMA_DETAILS*/{
			"Schema3Detailcef2f8a8": {
				"schemaName": "Schema3Detail",
				"entitySchemaName": "INFslo",
				"filter": {
					"detailColumn": "ServicePact",
					"masterColumn": "Id"
				}
			},
			"Schema4Detaild775a561": {
				"schemaName": "Schema4Detail",
				"entitySchemaName": "TechSLO",
				"filter": {
					"detailColumn": "ServicePact",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "EndDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3
					}
				}
			},
			{
				"operation": "insert",
				"name": "Schema3Detailcef2f8a8",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Schema4Detaild775a561",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "remove",
				"name": "Calendar"
			},
			{
				"operation": "remove",
				"name": "SupportLevel"
			},
			{
				"operation": "move",
				"name": "StartDate",
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "move",
				"name": "Owner",
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "move",
				"name": "Status",
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "move",
				"name": "Number",
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "move",
				"name": "Type",
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "move",
				"name": "Name",
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
