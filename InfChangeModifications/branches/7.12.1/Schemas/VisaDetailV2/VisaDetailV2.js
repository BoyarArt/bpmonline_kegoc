define("VisaDetailV2",
	["terrasoft", "VisaHelper", "ConfigurationConstants", "ProcessModuleUtilities", "SecurityUtilities"],
	function(Terrasoft, VisaHelper, ConfigurationConstants, ProcessModuleUtilities) {
		return {
			attributes: {},
			mixins: {
				SecurityUtilitiesMixin: "Terrasoft.SecurityUtilitiesMixin"
			},
			methods: {
				addRecordOperationsMenuItems: function(toolsButtonMenu) {
					this.callParent(arguments);
					toolsButtonMenu.addItem(this.getButtonMenuItem({
						Caption: "Отменить",
						Click: {"bindTo": "cancelVisa"},
						Enabled: {bindTo: "getEditRecordButtonEnabled"}
					}));
				},
				cancelVisa: function() {
					var activeRow = this.getActiveRow();
					var id = activeRow.get("Id");
					var stageNumber = activeRow.get("StageNumber");
					var visaEntityName = activeRow.entitySchema.name;
					var masterRecordId = this.get("MasterRecordId");
					
					if (visaEntityName !== "ChangeVisa") {
						return;
					}
					
					var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: visaEntityName
					});
				
					var greatestStageNumber = esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.GREATER,
						"StageNumber", stageNumber);
	
					var idFilter = esq.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.EQUAL,
						"Change", masterRecordId);
	
	
					esq.filters.addItem(greatestStageNumber);
					esq.filters.addItem(idFilter);
	
					esq.getEntityCollection(function(result) {
						if (result.collection.collection.length !== 0) {
							this.scope.showInformationDialog("Невозможно отменить визу на данном этапе, так как он уже закончился");
						} else {
							var args = {
								sysProcessName: "InfCancelChangeVisaProcess",
								parameters: {
									ChangeId: this.ChangeId,
									VisaId: this.VisaId,
									StageNumber: this.StageNumber
								},
								callback: function() {
									this.scope.reloadGridData();
									document.thisChangeScope.hideBodyMask();
									document.thisChangeScope.reloadEntity();
								},
								scope: this
							};
							this.ProcessModuleUtilities.executeProcess(args);
						}
					}.bind(
						{
							scope: this,
							VisaId: id,
							ProcessModuleUtilities: ProcessModuleUtilities,
							StageNumber: stageNumber,
							ChangeId: masterRecordId
						}), this);
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);
