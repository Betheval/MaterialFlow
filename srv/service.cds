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
        projection on m;

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
    entity PurchaseOrder     as
        projection on po {
            *
        }
        actions {
            action approveOrder() returns PurchaseOrder;
            action cancelOrder()  returns PurchaseOrder;
        };


    entity PurchaseOrderItem as
        projection on poi {
            material.name as materialName,
            material,
            *
        };

    entity InventoryMovement as projection on im;
    //CHATBOT

    action chatWithLlama(message : String) returns String;

}


annotate MFlowService.Materials with @(
    Common.SideEffects: {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            supplier_ID,category_ID
        ],
        TargetProperties : [
            'supplierName','categoryName'
        ],
    },
);


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
