define("ActivityPageV2", [], function() {
	return {
		entitySchemaName: "Activity",
		details: /**SCHEMA_DETAILS*/{
			"InfPrevActivitiesDetail0d1b372e": {
				"schemaName": "InfPrevActivitiesDetail",
				"entitySchemaName": "InfPrevActivities",
				"filter": {
					"detailColumn": "Activity",
					"masterColumn": "Id"
				}
			},
			"InfNextActivitiesDetail7348693e": {
				"schemaName": "InfNextActivitiesDetail",
				"entitySchemaName": "InfNextActivities",
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
				"operation": "merge",
				"name": "StartDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				}
			},
			{
				"operation": "move",
				"name": "Owner",
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "DueDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "Author",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "Status",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					}
				}
			},
			{
				"operation": "move",
				"name": "Status",
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "merge",
				"name": "Priority",
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
				"operation": "move",
				"name": "Priority",
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "merge",
				"name": "ShowInScheduler",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				}
			},
			{
				"operation": "move",
				"name": "ShowInScheduler",
				"parentName": "Header",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "merge",
				"name": "ActivityCategory",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4
					}
				}
			},
			{
				"operation": "merge",
				"name": "CallDirection",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5
					}
				}
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup81558048",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup81558048GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout58e745d7",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup81558048",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Descriptionb66135df-45b3-4559-88fc-3d0995c9c77e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout58e745d7"
					},
					"bindTo": "Description",
					"labelConfig": {
						"visible": false
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "GeneralInfoTabGridLayout58e745d7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "CustomActionSelectedResultControlGroup",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Result",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "RemindToOwner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.RemindToOwnerLabelCaption"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "RemindToOwnerDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.RemindToOwnerDateLabelCaption"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "RemindToAuthor",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.RemindToAuthorLabelCaption"
						}
					}
				}
			},
			{
				"operation": "merge",
				"name": "RemindToAuthorDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.RemindToAuthorDateLabelCaption"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "Tabde91601eTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabde91601eTabLabelTabCaption"
					},
					"items": []
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "InfPrevActivitiesDetail0d1b372e",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabde91601eTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "InfNextActivitiesDetail7348693e",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabde91601eTabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "move",
				"name": "InformationOnStepButtonContainer",
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "ChangesHistoryTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 7
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onEntityInitialized: function() {
				this.callParent(arguments);
				document.thisActivityPage = this;
			}
		},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
