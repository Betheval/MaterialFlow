using MFlowService as service from '../../srv/service';

// Value Help para Categoría
annotate service.Materials with {
    category @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Categories',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : category_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
        ],
    }
};

// Value Help para Proveedor
annotate service.Materials with {
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
        ],
    }
};

// Habilitar operaciones CRUD estándar
annotate service.Materials with @(Capabilities.Insertable : true, Capabilities.Updatable : true, Capabilities.Deletable : true,
    UI.SelectionFields : [
        name,
        category.name,
        supplier.name,
    ],);

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
                Value : category.name
            },
            {
                $Type : 'UI.DataField',
                Label : 'Supplier',
                Value : supplier.name,
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

annotate service.Materials with {
    name @Common.Label : 'Name'
};

annotate service.Categories with {
    name @Common.Label : 'Category Name'
};

annotate service.Suppliers with {
    name @Common.Label : 'Supplier Name'
};

