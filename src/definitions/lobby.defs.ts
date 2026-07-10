import { PacketDef, def } from "../registry/packet-def";

// Lobby: lista de batalhas, criação, seleção e roster de batalha (DM e times).

export const BattleInfo = def({
    id: -838186985,
    name: "BattleInfo",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
});

export const BattleList = def({
    id: 552006706,
    name: "BattleList",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
});

export const BattleDetails = def({
    id: 546722394,
    name: "BattleDetails",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
});

export const CreateBattleRequest = def({
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
});

export const CreateBattleResponse = def({
    id: 802300608,
    name: "CreateBattleResponse",
    direction: "s2c",
    schema: [{ name: "jsonData", type: "string" }],
});

// Codec manual no server (faz .trim() no battleId lido). Schema para o bridge.
export const SelectBattle = def({
    id: 2092412133,
    name: "SelectBattle",
    direction: "c2s",
    schema: [{ name: "battleId", type: "string" }],
});

export const RequestBattleByLink = def({
    id: -604091695,
    name: "RequestBattleByLink",
    direction: "c2s",
    schema: [{ name: "battleId", type: "string" }],
});

export const ValidateBattleNameRequest = def({
    id: 566652736,
    name: "ValidateBattleNameRequest",
    direction: "c2s",
    schema: [{ name: "name", type: "string" }],
});

export const ValidateBattleNameResponse = def({
    id: 120401338,
    name: "ValidateBattleNameResponse",
    direction: "s2c",
    schema: [{ name: "name", type: "string" }],
});

export const LobbyData = def({
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
});

export const UserNotInBattle = def({
    id: 1941694508,
    name: "UserNotInBattle",
    direction: "s2c",
    schema: [{ name: "nickname", type: "string" }],
});

export const ReleasePlayerSlotDm = def({
    id: 504016996,
    name: "ReleasePlayerSlotDm",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
});

export const ReservePlayerSlotDm = def({
    id: -2133657895,
    name: "ReservePlayerSlotDm",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
});

export const AddUserToBattleDm = def({
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
});

export const RemoveUserFromBattleLobby = def({
    id: 1924874982,
    name: "RemoveUserFromBattleLobby",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
});

export const NotifyFriendOfBattle = def({
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
});

export const UnloadBattleList = def({
    id: -324155151,
    name: "UnloadBattleList",
    direction: "s2c",
    schema: [],
});

export const RequestLobby = def({
    id: 1452181070,
    name: "RequestLobby",
    direction: "c2s",
    schema: [],
});

export const SetBattleInviteSound = def({
    id: 834877801,
    name: "SetBattleInviteSound",
    direction: "s2c",
    schema: [{ name: "soundIdLow", type: "resource" }],
});

// Blob fixo do módulo de clã (montado no server; read lança — S->C only). A ESTRUTURA fica aqui;
// os VALORES (constantes + requestTags + podium) o server fornece. Ordem/tipos batem com a captura
// oficial (2026-06-18). `requestTags` = Vector<String> bare (int32 count + optString) = tipo `list`.
export const InitUserClanModels = def({
    id: -1338449818,
    name: "InitUserClanModels",
    direction: "s2c",
    schema: [
        { name: "moduleFlag1", type: "i8" },
        { name: "moduleFlag2", type: "i8" },
        { name: "moduleFlag3", type: "i8" },
        { name: "reserved0", type: "i32" },
        { name: "flagA", type: "i8" },
        { name: "flagB", type: "i8" },
        { name: "creationCost", type: "i32" },
        { name: "reserved1", type: "i32" },
        { name: "flagC", type: "i8" },
        { name: "flagD", type: "i8" },
        { name: "reserved2", type: "i32" },
        { name: "reserved3", type: "i8" },
        { name: "reserved4", type: "i8" },
        { name: "requestTags", type: "list", of: [{ name: "tag", type: "string" }] },
        { name: "reserved5", type: "i32" },
        { name: "reserved6", type: "i32" },
        { name: "reserved7", type: "i32" },
        { name: "reserved8", type: "i8" },
        { name: "reserved9", type: "i8" },
        { name: "reserved10", type: "i8" },
        { name: "podium", type: "resource" },
    ],
});

export const OnReserveSlotTeam = def({
    id: -169305322,
    name: "OnReserveSlotTeam",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
        { name: "team", type: "i32" },
    ],
});

export const OnReleaseSlotTeam = def({
    id: 1447204641,
    name: "OnReleaseSlotTeam",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
    ],
});

export const AddUserTeam = def({
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
});

export const UpdateUserScore = def({
    id: -375282889,
    name: "UpdateUserScore",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "nickname", type: "string" },
        { name: "score", type: "i32" },
    ],
});

export const HideBattleInfo = def({
    id: -602527073,
    name: "HideBattleInfo",
    direction: "s2c",
    schema: [{ name: "battleId", type: "string" }],
});

export const RemoveBattleFromList = def({
    id: -1848001147,
    name: "RemoveBattleFromList",
    direction: "s2c",
    schema: [{ name: "battleId", type: "string" }],
});

export const RoundFinish = def({
    id: 1534651002,
    name: "RoundFinish",
    direction: "s2c",
    schema: [{ name: "battleId", type: "string" }],
});

export const UpdateTeamScore = def({
    id: 1428217189,
    name: "UpdateTeamScore",
    direction: "s2c",
    schema: [
        { name: "battleId", type: "string" },
        { name: "team", type: "i32" },
        { name: "score", type: "i32" },
    ],
});
