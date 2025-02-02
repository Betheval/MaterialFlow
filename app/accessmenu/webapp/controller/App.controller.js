sap.ui.define([
    'sap/ui/Device',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Device, Controller, JSONModel, Popover, Button, library) {
        "use strict";

        return Controller.extend("accessmenu.controller.App", {
            onInit : function() {
                this.oModel = new JSONModel();
                this.oModel.loadData(sap.ui.require.toUrl("accessmenu/model/model.json"));
                this.getView().setModel(this.oModel);
            },
    
            onItemSelect : function(oEvent) {
                var item = oEvent.getParameter("item");
                var key = item.getKey();
                var pageContainer = this.byId("pageContainer");
    
                // Navegar a la página correspondiente
                pageContainer.to(this.getView().createId(key));
    
                // Cargar el componente correspondiente si es necesario
                var componentContainer = this.byId("pageMaterials");
                if (componentContainer && !componentContainer.getComponentInstance()) {
                    sap.ui.core.Component.create({
                        name: key
                    }).then(function (oComponent) {
                        componentContainer.setComponent(oComponent);
                    });
                }
            },
    
            onMenuButtonPress : function() {
                var toolPage = this.byId("page");
    
                toolPage.setSideExpanded(!toolPage.getSideExpanded());
            }
        });
    });
