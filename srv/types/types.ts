export enum MovementType {
  IN = "IN", // Entrada de inventario
  OUT = "OUT"  // Salida de inventario
}
export interface InventoryMovement {
  material_ID: string; // ID del material
  movementType: MovementType; // Tipo de movimiento (Entrada/Salida)
  quantity: number; // Cantidad del movimiento
}