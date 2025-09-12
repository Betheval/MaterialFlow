sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("suppliers.ext.SuppListReportExt", {
    override: {
      _forceModelRefresh: function () {
        try {
          var oView = this.base && this.base.getView && this.base.getView();
          var oModel = oView && oView.getModel && oView.getModel();
          if (oModel && oModel.refresh) {
            oModel.refresh();
          }
        } catch (e) { /* no-op */ }
      },
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
        var bFromSave = false;
        try { bFromSave = sessionStorage.getItem("fe.refresh.Suppliers") === "1"; } catch (eS) { /* no-op */ }
        if (bFromSave) {
          this._forceModelRefresh();
          this._forceRefreshWithRetries(true);
          this._refreshTableWhenReady(0);
          setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
          try { sessionStorage.removeItem("fe.refresh.Suppliers"); } catch (eR) { /* no-op */ }
        }
      },
      _refreshTableWhenReady: function (iTry) {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oView = this.base && this.base.getView && this.base.getView();
          var oTable = oView && oView.byId && (oView.byId("fe::table::Suppliers") || oView.byId("fe::table::Suppliers::LineItem"));

          if (!oTable && oView && oView.findAggregatedObjects) {
            var aTables = oView.findAggregatedObjects(true, function (oObj) {
              return oObj && oObj.isA && oObj.isA("sap.ui.mdc.Table");
            }) || [];
            oTable = aTables[0];
          }

          if (oTable && oTable.getRowBinding) {
            var oBinding = oTable.getRowBinding();
            if (oBinding) {
              // 1) Refresh the binding
              try { oBinding.refresh(); } catch (eR) { /* no-op */ }
              // 2) Force data read for visible range (fills blank rows)
              try {
                var iLen = (oBinding.getLength && oBinding.getLength()) || 20;
                if (oBinding.getContexts) {
                  oBinding.getContexts(0, Math.min(iLen, 50), 0, true);
                }
              } catch (eGC) { /* no-op */ }
              // 3) Try to trigger FE's standard Refresh action if present
              try {
                var aBtns = oView && oView.findAggregatedObjects && oView.findAggregatedObjects(true, function (oObj) {
                  return oObj && oObj.isA && oObj.isA("sap.m.Button") && /::StandardAction::Refresh$/.test(oObj.getId());
                });
                if (aBtns && aBtns[0] && aBtns[0].firePress) {
                  aBtns[0].firePress();
                }
              } catch (eBtn) { /* no-op */ }
              return;
            }
          }

          var iNext = (iTry || 0) + 1;
          if (iNext <= 15) {
            setTimeout(function () {
              this._refreshTableWhenReady(iNext);
            }.bind(this), 150);
          } else {
            if (oExtAPI && oExtAPI.refresh) {
              oExtAPI.refresh();
            }
          }
        } catch (e) { /* no-op */ }
      },
      onInit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oRouter = oExtAPI && oExtAPI.getRouter && oExtAPI.getRouter();
          // Suscripción EventBus (desde OP)
          try {
            var oBus = sap.ui.getCore().getEventBus();
            if (oBus && oBus.subscribe) {
              this._onSavedEvent = function () {
                this._forceModelRefresh();
                this._forceRefreshWithRetries(true);
                this._refreshTableWhenReady(0);
                setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
              }.bind(this);
              oBus.subscribe("suppliers", "afterSave", this._onSavedEvent);
            }
          } catch (eBus) { /* no-op */ }
          if (oRouter && oRouter.attachRouteMatched) {
            this._onRouteMatched = function (oEvent) {
              var sName = oEvent && oEvent.getParameter && oEvent.getParameter("name");
              if (sName === "SuppliersList") {
                // eslint-disable-next-line no-console
                console.log("Suppliers LR route matched → refreshing");
                var bFromSave = false;
                try { bFromSave = sessionStorage.getItem("fe.refresh.Suppliers") === "1"; } catch (eS) { /* no-op */ }
                this._forceModelRefresh();
                this._forceRefreshWithRetries(true);
                this._refreshTableWhenReady(0);
                if (bFromSave) {
                  setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
                  try { sessionStorage.removeItem("fe.refresh.Suppliers"); } catch (eR) { /* no-op */ }
                }
              }
            }.bind(this);
            oRouter.attachRouteMatched(this._onRouteMatched);
          }
        } catch (e) { /* no-op */ }
      },
      onAfterBinding: function () {
        var bFromSave = false;
        try { bFromSave = sessionStorage.getItem("fe.refresh.Suppliers") === "1"; } catch (eS) { /* no-op */ }
        this._forceModelRefresh();
        this._forceRefreshWithRetries(bFromSave);
        if (bFromSave) {
          try { sessionStorage.removeItem("fe.refresh.Suppliers"); } catch (eR) { /* no-op */ }
        }
      },
      onExit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oRouter = oExtAPI && oExtAPI.getRouter && oExtAPI.getRouter();
          if (oRouter && this._onRouteMatched) {
            oRouter.detachRouteMatched(this._onRouteMatched);
          }
          try {
            var oBus = sap.ui.getCore().getEventBus();
            if (oBus && this._onSavedEvent && oBus.unsubscribe) {
              oBus.unsubscribe("suppliers", "afterSave", this._onSavedEvent);
            }
          } catch (eBus) { /* no-op */ }
        } catch (e) { /* no-op */ }
      },
      routing: {
        onAfterNavigation: function () {
          // eslint-disable-next-line no-console
          console.log("Suppliers LR after navigation → refreshing");
          var bFromSave = false;
          try { bFromSave = sessionStorage.getItem("fe.refresh.Suppliers") === "1"; } catch (eS) { /* no-op */ }
          this._forceModelRefresh();
          this._forceRefreshWithRetries(true);
          this._refreshTableWhenReady(0);
          if (bFromSave) {
            setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
            try { sessionStorage.removeItem("fe.refresh.Suppliers"); } catch (eR) { /* no-op */ }
          }
        }
      }
    }
  });
});
