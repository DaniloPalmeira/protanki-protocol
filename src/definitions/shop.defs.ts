import { PacketDef, def } from "../registry/packet-def";

// Codec manual no server (lista de países). Schema para o bridge.
export const LocalizationInfo = def({ id: -1232334539, name: "LocalizationInfo", direction: "s2c", schema: [{ name: "countries", type: "list", of: [{ name: "code", type: "string" }, { name: "label", type: "string" }] }, { name: "defaultCountryCode", type: "string" }, { name: "locationCheckEnabled", type: "bool" }] });
export const RequestPaymentWindow = def({ id: -296048697, name: "RequestPaymentWindow", direction: "c2s", schema: [] });
export const RequestShopData = def({ id: 1153801756, name: "RequestShopData", direction: "c2s", schema: [] });
export const SetShopCountry = def({ id: 921004371, name: "SetShopCountry", direction: "c2s", schema: [{ name: "countryCode", type: "string" }] });
export const ShopData = def({ id: 1863710730, name: "ShopData", direction: "s2c", schema: [{ name: "payload", type: "string" }] });
export const ShowPaymentWindow = def({ id: 1870342869, name: "ShowPaymentWindow", direction: "s2c", schema: [] });
