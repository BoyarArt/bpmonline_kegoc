define("ChangeSection", [], function() {
	return {
		entitySchemaName: "Change",
		messages: {
			"msgVisaMenuButtonClick": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			"getVisaGoal": function() {
				this.sandbox.publish("msgVisaMenuButtonClick", null, ["ChangeVisaSandbox"]);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});
