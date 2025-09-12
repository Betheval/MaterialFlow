sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("materials.ext.ListReportExt", {
    override: {
      _forceRefreshWithRetries: function (bAggressive) {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          if (oExtAPI && oExtAPI.refresh) {
            oExtAPI.refresh();
            setTimeout(function () {
              try { oExtAPI.refresh(); } catch (e1) { /* no-op */ }
            }, 300);
            if (bAggressive) {
              setTimeout(function () {
                try { oExtAPI.refresh(); } catch (e2) { /* no-op */ }
              }, 900);
            }
          }
        } catch (e) { /* no-op */ }
      },
      onAfterRendering: function () {
        // Si por timing la página se renderiza tras volver del guardado
        var bFromSave = false;
        try { bFromSave = sessionStorage.getItem("fe.refresh.Materials") === "1"; } catch (eS) { /* no-op */ }
        if (bFromSave) {
          this._forceRefreshWithRetries(true);
          this._refreshTableWhenReady(0);
          setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
          try { sessionStorage.removeItem("fe.refresh.Materials"); } catch (eR) { /* no-op */ }
        }
      },
      /**
       * Try to refresh the ListReport's table once it's created and bound.
       * Retries for a short period to cope with async navigation/rendering.
       */
      _refreshTableWhenReady: function (iTry) {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oView = this.base && this.base.getView && this.base.getView();
          var oTable = oView && oView.byId && (oView.byId("fe::table::Materials") || oView.byId("fe::table::Materials::LineItem"));

          // Fallback: try to locate any MDC table in the view
          if (!oTable && oView && oView.findAggregatedObjects) {
            var aTables = oView.findAggregatedObjects(true, function (oObj) {
              return oObj && oObj.isA && oObj.isA("sap.ui.mdc.Table");
            }) || [];
            oTable = aTables[0];
          }

          if (oTable && oTable.getRowBinding) {
            var oBinding = oTable.getRowBinding();
            if (oBinding && oBinding.refresh) {
              oBinding.refresh();
              return; // success
            }
          }

          // Retry a few times while the table is not ready yet
          var iNext = (iTry || 0) + 1;
          if (iNext <= 15) {
            setTimeout(function () {
              this._refreshTableWhenReady(iNext);
            }.bind(this), 150);
          } else {
            // As a final fallback after retries, try FE page refresh
            if (oExtAPI && oExtAPI.refresh) {
              oExtAPI.refresh();
            }
          }
        } catch (e) { /* no-op */ }
      },
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
                // Si venimos de un guardado, forzar doble refresh espaciado
                var bFromSave = false;
                try {
                  bFromSave = sessionStorage.getItem("fe.refresh.Materials") === "1";
                } catch (eS) { /* no-op */ }
                this._forceRefreshWithRetries(true);
                this._refreshTableWhenReady(0);
                if (bFromSave) {
                  setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
                  try { sessionStorage.removeItem("fe.refresh.Materials"); } catch (eR) { /* no-op */ }
                }
              }
            }.bind(this);
            oRouter.attachRouteMatched(this._onRouteMatched);
          }
        } catch (e) { /* no-op */ }
      },
      onAfterBinding: function () {
        // Hook cuando la página ya está enlazada → seguro refrescar
        var bFromSave = false;
        try { bFromSave = sessionStorage.getItem("fe.refresh.Materials") === "1"; } catch (eS) { /* no-op */ }
        this._forceRefreshWithRetries(bFromSave);
        if (bFromSave) {
          try { sessionStorage.removeItem("fe.refresh.Materials"); } catch (eR) { /* no-op */ }
        }
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
          // Refrescar cuando la tabla esté lista; si venimos de guardado, hacer doble pasada
          var bFromSave = false;
          try { bFromSave = sessionStorage.getItem("fe.refresh.Materials") === "1"; } catch (eS) { /* no-op */ }
          this._forceRefreshWithRetries(true);
          this._refreshTableWhenReady(0);
          if (bFromSave) {
            setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
            try { sessionStorage.removeItem("fe.refresh.Materials"); } catch (eR) { /* no-op */ }
          }
        }
      }
    }
  });
});
