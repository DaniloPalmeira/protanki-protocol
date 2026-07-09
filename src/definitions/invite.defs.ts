import { PacketDef, def } from "../registry/packet-def";

export const InviteCode = def({ id: 509394385, name: "InviteCode", direction: "c2s", schema: [{ name: "inviteCode", type: "string" }] });
export const InviteCodeInvalid = def({ id: 312571157, name: "InviteCodeInvalid", direction: "s2c", schema: [] });
export const InviteCodeLogin = def({ id: 714838911, name: "InviteCodeLogin", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const InviteCodeRegister = def({ id: 184934482, name: "InviteCodeRegister", direction: "s2c", schema: [] });
