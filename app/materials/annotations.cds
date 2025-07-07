using MFlowService as service from '../../srv/service';

annotate service.Materials with {
  category_ID @Common.ValueList: {
    CollectionPath : 'Categories',
    Parameters : [
      { $Type : 'Common.ValueListParameterInOut',   LocalDataProperty : 'category_ID', ValueListProperty : 'ID'   },
      { $Type : 'Common.ValueListParameterDisplayOnly',               ValueListProperty : 'name'                }
    ]
  };

  supplier_ID @Common.ValueList: {
    CollectionPath : 'Suppliers',
    Parameters : [
      { $Type : 'Common.ValueListParameterInOut',   LocalDataProperty : 'supplier_ID', ValueListProperty : 'ID'   },
      { $Type : 'Common.ValueListParameterDisplayOnly',               ValueListProperty : 'name'                },
      { $Type : 'Common.ValueListParameterDisplayOnly',               ValueListProperty : 'contactEmail'        }
    ]
  };
  name @Common.ValueList:{
    CollectionPath : 'Materials',
    Parameters : [
      { $Type : 'Common.ValueListParameterInOut',   LocalDataProperty : 'name', ValueListProperty : 'name'   },
      { $Type : 'Common.ValueListParameterDisplayOnly',               ValueListProperty : 'description'        }
    ]
  }
};

// Habilitar operaciones CRUD estándar
annotate service.Materials with @(Capabilities.Insertable : true, Capabilities.Updatable : true, Capabilities.Deletable : true,
    UI.SelectionFields : [
        name,
        supplier_ID,
        category_ID,
    ]);

annotate service.Materials with {
    name @Common.Label : 'Material Name';
    category_ID @Common.Label : 'Category';
    supplier_ID @Common.Label : 'Supplier';
};

// FieldGroup y Facet para ObjectPage editable
annotate service.Materials with @(
    UI.FieldGroup #General : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : description,
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
            {
                $Type : 'UI.DataField',
                Label : 'Category',
                Value : category_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Supplier',
                Value : supplier_ID,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneralInfo',
            Label : 'General Information',
            Target : '@UI.FieldGroup#General',
        },
    ],
);

annotate service.Materials with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Name',
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
        },
        {
            $Type : 'UI.DataField',
            Value : categoryName,
            Label : 'Category',
        },
        {
            $Type : 'UI.DataField',
            Value : supplierName,
            Label : 'Supplier',
        },
    ],
);
