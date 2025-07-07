using { cuid, managed } from '@sap/cds/common';
entity Materials: managed, cuid {
    name            : String(100);
    description     : String(255);
    quantity        : Integer;
    unitPrice       : Decimal(10,2);
    category_ID     : UUID;
    category        : Association to Categories on category_ID = category.ID;
    supplier_ID     : UUID;
    supplier        : Association to Suppliers on  supplier_ID = supplier.ID;
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
    material        : Association to Materials on material.ID = $self.material_ID;
    material_ID      : UUID;          // ID del material
    purchaseOrder   : Association to PurchaseOrders on purchaseOrder.orderNumber = $self.orderNumber;
    orderNumber     : String(50);      // Referencia a la orden de compra
    movementType    : String(20);      // Ej: 'Entrada', 'Salida'
    quantity        : Integer;         // Cantidad del movimiento
    movementDate    : DateTime;        // Fecha del movimiento
}
