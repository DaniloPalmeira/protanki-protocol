import { PacketDef } from "../registry/packet-def";

export const InviteCode: PacketDef = { id: 509394385, name: "InviteCode", direction: "c2s", schema: [{ name: "inviteCode", type: "string" }] };
export const InviteCodeInvalid: PacketDef = { id: 312571157, name: "InviteCodeInvalid", direction: "s2c", schema: [] };
export const InviteCodeLogin: PacketDef = { id: 714838911, name: "InviteCodeLogin", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };
export const InviteCodeRegister: PacketDef = { id: 184934482, name: "InviteCodeRegister", direction: "s2c", schema: [] };
