define("Schema1Detail", [], function() {
	return {
		entitySchemaName: "INFDtlStopAttempt",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "AddRecordButton",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"enabled": false,
					"visible": false
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			getCopyRecordMenuItem: function() {
				return false;
			},
			getEditRecordMenuItem: function() {
				return false;
			},
			getDeleteRecordMenuItem: function() {
				return false;
			}
		}
	};
});
