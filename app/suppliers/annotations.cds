using MFlowService as service from '../../srv/service';

annotate service.Suppliers with @(
    Common.SideEffects: {
        $Type : 'Common.SideEffectsType',
        // Propiedades cuya modificación puede requerir releer otras
        SourceProperties : [ ID ],
        // Propiedades objetivo que deben refrescarse en UI
        TargetProperties : [ name, contactEmail ]
    }
);

annotate service.Suppliers with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Supllier Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Contact Email',
            Value : contactEmail,
        },
    ],
    UI.SelectionFields : [
        name,
        contactEmail,
    ],
);
annotate service.Suppliers with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Supplier Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Contact Email',
                Value : contactEmail,
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
annotate service.Suppliers with {
    name @Common.Label : 'Supplier Name';
    contactEmail @Common.Label : 'Contact Email';
};
