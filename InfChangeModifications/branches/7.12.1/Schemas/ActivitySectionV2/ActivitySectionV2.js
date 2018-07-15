define("ActivitySectionV2", ["ConfigurationConstants"], function(ConfigurationConstants) {
	return {
		entitySchemaName: "Activity",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			initEditPages: function() {
				var enabledEditPages = new this.Terrasoft.Collection();
				this.callParent(arguments);
				var editPages = this.get("EditPages");
				this.Terrasoft.each(editPages.getItems(), function(item) {
					if (item.get("Id") !== ConfigurationConstants.Activity.Type.Email &&
						item.get("Id") !== ConfigurationConstants.Activity.Type.Call &&
						item.get("Caption") === "Задача") {
						enabledEditPages.add(item);
					}
				});
				this.set("EnabledEditPages", enabledEditPages);
			}
		},
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
	};
});
