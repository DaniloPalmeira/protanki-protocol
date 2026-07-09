import { PacketDef } from "../registry/packet-def";

export const ReferralInfo: PacketDef = { id: 832270655, name: "ReferralInfo", direction: "s2c", schema: [{ name: "hash", type: "string" }, { name: "host", type: "string" }] };
export const RequestReferralInfo: PacketDef = { id: -169921234, name: "RequestReferralInfo", direction: "c2s", schema: [] };
// Codec manual no server. Schema para o bridge.
export const ReferralInfoDetails: PacketDef = { id: 1587315905, name: "ReferralInfoDetails", direction: "s2c", schema: [{ name: "referredUsers", type: "list", of: [{ name: "income", type: "i32" }, { name: "user", type: "string" }] }, { name: "url", type: "string" }, { name: "bannerCode", type: "string" }, { name: "defaultMessage", type: "string" }] };
