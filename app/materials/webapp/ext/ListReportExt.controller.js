sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("materials.ext.ListReportExt", {
    override: {
      onInit: function () {
        // Opción fiable: escuchar el router del componente FE
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oRouter = oExtAPI && oExtAPI.getRouter && oExtAPI.getRouter();
          if (oRouter && oRouter.attachRouteMatched) {
            this._onRouteMatched = function (oEvent) {
              var sName = oEvent && oEvent.getParameter && oEvent.getParameter("name");
              if (sName === "MaterialsList") {
                // eslint-disable-next-line no-console
                console.log("hola mundo");
                try { oExtAPI.refresh && oExtAPI.refresh(); } catch (eR) { /* no-op */ }
              }
            }.bind(this);
            oRouter.attachRouteMatched(this._onRouteMatched);
          }
        } catch (e) { /* no-op */ }
      },
      onExit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oRouter = oExtAPI && oExtAPI.getRouter && oExtAPI.getRouter();
          if (oRouter && this._onRouteMatched) {
            oRouter.detachRouteMatched(this._onRouteMatched);
          }
        } catch (e) { /* no-op */ }
      },
      routing: {
        onAfterNavigation: function () {
          // Evento solicitado: desencadenar siempre que el LR sea activado
          // eslint-disable-next-line no-console
          console.log("hola mundo");
          // Prefer FE ExtensionAPI refresh (refreshes page bindings)
          try {
            var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
            if (oExtAPI && oExtAPI.refresh) {
              oExtAPI.refresh();
              return;
            }
          } catch (e) { /* no-op */ }

          // Fallback: try refreshing the table binding directly
          try {
            var oView = this.base.getView();
            var oTable = oView && oView.byId("fe::table::Materials");
            var oBinding = oTable && oTable.getRowBinding && oTable.getRowBinding();
            if (oBinding && oBinding.refresh) {
              oBinding.refresh();
            }
          } catch (e2) { /* no-op */ }
        }
      }
    }
  });
});
