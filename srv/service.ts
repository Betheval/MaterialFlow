import { PurchaseOrderItems } from "./handlers/PurchaseOrderItems";
import { PurchaseOrder as POrder } from "./handlers/PurchaseOrder";
import { InventoryMov } from "./handlers/InventoryMovement";
import { InventoryMovement, MovementType } from "./types/types";

const cds = require("@sap/cds");
module.exports = cds.service.impl((srv: any) => {
  const {
    Materials,
    Categories,
    Suppliers,
    PurchaseOrder,
    InventoryMovement,
    PurchaseOrderItem,
  } = srv.entities;

  srv.on('approveOrder', PurchaseOrder, async (req:any) => {
    const ordersToApprove = req.params;
    if (!ordersToApprove || ordersToApprove.length === 0) {
      return false; // No orders to approve
    }
    // Encontrar las orderNumber de las órdenes a aprobar
    const orderNumbers = ordersToApprove.map((order: any) => order.orderNumber);
    // Actualizar el estado de las órdenes a "APPROVED"
    await UPDATE(PurchaseOrder)
      .set({ status: "APPROVED" })
      .where({ orderNumber: { in: orderNumbers } });
    // Registrar movimientos de inventario por cada orden aprobada
    const inventoryMovement = new InventoryMov();
    for (const order of ordersToApprove) {
      const items = await cds.run(
        SELECT.from(PurchaseOrderItem).where({ orderNumber: order.orderNumber })
      );
      //Crear un array de inventoryMovement
      const movements : InventoryMovement[] = items.map((item: any) => ({
        material_ID: item.material_ID,
        movementType: "IN", // Asumiendo que es una entrada de inventario
        quantity: item.quantity,
        movementDate: new Date(),
        orderNumber: order.orderNumber, // Referencia a la orden de compra
      }));
      await inventoryMovement.moveInventory(movements, MovementType.IN);
    }
    
  });
  srv.on("cancelOrder", async (orderNumber: String) => {
    await UPDATE(PurchaseOrder).set({ status: "CLOSED" }).where({});
    // Registrar movimientos de inventario por cada item
    const items = await cds.run(SELECT.from("PurchaseOrderItem").where({}));
    for (const item of items) {
      await INSERT.into(InventoryMovement).entries({
        material_ID: item.material_ID,
        movementType: "IN",
        quantity: item.quantity,
        movementDate: new Date(),
        user: "",
        reference: "",
      });
    }
    return true;
  });

  srv.before(
    "CREATE",
    "mflowservice_purchaseorderitem_drafts",
    async (req: any) => {
      const POI = new PurchaseOrderItems(req);
      POI.calcularTotal();
    }
  );
  srv.before(
    "UPDATE",
    "mflowservice_purchaseorderitem_drafts",
    async (req: any) => {
      const POI = new PurchaseOrderItems(req);
      POI.calcularTotal();
    }
  );
  srv.before(
    "UPDATE",
    "MFlowService.PurchaseOrderItem.drafts",
    async (req: any) => {
      const POI = new PurchaseOrderItems(req);
      if (req.data.material_ID) {
        await POI.setUnitPriceFromMaterial();
      }
      if (req.data.quantity || req.data.unitPrice) {
        await POI.calcularTotal();
        return await POI.calcularTotal();
      }
    }
  );
  srv.before("UPDATE", "PurchaseOrder", async (req: any) => {
    const PO = new POrder(req);
    await PO.calcularPurchaseOrderTotal();
  });
});
