define("SectionActionsDashboard", ["SectionActionsDashboardResources"],
	function() {
		return {
			attributes: {},
			messages: {},
			methods: {
				getItemsQuery: function() {
					var bq = this.Ext.create("Terrasoft.BatchQuery");
					var activityItemsQuery = this.getActivityItemsQuery();
					var processItemsQuery = this.getProcessItemsQuery();

					var queryItemsBatchSize = this.get("QueryItemsBatchSize");
					activityItemsQuery.rowCount = queryItemsBatchSize;
					processItemsQuery.rowCount = queryItemsBatchSize;
					
					bq.add(activityItemsQuery);
					bq.add(processItemsQuery);
					return bq;
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);
