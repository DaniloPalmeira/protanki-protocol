import { PacketDef, def } from "../registry/packet-def";

export const BuyItem = def({ id: -1961983005, name: "BuyItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }, { name: "quantity", type: "i32" }, { name: "price", type: "i32" }] });
export const EquipItemRequest = def({ id: -1505530736, name: "EquipItemRequest", direction: "c2s", schema: [{ name: "itemId", type: "string" }] });
export const GarageItems = def({ id: -255516505, name: "GarageItems", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] });
export const MountItem = def({ id: 2062201643, name: "MountItem", direction: "s2c", schema: [{ name: "itemId", type: "string" }, { name: "owned", type: "bool" }] });
export const FitItem = def({ id: 1091756732, name: "FitItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }] });
// Pedir p/ abrir o garage focado num item. Enviado: (a) ao clicar num item do alerta de novos
// itens ("TEXT_GARAGE_NEW_ITEMS_ALERT", com item.name) e (b) pelo botão/banner do PRO battle
// (hardcoded "pro_battle_m0"). Capturas: c2s, sempre "pro_battle_m0".
export const OpenGarageAtItem = def({ id: -1176568376, name: "OpenGarageAtItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }] });
export const RequestGarage = def({ id: -479046431, name: "RequestGarage", direction: "c2s", schema: [] });
export const ShopItems = def({ id: -300370823, name: "ShopItems", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] });
export const UnloadGarage = def({ id: 1211186637, name: "UnloadGarage", direction: "s2c", schema: [] });
