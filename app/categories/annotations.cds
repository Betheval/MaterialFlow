using MFlowService as service from '../../srv/service';

annotate service.Categories with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
    ],
    UI.SelectionFields : [
        name,
    ],
);
annotate service.Categories with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
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
