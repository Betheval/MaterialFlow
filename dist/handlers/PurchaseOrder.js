"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrder = void 0;
class PurchaseOrder {
    constructor(req) {
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
        }
        catch (error) {
            return this.req.error(500, "Error calculating purchase order total");
        }
    }
}
exports.PurchaseOrder = PurchaseOrder;
