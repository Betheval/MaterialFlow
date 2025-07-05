using {
    Materials          as m,
    Suppliers          as s,
    Categories         as c,
    PurchaseOrders     as po,
    PurchaseOrderItems as poi,
    InventoryMovement  as im
} from '../db/schema';

service MFlowService @(requires: 'authenticated-user') {
    @odata.draft.enabled
    entity Materials @(restrict: [{
        grant: ['*'],
        to   : 'MaterialFlow.Read'
    }, ])                    as
        projection on m {
            *,
            category.name as categoryName,
            supplier.name as supplierName
        };

    @odata.draft.enabled
    entity Categories @(restrict: [{
        grant: ['*'],
        to   : 'MaterialFlow.Read'
    }, ])                    as projection on c;

    @odata.draft.enabled
    entity Suppliers @(restrict: [{
        grant: ['*'],
        to   : 'MaterialFlow.Read'
    }, ])                    as projection on s;

    @odata.draft.enabled
    entity PurchaseOrder     as projection on po{
        *
    }
    actions{
        action approveOrder() returns PurchaseOrder;
    };


    entity PurchaseOrderItem as
        projection on poi {
            material.name as materialName,
            material,
            *
        };

    entity InventoryMovement as projection on im;

}

annotate MFlowService.Materials with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: name,
        Label: 'Material Name',
    },
    {
        $Type: 'UI.DataField',
        Value: description,
        Label: 'Description',
    },
    {
        $Type: 'UI.DataField',
        Value: quantity,
        Label: 'Quantity',
    },
    {
        $Type: 'UI.DataField',
        Value: unitPrice,
        Label: 'Unit Price',
    }
]);

annotate MFlowService.Categories with @(UI.LineItem: [{
    $Type: 'UI.DataField',
    Value: name,
    Label: 'Category Name',
}]);

annotate MFlowService.Suppliers with @(UI.LineItem: [
    {
        $Type: 'UI.DataField',
        Value: name,
        Label: 'Supplier Name',
    },
    {
        $Type: 'UI.DataField',
        Value: contactEmail,
        Label: 'Contact Email',
    }
]);

annotate MFlowService.Materials with @(
    Capabilities.Insertable: true,
    Capabilities.Updatable : true,
    Capabilities.Deletable : true
);

annotate MFlowService.Categories with @(
    Capabilities.Insertable: true,
    Capabilities.Updatable : true,
    Capabilities.Deletable : true
);

annotate MFlowService.Suppliers with @(
    Capabilities.Insertable: true,
    Capabilities.Updatable : true,
    Capabilities.Deletable : true
);

annotate MFlowService.PurchaseOrderItem with @(
    Capabilities.Insertable: true,
    Capabilities.Updatable : true,
    Capabilities.Deletable : true
);
