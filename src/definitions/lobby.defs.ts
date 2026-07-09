import { PacketDef } from "../registry/packet-def";

// Lobby: lista de batalhas, criação, seleção e roster de batalha (DM e times).

export const BattleInfo: PacketDef = {
    id: -838186985,
    name: "BattleInfo",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
};

export const BattleList: PacketDef = {
    id: 552006706,
    name: "BattleList",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
};

export const BattleDetails: PacketDef = {
    id: 546722394,
    name: "BattleDetails",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
};

export const CreateBattleRequest: PacketDef = {
    id: -2135234426,
    name: "CreateBattleRequest",
    direction: "c2s",
    schema: [
        { name: "autoBalance", type: "bool" },
        { name: "battleMode", type: "i32" },
        { name: "equipmentConstraintsMode", type: "i32" },
        { name: "friendlyFire", type: "bool" },
        { name: "scoreLimit", type: "i32" },
        { name: "timeLimitInSec", type: "i32" },
        { name: "mapId", type: "string" },
        { name: "maxPeopleCount", type: "i32" },
        { name: "name", type: "string" },
        { name: "parkourMode", type: "bool" },
        { name: "privateBattle", type: "bool" },
        { name: "proBattle", type: "bool" },
        { name: "maxRank", type: "i32" },
        { name: "minRank", type: "i32" },
        { name: "reArmorEnabled", type: "bool" },
        { name: "mapTheme", type: "i32" },
        { name: "withoutBonuses", type: "bool" },
        { name: "withoutCrystals", type: "bool" },
        { name: "withoutSupplies", type: "bool" },
        { name: "withoutUpgrades", type: "bool" },
        { name: "reducedResistances", type: "bool" },
        { name: "esportDropTiming", type: "bool" },
        { name: "withoutGoldBoxes", type: "bool" },
        { name: "withoutGoldSiren", type: "bool" },
        { name: "withoutGoldZone", type: "bool" },
        { name: "withoutMedkit", type: "bool" },
        { name: "withoutMines", type: "bool" },
        { name: "randomGold", type: "bool" },
        { name: "dependentCooldownEnabled", type: "bool" },
    ],
};

export const CreateBattleResponse: PacketDef = {
    id: 802300608,
    name: "CreateBattleResponse",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
};

// Codec manual no server (faz .trim() no battleId lido). Schema para o bridge.
export const SelectBattle: PacketDef = {
    id: 2092412133,
    name: "SelectBattle",
    direction: "c2s",
    schema: [{ name: "battleId", type: "string" }],
};

export const RequestBattleByLink: PacketDef = {
    id: -604091695,
    name: "RequestBattleByLink",
    direction: "c2s",
    schema: [{ name: "battleId", type: "string" }],
};

export const ValidateBattleNameRequest: PacketDef = {
    id: 566652736,
    name: "ValidateBattleNameRequest",
    direction: "c2s",
    schema: [{ name: "name", type: "string" }],
};

export const ValidateBattleNameResponse: PacketDef = {
    id: 120401338,
    name: "ValidateBattleNameResponse",
    direction: "s2c",
    schema: [{ name: "name", type: "string" }],
};

export const LobbyData: PacketDef = {
    id: 907073245,
    name: "LobbyData",
    direction: "s2c",
    schema: [
        { name: "crystals", type: "i32" },
        { name: "currentRankScore", type: "i32" },
        { name: "durationCrystalAbonement", type: "i32" },
        { name: "hasDoubleCrystal", type: "bool" },
        { name: "nextRankScore", type: "i32" },
        { name: "place", type: "i32" },
        { name: "rank", type: "u8" },
        { name: "rating", type: "f32" },
        { name: "score", type: "i32" },
        { name: "serverNumber", type: "i32" },
        { name: "nickname", type: "string" },
        { name: "userProfileUrl", type: "string" },
    ],
};

export const UserNotInBattle: PacketDef = {
    id: 1941694508,
    name: "UserNotInBattle",
    direction: "s2c",
    schema: [{ name: "nickname", type: "string" }],
};

export const ReleasePlayerSlotDm: PacketDef = {
    id: 504016996,
    name: "ReleasePlayerSlotDm",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
};

export const ReservePlayerSlotDm: PacketDef = {
    id: -2133657895,
    name: "ReservePlayerSlotDm",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
};

export const AddUserToBattleDm: PacketDef = {
    id: -911626491,
    name: "AddUserToBattleDm",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "kills", type: "i32" },
        { name: "score", type: "i32" },
        { name: "suspicious", type: "bool" },
        { name: "nickname", type: "string" },
    ],
};

export const RemoveUserFromBattleLobby: PacketDef = {
    id: 1924874982,
    name: "RemoveUserFromBattleLobby",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
};

export const NotifyFriendOfBattle: PacketDef = {
    id: -1895446889,
    name: "NotifyFriendOfBattle",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "mapName", type: "string" },
        { name: "mode", type: "i32" },
        { name: "privateBattle", type: "bool" },
        { name: "probattle", type: "bool" },
        { name: "maxRank", type: "i32" },
        { name: "minRank", type: "i32" },
        { name: "serverNumber", type: "i32" },
        { name: "nickname", type: "string" },
    ],
};

export const UnloadBattleList: PacketDef = {
    id: -324155151,
    name: "UnloadBattleList",
    direction: "s2c",
    schema: [],
};

export const RequestLobby: PacketDef = {
    id: 1452181070,
    name: "RequestLobby",
    direction: "c2s",
    schema: [],
};

export const SetBattleInviteSound: PacketDef = {
    id: 834877801,
    name: "SetBattleInviteSound",
    direction: "s2c",
    schema: [{ name: "soundIdLow", type: "resource" }],
};

// Codec manual no server (montagem field-by-field com ResourceManager em runtime;
// read lança). Opaco para o bridge por enquanto.
export const InitUserClanModels: PacketDef = {
    id: -1338449818,
    name: "InitUserClanModels",
    direction: "s2c",
};

export const OnReserveSlotTeam: PacketDef = {
    id: -169305322,
    name: "OnReserveSlotTeam",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
        { name: "team", type: "i32" },
    ],
};

export const OnReleaseSlotTeam: PacketDef = {
    id: 1447204641,
    name: "OnReleaseSlotTeam",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
};

export const AddUserTeam: PacketDef = {
    id: 118447426,
    name: "AddUserTeam",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "kills", type: "i32" },
        { name: "score", type: "i32" },
        { name: "suspicious", type: "bool" },
        { name: "nickname", type: "string" },
        { name: "team", type: "i32" },
    ],
};

export const UpdateUserScore: PacketDef = {
    id: -375282889,
    name: "UpdateUserScore",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
        { name: "score", type: "i32" },
    ],
};

export const HideBattleInfo: PacketDef = {
    id: -602527073,
    name: "HideBattleInfo",
    direction: "s2c",
    schema: [{ name: "battleId", type: "string" }],
};

export const RemoveBattleFromList: PacketDef = {
    id: -1848001147,
    name: "RemoveBattleFromList",
    direction: "s2c",
    schema: [{ name: "battleId", type: "string" }],
};

export const RoundFinish: PacketDef = {
    id: 1534651002,
    name: "RoundFinish",
    direction: "s2c",
    schema: [{ name: "battleId", type: "string" }],
};

export const UpdateTeamScore: PacketDef = {
    id: 1428217189,
    name: "UpdateTeamScore",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "team", type: "i32" },
        { name: "score", type: "i32" },
    ],
};
