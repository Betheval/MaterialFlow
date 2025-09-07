"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PurchaseOrderItems_1 = require("./handlers/PurchaseOrderItems");
const PurchaseOrder_1 = require("./handlers/PurchaseOrder");
const InventoryMovement_1 = require("./handlers/InventoryMovement");
const types_1 = require("./types/types");
const Chatbot_1 = require("./handlers/Chatbot");
const cds = require("@sap/cds");
module.exports = cds.service.impl((srv) => {
    const { Materials, Categories, Suppliers, PurchaseOrder, InventoryMovement, PurchaseOrderItem, } = srv.entities;
    srv.on("chatWithLlama", async (req) => {
        const message = req.data.message;
        if (!message) {
            return req.error("Message cannot be empty");
        }
        try {
            const chatbot = new Chatbot_1.Chatbot();
            const response = await chatbot.sendMessageToLlama(message);
            // Si response no es un objeto de tipo error, se asume que es una respuesta válida
            if (typeof response !== "string") {
                return req.error("Invalid response from Llama");
            }
            // Retornar la respuesta del chatbot
            return { response: response || "No response from Llama" };
        }
        catch (error) {
            return req.error(`Error communicating with Llama: ${error.message}`);
        }
    });
    srv.on("approveOrder", PurchaseOrder, async (req) => {
        const ordersToApprove = req.params;
        if (!ordersToApprove || ordersToApprove.length === 0) {
            return false; // No orders to approve
        }
        // Encontrar las orderNumber de las órdenes a aprobar
        const orderNumbers = ordersToApprove.map((order) => order.orderNumber);
        // Actualizar el estado de las órdenes a "APPROVED"
        await UPDATE(PurchaseOrder)
            .set({ status: "APPROVED" })
            .where({ orderNumber: { in: orderNumbers } });
        // Registrar movimientos de inventario por cada orden aprobada
        const inventoryMovement = new InventoryMovement_1.InventoryMov();
        for (const order of ordersToApprove) {
            const items = await cds.run(SELECT.from(PurchaseOrderItem).where({ orderNumber: order.orderNumber }));
            //Crear un array de inventoryMovement
            const movements = items.map((item) => ({
                material_ID: item.material_ID,
                movementType: "IN", // Asumiendo que es una entrada de inventario
                quantity: item.quantity,
                movementDate: new Date(),
                orderNumber: order.orderNumber, // Referencia a la orden de compra
            }));
            await inventoryMovement.moveInventory(movements, types_1.MovementType.IN);
        }
    });
    srv.on("cancelOrder", async (req) => {
        try {
            const ordersToCancel = req.params;
            for (const order of ordersToCancel) {
                const po = await SELECT.one
                    .from(PurchaseOrder)
                    .where({ orderNumber: order.orderNumber });
                if (po.status !== "CANCELLED" && po.status !== "APPROVED") {
                    await UPDATE(PurchaseOrder)
                        .set({ status: "CANCELLED" })
                        .where({ orderNumber: order.orderNumber });
                }
                else {
                    return req.error("Order cannot be cancelled as it is already approved or cancelled.");
                }
            }
        }
        catch (error) {
            return error;
        }
    });
    srv.before("CREATE", "mflowservice_purchaseorderitem_drafts", async (req) => {
        const POI = new PurchaseOrderItems_1.PurchaseOrderItems(req);
        POI.calcularTotal();
    });
    srv.before("UPDATE", "mflowservice_purchaseorderitem_drafts", async (req) => {
        const POI = new PurchaseOrderItems_1.PurchaseOrderItems(req);
        POI.calcularTotal();
    });
    srv.before("UPDATE", "MFlowService.PurchaseOrderItem.drafts", async (req) => {
        const POI = new PurchaseOrderItems_1.PurchaseOrderItems(req);
        if (req.data.material_ID) {
            await POI.setUnitPriceFromMaterial();
        }
        if (req.data.quantity || req.data.unitPrice) {
            await POI.calcularTotal();
            return await POI.calcularTotal();
        }
    });
    srv.before("UPDATE", "PurchaseOrder", async (req) => {
        const PO = new PurchaseOrder_1.PurchaseOrder(req);
        await PO.calcularPurchaseOrderTotal();
    });
});
