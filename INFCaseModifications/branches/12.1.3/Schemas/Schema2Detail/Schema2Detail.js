define("Schema2Detail", [], function() {
	return {
		entitySchemaName: "Change",
		attributes: {
			"isButtonsEnabled": {
				"dataValueType": Terrasoft.DataValueType.BOOLEAN,
				"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			}
		},
		messages: {
			"ChangeDetailReady": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"ChangeDetailMessage": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "AddRecordButton",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"enabled": {bindTo: "isButtonsEnabled"},
					"visible": {bindTo: "isButtonsEnabled"}
				}
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			getCopyRecordMenuItem: function() {
				return this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.CopyMenuCaption"},
					Click: {"bindTo": "copyRecord"},
					Enabled: {bindTo: "getCopyRecordMenuEnabled"},
					Visible: {bindTo: "isButtonsEnabled"}
				});
			},
			getEditRecordMenuItem: function() {
				return this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.EditMenuCaption"},
					Click: {"bindTo": "editRecord"},
					Enabled: {bindTo: "getEditRecordButtonEnabled"},
					Visible: {bindTo: "isButtonsEnabled"}
				});
			},
			getDeleteRecordMenuItem: function() {
				return this.getButtonMenuItem({
					Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
					Click: {"bindTo": "deleteRecords"},
					Enabled: {bindTo: "isAnySelected"},
					Visible: {bindTo: "isButtonsEnabled"}
				});
			},
			init: function() {
				this.callParent(arguments);
				this.sandbox.subscribe("ChangeDetailMessage",
					function(flag) {
					this.set("isButtonsEnabled", flag);
				}.bind(this),
				["ChangeDetailMessageKey"]
				);
				this.sandbox.publish("ChangeDetailReady",
					true,
					"ChangeDetailReadyKey"
				);
			}
		}
	};
});
