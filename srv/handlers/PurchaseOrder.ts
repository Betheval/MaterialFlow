import cds from "@sap/cds";
import { InventoryMov } from "./InventoryMovement";

export class PurchaseOrder {
  private req: any;
  constructor(req: any) {
    this.req = req;
  }

  async calcularPurchaseOrderTotal() {
    try {
      const { ID, items } = this.req.data;
      let total = 0;
      for (const item of items) {
        total += item.totalPrice || 0;
      }
      this.req.data.totalAmount = total;
    } catch (error) {
      return this.req.error(500, "Error calculating purchase order total");
    }
  }
}
