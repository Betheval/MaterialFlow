"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = void 0;
class Material {
    constructor(entity) {
        this.Materials = entity;
    }
    async adjustStock(req) {
        var { materialID, adjustment } = req.data;
        adjustment = parseInt(adjustment);
        console.log(`Material ID: ${materialID}, Adjustment: ${adjustment}`);
        const material = await SELECT.one
            .from(this.Materials)
            .where({ ID: materialID });
        if (!material)
            req.error(404, "Material no encontrado");
        await UPDATE(this.Materials)
            .set({ quantity: adjustment })
            .where({ ID: materialID });
        const updatedMaterial = await SELECT.one
            .from(this.Materials)
            .where({ ID: materialID });
        return updatedMaterial;
    }
    async addMaterial(req) {
        const material = req.data;
        const result = await INSERT.into(this.Materials).entries(material);
        return result;
    }
    async delete(req) {
        const { materialID } = req.data;
        const material = SELECT.one.from(this.Materials).where({ ID: materialID });
        if (!material)
            req.error(404, "Material no encontrado");
        await DELETE.from(this.Materials).where({ ID: materialID });
        return true;
    }
    async updatePrice(req) {
        const { materialID, newPrice } = req.data;
        const material = await SELECT.one.from(this.Materials).where({ ID: materialID });
        if (!material)
            req.error(404, "Material no encontrado");
        await UPDATE(this.Materials)
            .set({ unitPrice: newPrice })
            .where({ ID: materialID });
        return true;
    }
    async getSupplier(req) {
        const { supplierID } = req.data;
        const materials = await SELECT.from(this.Materials).where({
            supplier_ID: supplierID,
        });
        return materials;
    }
}
exports.Material = Material;
