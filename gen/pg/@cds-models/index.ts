// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './_';
import * as _sap_common from './sap/common';

export type Language = __.Association.to<_sap_common.Language>;
export type Currency = __.Association.to<_sap_common.Currency>;
export type Country = __.Association.to<_sap_common.Country>;
export type Timezone = __.Association.to<_sap_common.Timezone>;
export type User = string;
// the following represents the CDS aspect 'cuid'
export function _cuidAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class cuid extends Base {
    declare ID?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'aspect';
    declare static readonly keys: __.KeysOf<cuid>;
    declare static readonly elements: __.ElementsOf<cuid>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class cuid extends _cuidAspect(__.Entity) {}
export class cuid_ extends Array<cuid> {$count?: number}
Object.defineProperty(cuid_, 'name', { value: 'cuid' })
// the following represents the CDS aspect 'managed'
export function _managedAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class managed extends Base {
    declare createdAt?: __.CdsTimestamp | null
    declare createdBy?: User | null
    declare modifiedAt?: __.CdsTimestamp | null
    declare modifiedBy?: User | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'aspect';
    declare static readonly keys: __.KeysOf<managed>;
    declare static readonly elements: __.ElementsOf<managed>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class managed extends _managedAspect(__.Entity) {}
export class managed_ extends Array<managed> {$count?: number}
Object.defineProperty(managed_, 'name', { value: 'managed' })
// the following represents the CDS aspect 'temporal'
export function _temporalAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class temporal extends Base {
    declare validFrom?: __.CdsTimestamp | null
    declare validTo?: __.CdsTimestamp | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'aspect';
    declare static readonly keys: __.KeysOf<temporal>;
    declare static readonly elements: __.ElementsOf<temporal>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class temporal extends _temporalAspect(__.Entity) {}
export class temporal_ extends Array<temporal> {$count?: number}
Object.defineProperty(temporal_, 'name', { value: 'temporal' })
export function _MaterialAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Material extends _managedAspect(_cuidAspect(Base)) {
    declare name?: string | null
    declare description?: string | null
    declare quantity?: number | null
    declare unitPrice?: number | null
    declare category?: __.Association.to<Category> | null
    declare category_ID?: string | null
    declare supplier?: __.Association.to<Supplier> | null
    declare supplier_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Material> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<Material>;
    declare static readonly actions: typeof cuid.actions & typeof managed.actions & globalThis.Record<never, never>;
  };
}
export class Material extends _MaterialAspect(__.Entity) {}
Object.defineProperty(Material, 'name', { value: 'Materials' })
Object.defineProperty(Material, 'is_singular', { value: true })
export class Materials extends Array<Material> {$count?: number}
Object.defineProperty(Materials, 'name', { value: 'Materials' })

export function _CategoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Category extends _managedAspect(_cuidAspect(Base)) {
    declare name?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Category> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<Category>;
    declare static readonly actions: typeof cuid.actions & typeof managed.actions & globalThis.Record<never, never>;
  };
}
export class Category extends _CategoryAspect(__.Entity) {}
Object.defineProperty(Category, 'name', { value: 'Categories' })
Object.defineProperty(Category, 'is_singular', { value: true })
export class Categories extends Array<Category> {$count?: number}
Object.defineProperty(Categories, 'name', { value: 'Categories' })

export function _SupplierAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Supplier extends _managedAspect(_cuidAspect(Base)) {
    declare name?: string | null
    declare contactEmail?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Supplier> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<Supplier>;
    declare static readonly actions: typeof cuid.actions & typeof managed.actions & globalThis.Record<never, never>;
  };
}
export class Supplier extends _SupplierAspect(__.Entity) {}
Object.defineProperty(Supplier, 'name', { value: 'Suppliers' })
Object.defineProperty(Supplier, 'is_singular', { value: true })
export class Suppliers extends Array<Supplier> {$count?: number}
Object.defineProperty(Suppliers, 'name', { value: 'Suppliers' })

export function _StockHistoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class StockHistory extends _cuidAspect(_managedAspect(Base)) {
    declare material?: __.Association.to<Material> | null
    declare material_ID?: string | null
    declare quantityChange?: number | null
    declare changeDate?: __.CdsDateTime | null
    declare reason?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<StockHistory> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<StockHistory>;
    declare static readonly actions: typeof managed.actions & typeof cuid.actions & globalThis.Record<never, never>;
  };
}
export class StockHistory extends _StockHistoryAspect(__.Entity) {}
Object.defineProperty(StockHistory, 'name', { value: 'StockHistory' })
Object.defineProperty(StockHistory, 'is_singular', { value: true })
export class StockHistory_ extends Array<StockHistory> {$count?: number}
Object.defineProperty(StockHistory_, 'name', { value: 'StockHistory' })

export function _PriceHistoryAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class PriceHistory extends _cuidAspect(_managedAspect(Base)) {
    declare material?: __.Association.to<Material> | null
    declare material_ID?: string | null
    declare oldPrice?: number | null
    declare newPrice?: number | null
    declare changeDate?: __.CdsDateTime | null
    declare reason?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<PriceHistory> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<PriceHistory>;
    declare static readonly actions: typeof managed.actions & typeof cuid.actions & globalThis.Record<never, never>;
  };
}
export class PriceHistory extends _PriceHistoryAspect(__.Entity) {}
Object.defineProperty(PriceHistory, 'name', { value: 'PriceHistory' })
Object.defineProperty(PriceHistory, 'is_singular', { value: true })
export class PriceHistory_ extends Array<PriceHistory> {$count?: number}
Object.defineProperty(PriceHistory_, 'name', { value: 'PriceHistory' })

export function _PurchaseOrderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class PurchaseOrder extends _managedAspect(_cuidAspect(Base)) {
    declare orderNumber?: string | null
    declare supplier?: __.Association.to<Supplier> | null
    declare supplier_ID?: string | null
    declare orderDate?: __.CdsDate | null
    declare status?: string | null
    declare totalAmount?: number | null
    declare items?: __.Composition.of.many<PurchaseOrderItems>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<PurchaseOrder> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<PurchaseOrder>;
    declare static readonly actions: typeof cuid.actions & typeof managed.actions & globalThis.Record<never, never>;
  };
}
export class PurchaseOrder extends _PurchaseOrderAspect(__.Entity) {}
Object.defineProperty(PurchaseOrder, 'name', { value: 'PurchaseOrders' })
Object.defineProperty(PurchaseOrder, 'is_singular', { value: true })
export class PurchaseOrders extends Array<PurchaseOrder> {$count?: number}
Object.defineProperty(PurchaseOrders, 'name', { value: 'PurchaseOrders' })

export function _PurchaseOrderItemAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class PurchaseOrderItem extends _managedAspect(_cuidAspect(Base)) {
    declare purchaseOrder?: __.Association.to<PurchaseOrder> | null
    declare purchaseOrder_ID?: string | null
    declare material?: __.Association.to<Material> | null
    declare material_ID?: string | null
    declare quantity?: number | null
    declare unitPrice?: number | null
    declare totalPrice?: number | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<PurchaseOrderItem> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<PurchaseOrderItem>;
    declare static readonly actions: typeof cuid.actions & typeof managed.actions & globalThis.Record<never, never>;
  };
}
export class PurchaseOrderItem extends _PurchaseOrderItemAspect(__.Entity) {}
Object.defineProperty(PurchaseOrderItem, 'name', { value: 'PurchaseOrderItems' })
Object.defineProperty(PurchaseOrderItem, 'is_singular', { value: true })
export class PurchaseOrderItems extends Array<PurchaseOrderItem> {$count?: number}
Object.defineProperty(PurchaseOrderItems, 'name', { value: 'PurchaseOrderItems' })

export function _InventoryMovementAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class InventoryMovement extends _cuidAspect(_managedAspect(Base)) {
    declare material?: __.Association.to<Material> | null
    declare material_ID?: string | null
    declare movementType?: string | null
    declare quantity?: number | null
    declare referenceDoc?: string | null
    declare notes?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<InventoryMovement> & typeof cuid.keys;
    declare static readonly elements: __.ElementsOf<InventoryMovement>;
    declare static readonly actions: typeof managed.actions & typeof cuid.actions & globalThis.Record<never, never>;
  };
}
export class InventoryMovement extends _InventoryMovementAspect(__.Entity) {}
Object.defineProperty(InventoryMovement, 'name', { value: 'InventoryMovement' })
Object.defineProperty(InventoryMovement, 'is_singular', { value: true })
export class InventoryMovement_ extends Array<InventoryMovement> {$count?: number}
Object.defineProperty(InventoryMovement_, 'name', { value: 'InventoryMovement' })
