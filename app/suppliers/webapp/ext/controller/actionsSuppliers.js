sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    "use strict";

    return {
       onAddSupplier: function (oEvent) {
            var _dialog = new sap.m.Dialog({
                title: "Add Supplier",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Enter the supplier name"
                    }),
                    new sap.m.Input("supplierNameInput", {
                        width: "100%",
                        value: ""
                    }),
                    new sap.m.Label({
                        text: "Enter the supplier email"
                    }),
                    new sap.m.Input("supplierEmailInput", {
                        width: "100%",
                        value: ""
                    }),
                ],
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: function () {
                        var supplierName = sap.ui.getCore().byId("supplierNameInput").getValue();
                        var supplierEmail = sap.ui.getCore().byId("supplierEmailInput").getValue();
                        if (supplierName && supplierEmail) {
                            addSupplier( supplierName, supplierEmail);
                            _dialog.close();
                        } else {
                            MessageToast.show("Please enter all fields");
                        }
                    }.bind(this)
                }),
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function () {
                        _dialog.close();
                    }
                }),
                afterClose: function () {
                    _dialog.destroy();
                }
            });
            _dialog.open();
        }
    };
    async function addSupplier(name, email) {
            fetch("/odata/v4/mflow/addSupplier", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.error) {
                        MessageToast.show("Failed");
                    }else{
                        MessageToast.show("Successfull");
                    }
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                    MessageToast.show("Error adding supplier");
                });

        
        
    }
});