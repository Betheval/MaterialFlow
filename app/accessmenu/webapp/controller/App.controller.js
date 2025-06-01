sap.ui.define(
  [
    "sap/ui/Device",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Popover",
    "sap/m/Button",
    "sap/m/library",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Device, Controller, JSONModel, Popover, Button, library) {
    "use strict";

    return Controller.extend("accessmenu.controller.App", {
      onInit: function () {
        this.oModel = new JSONModel();
        this.oModel.loadData(
          sap.ui.require.toUrl("accessmenu/model/model.json")
        );
        this.getView().setModel(this.oModel);
        var oNotificationModel = new sap.ui.model.json.JSONModel({
          notifications: [
            // Ejemplo inicial
            {
              title: "Bienvenido",
              description: "Primera notificación",
              datetime: "Ahora",
              priority: "High",
              authorName: "Sistema",
            },
          ],
        });
        this.getView().setModel(oNotificationModel, "notifications");
      },

      onItemSelect: function (oEvent) {
        var item = oEvent.getParameter("item");
        var key = item.getKey();
        var pageContainer = this.byId("pageContainer");

        // Navegar a la página correspondiente
        pageContainer.to(this.getView().createId(key));

        // Cargar el componente correspondiente si es necesario
        var componentContainer = this.byId("pageMaterials");
        if (componentContainer && !componentContainer.getComponentInstance()) {
          sap.ui.core.Component.create({
            name: key,
          }).then(function (oComponent) {
            componentContainer.setComponent(oComponent);
          });
        }
      },

      onMenuButtonPress: function () {
        var toolPage = this.byId("page");

        toolPage.setSideExpanded(!toolPage.getSideExpanded());
      },
      onCopilotPress: function (oEvent) {
        var oToolPage = this.byId("page");
        var oView = this.getView();

        if (!this._oChatbotFragment) {
          sap.ui.core.Fragment.load({
            name: "accessmenu.fragment.Chatbot",
            id: oView.getId(),
            controller: this,
          }).then(
            function (oFragment) {
              this._oChatbotFragment = oFragment;
              // Ahora sí, agrega el fragmento al sideContent derecho
              oToolPage.removeAllSideContent("End");
              oToolPage.addSideContent(oFragment, "End");
            }.bind(this)
          );
        } else {
          oToolPage.removeAllSideContent("End");
          oToolPage.addSideContent(this._oChatbotFragment, "End");
        }
      },
      onShowNotifications: function () {
        var oNotificationListGroup = sap.ui.core.Fragment.byId(
          "notificationDialog",
          "notificationListGroup"
        );
        var iCount = 0;
        if (oNotificationListGroup) {
          iCount = oNotificationListGroup.getItems().length;
        }
        // Ahora puedes usar iCount para actualizar el ShellBar
        this.byId("_IDGenShellBar1").setNotificationsNumber(iCount);
        if (!this._oNotificationDialog) {
          sap.ui.core.Fragment.load({
            name: "accessmenu.view.NotificationDialog",
            controller: this,
          }).then(
            function (oDialog) {
              this._oNotificationDialog = oDialog;
              this.getView().addDependent(oDialog);
              oDialog.open();
            }.bind(this)
          );
        } else {
          this._oNotificationDialog.open();
        }
      },
      onCloseNotificationDialog: function (oEvent) {
        oEvent.getSource().getParent().close();
      },
      onAddNotification: function () {
        var oModel = this.getView().getModel("notifications");
        var aNotifications = oModel.getProperty("/notifications");
        aNotifications.unshift({
          title: "Nueva notificación",
          description: "Esta es una notificación agregada dinámicamente.",
          datetime: new Date().toLocaleString(),
          priority: "Medium",
          authorName: "Usuario",
        });
        oModel.setProperty("/notifications", aNotifications);
        this.byId("_IDGenShellBar1").setNotificationsNumber(
          aNotifications.length
        );
      },

      onNotificationClose: function (oEvent) {
        var oItem = oEvent.getSource();
        var oList = oItem.getParent();
        var oModel = this.getView().getModel("notifications");
        var aNotifications = oModel.getProperty("/notifications");
        var iIndex = oList.indexOfItem(oItem);
        if (iIndex > -1) {
          aNotifications.splice(iIndex, 1);
          oModel.setProperty("/notifications", aNotifications);
          this.byId("_IDGenShellBar1").setNotificationsNumber(
            aNotifications.length
          );
        }
      },
    });
  }
);
