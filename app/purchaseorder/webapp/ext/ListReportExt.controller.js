sap.ui.define([
  "sap/ui/core/mvc/ControllerExtension"
], function (ControllerExtension) {
  "use strict";

  return ControllerExtension.extend("purchaseorder.ext.ListReportExt", {
    override: {
      _forceModelRefresh: function () {
        try {
          var oView = this.base && this.base.getView && this.base.getView();
          var oModel = oView && oView.getModel && oView.getModel();
          if (oModel && oModel.refresh) { oModel.refresh(); }
        } catch (e) {}
      },
      _forceRefreshWithRetries: function (bAggressive) {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          if (oExtAPI && oExtAPI.refresh) {
            oExtAPI.refresh();
            setTimeout(function () { try { oExtAPI.refresh(); } catch (e1) {} }, 300);
            if (bAggressive) { setTimeout(function () { try { oExtAPI.refresh(); } catch (e2) {} }, 900); }
          }
        } catch (e) {}
      },
      _refreshTableWhenReady: function (iTry) {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oView = this.base && this.base.getView && this.base.getView();
          var oTable = oView && oView.byId && (oView.byId("fe::table::PurchaseOrder") || oView.byId("fe::table::PurchaseOrder::LineItem"));
          if (!oTable && oView && oView.findAggregatedObjects) {
            var aTables = oView.findAggregatedObjects(true, function (oObj) {
              return oObj && oObj.isA && oObj.isA("sap.ui.mdc.Table");
            }) || [];
            oTable = aTables[0];
          }
          if (oTable && oTable.getRowBinding) {
            var oBinding = oTable.getRowBinding();
            if (oBinding) {
              try { oBinding.refresh(); } catch (eR) {}
              try {
                var iLen = (oBinding.getLength && oBinding.getLength()) || 20;
                if (oBinding.getContexts) { oBinding.getContexts(0, Math.min(iLen, 50), 0, true); }
              } catch (eGC) {}
              try {
                var aBtns = oView && oView.findAggregatedObjects && oView.findAggregatedObjects(true, function (oObj) {
                  return oObj && oObj.isA && oObj.isA("sap.m.Button") && /::StandardAction::Refresh$/.test(oObj.getId());
                });
                if (aBtns && aBtns[0] && aBtns[0].firePress) { aBtns[0].firePress(); }
              } catch (eBtn) {}
              return;
            }
          }
          var iNext = (iTry || 0) + 1;
          if (iNext <= 15) { setTimeout(function () { this._refreshTableWhenReady(iNext); }.bind(this), 150); }
          else { if (oExtAPI && oExtAPI.refresh) { oExtAPI.refresh(); } }
        } catch (e) {}
      },
      onInit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oRouter = oExtAPI && oExtAPI.getRouter && oExtAPI.getRouter();
          if (oRouter && oRouter.attachRouteMatched) {
            this._onRouteMatched = function (oEvent) {
              var sName = oEvent && oEvent.getParameter && oEvent.getParameter("name");
              if (sName === "PurchaseOrderList") {
                var bFromSave = false;
                try { bFromSave = sessionStorage.getItem("fe.refresh.PurchaseOrder") === "1"; } catch (eS) {}
                this._forceModelRefresh();
                this._forceRefreshWithRetries(true);
                this._refreshTableWhenReady(0);
                if (bFromSave) {
                  setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
                  try { sessionStorage.removeItem("fe.refresh.PurchaseOrder"); } catch (eR) {}
                }
              }
            }.bind(this);
            oRouter.attachRouteMatched(this._onRouteMatched);
          }
        } catch (e) {}
      },
      onAfterRendering: function () {
        var bFromSave = false;
        try { bFromSave = sessionStorage.getItem("fe.refresh.PurchaseOrder") === "1"; } catch (eS) {}
        if (bFromSave) {
          this._forceModelRefresh();
          this._forceRefreshWithRetries(true);
          this._refreshTableWhenReady(0);
          setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
          try { sessionStorage.removeItem("fe.refresh.PurchaseOrder"); } catch (eR) {}
        }
      },
      onAfterBinding: function () {
        var bFromSave = false;
        try { bFromSave = sessionStorage.getItem("fe.refresh.PurchaseOrder") === "1"; } catch (eS) {}
        this._forceModelRefresh();
        this._forceRefreshWithRetries(bFromSave);
        if (bFromSave) { try { sessionStorage.removeItem("fe.refresh.PurchaseOrder"); } catch (eR) {} }
      },
      onExit: function () {
        try {
          var oExtAPI = this.base && this.base.getExtensionAPI && this.base.getExtensionAPI();
          var oRouter = oExtAPI && oExtAPI.getRouter && oExtAPI.getRouter();
          if (oRouter && this._onRouteMatched) { oRouter.detachRouteMatched(this._onRouteMatched); }
        } catch (e) {}
      },
      routing: {
        onAfterNavigation: function () {
          var bFromSave = false;
          try { bFromSave = sessionStorage.getItem("fe.refresh.PurchaseOrder") === "1"; } catch (eS) {}
          this._forceModelRefresh();
          this._forceRefreshWithRetries(true);
          this._refreshTableWhenReady(0);
          if (bFromSave) {
            setTimeout(function () { this._refreshTableWhenReady(0); }.bind(this), 600);
            try { sessionStorage.removeItem("fe.refresh.PurchaseOrder"); } catch (eR) {}
          }
        }
      }
    }
  });
});

