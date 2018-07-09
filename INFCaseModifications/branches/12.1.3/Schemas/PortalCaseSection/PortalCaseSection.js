define("PortalCaseSection", [],
	function() {
		return {
			entitySchemaName: "Case",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "remove",
					"name": "ComplainButton",
					"parentName": "CombinedModeActionButtonsCardLeftContainer",
					"propertyName": "items"
				}
			]/**SCHEMA_DIFF*/,
			messages: {},
			attributes: {},
			methods: {}

		};
	});
