using MFlowService as service from '../../srv/service';
annotate Materials with @Capabilities : { Insertable : true, Updatable : true, Deletable : true 
};
annotate service.Materials with {
    // Mostrar texto de la entidad relacionada en vez de GUID
    category_ID @Common.Text: category.name;
    category_ID @Common.TextArrangement: #TextOnly;
    supplier_ID @Common.Text: supplier.name;
    supplier_ID @Common.TextArrangement: #TextOnly;

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
            { $Type : 'Common.ValueListParameterDisplayOnly',               ValueListProperty : 'name'                }
        ]
    };
};


annotate service.Materials with @(
    UI.LineItem : [
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
        },
        {
            $Type : 'UI.DataField',
            Value : category.name,
            Label : 'Category',
        },
        {
            $Type : 'UI.DataField',
            Value : supplier.name,
            Label : 'Supplier',
        },
        
    ],
    UI.SelectionFields : [
        name,
        category_ID,
        supplier_ID,
    ],
);
annotate service.Materials with {
    name        @Common.Label : 'Material Name';
    category_ID @Common.Label : 'Category';
    supplier_ID @Common.Label : 'Supplier';
};

annotate service.Materials with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Material Name',
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
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
