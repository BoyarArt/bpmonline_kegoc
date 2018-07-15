define("ClientUnit1", [], function() {
	return {
		entitySchemaName: "",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Button-3a8ac667899d4aa68021a07eb1c7c49c",
				"values": {
					"enabled": true
				}
			},
			{
				"operation": "insert",
				"name": "STRING14be36d9-0873-43cd-855b-36a69995359e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "ActivityTitle",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRINGbbda8015-8c01-4b57-8837-10874c510db4",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "ActivityDescription",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DATE27480b55-f144-48a1-b418-4000ed33eaa6",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "ActivityStartDate",
					"dataValueType": 7,
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "DATEa512a725-ad64-4944-90fd-77a145a1cbca",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "ActivityDueDate",
					"dataValueType": 7,
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUP301cfef9-9a84-4c84-8029-bfdc0daa79e7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "ActivityOwner",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "PrevActivity",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "PrevActivity",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "LOOKUPa9f1d655-ec94-474c-a9ce-4fd1fb3d3bf3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "ActivityFlowType",
					"enabled": true,
					"visible": false,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "INTEGER46bd7417-5805-45cb-95ca-9de246508895",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "StageNumber",
					"visible": false,
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "LOOKUP9a066dd2-c32a-485d-9189-cfa611954052",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "Change",
					"enabled": false,
					"visible": false,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 8
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.thisPageScope = this;
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"PrevActivity": {
				"b151a53f-87e5-4720-97f6-75fd633877b8": {
					"uId": "b151a53f-87e5-4720-97f6-75fd633877b8",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 5,
								"attribute": "ActivityFlowType"
							},
							"rightExpression": {
								"type": 0,
								"value": "8df91c28-8050-4a2a-aee3-6826c53fef6f",
								"dataValueType": 10
							}
						}
					]
				},
				"f109b9fa-683a-490e-80d9-634a783f8c32": {
					"uId": "f109b9fa-683a-490e-80d9-634a783f8c32",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Change",
					"comparisonType": 3,
					"type": 5,
					"attribute": "Change"
				},
				"90d8eb2f-d4f8-4ce4-8936-19381eded99f": {
					"uId": "90d8eb2f-d4f8-4ce4-8936-19381eded99f",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "StageNumber",
					"comparisonType": 3,
					"type": 5,
					"attribute": "StageNumber"
				},
				"89b93416-0d48-458d-b8ba-b8089e7bd2da": {
					"uId": "89b93416-0d48-458d-b8ba-b8089e7bd2da",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 5,
								"attribute": "ActivityFlowType"
							},
							"rightExpression": {
								"type": 0,
								"value": "8df91c28-8050-4a2a-aee3-6826c53fef6f",
								"dataValueType": 10
							}
						}
					]
				},
				"02d3e441-9ce0-4fa0-b5fd-0424e670c8af": {
					"uId": "02d3e441-9ce0-4fa0-b5fd-0424e670c8af",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 5,
								"attribute": "StageNumber"
							},
							"rightExpression": {
								"type": 0,
								"value": 0,
								"dataValueType": 4
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
