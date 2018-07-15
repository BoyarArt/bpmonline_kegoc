define("InfActivityPage", ["InfActivityPageResources"],
	function() {
		return {
			entitySchemaName: "Activity",
			details: /**SCHEMA_DETAILS*/{
				/*"VisaDetailV215bfeb8e": {
					"schemaName": "VisaDetailV2",
					"entitySchemaName": "ChangeVisa",
					"filter": {
						"masterColumn": "Id",
						"detailColumn": "Change"
					}
				}*/
			}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
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
				},
				{
					"operation": "insert",
					"name": "Tabc4028671TabLabel",
					"values": {
						"caption": "Зависимые активности",
						"items": []
					},
					"parentName": "Tabs",
					"propertyName": "tabs",
					"index": 0
				},
				{
					"operation": "remove",
					"name": "ESNTab"
				}
			]/**SCHEMA_DIFF*/,
			attributes: {},
			methods: {},
			rules: {},
			userCode: {}
		};
	}
);