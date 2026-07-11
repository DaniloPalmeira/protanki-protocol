import { PacketDef, def } from "../registry/packet-def";

// Codec manual no server (lista de países). Schema para o bridge.
export const LocalizationInfo = def({ id: -1232334539, name: "LocalizationInfo", direction: "s2c", schema: [{ name: "countries", type: "list", of: [{ name: "code", type: "string" }, { name: "label", type: "string" }] }, { name: "defaultCountryCode", type: "string" }, { name: "locationCheckEnabled", type: "bool" }] });
export const RequestPaymentWindow = def({ id: -296048697, name: "RequestPaymentWindow", direction: "c2s", schema: [] });
export const RequestShopData = def({ id: 1153801756, name: "RequestShopData", direction: "c2s", schema: [] });
export const SetShopCountry = def({ id: 921004371, name: "SetShopCountry", direction: "c2s", schema: [{ name: "countryCode", type: "string" }] });
export const ShopData = def({ id: 1863710730, name: "ShopData", direction: "s2c", schema: [{ name: "payload", type: "string" }] });
export const ShowPaymentWindow = def({ id: 1870342869, name: "ShowPaymentWindow", direction: "s2c", schema: [] });
export const PurchasePresent = def({ id: -1518850075, name: "PurchasePresent", direction: "s2c", schema: [{ name: "itemId", type: "string" }, { name: "recipientId", type: "string" }, { name: "message", type: "string" }, { name: "quantity", type: "i32" }] });
// Alerta de compra concluída (labels STRING_DONATION_ALERT_*). Compras em sequência ACUMULAM
// (+=) na janela já aberta. Captura "750k + 7 dias": [150000, 225000, 375000, 7, img 6628]
// (doubleCrystalBonus = soma dos outros dois quando o double está ativo). Zeros são omitidos
// da janela (compra só de premium vem com os 3 primeiros zerados).
export const ShowDonationAlert = def({ id: 1566424318, name: "ShowDonationAlert", direction: "s2c", schema: [
    { name: "donatedCrystals", type: "i32" },
    { name: "packageBonusCrystals", type: "i32" },
    { name: "doubleCrystalBonusCrystals", type: "i32" },
    { name: "premiumDays", type: "i32" },
    { name: "image", type: "longPair" },
] });
