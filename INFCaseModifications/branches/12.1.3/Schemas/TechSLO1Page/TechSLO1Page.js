define("TechSLO1Page", [], function() {
	return {
		entitySchemaName: "TechSLO",
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
								this.get("ITService").value
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
				"name": "LOOKUPb2fabba9-8e93-44eb-a63b-4735402dad54",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "ITService",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "TechService88c85b7b-ee80-485e-9833-0b8644003983",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "TechService"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IncidentTimeUnitf98c49e7-e203-4a64-8f3b-352227064d30",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "IncidentTimeUnit"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "IncidentTimeValue50e85a79-50e3-4eb1-9ae0-7faceb056168",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "IncidentTimeValue"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ChangeTimeUnitc53f20fd-59c7-4d2b-b145-2f3ee46c62a0",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "ChangeTimeUnit"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "ChangeTimeValue216c9939-9a7d-4365-99ce-fec042dba32b",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "ChangeTimeValue"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "RequestTimeUnite698b24b-663a-4d7d-9abc-e7c51f7668c2",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "RequestTimeUnit"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "RequestTimeValue3c53caab-4c11-43ea-921f-4fb4fb5c6c7f",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "RequestTimeValue"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "ReactionTimeValue6080f745-850a-4170-bd30-f6a4ff975619",
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
			},
			{
				"operation": "insert",
				"name": "ReactionTimeUnit4e1ff4ef-50b4-4d26-bb22-f2321a7f47ce",
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
				"index": 9
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
