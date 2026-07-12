import { PacketDef, def } from "../registry/packet-def";

export const BuyItem = def({ id: -1961983005, name: "BuyItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }, { name: "quantity", type: "i32" }, { name: "price", type: "i32" }] });
export const EquipItemRequest = def({ id: -1505530736, name: "EquipItemRequest", direction: "c2s", schema: [{ name: "itemId", type: "string" }] });
export const GarageItems = def({ id: -255516505, name: "GarageItems", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] });
export const MountItem = def({ id: 2062201643, name: "MountItem", direction: "s2c", schema: [{ name: "itemId", type: "string" }, { name: "owned", type: "bool" }] });
export const FitItem = def({ id: 1091756732, name: "FitItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }] });
// Alerta de novos itens no garage (dialog "TEXT_GARAGE_NEW_ITEMS_ALERT"; clicar num item envia
// OpenGarageAtItem). CONFIRMADO por amostra real: name = nome de exibição localizado
// ("«Todo-Poderoso»", "Vespa"), price = preço em cristais (200/700/18350...), itemId = id de
// garage ("almighty_m0", "wasp_m0"), modificationIndex m0/m1/m2 (-1 p/ paints/kits),
// category/viewCategory = enums distintos, preview = resource id.
// bool1/bool2/discount seguem NÃO confirmados (sempre false/0 nas amostras; hipótese do client:
// um dos bools é "premium lock", discount = i32 de desconto — sem evidência empírica).
export const NewItemsAlert = def({ id: -47424608, name: "NewItemsAlert", direction: "s2c", schema: [
    { name: "items", type: "list", of: [
        { name: "category", type: "i32" }, { name: "viewCategory", type: "i32" }, { name: "modificationIndex", type: "i32" },
        { name: "bool1", type: "bool" }, { name: "name", type: "string" }, { name: "price", type: "i32" },
        { name: "bool2", type: "bool" }, { name: "preview", type: "resource" }, { name: "discount", type: "i32" },
        { name: "itemId", type: "string" },
    ] },
] });
// Pedir p/ abrir o garage focado num item. Enviado: (a) ao clicar num item do alerta de novos
// itens ("TEXT_GARAGE_NEW_ITEMS_ALERT", com item.name) e (b) pelo botão/banner do PRO battle
// (hardcoded "pro_battle_m0"). Capturas: c2s, sempre "pro_battle_m0".
export const OpenGarageAtItem = def({ id: -1176568376, name: "OpenGarageAtItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }] });
export const RequestGarage = def({ id: -479046431, name: "RequestGarage", direction: "c2s", schema: [] });
export const ShopItems = def({ id: -300370823, name: "ShopItems", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] });
export const UnloadGarage = def({ id: 1211186637, name: "UnloadGarage", direction: "s2c", schema: [] });
// Troca a aba/categoria ativa do garage (mesmo enum de item.category do GarageItems). Amostra: "weapon".
export const SelectGarageCategory = def({ id: 1318061480, name: "SelectGarageCategory", direction: "s2c", schema: [{ name: "category", type: "string" }] });
// Compra de item DO GARAGE por cristais (client valida saldo antes). Amostra: ("potter_m0", 85080).
export const BuyGarageItem = def({ id: -523392052, name: "BuyGarageItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }, { name: "price", type: "i32" }] });
// Foca/seleciona um item na UI do garage — contraparte s2c do OpenGarageAtItem.
export const SelectGarageItem = def({ id: -803365239, name: "SelectGarageItem", direction: "s2c", schema: [{ name: "itemId", type: "string" }] });
