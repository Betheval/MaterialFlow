sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("purchaseorder.ext.ObjectPageExt", {
    override: {
      onInit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && oEditFlow.attachAfterSave) {
            this._onAfterSave = function () {
              try { sessionStorage.setItem("fe.refresh.PurchaseOrder", "1"); } catch (e) {}
              try {
                var oBus = sap.ui.getCore().getEventBus();
                oBus && oBus.publish("purchaseorder", "afterSave", { entity: "PurchaseOrder", ts: Date.now() });
              } catch (eBus) {}
              try {
                if (sap && sap.ushell && sap.ushell.Container && sap.ushell.Container.getServiceAsync) {
                  sap.ushell.Container.getServiceAsync("EventHub").then(function (h) {
                    try { h && h.emit && h.emit("PurchaseOrderAfterSave", { ts: Date.now() }); } catch (eEH) {}
                  });
                }
              } catch (eEHX) {}
            };
            oEditFlow.attachAfterSave(this._onAfterSave);
          }
          // Fallback: listen to batch completion
          try {
            var oModel = this.base && this.base.getView && this.base.getView().getModel && this.base.getView().getModel();
            if (oModel && oModel.attachBatchRequestCompleted) {
              this._onBatchDone = function () {
                try { sessionStorage.setItem("fe.refresh.PurchaseOrder", "1"); } catch (e) {}
                try {
                  var oBus = sap.ui.getCore().getEventBus();
                  oBus && oBus.publish("purchaseorder", "afterSave", { entity: "PurchaseOrder", ts: Date.now() });
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

