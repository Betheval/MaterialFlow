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
    });
