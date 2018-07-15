define("ActivityDetailV2", ["terrasoft", "ProcessModuleUtilities", "ConfigurationConstants"],
		function(Terrasoft, ProcessModuleUtilities, ConfigurationConstants) {
			return {
				entitySchemaName: "Activity",

				messages: {},
				attributes: {
				},
				methods: {

					/**
					 * @inheritdoc Terrasoft.ActivitySectionV2#getFilters
					 * @overridden
					 */
					/*getFilters: function() {
						var filters = this.callParent(arguments),
							activityTypes = ConfigurationConstants.Activity.Type;
						filters.add("NotEmailFilter", this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.NOT_EQUAL, "Type", activityTypes.Email));
						return filters;
					},*/

					/**
					 * Initializes entities edit pages collection.
					 * Removes pages from collection for call type.
					 * @inheritdoc Terrasoft.BaseSection#initEditPages
					 * @override
					 */
					initEditPages: function() {
						var enabledEditPages = new this.Terrasoft.Collection();
						this.callParent(arguments);
						var editPages = this.get("EditPages");
						var activityTypes = ConfigurationConstants.Activity.Type;
						var exceptActivityTypes = [activityTypes.Email, activityTypes.Call];
						this.Terrasoft.each(editPages.getItems(), function(item) {
							var itemId = item.get("Id");
							if (!Terrasoft.contains(exceptActivityTypes, itemId) && item.get("Caption") === "Задача") {
								enabledEditPages.add(itemId, item);
							}
						});
						this.set("EnabledEditPages", enabledEditPages);
						this.set("EditPages", enabledEditPages);
					}
				},

				diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
			};
		}
);