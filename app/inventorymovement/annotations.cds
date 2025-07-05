using MFlowService as service from '../../srv/service';

annotate service.InventoryMovement with @(
    Capabilities.Deletable : false,
    Capabilities.Updatable : false,
    UI.SelectionFields : [
        movementType,
    ],
);


annotate service.InventoryMovement with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Movement Type',
            Value : movementType,
        },
        {
            $Type : 'UI.DataField',
            Label: 'Order Number',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material ID',
            Value : material_ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material Name',
            Value : material.name
        },
        {
            $Type : 'UI.DataField',
            Label : 'Quantity',
            Value : quantity,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Movement Date',
            Value : movementDate,
        },
        
    ]
);
annotate service.InventoryMovement with {
    material @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Materials',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : material_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'quantity',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'unitPrice',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'category_ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'supplier_ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'IsActiveEntity',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'HasActiveEntity',
            },
        ],
    }
};
annotate service.InventoryMovement with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Order Number',
                Value : orderNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Movement Date',
                Value : movementDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material ID',
                Value : material_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material Name',
                Value : material.name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Movement Type',
                Value : movementType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Quantity',
                Value : quantity,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);

annotate service.InventoryMovement with {
    movementType @Common.Label : 'movementType'
};


