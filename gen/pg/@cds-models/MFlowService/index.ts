// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';

export default class {
  declare static readonly adjustStock: typeof adjustStock;
}

export function _MaterialAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Material extends Base {
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: _.User | null
    declare ID?: __.Key<string>
    declare name?: string | null
    declare description?: string | null
    declare quantity?: number | null
    declare unitPrice?: number | null
    declare category?: __.Association.to<Category> | null
    declare category_ID?: string | null
    declare supplier?: __.Association.to<Supplier> | null
    declare supplier_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Material>;
    declare static readonly elements: __.ElementsOf<Material>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Material extends _MaterialAspect(__.Entity) {static drafts: __.DraftOf<Material>}
Object.defineProperty(Material, 'name', { value: 'MFlowService.Materials' })
Object.defineProperty(Material, 'is_singular', { value: true })
export class Materials extends Array<Material> {static drafts: __.DraftsOf<Material>
$count?: number}
Object.defineProperty(Materials, 'name', { value: 'MFlowService.Materials' })

export function _CategoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Category extends Base {
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: _.User | null
    declare ID?: __.Key<string>
    declare name?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Category>;
    declare static readonly elements: __.ElementsOf<Category>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Category extends _CategoryAspect(__.Entity) {static drafts: __.DraftOf<Category>}
Object.defineProperty(Category, 'name', { value: 'MFlowService.Categories' })
Object.defineProperty(Category, 'is_singular', { value: true })
export class Categories extends Array<Category> {static drafts: __.DraftsOf<Category>
$count?: number}
Object.defineProperty(Categories, 'name', { value: 'MFlowService.Categories' })

export function _SupplierAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Supplier extends Base {
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: _.User | null
    declare ID?: __.Key<string>
    declare name?: string | null
    declare contactEmail?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Supplier>;
    declare static readonly elements: __.ElementsOf<Supplier>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Supplier extends _SupplierAspect(__.Entity) {static drafts: __.DraftOf<Supplier>}
Object.defineProperty(Supplier, 'name', { value: 'MFlowService.Suppliers' })
Object.defineProperty(Supplier, 'is_singular', { value: true })
export class Suppliers extends Array<Supplier> {static drafts: __.DraftsOf<Supplier>
$count?: number}
Object.defineProperty(Suppliers, 'name', { value: 'MFlowService.Suppliers' })

export function _PurchaseOrderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class PurchaseOrder extends Base {
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: _.User | null
    declare ID?: __.Key<string>
    declare orderNumber?: __.Key<string>
    declare supplier?: __.Association.to<Supplier> | null
    declare supplier_ID?: string | null
    declare orderDate?: __.CdsDate | null
    declare status?: string | null
    declare totalAmount?: number | null
    declare items?: __.Composition.of.many<PurchaseOrderItem_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<PurchaseOrder>;
    declare static readonly elements: __.ElementsOf<PurchaseOrder>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class PurchaseOrder extends _PurchaseOrderAspect(__.Entity) {static drafts: __.DraftOf<PurchaseOrder>}
Object.defineProperty(PurchaseOrder, 'name', { value: 'MFlowService.PurchaseOrder' })
Object.defineProperty(PurchaseOrder, 'is_singular', { value: true })
export class PurchaseOrder_ extends Array<PurchaseOrder> {static drafts: __.DraftsOf<PurchaseOrder>
$count?: number}
Object.defineProperty(PurchaseOrder_, 'name', { value: 'MFlowService.PurchaseOrder' })

export function _PurchaseOrderItemAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class PurchaseOrderItem extends Base {
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: _.User | null
    declare ID?: __.Key<string>
    declare purchaseOrder?: __.Association.to<PurchaseOrder> | null
    declare orderNumber?: string | null
    declare material?: __.Association.to<Material> | null
    declare material_ID?: string | null
    declare quantity?: number | null
    declare unitPrice?: number | null
    declare totalPrice?: number | null
    declare materialName?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<PurchaseOrderItem>;
    declare static readonly elements: __.ElementsOf<PurchaseOrderItem>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class PurchaseOrderItem extends _PurchaseOrderItemAspect(__.Entity) {static drafts: __.DraftOf<PurchaseOrderItem>}
Object.defineProperty(PurchaseOrderItem, 'name', { value: 'MFlowService.PurchaseOrderItem' })
Object.defineProperty(PurchaseOrderItem, 'is_singular', { value: true })
export class PurchaseOrderItem_ extends Array<PurchaseOrderItem> {static drafts: __.DraftsOf<PurchaseOrderItem>
$count?: number}
Object.defineProperty(PurchaseOrderItem_, 'name', { value: 'MFlowService.PurchaseOrderItem' })

export function _InventoryMovementAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class InventoryMovement extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: _.User | null
    declare material?: __.Association.to<Material> | null
    declare material_ID?: string | null
    declare movementType?: string | null
    declare quantity?: number | null
    declare referenceDoc?: string | null
    declare notes?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<InventoryMovement>;
    declare static readonly elements: __.ElementsOf<InventoryMovement>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class InventoryMovement extends _InventoryMovementAspect(__.Entity) {}
Object.defineProperty(InventoryMovement, 'name', { value: 'MFlowService.InventoryMovement' })
Object.defineProperty(InventoryMovement, 'is_singular', { value: true })
export class InventoryMovement_ extends Array<InventoryMovement> {$count?: number}
Object.defineProperty(InventoryMovement_, 'name', { value: 'MFlowService.InventoryMovement' })


export declare const adjustStock:  {
  // positional
  (materialID: string | null, adjustment: string | null): globalThis.Promise<Material | null> | Material | null
  // named
  ({materialID, adjustment}: {materialID?: string | null, adjustment?: string | null}): globalThis.Promise<Material | null> | Material | null
  // metadata (do not use)
  __parameters: {materialID?: string | null, adjustment?: string | null}, __returns: globalThis.Promise<Material | null> | Material | null
  kind: 'action'
}