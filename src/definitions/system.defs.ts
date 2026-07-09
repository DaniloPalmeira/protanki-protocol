import { PacketDef } from "../registry/packet-def";

export const SystemMessage: PacketDef = { id: -600078553, name: "SystemMessage", direction: "s2c", schema: [{ name: "text", type: "string" }] };
export const Ping: PacketDef = { id: -555602629, name: "Ping", direction: "s2c", schema: [] };
export const Pong: PacketDef = { id: 1484572481, name: "Pong", direction: "c2s", schema: [] };
// Codec manual no server (lista de i32 sem flag). Schema para o bridge.
export const CaptchaLocation: PacketDef = { id: 321971701, name: "CaptchaLocation", direction: "s2c", schema: [{ name: "captchaLocations", type: "list", of: [{ name: "location", type: "i32" }] }] };
export const InviteEnabled: PacketDef = { id: 444933603, name: "InviteEnabled", direction: "s2c", schema: [{ name: "requireInviteCode", type: "bool" }] };
export const ConfirmLayoutChange: PacketDef = { id: -593368100, name: "ConfirmLayoutChange", direction: "s2c", schema: [{ name: "fromLayout", type: "i32" }, { name: "toLayout", type: "i32" }] };
export const SetLayout: PacketDef = { id: 1118835050, name: "SetLayout", direction: "s2c", schema: [{ name: "layoutId", type: "i32" }] };

// ===== halt (system/halt.packets.ts) — codec manual no server =====
export const HaltServer: PacketDef = { id: -1712113407, name: "HaltServer", direction: "s2c", schema: [{ name: "seconds", type: "i32" }] };
export const BattleHalt: PacketDef = { id: -831998018, name: "BattleHalt", direction: "s2c", schema: [{ name: "text", type: "string" }] };
