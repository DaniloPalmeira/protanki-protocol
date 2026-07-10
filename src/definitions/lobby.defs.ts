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
// Forma OFICIAL do ProTanki (validada byte-a-byte contra capturas, inclusive o caso com
// pedido de entrada pendente). NOTA: o letanki-server envia uma forma DIFERENTE (ver o override
// local em InitUserClanModelsPacket) — ele diverge do oficial neste pacote.
//
// Nomes recuperados do client decompilado. No client o pacote são 7 objetos, achatados no fio:
//   [0..9]  composite "user clan state" (codec: string, 8×bool/i32, byte no último int)
//   [10..12] 3× listas de TAGS de clã (strings no wire — confirmado por captura com ["LGC"];
//            o client converte tag→Long internamente, mas o codec é de string)
//   [13..14] 2× Vector<String> (nicks)
//   [15]    id de resource (Long hi/lo) da imagem do logo
export const InitUserClanModels = def({
    id: -1338449818,
    name: "InitUserClanModels",
    direction: "s2c",
    schema: [
        // Tag do clã atual do usuário (null/"" = sem clã); vira o título "[TAG] nick".
        { name: "tag", type: "string" },
        // Toggle "dar bônus ao clã" — o setter no client dispara "ClanUserInfoEvent.
        // UPDATE_GIVE_BONUSES_CLAN". Sempre true nas 200 capturas.
        { name: "giveBonusesToClan", type: "bool" },
        // Gate do módulo inteiro: se false, o init do clã é abortado no client.
        { name: "clansEnabled", type: "bool" },
        // Cooldown em segundos p/ entrar/criar clã ("RestrictionJoinClanEvent"; expira via setTimeout no client).
        { name: "joinCooldownSeconds", type: "i32" },
        // Flag guardada no painel "sem clã"; nenhuma leitura localizada no client (aparentemente
        // morta). Sempre true nas 200 capturas.
        { name: "unknownPanelFlag", type: "bool" },
        // Negado e usado p/ travar/destravar botão de clã no lobby (state.enabled = !este).
        // Sempre true nas 200 capturas; confiança baixa no nome.
        { name: "uiLocked", type: "bool" },
        // Custo em cristais p/ criar clã (usado no alert "CLAN_CREATE_CONFIRM_ALERT_BUY" e no check de saldo).
        { name: "createCost", type: "i32" },
        // Contagem inicial do badge de notificações do painel de clã ("ClanPanelNotificationEvent.UPDATE").
        { name: "notificationsCount", type: "i32" },
        // Rank suficiente p/ criar clã; o client recalcula como rank >= minRankToCreate ao subir de rank.
        { name: "canCreateClan", type: "bool" },
        // Rank mínimo p/ criar clã (byte no codec oficial, como os demais ranks).
        { name: "minRankToCreate", type: "i8" },
        // Tags dos clãs que convidaram o usuário (ClanInviteNotify/ClanInviteAck).
        // Confirmado por captura: ["LGC"].
        { name: "incomingInviteClanTags", type: "nullableStringArray" },
        // Tags dos clãs p/ os quais o usuário enviou pedido (JoinRequestSent/JoinRequestCancelled).
        // Confirmado por captura: ["LGC"].
        { name: "outgoingRequestClanTags", type: "nullableStringArray" },
        // Tags de convites já visualizados (ViewInviteClanResponse). Sempre vazia nas capturas.
        { name: "viewedInviteClanTags", type: "nullableStringArray" },
        // Nicks de membros com notificação pendente (MemberStatusNotify/ClanLeaderNotify; par do MarkMemberSeen).
        { name: "memberNotificationNicks", type: "nullableStringArray" },
        // Nicks com pedido de entrada pendente NO clã do usuário (NotifyJoinRequest/RemoveJoinRequest).
        { name: "joinRequestNicks", type: "nullableStringArray" },
        // Id do resource da imagem de logo do clã (Long = hi/lo), carregado pelo loader "IMG".
        { name: "logoImageId", type: "longPair" },
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
