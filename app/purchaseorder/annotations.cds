using MFlowService as service from '../../srv/service';
///PurchaseOrder
annotate service.PurchaseOrder with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Order Number',
            Value : orderNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Order Date',
            Value : orderDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : status,
        },
        {

            $Type : 'UI.DataField',
            Label : 'Total Amount',
            Value : totalAmount,
        },
    ]
);
annotate service.PurchaseOrder with {
    supplier @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Suppliers',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : supplier_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'contactEmail',
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
annotate service.PurchaseOrder with {
    status @readonly : true;
};
annotate service.PurchaseOrder with @(
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
                Label : 'Order Date',
                Value : orderDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Status',

                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Total Amount',
                Value : totalAmount,
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
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet2',
            Label : 'Order Items Information',
            Target : 'items/@UI.LineItem',
        },
    ],
);


///PurchaseOrderItems
annotate service.PurchaseOrderItem with @(
    UI.FieldGroup #GeneratedGroup3 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Order Number',
                Value : orderNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material ID',
                Value : material_ID
            },
            {
                $Type : 'UI.DataField',
                Label : 'Quantity',
                Value : quantity,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Unit Price',
                Value : unitPrice,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet3',
            Label : 'Order Items Information',
            Target : '@UI.FieldGroup#GeneratedGroup3',
        },
    ],
);
annotate service.PurchaseOrderItem with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Material ID',
            Value :  material_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : materialName,
            Label : 'Material Name',
        },
        {
            $Type : 'UI.DataField',
            Label : 'Cantidad',
            Value : quantity,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Precio Unitario',
            Value : unitPrice,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Precio Total',
            Value : totalPrice,
        },
    ],
);

annotate service.PurchaseOrderItem with {
  material @Common.ValueList: {
    $Type: 'Common.ValueListType',
    CollectionPath: 'Materials',
    Parameters: [
      {
        $Type: 'Common.ValueListParameterInOut',
        LocalDataProperty: 'material_ID',
        ValueListProperty: 'ID'
      },
      {
        $Type: 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'name'
      },
      {
        $Type: 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'description'
      },
      {
        $Type: 'Common.ValueListParameterDisplayOnly',
        ValueListProperty: 'unitPrice'
      }
    ]
  }
};

annotate service.PurchaseOrder with {
    totalAmount @readonly : true;
};
annotate service.PurchaseOrderItem with {
    totalPrice @readonly : true;
    unitPrice @readonly : true;
    materialName @readonly : true;
};
