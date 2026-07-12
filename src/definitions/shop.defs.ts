import { PacketDef, def } from "../registry/packet-def";

// Codec manual no server (lista de países). Schema para o bridge.
export const LocalizationInfo = def({ id: -1232334539, name: "LocalizationInfo", direction: "s2c", schema: [{ name: "countries", type: "list", of: [{ name: "code", type: "string" }, { name: "label", type: "string" }] }, { name: "defaultCountryCode", type: "string" }, { name: "locationCheckEnabled", type: "bool" }] });
export const RequestPaymentWindow = def({ id: -296048697, name: "RequestPaymentWindow", direction: "c2s", schema: [] });
export const RequestShopData = def({ id: 1153801756, name: "RequestShopData", direction: "c2s", schema: [] });
export const SetShopCountry = def({ id: 921004371, name: "SetShopCountry", direction: "c2s", schema: [{ name: "countryCode", type: "string" }] });
// Conteúdo passa por JSON.parse no client → jsonData (consistente com GarageItems/ShopItems).
export const ShopData = def({ id: 1863710730, name: "ShopData", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] });
export const ShowPaymentWindow = def({ id: 1870342869, name: "ShowPaymentWindow", direction: "s2c", schema: [] });
// c2s: jogador ENVIA um presente (dialog de presente). Ordem do sender: uid do destinatário,
// nome do item, mensagem, quantidade. (Era s2c com os 2 primeiros campos invertidos.)
export const PurchasePresent = def({ id: -1518850075, name: "PurchasePresent", direction: "c2s", schema: [{ name: "recipientUid", type: "string" }, { name: "itemName", type: "string" }, { name: "message", type: "string" }, { name: "quantity", type: "i32" }] });
// Compra de item da loja com método de pagamento escolhido (janela pós "ShopItemChosenEVENT").
// Amostra: ("crystalls_pack_1", "cryptomus").
export const PurchaseShopItem = def({ id: 880756819, name: "PurchaseShopItem", direction: "c2s", schema: [{ name: "itemId", type: "string" }, { name: "paymentMethod", type: "string" }] });
// Resposta: client abre a URL em nova aba (navigateToURL _blank). Amostra: checkout do cryptomus.
export const OpenPaymentUrl = def({ id: -1455955413, name: "OpenPaymentUrl", direction: "s2c", schema: [{ name: "url", type: "string" }] });
// Diálogo de código promocional (aberto quando o itemId da loja contém "promo";
// labels PROMO_CODE_DESCRIPTION_TEXT / PROMO_CODE_INVALID_LABEL).
export const ActivatePromoCode = def({ id: -511004908, name: "ActivatePromoCode", direction: "c2s", schema: [{ name: "code", type: "string" }] });
export const PromoCodeInvalid = def({ id: -1850050333, name: "PromoCodeInvalid", direction: "s2c", schema: [] });
// Caso de sucesso do promo (fecha/anima o diálogo) — vizinho do Invalid no mesmo módulo.
export const PromoCodeValid = def({ id: -1859441081, name: "PromoCodeValid", direction: "s2c", schema: [] });
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
