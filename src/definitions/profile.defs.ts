import { PacketDef } from "../registry/packet-def";

export const GetUserInfo: PacketDef = { id: 1774907609, name: "GetUserInfo", direction: "c2s", schema: [{ name: "nickname", type: "string" }] };
export const OnlineNotifierData: PacketDef = { id: 2041598093, name: "OnlineNotifierData", direction: "s2c", schema: [{ name: "isOnline", type: "bool" }, { name: "server", type: "i32" }, { name: "nickname", type: "string" }] };
export const RankNotifierData: PacketDef = { id: -962759489, name: "RankNotifierData", direction: "s2c", schema: [{ name: "rank", type: "u8" }, { name: "nickname", type: "string" }] };
export const PremiumNotifierData: PacketDef = { id: -2069508071, name: "PremiumNotifierData", direction: "s2c", schema: [{ name: "premiumTimeLeftInSeconds", type: "i32" }, { name: "nickname", type: "string" }] };
export const ClanNotifierData: PacketDef = { id: -117055417, name: "ClanNotifierData", direction: "s2c", schema: [{ name: "inClan", type: "bool" }, { name: "clanTag", type: "string" }, { name: "nickname", type: "string" }] };
// Codec manual no server (lista de i32 sem flag). Schema para o bridge.
export const AchievementTips: PacketDef = { id: -1481254568, name: "AchievementTips", direction: "s2c", schema: [{ name: "achievementIds", type: "list", of: [{ name: "id", type: "i32" }] }] };
export const EmailInfo: PacketDef = { id: 613462801, name: "EmailInfo", direction: "s2c", schema: [{ name: "email", type: "string" }, { name: "emailConfirmed", type: "bool" }] };
export const PremiumInfo: PacketDef = { id: 1405859779, name: "PremiumInfo", direction: "s2c", schema: [{ name: "needShowNotificationCompletionPremium", type: "bool" }, { name: "needShowWelcomeAlert", type: "bool" }, { name: "reminderCompletionPremiumTime", type: "f32" }, { name: "wasShowAlertForFirstPurchasePremium", type: "bool" }, { name: "wasShowReminderCompletionPremium", type: "bool" }, { name: "lifeTimeInSeconds", type: "i32" }] };
export const UpdateCrystals: PacketDef = { id: -593513288, name: "UpdateCrystals", direction: "s2c", schema: [{ name: "crystals", type: "i32" }] };
export const UpdateScore: PacketDef = { id: 2116086491, name: "UpdateScore", direction: "s2c", schema: [{ name: "score", type: "i32" }] };
export const UpdateRank: PacketDef = { id: 1989173907, name: "UpdateRank", direction: "s2c", schema: [{ name: "rank", type: "i32" }, { name: "score", type: "i32" }, { name: "currentRankScore", type: "i32" }, { name: "nextRankScore", type: "i32" }, { name: "reward", type: "i32" }] };
export const UpdatePremiumTime: PacketDef = { id: 1391146385, name: "UpdatePremiumTime", direction: "s2c", schema: [{ name: "timeLeft", type: "i32" }] };
