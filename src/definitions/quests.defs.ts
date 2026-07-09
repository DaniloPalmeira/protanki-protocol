import { PacketDef, def } from "../registry/packet-def";
import { fields } from "../schema/infer";
import { PacketSchema } from "../schema/types";

const QUEST_FIELDS = fields([
    { name: "canSkipForFree", type: "bool" },
    { name: "description", type: "string" },
    { name: "finishCriteria", type: "i32" },
    { name: "image", type: "resource" },
    { name: "prizes", type: "list", of: [{ name: "itemCount", type: "i32" }, { name: "itemName", type: "string" }] },
    { name: "progress", type: "i32" },
    { name: "questId", type: "i32" },
    { name: "skipCost", type: "i32" },
]);

export const RequestQuestsWindow = def({ id: 1227293080, name: "RequestQuestsWindow", direction: "c2s", schema: [] });
export const ShowQuestsWindow = def({ id: 809822533, name: "ShowQuestsWindow", direction: "s2c", schema: [{ name: "quests", type: "list", of: QUEST_FIELDS }, { name: "currentQuestLevel", type: "i32" }, { name: "currentQuestStreak", type: "i32" }, { name: "doneForToday", type: "bool" }, { name: "questImage", type: "resource" }, { name: "rewardImage", type: "resource" }] });
// Codec manual no server. Schema para o bridge.
export const QuestSummaryWindow = def({ id: 885055495, name: "QuestSummaryWindow", direction: "s2c", schema: [{ name: "currentQuestLevel", type: "i32" }, { name: "currentQuestStreak", type: "i32" }, { name: "doneForToday", type: "bool" }, { name: "questImage", type: "resource" }, { name: "rewardImage", type: "resource" }] });
export const SkipQuestFree = def({ id: 326032325, name: "SkipQuestFree", direction: "c2s", schema: [{ name: "missionId", type: "i32" }] });
export const SkipQuestPaid = def({ id: 1642608662, name: "SkipQuestPaid", direction: "c2s", schema: [{ name: "missionId", type: "i32" }] });
export const ReplaceQuest = def({ id: -1266665816, name: "ReplaceQuest", direction: "s2c", schema: [{ name: "missionToReplaceId", type: "i32" }, { name: "newQuest", type: "object", of: QUEST_FIELDS }] });
export const QuestCompletedNotification = def({ id: 1579425801, name: "QuestCompletedNotification", direction: "s2c", schema: [] });
export const CollectQuestReward = def({ id: -867767128, name: "CollectQuestReward", direction: "c2s", schema: [{ name: "questId", type: "i32" }] });
export const QuestRewardCollected = def({ id: 1768449810, name: "QuestRewardCollected", direction: "s2c", schema: [{ name: "questId", type: "i32" }] });
export const NotifyDailyQuestGenerated = def({ id: 956252237, name: "NotifyDailyQuestGenerated", direction: "s2c", schema: [] });
