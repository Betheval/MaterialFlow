sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/Dialog",
], function(MessageToast, Dialog) {
    'use strict';

    return {
        onAddCategory: function(oEvent) {
            var _dialog = new Dialog({
                title: "Add Category",
                type: "Message",
                content: [
                    new sap.m.Label({
                        text: "Enter the category name"
                    }),
                    new sap.m.Input("nameInput", {
                        width: "100%",
                        value: ""
                    })
                ],
                beginButton: new sap.m.Button({
                    text: "Submit",
                    press: async function() {
                        var name = sap.ui.getCore().byId("nameInput").getValue();
                        if (name) {
                            await addCategory(name);
                            _dialog.close();
                        } else {
                            MessageToast.show("Please enter a category name");
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
    async function addCategory(name) {
        await fetch("/odata/v4/mflow/addCategory", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.error) {
                    MessageToast.show("failed");
                }else{
                    MessageToast.show("successfull");
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                MessageToast.show("Error creating category", error.message);
            });
    }
});
