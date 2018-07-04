define("INFslo1Page", [], function() {
	return {
		entitySchemaName: "INFslo",
		attributes: {
			"ServiceIds": {
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"dataValueType": this.Terrasoft.DataValueType.CUSTOM_OBJECT
			},
			"ITService": {
				lookupListConfig: {
					filter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
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
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ITServiceec501121-4219-425e-9057-202ea39fef2a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "ITService"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SolutionTimeUnitb6751288-61a0-4553-8d0a-5e6f619c2dcd",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "IncidentTimeUnit",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SolutionTimeValue79bce241-7f50-412d-ae90-e92c8d49d4bc",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "IncidentTimeValue",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUPc310b0db-b62e-441e-826c-91cc3c32177e",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "ChangeTimeUnit",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "INTEGERcb9ebd14-ebf6-4fd3-b9c6-7e862f951822",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "ChangeTimeValue",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "LOOKUP656cffc6-093f-4659-bf65-cceb4d65877a",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "RequestTimeUnit",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "INTEGERa5ea44b6-5039-48c0-b32b-098bfb335b97",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "RequestTimeValue",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "ReactionTimeUnit692e3c1e-6502-4fbc-9da3-82dc06346521",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "ReactionTimeUnit"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "ReactionTimeValuecd45b6e6-2728-48ad-be7b-8cdd52160c88",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "ReactionTimeValue"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 8
			}
		]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"IncidentTimeUnit": {
				"b2c1357f-6899-47f3-a000-fbcf82079d73": {
					"uId": "b2c1357f-6899-47f3-a000-fbcf82079d73",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Code",
					"comparisonType": 7,
					"type": 0,
					"value": "Working",
					"dataValueType": 1
				}
			},
			"RequestTimeUnit": {
				"b2c1357f-6899-47f3-a000-fbcf82079d73": {
					"uId": "b2c1357f-6899-47f3-a000-fbcf82079d73",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Code",
					"comparisonType": 7,
					"type": 0,
					"value": "Working",
					"dataValueType": 1
				}
			},
			"ChangeTimeUnit": {
				"b2c1357f-6899-47f3-a000-fbcf82079d73": {
					"uId": "b2c1357f-6899-47f3-a000-fbcf82079d73",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Code",
					"comparisonType": 7,
					"type": 0,
					"value": "Working",
					"dataValueType": 1
				}
			},
			"ReactionTimeUnit": {
				"b2c1357f-6899-47f3-a000-fbcf82079d73": {
					"uId": "b2c1357f-6899-47f3-a000-fbcf82079d73",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Code",
					"comparisonType": 7,
					"type": 0,
					"value": "Working",
					"dataValueType": 1
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
