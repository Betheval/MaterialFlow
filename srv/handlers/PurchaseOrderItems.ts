import cds from "@sap/cds";

export class PurchaseOrderItems {
  private req: any;
  constructor(req: any) {
    this.req = req;
  }
  async calcularTotal() {
    try {
      const { ID, unitPrice, quantity } = this.req.data;
      const entry = await SELECT.one
        .from("MFlowService.PurchaseOrderItem.drafts")
        .where({ ID: this.req.data.ID });
      if (entry) {
        this.req.data.totalPrice =
          (parseFloat(unitPrice) || entry.unitPrice) *
          (parseFloat(quantity) || entry.quantity);
      }
    } catch (error) {
      return this.req.error(500, "Error calculating total price");
    }
  }

  async setUnitPriceFromMaterial() {
    try {
      const material_ID = this.req.data.material_ID;
      if (material_ID) {
        const material = await SELECT.one
          .from('Materials')
          .where({ ID: material_ID });
        if (material && material.unitPrice !== undefined) {
          const entry = await SELECT.one
            .from("MFlowService.PurchaseOrderItem.drafts")
            .where({ ID: this.req.data.ID });
          if (entry) {
            this.req.data.unitPrice = material.unitPrice;
          }
        }
      }
    } catch (error) {
      return this.req.error(500, "Error setting unit price from material");
    }
  }
}
