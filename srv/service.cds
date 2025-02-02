using { Materials as m, Suppliers as s, Categories as c } from '../db/schema';
service MFlowService @(requries:'authenticated-user') {
   
    entity  Materials @(restrict: [
        {
            grant: ['*'],
            to   : 'MaterialFlow.Read'
        }
    ]) as projection on m;
    entity Categories @(restrict: [
        {
            grant: ['*'],
            to   : 'MaterialFlow.Read'
        },
    ]) as projection on c;
    entity Suppliers @(restrict: [
        {
            grant: ['*'],
            to   : 'MaterialFlow.Read'
        },
    ]) as projection on s;

    //Actions for Materials
    @requires: 'MaterialFlow.Write'
    action adjustStock(materialID: UUID, adjustment: String) returns Materials;
    action calculateTotalValue(materialID: UUID) returns Decimal(10,2);
    @requires: 'MaterialFlow.Write'
    action addMaterial(name: String(100), description: String(255), quantity: Integer, unitPrice: Decimal(10,2), categoryID: UUID, supplierID: UUID) returns UUID;
    @requires: 'MaterialFlow.Write'
    action updateMaterialPrice(materialID: UUID, newPrice: Decimal(10,2)) returns Boolean;
    @requires: 'MaterialFlow.Write'
    action deleteMaterial(materialID: UUID) returns Boolean;
    action getSupplierMaterials(supplierID: UUID) returns array of Materials;
    @requires: 'MaterialFlow.Write'
    action changeSupplier(materialID: UUID, supplierID: UUID) returns Materials;

    //Actions for Categories
    @requires: 'MaterialFlow.Write'
    action addCategory(name: String(100)) returns UUID;
    
    //Actions for Suppliers
    @requires: 'MaterialFlow.Write'
    action addSupplier(name: String(100), email: String(100)) returns UUID;
}

annotate MFlowService.Materials with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Material Name',
        },
        {
            $Type : 'UI.DataField',
            Value : description,
            Label : 'Description',
        },
        {
            $Type : 'UI.DataField',
            Value : quantity,
            Label : 'Quantity',
        },
        {
            $Type : 'UI.DataField',
            Value : unitPrice,
            Label : 'Unit Price',
        }
    ]
);

annotate MFlowService.Categories with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Category Name',
        }
    ]
);

annotate MFlowService.Suppliers with @(
    UI.LineItem: [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Supplier Name',
        },
        {
            $Type : 'UI.DataField',
            Value : contactEmail,
            Label : 'Contact Email',
        }
    ]
);

annotate MFlowService.Materials with @(Capabilities.Insertable : true);
annotate MFlowService.Categories with @(Capabilities.Insertable : true);
annotate MFlowService.Suppliers with @(Capabilities.Insertable : true);




