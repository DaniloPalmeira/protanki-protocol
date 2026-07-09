import { PacketDef } from "../registry/packet-def";
import { PacketSchema } from "../schema/types";

const QUEST_FIELDS: PacketSchema = [
    { name: "canSkipForFree", type: "bool" },
    { name: "description", type: "string" },
    { name: "finishCriteria", type: "i32" },
    { name: "image", type: "resource" },
    { name: "prizes", type: "list", of: [{ name: "itemCount", type: "i32" }, { name: "itemName", type: "string" }] },
    { name: "progress", type: "i32" },
    { name: "questId", type: "i32" },
    { name: "skipCost", type: "i32" },
];

export const RequestQuestsWindow: PacketDef = { id: 1227293080, name: "RequestQuestsWindow", direction: "c2s", schema: [] };
export const ShowQuestsWindow: PacketDef = { id: 809822533, name: "ShowQuestsWindow", direction: "s2c", schema: [{ name: "quests", type: "list", of: QUEST_FIELDS }, { name: "currentQuestLevel", type: "i32" }, { name: "currentQuestStreak", type: "i32" }, { name: "doneForToday", type: "bool" }, { name: "questImage", type: "resource" }, { name: "rewardImage", type: "resource" }] };
// Codec manual no server. Schema para o bridge.
export const QuestSummaryWindow: PacketDef = { id: 885055495, name: "QuestSummaryWindow", direction: "s2c", schema: [{ name: "currentQuestLevel", type: "i32" }, { name: "currentQuestStreak", type: "i32" }, { name: "doneForToday", type: "bool" }, { name: "questImage", type: "resource" }, { name: "rewardImage", type: "resource" }] };
export const SkipQuestFree: PacketDef = { id: 326032325, name: "SkipQuestFree", direction: "c2s", schema: [{ name: "missionId", type: "i32" }] };
export const SkipQuestPaid: PacketDef = { id: 1642608662, name: "SkipQuestPaid", direction: "c2s", schema: [{ name: "missionId", type: "i32" }] };
export const ReplaceQuest: PacketDef = { id: -1266665816, name: "ReplaceQuest", direction: "s2c", schema: [{ name: "missionToReplaceId", type: "i32" }, { name: "newQuest", type: "object", of: QUEST_FIELDS }] };
export const QuestCompletedNotification: PacketDef = { id: 1579425801, name: "QuestCompletedNotification", direction: "s2c", schema: [] };
export const CollectQuestReward: PacketDef = { id: -867767128, name: "CollectQuestReward", direction: "c2s", schema: [{ name: "questId", type: "i32" }] };
export const QuestRewardCollected: PacketDef = { id: 1768449810, name: "QuestRewardCollected", direction: "s2c", schema: [{ name: "questId", type: "i32" }] };
export const NotifyDailyQuestGenerated: PacketDef = { id: 956252237, name: "NotifyDailyQuestGenerated", direction: "s2c", schema: [] };
