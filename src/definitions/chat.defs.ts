import { PacketDef, def } from "../registry/packet-def";
import { fields } from "../schema/infer";
import { PacketSchema } from "../schema/types";

const CHAT_USER = fields([
    { name: "moderatorLevel", type: "i32" },
    { name: "ip", type: "string" },
    { name: "rank", type: "i32" },
    { name: "uid", type: "string" },
]);

export const SendChatMessage = def({ id: 705454610, name: "SendChatMessage", direction: "c2s", schema: [{ name: "targetNickname", type: "string" }, { name: "message", type: "string" }] });
export const ChatHistory = def({ id: -1263520410, name: "ChatHistory", direction: "s2c", schema: [{ name: "messages", type: "list", of: [{ name: "source", type: "optObject", of: CHAT_USER }, { name: "isSystem", type: "bool" }, { name: "target", type: "optObject", of: CHAT_USER }, { name: "message", type: "string" }, { name: "isWarning", type: "bool" }] }] });
export const ChatProperties = def({ id: 178154988, name: "ChatProperties", direction: "s2c", schema: [{ name: "admin", type: "bool" }, { name: "antifloodEnabled", type: "bool" }, { name: "bufferSize", type: "i32" }, { name: "chatEnabled", type: "bool" }, { name: "chatModeratorLevel", type: "i32" }, { name: "linksWhiteList", type: "optStringArray" }, { name: "minChar", type: "i32" }, { name: "minWord", type: "i16" }, { name: "selfName", type: "string" }, { name: "showLinks", type: "bool" }, { name: "typingSpeedAntifloodEnabled", type: "bool" }] });
export const AntifloodSettings = def({ id: 744948472, name: "AntifloodSettings", direction: "s2c", schema: [{ name: "charDelayFactor", type: "i32" }, { name: "messageBaseDelay", type: "i32" }] });
export const UnloadLobbyChat = def({ id: -920985123, name: "UnloadLobbyChat", direction: "s2c", schema: [] });
// Moderação: remove TODAS as mensagens do usuário do chat do lobby (modelo 28).
export const RemoveUserChatMessages = def({ id: 1993050216, name: "RemoveUserChatMessages", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
