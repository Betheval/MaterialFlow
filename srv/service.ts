import { Material } from "./handlers/Material";
import { PurchaseOrderItems } from "./handlers/PurchaseOrderItems";
import { PurchaseOrder as POrder } from "./handlers/PurchaseOrder"

const cds = require("@sap/cds");
module.exports = cds.service.impl((srv: any) => {
  const { Materials, Categories, Suppliers, PurchaseOrder, InventoryMovement, PurchaseOrderItem } =
    srv.entities;

  srv.on("adjustStock", async (req: any) => {
    const material = new Material(Material);
    return material.adjustStock(req);
  });

  srv.on("approveOrder", async (req: any) => {
    const { orderID } = req.data;
    await UPDATE(PurchaseOrder)
      .set({ status: "APPROVED" })
      .where({ ID: orderID });
    return true;
  });
  srv.on("closeOrder", async (req: any) => {
    const { orderID } = req.data;
    await UPDATE(PurchaseOrder)
      .set({ status: "CLOSED" })
      .where({ ID: orderID });
    // Registrar movimientos de inventario por cada item
    const items = await cds.run(
      SELECT.from("PurchaseOrderItem").where({ purchaseOrder_ID: orderID })
    );
    for (const item of items) {
      await INSERT.into(InventoryMovement).entries({
        material_ID: item.material_ID,
        movementType: "IN",
        quantity: item.quantity,
        movementDate: new Date(),
        user: req.user.id,
        reference: orderID,
      });
    }
    return true;
  });

  srv.before("CREATE", "mflowservice_purchaseorderitem_drafts" , async (req: any) => {
    const POI = new PurchaseOrderItems(req);
    POI.calcularTotal();
  });
  srv.before("UPDATE", "mflowservice_purchaseorderitem_drafts", async (req: any) => {
    const POI = new PurchaseOrderItems(req);
    POI.calcularTotal();
  });
  srv.before("UPDATE", "MFlowService.PurchaseOrderItem.drafts",  async (req: any) => {
    const POI = new PurchaseOrderItems(req);
    if (req.data.material_ID) {
      await POI.setUnitPriceFromMaterial();
    }
    if (req.data.quantity || req.data.unitPrice) {
      await POI.calcularTotal();
      return await POI.calcularTotal();
    }
  });
  srv.before("UPDATE", "PurchaseOrder", async (req: any) => {
    const PO = new POrder(req);
    await PO.calcularPurchaseOrderTotal();
  });
});
