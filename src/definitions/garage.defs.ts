import { PacketDef } from "../registry/packet-def";

export const BuyItem: PacketDef = { id: -1961983005, name: "BuyItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }, { name: "quantity", type: "i32" }, { name: "price", type: "i32" }] };
export const EquipItemRequest: PacketDef = { id: -1505530736, name: "EquipItemRequest", direction: "c2s", schema: [{ name: "itemId", type: "string" }] };
export const GarageItems: PacketDef = { id: -255516505, name: "GarageItems", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const MountItem: PacketDef = { id: 2062201643, name: "MountItem", direction: "s2c", schema: [{ name: "itemId", type: "string" }, { name: "owned", type: "bool" }] };
export const FitItem: PacketDef = { id: 1091756732, name: "FitItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }] };
export const RequestGarage: PacketDef = { id: -479046431, name: "RequestGarage", direction: "c2s", schema: [] };
export const ShopItems: PacketDef = { id: -300370823, name: "ShopItems", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const UnloadGarage: PacketDef = { id: 1211186637, name: "UnloadGarage", direction: "s2c", schema: [] };
