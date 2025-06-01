using { cuid, managed } from '@sap/cds/common';
entity Materials: managed, cuid {
    name            : String(100);
    description     : String(255);
    quantity        : Integer;
    unitPrice       : Decimal(10,2);
    category        : Association to Categories;
    supplier        : Association to Suppliers;
}
entity Categories: managed, cuid {
    name            : String(50);
}
entity Suppliers: managed, cuid {
    name            : String(100);
    contactEmail    : String;
}

entity StockHistory  : cuid, managed {
    material        : Association to Materials;
    quantityChange   : Integer;
    changeDate       : DateTime;
    reason          : String(255);
}
entity PriceHistory : cuid, managed {
    material        : Association to Materials;
    oldPrice        : Decimal(10,2);
    newPrice        : Decimal(10,2);
    changeDate      : DateTime;
    reason          : String(255);
}
entity PurchaseOrders : managed, cuid {
  key orderNumber : String(50);
  supplier    : Association to Suppliers;
  orderDate   : Date;
  status      : String(30) default 'Pending'; // Ej: 'Pending', 'Approved', 'Rejected'
  totalAmount : Decimal(10,2);
  items : Composition of many PurchaseOrderItems on items.purchaseOrder = $self;
}

entity PurchaseOrderItems : managed, cuid {
  purchaseOrder : Association to PurchaseOrders on purchaseOrder.orderNumber = $self.orderNumber;
  orderNumber   : String(50);
  material      : Association to Materials;
  quantity      : Integer;
  unitPrice     : Decimal(10,2);
  totalPrice    : Decimal(10,2);
}
entity InventoryMovement : cuid, managed {
    material        : Association to Materials;
    movementType    : String(20);      // Ej: 'Entrada', 'Salida', Ajuste
    quantity        : Integer;
    referenceDoc    : String(50);      // Opcional: referencia a OC, factura, etc.
    notes           : String(255);
}
