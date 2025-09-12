sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("inventorymovement.ext.ObjectPageExt", {
    override: {
      onInit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && oEditFlow.attachAfterSave) {
            this._onAfterSave = function () {
              try { sessionStorage.setItem("fe.refresh.InventoryMovement", "1"); } catch (e) {}
              try {
                var oBus = sap.ui.getCore().getEventBus();
                oBus && oBus.publish("inventorymovement", "afterSave", { entity: "InventoryMovement", ts: Date.now() });
              } catch (eBus) {}
            };
            oEditFlow.attachAfterSave(this._onAfterSave);
          }
          try {
            var oModel = this.base && this.base.getView && this.base.getView().getModel && this.base.getView().getModel();
            if (oModel && oModel.attachBatchRequestCompleted) {
              this._onBatchDone = function () {
                try { sessionStorage.setItem("fe.refresh.InventoryMovement", "1"); } catch (e) {}
                try {
                  var oBus = sap.ui.getCore().getEventBus();
                  oBus && oBus.publish("inventorymovement", "afterSave", { entity: "InventoryMovement", ts: Date.now() });
                } catch (eBus) {}
              };
              oModel.attachBatchRequestCompleted(this._onBatchDone);
            }
          } catch (eBM) {}
        } catch (e) {}
      },
      onExit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && this._onAfterSave && oEditFlow.detachAfterSave) { oEditFlow.detachAfterSave(this._onAfterSave); }
          try {
            var oModel = this.base && this.base.getView && this.base.getView().getModel && this.base.getView().getModel();
            if (oModel && this._onBatchDone && oModel.detachBatchRequestCompleted) { oModel.detachBatchRequestCompleted(this._onBatchDone); }
          } catch (eBM) {}
        } catch (e) {}
      }
    }
  });
});

