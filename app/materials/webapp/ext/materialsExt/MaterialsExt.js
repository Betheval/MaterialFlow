sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
], function(MessageToast, Dialog) {
    'use strict';

    return {
        OnAdjustStock: function(oEvent, aSelectedContexts) {
            var oContext = aSelectedContexts[0];
            const id = oContext.getProperty("ID");
            var _dialog = new Dialog({
                title: "Adjust Stock",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Enter the quantity to adjust"
                    }),
                    new sap.m.Input("quantityInput", {
                        width: "100%",
                        value: "0"
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: function() {
                        var quantity = sap.ui.getCore().byId("quantityInput").getValue();
                        if (quantity) {
                            adjustStock(id,quantity);
                            _dialog.close();
                        } else {
                            MessageToast.show("Please enter a quantity");
                        }
                    }.bind(this)
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function() {
                        _dialog.close();
                    }
                }),
                afterClose: function() {
                    _dialog.destroy();
                }
            });
            _dialog.open();

            
        },
        OnCreateMaterial: function(oEvent){
            var _dialog = new Dialog({
                title: "Create Material",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Enter the material ID"
                    }),
                    new sap.m.Input("materialIDInput", {
                        width: "100%",
                        value: ""
                    }),
                    new sap.m.Label({
                        text: "Enter the material name"
                    }),
                    new sap.m.Input("materialNameInput", {
                        width: "100%",
                        value: ""
                    }),
                    new sap.m.Label({
                        text: "Enter the material supplier ID"
                    }),
                    new sap.m.Input("supplierIDInput", {
                        width: "100%",
                        value: ""
                    }),
                    new sap.m.Label({
                        text: "Enter the material stock"
                    }),
                    new sap.m.Input("stockInput", {
                        width: "100%",
                        value: "0"
                    }),
                    new sap.m.Label({
                        text: "Enter the material price"
                    }),
                    new sap.m.Input("priceInput", {
                        width: "100%",
                        value: "0"
                    }),
                    new sap.m.Label({
                        text: "Enter the material currency"
                    }),
                    new sap.m.Input("currencyInput", {
                        width: "100%",
                        value: ""
                    }),
                ],
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: function() {
                        var materialID = sap.ui.getCore().byId("materialIDInput").getValue();
                        var materialName = sap.ui.getCore().byId("materialNameInput").getValue();
                        var supplierID = sap.ui.getCore().byId("supplierIDInput").getValue();
                        var stock = sap.ui.getCore().byId("stockInput").getValue();
                    }
                })
            });
            _dialog.open();
        },
        OnSupplierMaterialChange: function(oEvent, aSelectedContexts){
            var oContext = aSelectedContexts[0];
            const id = oContext.getProperty("ID");
            var _dialog = new Dialog({
                title: "Change Supplier",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Enter the new supplier ID"
                    }),
                    new sap.m.Input("supplierInput", {
                        width: "100%",
                        value: ""
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: function() {
                        var supplier = sap.ui.getCore().byId("supplierInput").getValue();
                        if (supplier) {
                            changeSupplier(id,supplier);
                            MessageToast.show("Supplier changed to " + supplier);
                            _dialog.close();
                        } else {
                            MessageToast.show("Please enter a supplier ID");
                        }
                    }.bind(this)
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function() {
                        _dialog.close();
                    }
                }),
                afterClose: function() {
                    _dialog.destroy();
                }
            });
            _dialog.open();
        }
        };
        async function adjustStock(id,quantity){
            fetch("/odata/v4/mflow/adjustStock", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    materialID: id,
                    adjustment: quantity
                })
            }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.error) {
                        MessageToast.show("Stock adjustment failed");
                    }else{
                        MessageToast.show("Stock adjusted successfully");
                    }
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                    MessageToast.show("Error adjusting stock", error.message);
                });

        }
        async function changeSupplier(id,supplier){
            fetch("/odata/v4/mflow/changeSupplier", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    materialID: id,
                    supplierID: supplier
                })
            }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

        }
    });
