entity Materials {
    key ID          : UUID;
    name            : String(100);
    description     : String(255);
    quantity        : Integer;
    unitPrice       : Decimal(10,2);
    category        : Association to Categories;
    supplier        : Association to Suppliers;
}

entity Categories {
    key ID          : UUID;
    name            : String(50);
}

entity Suppliers {
    key ID          : UUID;
    name            : String(100);
    contactEmail    : String;
}
