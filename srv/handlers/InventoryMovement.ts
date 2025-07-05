import { UUID } from "crypto";
import { InventoryMovement, MovementType } from "../types/types";


export class InventoryMov {
  
  async moveInventory( InventoryMovement: InventoryMovement[],
    movementType: MovementType
  ){
    try {
        if(movementType === 'IN' ){
            for (const movement of InventoryMovement) {
                const material = await SELECT.one.from('Materials').where({ ID: movement.material_ID });
                if (!material) throw new Error("Material not found");
                let newQuantity = material.quantity + movement.quantity;
                await UPDATE('Materials')
                  .set({ quantity: newQuantity })
                  .where({ ID: movement.material_ID });
                await INSERT.into('InventoryMovement').entries(movement);
            }
              
        }
    } catch (error:any) {
        throw new Error(`Error moving inventory: ${error.message}`);
        
    }
  }
}
