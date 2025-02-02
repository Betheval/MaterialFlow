module.exports = cds.service.impl((srv) => {
    const { Materials, Categories, Suppliers } = srv.entities;

    srv.on('adjustStock', async (req) => {
        var { materialID, adjustment } = req.data;
        adjustment = parseInt(adjustment);

        console.log(`Material ID: ${materialID}, Adjustment: ${adjustment}`);
        const material = await cds.transaction(req).run(
            SELECT.one.from(Materials).where({ ID: materialID })
        );
        if (!material) req.error(404, 'Material no encontrado');

        await cds.transaction(req).run(
            UPDATE(Materials).set({ quantity: adjustment  }).where({ ID: materialID })
        );

        const updatedMaterial = await cds.transaction(req).run(
            SELECT.one.from(Materials).where({ ID: materialID })
        );
        return updatedMaterial; 
    });

    srv.on('calculateTotalValue', async (req) => {
        const { materialID } = req.data;
        const material = await cds.transaction(req).run(
            SELECT.one.from(Materials).where({ ID: materialID })
        );
        if (!material) req.error(404, 'Material no encontrado');

        return material.quantity * material.unitPrice;
    });

    srv.on('addMaterial', async (req) => {
        const  material  = req.data;
        const result = await cds.transaction(req).run(
            INSERT.into(Materials).entries(material)
        );
        return result;
    });

    srv.on('updateMaterialPrice', async (req) => {
        const { materialID, newPrice } = req.data;
        const material = await cds.transaction(req).run(
            SELECT.one.from(Materials).where({ ID: materialID })
        );
        if (!material) req.error(404, 'Material no encontrado');

        await cds.transaction(req).run(
            UPDATE(Materials).set({ unitPrice: newPrice }).where({ ID: materialID })
        );
        return true;
    });

    srv.on('deleteMaterial', async (req) => {
        const { materialID } = req.data;
        const material = await cds.transaction(req).run(
            SELECT.one.from(Materials).where({ ID: materialID })
        );
        if (!material) req.error(404, 'Material no encontrado');

        await cds.transaction(req).run(
            DELETE.from(Materials).where({ ID: materialID })
        );
        return true;
    });

    srv.on('getSupplierMaterials', async (req) => {
        const { supplierID } = req.data;
        const materials = await cds.transaction(req).run(
            SELECT.from(Materials).where({supplier_ID: supplierID }));
        return materials;
    });

    srv.on('changeSupplier', async (req) => {
        const { materialID, supplierID } = req.data;
        const material = await cds.transaction(req).run(
            SELECT.one.from(Materials).where({ ID: materialID })
        );
        if (!material) req.error(404, 'Material no encontrado');

        await cds.transaction(req).run(
            UPDATE(Materials).set({ supplier_ID: supplierID }).where({ ID: materialID })
        );
    });
    // Actions for Categories
    srv.on('addCategory', async (req) => {
        const category = req.data;
        const result = await cds.transaction(req).run(
            INSERT.into(Categories).entries({name: category.name})
        );
        return result;
    });
    // Actions for Suppliers
    srv.on('addSupplier', async (req) => {
        const supplier = req.data;
        const result = await cds.transaction(req).run(
            INSERT.into(Suppliers).entries({name: supplier.name, contactEmail: supplier.email})
        );
        return result;
    });

});
