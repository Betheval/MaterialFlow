sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("materials.ext.ObjectPageExt", {
    override: {
      onInit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && oEditFlow.attachAfterSave) {
            this._onAfterSave = function () {
              try { sessionStorage.setItem("fe.refresh.Materials", "1"); } catch (e) { /* no-op */ }
            };
            oEditFlow.attachAfterSave(this._onAfterSave);
          }
        } catch (e) { /* no-op */ }
      },
      onExit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oEditFlow = oExtAPI && oExtAPI.getEditFlow && oExtAPI.getEditFlow();
          if (oEditFlow && this._onAfterSave && oEditFlow.detachAfterSave) {
            oEditFlow.detachAfterSave(this._onAfterSave);
          }
        } catch (e) { /* no-op */ }
      }
    }
  });
});

