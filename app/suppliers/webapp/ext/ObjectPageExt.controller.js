sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("suppliers.ext.ObjectPageExt", {
    override: {
      onInit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && oEditFlow.attachAfterSave) {
            this._onAfterSave = function () {
              try { sessionStorage.setItem("fe.refresh.Suppliers", "1"); } catch (e) { /* no-op */ }
              // Emitir evento global para LR (runtime sin EditFlow moderno)
              try {
                var oBus = sap.ui.getCore().getEventBus();
                oBus && oBus.publish("suppliers", "afterSave", { entity: "Suppliers", ts: Date.now() });
              } catch (eBus) { /* no-op */ }
              // FLP EventHub, si existe
              try {
                if (sap && sap.ushell && sap.ushell.Container && sap.ushell.Container.getServiceAsync) {
                  sap.ushell.Container.getServiceAsync("EventHub").then(function (h) {
                    try { h && h.emit && h.emit("SuppliersAfterSave", { ts: Date.now() }); } catch (eEH) { /* no-op */ }
                  });
                }
              } catch (eEHX) { /* no-op */ }
            };
            oEditFlow.attachAfterSave(this._onAfterSave);
          }
          // Fallback para versiones antiguas: observar batch completado y publicar evento
          try {
            var oModel = this.base && this.base.getView && this.base.getView().getModel && this.base.getView().getModel();
            if (oModel && oModel.attachBatchRequestCompleted) {
              this._onBatchDone = function () {
                try { sessionStorage.setItem("fe.refresh.Suppliers", "1"); } catch (e) { /* no-op */ }
                try {
                  var oBus = sap.ui.getCore().getEventBus();
                  oBus && oBus.publish("suppliers", "afterSave", { entity: "Suppliers", ts: Date.now() });
                } catch (eBus) { /* no-op */ }
              };
              oModel.attachBatchRequestCompleted(this._onBatchDone);
            }
          } catch (eBM) { /* no-op */ }
        } catch (e) { /* no-op */ }
      },
      onExit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && this._onAfterSave && oEditFlow.detachAfterSave) {
            oEditFlow.detachAfterSave(this._onAfterSave);
          }
          try {
            var oModel = this.base && this.base.getView && this.base.getView().getModel && this.base.getView().getModel();
            if (oModel && this._onBatchDone && oModel.detachBatchRequestCompleted) {
              oModel.detachBatchRequestCompleted(this._onBatchDone);
            }
          } catch (eBM) { /* no-op */ }
        } catch (e) { /* no-op */ }
      }
    }
  });
});
