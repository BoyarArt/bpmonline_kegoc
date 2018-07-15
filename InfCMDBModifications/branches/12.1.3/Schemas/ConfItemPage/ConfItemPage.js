define("ConfItemPage", ["BusinessRuleModule"], function(BusinessRuleModule) {
	return {
		entitySchemaName: "ConfItem",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Type",
				"values": {
					"enabled": true
				}
			},
			{
				"operation": "insert",
				"name": "LOOKUP3e7bca76-870b-4d4b-9a78-08e588f0007a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "ReasonForCI",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Name1884258b-c4f8-4928-92c8-cde57e7eb113",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "Name",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup165a4237",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup165a4237GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "ServerTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout0128acf6",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup165a4237",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerTyped3229d4f-0ddc-48f6-a974-22bfea89d99f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "ServerType"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerModel497205bf-0f0c-4871-ab05-684b0279c7b0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "ServerModel"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "TechOptionsad25ed2b-5f17-446a-a1a6-24be224bd98e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "TechOptions"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SerialNumber2a02eb32-1cea-4bd9-a86a-b55b65b40470",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "SerialNumber"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "DNSNamee452e7fb-63fd-4990-9b05-0c832d21a9b8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "DNSName",
					"enabled": true
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "IPAdress194ff949-598a-468c-a269-85c91030d382",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "IPAdress"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "ServerPurpose0a15477e-8c3b-4016-9469-650e1ca13aeb",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "ServerPurpose"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "OSb4939a2f-2a9f-4c1c-a565-91d0e3ac7ab3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "OS"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SupportContracta6f90760-9b36-49cb-a6a5-79262340fdd4",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "GeneralInfoTabGridLayout0128acf6"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout0128acf6",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroupf25ba2ee",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroupf25ba2eeGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "WorkstationTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout189953f7",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroupf25ba2ee",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerModel6f475a09-5cd1-4d3a-be05-2712c04917e7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout189953f7"
					},
					"bindTo": "ServerModel"
				},
				"parentName": "GeneralInfoTabGridLayout189953f7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DNSName8c48c086-6cad-4dde-9269-26a0d466c1be",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout189953f7"
					},
					"bindTo": "DNSName"
				},
				"parentName": "GeneralInfoTabGridLayout189953f7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OS54ec7b91-5f08-466c-bf8e-2cda88ce3292",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout189953f7"
					},
					"bindTo": "OS"
				},
				"parentName": "GeneralInfoTabGridLayout189953f7",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SupportContract5a25dd00-c501-4dae-8bcb-74899dda49f9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout189953f7"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout189953f7",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup51868380",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup51868380GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "SysDBTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout439e1e39",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup51868380",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerModel188d0c4d-edc8-4b54-81e4-276133f04a88",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout439e1e39"
					},
					"bindTo": "ServerModel"
				},
				"parentName": "GeneralInfoTabGridLayout439e1e39",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SerialNumber81843684-971e-45eb-b583-318deb9cf4e8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout439e1e39"
					},
					"bindTo": "SerialNumber"
				},
				"parentName": "GeneralInfoTabGridLayout439e1e39",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "IPAdress1d208944-30b3-45a1-9bd1-63748efbfa87",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout439e1e39"
					},
					"bindTo": "IPAdress"
				},
				"parentName": "GeneralInfoTabGridLayout439e1e39",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "HDDTAPE38997499-2ffa-465c-96f5-e8f4faf7c37d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout439e1e39"
					},
					"bindTo": "HDDTAPE"
				},
				"parentName": "GeneralInfoTabGridLayout439e1e39",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "HTCount424a9113-f7b7-4026-991f-fec42d9d67ef",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout439e1e39"
					},
					"bindTo": "HTCount"
				},
				"parentName": "GeneralInfoTabGridLayout439e1e39",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "SupportContract43928317-938a-41b1-9a3e-52b58a39c84a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout439e1e39"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout439e1e39",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup92d4448e",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup92d4448eGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "DeviceTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout596bd4eb",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup92d4448e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DeviceType2b92d5da-8bc9-4af7-b734-ccab52a23402",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout596bd4eb"
					},
					"bindTo": "DeviceType"
				},
				"parentName": "GeneralInfoTabGridLayout596bd4eb",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerModelb20ea269-f2dd-488c-8939-1dbd3e9a2a5a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout596bd4eb"
					},
					"bindTo": "ServerModel"
				},
				"parentName": "GeneralInfoTabGridLayout596bd4eb",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SerialNumber0d15a746-042f-40f6-9664-8257c9139f65",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout596bd4eb"
					},
					"bindTo": "SerialNumber"
				},
				"parentName": "GeneralInfoTabGridLayout596bd4eb",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SupportContract0e87d59b-e9e5-485b-a709-3df2e27d37f7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout596bd4eb"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout596bd4eb",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroupfd62cdb6",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroupfd62cdb6GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "SupContractTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout48486fef",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroupfd62cdb6",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContractTypee8c1322c-d4b3-4540-892b-f120d878748c",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout48486fef"
					},
					"bindTo": "ContractType"
				},
				"parentName": "GeneralInfoTabGridLayout48486fef",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Account2820ef94-7be3-4e02-aa95-270f919dfeba",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout48486fef"
					},
					"bindTo": "Account"
				},
				"parentName": "GeneralInfoTabGridLayout48486fef",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Supportd7f30ba1-8e72-47e4-be3d-cfe397915639",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout48486fef"
					},
					"bindTo": "Support"
				},
				"parentName": "GeneralInfoTabGridLayout48486fef",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Monitoring9364d32b-6a03-4bf1-89dd-b693b5676552",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout48486fef"
					},
					"bindTo": "Monitoring"
				},
				"parentName": "GeneralInfoTabGridLayout48486fef",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "SupportLevela83f9001-ff75-4119-8f6e-46719df27f8d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout48486fef"
					},
					"bindTo": "SupportLevel"
				},
				"parentName": "GeneralInfoTabGridLayout48486fef",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DueContractDateca585ee2-6a67-42d4-98ec-e4e7a8275afb",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout48486fef"
					},
					"bindTo": "DueContractDate"
				},
				"parentName": "GeneralInfoTabGridLayout48486fef",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup1869e7bc",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup1869e7bcGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "SystemTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout0a1da931",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup1869e7bc",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Subject81afb14c-8f1b-4250-97d3-84fb61668519",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout0a1da931"
					},
					"bindTo": "Subject"
				},
				"parentName": "GeneralInfoTabGridLayout0a1da931",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Componentse916f2f1-939d-4442-9792-0c32cb1a280f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout0a1da931"
					},
					"bindTo": "Components"
				},
				"parentName": "GeneralInfoTabGridLayout0a1da931",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup7ab87215",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup7ab87215GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "JobTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout359865ab",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup7ab87215",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Subject83d28a2f-28fd-4cbc-ad0c-c91099878409",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout359865ab"
					},
					"bindTo": "Subject"
				},
				"parentName": "GeneralInfoTabGridLayout359865ab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Componentsec4c8c65-6448-4ddd-a1de-187fc37d6b8b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout359865ab"
					},
					"bindTo": "Components"
				},
				"parentName": "GeneralInfoTabGridLayout359865ab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SLAParam33c80d20-9f7e-4fd4-9be3-29b0c698db50",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout359865ab"
					},
					"bindTo": "SLAParam"
				},
				"parentName": "GeneralInfoTabGridLayout359865ab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Account09e6a69e-2aae-42ae-b77d-4dc59369f6c9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout359865ab"
					},
					"bindTo": "Account"
				},
				"parentName": "GeneralInfoTabGridLayout359865ab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LastChangeDatecebc3f0c-193e-4e1d-9804-e24c8e3612bd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "GeneralInfoTabGridLayout359865ab"
					},
					"bindTo": "LastChangeDate"
				},
				"parentName": "GeneralInfoTabGridLayout359865ab",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup25cb4d27",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup25cb4d27GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "SoftwareTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout47d97ea1",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup25cb4d27",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Subjectba3990f9-b1d2-4552-8152-0199d2488a0a",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout47d97ea1"
					},
					"bindTo": "Subject"
				},
				"parentName": "GeneralInfoTabGridLayout47d97ea1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Manufacturerac340ace-04ac-45aa-9a8a-070edc78bd6e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout47d97ea1"
					},
					"bindTo": "Manufacturer"
				},
				"parentName": "GeneralInfoTabGridLayout47d97ea1",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SoftVersion0f35e978-efac-4782-a270-f5b33f4b9fb5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout47d97ea1"
					},
					"bindTo": "SoftVersion"
				},
				"parentName": "GeneralInfoTabGridLayout47d97ea1",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SupportContract842e84e1-7847-4c86-9d01-7cc285f661c6",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "GeneralInfoTabGridLayout47d97ea1"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout47d97ea1",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup832618bd",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup832618bdGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "LicenseTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout93a12626",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup832618bd",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SoftwareType20819114-2d21-4e29-b2e1-4097a52da742",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout93a12626"
					},
					"bindTo": "SoftwareType",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "GeneralInfoTabGridLayout93a12626",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "StartDate556613b1-c8b4-4d7d-84de-375c0592281b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout93a12626"
					},
					"bindTo": "StartDate"
				},
				"parentName": "GeneralInfoTabGridLayout93a12626",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DueDate498c046b-60d9-49c7-9650-78b5e5a89b6f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout93a12626"
					},
					"bindTo": "DueDate"
				},
				"parentName": "GeneralInfoTabGridLayout93a12626",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup6fbbb063",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup6fbbb063GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "LanTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout0112ac80",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup6fbbb063",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "EquipType18a1179f-3c8c-4ba3-ada9-099a241d37cf",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout0112ac80"
					},
					"bindTo": "EquipType"
				},
				"parentName": "GeneralInfoTabGridLayout0112ac80",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerModel3c5de94d-c4d1-458e-85a4-5596b80704c2",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout0112ac80"
					},
					"bindTo": "ServerModel"
				},
				"parentName": "GeneralInfoTabGridLayout0112ac80",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SerialNumber04056937-f00a-4120-89cb-aa03d89f955d",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout0112ac80"
					},
					"bindTo": "SerialNumber"
				},
				"parentName": "GeneralInfoTabGridLayout0112ac80",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "SupportContract0e6fff22-52a2-4233-b988-f1912c7f5073",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout0112ac80"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout0112ac80",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroupe099b61f",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroupe099b61fGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "EquipTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout1a682f55",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroupe099b61f",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerModeld2fd6799-87fc-4db3-847a-d890b91e3ce4",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout1a682f55"
					},
					"bindTo": "ServerModel"
				},
				"parentName": "GeneralInfoTabGridLayout1a682f55",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SerialNumber7d4e9159-49fc-4f94-8ed6-a33b36184113",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout1a682f55"
					},
					"bindTo": "SerialNumber"
				},
				"parentName": "GeneralInfoTabGridLayout1a682f55",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SupportContract9a48b645-0bd7-41cc-80c4-3e3bf8f94b7c",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout1a682f55"
					},
					"bindTo": "SupportContract"
				},
				"parentName": "GeneralInfoTabGridLayout1a682f55",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup082dd993",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup082dd993GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "ChanelTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayout2f8b7eb2",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup082dd993",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "FirstLocation7aae334f-6a19-4b70-a22d-fd4bdecc46f8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout2f8b7eb2"
					},
					"bindTo": "FirstLocation"
				},
				"parentName": "GeneralInfoTabGridLayout2f8b7eb2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SecondLocatione4032955-7145-413c-8c9c-6d63b2c0499e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "GeneralInfoTabGridLayout2f8b7eb2"
					},
					"bindTo": "SecondLocation"
				},
				"parentName": "GeneralInfoTabGridLayout2f8b7eb2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ChanelType0789eeff-9c05-404c-9d62-ee2a6b53b275",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout2f8b7eb2"
					},
					"bindTo": "ChanelType"
				},
				"parentName": "GeneralInfoTabGridLayout2f8b7eb2",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "ChanelOwner8d4d4cfb-eddb-48f5-ae55-e6ffd33ec295",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayout2f8b7eb2"
					},
					"bindTo": "ChanelOwner"
				},
				"parentName": "GeneralInfoTabGridLayout2f8b7eb2",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGroup851cbd86",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.GeneralInfoTabGroup851cbd86GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": [],
					"visible": {
						"bindTo": "WorkstationTabVisible"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "GeneralInfoTabGridLayoutd03a15bd",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "GeneralInfoTabGroup851cbd86",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ServerTypee4b7cdfa-7b9f-41b0-ba54-c593e2a9c879",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "GeneralInfoTabGridLayoutd03a15bd"
					},
					"bindTo": "ServerType"
				},
				"parentName": "GeneralInfoTabGridLayoutd03a15bd",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "SupportLevel490c9116-1289-4e83-a91a-a556c9dd6029",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "GeneralInfoTabGridLayoutd03a15bd"
					},
					"bindTo": "SupportLevel"
				},
				"parentName": "GeneralInfoTabGridLayoutd03a15bd",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "ServerTypee1520805-dd8c-4de5-840d-68b88f03864e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "GeneralInfoTabGridLayoutd03a15bd"
					},
					"bindTo": "ServerType"
				},
				"parentName": "GeneralInfoTabGridLayoutd03a15bd",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"enabled": true
				}
			},
			{
				"operation": "remove",
				"name": "Owner",
				"properties": [
					"labelConfig"
				]
			},
			{
				"operation": "move",
				"name": "Owner",
				"parentName": "ActualStatusGroup_GridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "remove",
				"name": "Model"
			},
			{
				"operation": "remove",
				"name": "SerialNumber"
			},
			{
				"operation": "remove",
				"name": "InventoryNumber"
			},
			{
				"operation": "remove",
				"name": "Name"
			},
			{
				"operation": "move",
				"name": "Category",
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "WarrantyUntil",
				"parentName": "ActualStatusGroup_GridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "move",
				"name": "ParentConfItem",
				"parentName": "ActualStatusGroup_GridLayout",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onStatusChanged: function() {
				this.callParent(arguments);
				if (!this.isAddMode() && !this.isCopyMode()) {
					this.save();
				}
			},
			disabledAllFieldsOfChangePage: function() {
				Ext.ComponentMgr.all.each(function(c) {
					var cmp = Ext.ComponentMgr.all.map[c];
					if (cmp.className) {
						if (cmp.className.indexOf("Edit") !== -1) {
							if (cmp.setEnabled) {
								cmp.setEnabled(false);
							}
						}
					}
				});
			},
			TypeChanged: function() {
				if (this.get("Type")) {
					var TypeName = this.get("Type").displayValue;
					switch (TypeName) {
						case "Сервер корпоративный":
						case "Сервер технологический":
							this.set("ServerTabVisible", true);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Рабочая станция":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", true);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Система хранения данных":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", true);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Периферия":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", true);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Контракт на поддержку":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", true);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Системное ПО":
						case "Прикладное ПО":
						case "Корпоративное ПО":
						case "Технологическое ПО":
						case "БД":
						case "Телеком ПО":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", true);
							this.set("ChanelTabVisible", false);
							break;
						case "Лицензии ПО":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", true);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Активное сетевое оборудование":
						case "Телекоммуникационное оборудование":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", true);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Кроссовое оборудование":
						case "СГП":
						case "Оборудование селекторной связи":
						case "Оборудование систем поисковой связи":
						case "Оборудование систем видеоконтроля":
						case "Оборудование СКУД":
						case "Оборудование арендованных каналов":
						case "Телефонные аппараты":
						case "АТС":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", true);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Каналы":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", true);
							break;
						case "Техническая услуга":
						case "Бизнес услуга":
						case "ИТ услуга":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", true);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						case "Система":
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", true);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
							break;
						default:
							this.set("ServerTabVisible", false);
							this.set("WorkstationTabVisible", false);
							this.set("SysDBTabVisible", false);
							this.set("DeviceTabVisible", false);
							this.set("SupContractTabVisible", false);
							this.set("SystemTabVisible", false);
							this.set("JobTabVisible", false);
							this.set("EquipTabVisible", false);
							this.set("LicenseTabVisible", false);
							this.set("LanTabVisible", false);
							this.set("SoftwareTabVisible", false);
							this.set("ChanelTabVisible", false);
					}
				} else {
					this.set("ServerTabVisible", false);
					this.set("WorkstationTabVisible", false);
					this.set("SysDBTabVisible", false);
					this.set("DeviceTabVisible", false);
					this.set("SupContractTabVisible", false);
					this.set("SystemTabVisible", false);
					this.set("JobTabVisible", false);
					this.set("EquipTabVisible", false);
					this.set("LicenseTabVisible", false);
					this.set("LanTabVisible", false);
					this.set("SoftwareTabVisible", false);
					this.set("ChanelTabVisible", false);
				}
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.TypeChanged();
				
				var status = this.get("Status");
				if (status !== undefined && status !== null) {
					if (status.hasOwnProperty("displayValue") === true) {
						if (status.displayValue === "Утилизирован") {
							setTimeout(this.disabledAllFieldsOfChangePage, 1000);
						}
					}
				}
			},
			onRender: function() {
				this.callParent(arguments);
				
				var status = this.get("Status");
				if (status !== undefined && status !== null) {
					if (status.hasOwnProperty("displayValue") === true) {
						if (status.displayValue === "Утилизирован") {
							setTimeout(this.disabledAllFieldsOfChangePage, 1000);
						}
					}
				}
			},
			onSaved: function() {
				this.callParent(arguments);
				
				var status = this.get("Status");
				if (status !== undefined && status !== null) {
					if (status.hasOwnProperty("displayValue") === true) {
						if (status.displayValue === "Утилизирован") {
							setTimeout(this.disabledAllFieldsOfChangePage, 1000);
						}
					}
				}
			}
		},
		rules: {},
		attributes: {
			"Type": {
				dependencies: [
					{
						columns: ["Type"],
						methodName: ["TypeChanged"]
					}
				]
			},
			"ServerTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"WorkstationTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"SysDBTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"DeviceTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"SupContractTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"SystemTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"JobTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"EquipTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"LicenseTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"LanTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"SoftwareTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"ChanelTabVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			}
		},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"ReasonForCI": {
				"5b8a7fe5-d019-4576-bb3b-d1792a5139db": {
					"uId": "5b8a7fe5-d019-4576-bb3b-d1792a5139db",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 1,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "cb23df7f-6b57-479b-b96b-5e4dd265904d",
								"dataValueType": 10
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "3b3fbda4-6382-428a-8949-694e04763bc5",
								"dataValueType": 10
							}
						}
					]
				},
				"fc6f5387-9fbc-47ca-b3fe-95f15ece2ba1": {
					"uId": "fc6f5387-9fbc-47ca-b3fe-95f15ece2ba1",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Status",
					"comparisonType": 3,
					"type": 1,
					"attribute": "Status"
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
