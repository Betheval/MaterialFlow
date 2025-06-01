"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Material_1 = require("./handlers/Material");
const cds = require('@sap/cds');
module.exports = cds.service.impl((srv) => {
    const { Materials, Categories, Suppliers, PurchaseOrder, InventoryMovement } = srv.entities;
    srv.on('adjustStock', async (req) => {
        const material = new Material_1.Material(Material_1.Material);
        return material.adjustStock(req);
    });
    srv.on('approveOrder', async (req) => {
        const { orderID } = req.data;
        await UPDATE(PurchaseOrder).set({ status: 'APPROVED' }).where({ ID: orderID });
        return true;
    });
    srv.on('closeOrder', async (req) => {
        const { orderID } = req.data;
        await UPDATE(PurchaseOrder).set({ status: 'CLOSED' }).where({ ID: orderID });
        // Registrar movimientos de inventario por cada item
        const items = await cds.run(SELECT.from('PurchaseOrderItem').where({ purchaseOrder_ID: orderID }));
        for (const item of items) {
            await INSERT.into(InventoryMovement).entries({
                material_ID: item.material_ID,
                movementType: 'IN',
                quantity: item.quantity,
                movementDate: new Date(),
                user: req.user.id,
                reference: orderID
            });
        }
        return true;
    });
});
