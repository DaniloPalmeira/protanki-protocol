import { PacketDef } from "../registry/packet-def";
import { PacketSchema } from "../schema/types";

// Batalha: combate, init, fluxo, flags (CTF), bônus, minas e dominação.
// Pacotes hot-path (movimento/minas) e de write customizado (listas) mantêm codec
// manual no server; aqui o schema serve de fonte única e para o bridge decodificar.

const VEC3_INLINE: PacketSchema = [
    { name: "x", type: "f32" },
    { name: "y", type: "f32" },
    { name: "z", type: "f32" },
];

const BATTLE_USER_FIELDS: PacketSchema = [
    { name: "chatModeratorLevel", type: "i32" },
    { name: "deaths", type: "i16" },
    { name: "kills", type: "i16" },
    { name: "rank", type: "u8" },
    { name: "score", type: "i32" },
    { name: "uid", type: "string" },
];

const USER_CONNECT_ENTRY: PacketSchema = [
    { name: "ChatModeratorLevel", type: "i32" },
    { name: "deaths", type: "i16" },
    { name: "kills", type: "i16" },
    { name: "rank", type: "u8" },
    { name: "score", type: "i32" },
    { name: "nickname", type: "string" },
];

const ROUND_ROSTER_ENTRY: PacketSchema = [
    { name: "stat1", type: "i32" },
    { name: "stat2", type: "i32" },
    { name: "nickname", type: "string" },
];

// ===== combat =====

export const ActivateTank: PacketDef = { id: 1868573511, name: "ActivateTank", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };
export const ActivateSupplyCommand: PacketDef = { id: -2102525054, name: "ActivateSupplyCommand", direction: "c2s", schema: [{ name: "itemId", type: "string" }] };
export const ActivatedSupply: PacketDef = { id: 2032104949, name: "ActivatedSupply", direction: "s2c", schema: [{ name: "itemId", type: "string" }, { name: "cooldownMs", type: "i32" }, { name: "flag", type: "i8" }] };
export const UpdateConsumableCount: PacketDef = { id: -502907094, name: "UpdateConsumableCount", direction: "s2c", schema: [{ name: "itemId", type: "string" }, { name: "count", type: "i32" }] };
export const EffectStarted: PacketDef = { id: -1639713644, name: "EffectStarted", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "effectType", type: "i32" }, { name: "durationMs", type: "i32" }, { name: "unknown", type: "i16" }] };
export const EffectStopped: PacketDef = { id: -1994318624, name: "EffectStopped", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "effectType", type: "i32" }] };
export const ConfirmDestruction: PacketDef = { id: -173682854, name: "ConfirmDestruction", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "delaytoSpawn", type: "i32" }] };
export const DamageIndicator: PacketDef = { id: -1165230470, name: "DamageIndicator", direction: "s2c", schema: [{ name: "count", type: "i32" }, { name: "damage", type: "f32" }, { name: "damageType", type: "i32" }, { name: "target", type: "string" }] };
export const Kill: PacketDef = { id: -42520728, name: "Kill", direction: "s2c", schema: [{ name: "victim", type: "string" }, { name: "killer", type: "string" }, { name: "respawnDelayMs", type: "i32" }] };
export const DestroyTank: PacketDef = { id: 162656882, name: "DestroyTank", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "readyToSpawnInMs", type: "i32" }] };
export const FullMoveCommand: PacketDef = { id: -1683279062, name: "FullMoveCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "incarnation", type: "i16" }, { name: "angularVelocity", type: "vector3" }, { name: "control", type: "i8" }, { name: "linearVelocity", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "position", type: "vector3" }, { name: "direction", type: "f32" }] };
export const FullMove: PacketDef = { id: 1516578027, name: "FullMove", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "angularVelocity", type: "vector3" }, { name: "control", type: "i8" }, { name: "linearVelocity", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "position", type: "vector3" }, { name: "direction", type: "f32" }] };
export const MoveCommand: PacketDef = { id: 329279865, name: "MoveCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "incarnation", type: "i16" }, { name: "angularVelocity", type: "vector3" }, { name: "control", type: "i8" }, { name: "linearVelocity", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "position", type: "vector3" }] };
export const Move: PacketDef = { id: -64696933, name: "Move", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "angularVelocity", type: "vector3" }, { name: "control", type: "i8" }, { name: "linearVelocity", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "position", type: "vector3" }] };
export const MovementControlCommand: PacketDef = { id: -1749108178, name: "MovementControlCommand", direction: "c2s", schema: [{ name: "throttleTime", type: "i32" }, { name: "turnControl", type: "i16" }, { name: "control", type: "i8" }] };
export const MovementControl: PacketDef = { id: -301298508, name: "MovementControl", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "control", type: "i8" }] };
export const PrepareToSpawn: PacketDef = { id: -157204477, name: "PrepareToSpawn", direction: "s2c", schema: [{ name: "position", type: "vector3" }, { name: "rotation", type: "vector3" }] };
export const ReadyToActivate: PacketDef = { id: 1178028365, name: "ReadyToActivate", direction: "c2s", schema: [] };
export const ReadyToPlace: PacketDef = { id: -1378839846, name: "ReadyToPlace", direction: "c2s", schema: [] };
export const ReadyToSpawn: PacketDef = { id: 268832557, name: "ReadyToSpawn", direction: "c2s", schema: [] };
export const DisablePause: PacketDef = { id: 1156768699, name: "DisablePause", direction: "c2s", schema: [] };
export const RemoveTank: PacketDef = { id: 1719707347, name: "RemoveTank", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };
export const RotateTurretCommand: PacketDef = { id: -114968993, name: "RotateTurretCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "angle", type: "f32" }, { name: "control", type: "i8" }, { name: "incarnation", type: "i16" }] };
export const TurretRotation: PacketDef = { id: 1927704181, name: "TurretRotation", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "angle", type: "f32" }, { name: "control", type: "i8" }] };
export const TurretDirectionCommand: PacketDef = { id: 1224288585, name: "TurretDirectionCommand", direction: "c2s", schema: [{ name: "angle", type: "f32" }] };
export const TurretDirection: PacketDef = { id: -534192254, name: "TurretDirection", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "angle", type: "f32" }] };
export const SelfDestructScheduled: PacketDef = { id: -911983090, name: "SelfDestructScheduled", direction: "s2c", schema: [{ name: "time", type: "i32" }] };
export const SetHealth: PacketDef = { id: -611961116, name: "SetHealth", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "health", type: "f32" }] };
export const TankTemperature: PacketDef = { id: 581377054, name: "TankTemperature", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "temperature", type: "f32" }] };
export const Spawn: PacketDef = { id: 875259457, name: "Spawn", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "team", type: "i32" }, { name: "position", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "health", type: "i16" }, { name: "incarnation", type: "i16" }] };
export const Suicide: PacketDef = { id: 988664577, name: "Suicide", direction: "c2s", schema: [] };
export const SetRoundTime: PacketDef = { id: 732434644, name: "SetRoundTime", direction: "s2c", schema: [{ name: "seconds", type: "i32" }] };
export const ChangeFund: PacketDef = { id: 1149211509, name: "ChangeFund", direction: "s2c", schema: [{ name: "fund", type: "i32" }] };
export const FinishBattle: PacketDef = { id: 560336625, name: "FinishBattle", direction: "s2c", schema: [{ name: "rewards", type: "list", of: [{ name: "newbieBonus", type: "i32" }, { name: "premiumBonus", type: "i32" }, { name: "reward", type: "i32" }, { name: "nickname", type: "string" }] }, { name: "breakSeconds", type: "i32" }] };
export const RestartRoundTeam: PacketDef = { id: -1668779175, name: "RestartRoundTeam", direction: "s2c", schema: [{ name: "red", type: "list", of: ROUND_ROSTER_ENTRY }, { name: "blue", type: "list", of: ROUND_ROSTER_ENTRY }] };
export const RestartRoundDm: PacketDef = { id: 1061006142, name: "RestartRoundDm", direction: "s2c", schema: [{ name: "users", type: "list", of: ROUND_ROSTER_ENTRY }] };

// ===== init =====

export const BattleConsumables: PacketDef = { id: -137249251, name: "BattleConsumables", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const BattleMinesProperties: PacketDef = { id: -226978906, name: "BattleMinesProperties", direction: "s2c", schema: [{ name: "activateSound", type: "resource" }, { name: "activateTimeMsec", type: "i32" }, { name: "battleMines", type: "list", of: [{ name: "mineId", type: "string" }, { name: "ownerId", type: "string" }, { name: "position", type: "vector3" }] }, { name: "blueMineTexture", type: "resource" }, { name: "deactivateSound", type: "resource" }, { name: "enemyMineTexture", type: "resource" }, { name: "explosionMarkTexture", type: "resource" }, { name: "explosionSound", type: "resource" }, { name: "farVisibilityRadius", type: "f32" }, { name: "friendlyMineTexture", type: "resource" }, { name: "idleExplosionTexture", type: "resource" }, { name: "impactForce", type: "f32" }, { name: "mainExplosionTexture", type: "resource" }, { name: "minDistanceFromBase", type: "f32" }, { name: "model3ds", type: "resource" }, { name: "nearVisibilityRadius", type: "f32" }, { name: "radius", type: "f32" }, { name: "redMineTexture", type: "resource" }] };
export const BattleStats: PacketDef = { id: 522993449, name: "BattleStats", direction: "s2c", schema: [{ name: "battleMode", type: "i32" }, { name: "equipmentConstraintsMode", type: "i32" }, { name: "fund", type: "i32" }, { name: "scoreLimit", type: "i32" }, { name: "timeLimitInSec", type: "i32" }, { name: "mapName", type: "string" }, { name: "maxPeopleCount", type: "i32" }, { name: "parkourMode", type: "bool" }, { name: "premiumBonusInPercent", type: "i32" }, { name: "spectator", type: "bool" }, { name: "suspiciousUserIds", type: "optStringArray" }, { name: "timeLeft", type: "i32" }] };
export const BattleUserEffects: PacketDef = { id: 417965410, name: "BattleUserEffects", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const BonusData: PacketDef = { id: 228171466, name: "BonusData", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const InitBonuses: PacketDef = { id: 870278784, name: "InitBonuses", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const BonusRegions: PacketDef = { id: -959048700, name: "BonusRegions", direction: "s2c", schema: [{ name: "bonusRegionResources", type: "list", of: [{ name: "bonusResource", type: "resource" }, { name: "bonusType", type: "i32" }] }, { name: "bonusRegionData", type: "list", of: [{ name: "position", type: "object", of: VEC3_INLINE }, { name: "rotation", type: "object", of: VEC3_INLINE }, { name: "bonusType", type: "i32" }] }] };
export const InitBattleDM: PacketDef = { id: 930618015, name: "InitBattleDM", direction: "s2c", schema: [] };
export const InitBattleTeam: PacketDef = { id: 183561709, name: "InitBattleTeam", direction: "s2c", schema: [] };
export const InitBattleUsersDM: PacketDef = { id: -1959138292, name: "InitBattleUsersDM", direction: "s2c", schema: [{ name: "users", type: "list", of: BATTLE_USER_FIELDS }] };
export const InitBattleUsersTeam: PacketDef = { id: -1233891872, name: "InitBattleUsersTeam", direction: "s2c", schema: [{ name: "scoreBlue", type: "i32" }, { name: "scoreRed", type: "i32" }, { name: "usersBlue", type: "list", of: BATTLE_USER_FIELDS }, { name: "usersRed", type: "list", of: BATTLE_USER_FIELDS }] };
export const InitCtfFlags: PacketDef = { id: 789790814, name: "InitCtfFlags", direction: "s2c", schema: [{ name: "flagBasePositionBlue", type: "vector3" }, { name: "flagCarrierIdBlue", type: "string" }, { name: "flagPositionBlue", type: "vector3" }, { name: "blueFlagSprite", type: "resource" }, { name: "bluePedestalModel", type: "resource" }, { name: "flagBasePositionRed", type: "vector3" }, { name: "flagCarrierIdRed", type: "string" }, { name: "flagPositionRed", type: "vector3" }, { name: "redFlagSprite", type: "resource" }, { name: "redPedestalModel", type: "resource" }, { name: "flagDropSound", type: "resource" }, { name: "flagReturnSound", type: "resource" }, { name: "flagTakeSound", type: "resource" }, { name: "winSound", type: "resource" }] };
export const InitDomPoints: PacketDef = { id: -1337059439, name: "InitDomPoints", direction: "s2c", schema: [{ name: "keypointTriggerRadius", type: "f32" }, { name: "keypointVisorHeight", type: "f32" }, { name: "minesRestrictionRadius", type: "f32" }, { name: "points", type: "list", of: [{ name: "id", type: "i32" }, { name: "name", type: "string" }, { name: "position", type: "vector3" }, { name: "score", type: "f32" }, { name: "scoreChangeRate", type: "f32" }, { name: "state", type: "i32" }, { name: "tankIds", type: "stringArray" }] }, { name: "bigLetters", type: "resource" }, { name: "blueCircle", type: "resource" }, { name: "bluePedestalTexture", type: "resource" }, { name: "blueRay", type: "resource" }, { name: "blueRayTip", type: "resource" }, { name: "neutralCircle", type: "resource" }, { name: "neutralPedestalTexture", type: "resource" }, { name: "pedestal", type: "resource" }, { name: "redCircle", type: "resource" }, { name: "redPedestalTexture", type: "resource" }, { name: "redRay", type: "resource" }, { name: "redRayTip", type: "resource" }, { name: "pointCaptureStartNegativeSound", type: "resource" }, { name: "pointCaptureStartPositiveSound", type: "resource" }, { name: "pointCaptureStopNegativeSound", type: "resource" }, { name: "pointCaptureStopPositiveSound", type: "resource" }, { name: "pointCapturedNegativeSound", type: "resource" }, { name: "pointCapturedPositiveSound", type: "resource" }, { name: "pointNeutralizedNegativeSound", type: "resource" }, { name: "pointNeutralizedPositiveSound", type: "resource" }, { name: "pointScoreDecreasingSound", type: "resource" }, { name: "pointScoreIncreasingSound", type: "resource" }] };
export const InitializeBattleStatistics: PacketDef = { id: 1953272681, name: "InitializeBattleStatistics", direction: "s2c", schema: [] };
export const InitMap: PacketDef = { id: -152638117, name: "InitMap", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const LoadBattleChat: PacketDef = { id: -643105296, name: "LoadBattleChat", direction: "s2c", schema: [] };
export const TankModelData: PacketDef = { id: -1643824092, name: "TankModelData", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };
export const TankSpecification: PacketDef = { id: -1672577397, name: "TankSpecification", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "speed", type: "f32" }, { name: "maxTurnSpeed", type: "f32" }, { name: "turretTurnSpeed", type: "f32" }, { name: "acceleration", type: "f32" }, { name: "sequence", type: "i16" }] };
export const UnloadSpaceBattle: PacketDef = { id: -985579124, name: "UnloadSpaceBattle", direction: "s2c", schema: [] };
export const WeaponPhysics: PacketDef = { id: -2124388778, name: "WeaponPhysics", direction: "s2c", schema: [{ name: "jsonData", type: "string" }] };

// ===== flow =====

export const BattleChatMessage: PacketDef = { id: 1259981343, name: "BattleChatMessage", direction: "both", schema: [{ name: "nickname", type: "string" }, { name: "message", type: "string" }, { name: "team", type: "i32" }] };
export const BattleChatTeamMessage: PacketDef = { id: -449356094, name: "BattleChatTeamMessage", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "message", type: "string" }, { name: "team", type: "i32" }] };
export const EnterBattle: PacketDef = { id: -1284211503, name: "EnterBattle", direction: "c2s", schema: [{ name: "battleTeam", type: "i32" }] };
export const EquipmentNotAllowed: PacketDef = { id: -10847382, name: "EquipmentNotAllowed", direction: "s2c", schema: [{ name: "battleId", type: "string" }] };
export const BattleSystemMessage: PacketDef = { id: 606668848, name: "BattleSystemMessage", direction: "s2c", schema: [{ name: "message", type: "string" }] };
export const BattleSpectatorMessage: PacketDef = { id: 1532749363, name: "BattleSpectatorMessage", direction: "s2c", schema: [{ name: "uid", type: "string" }, { name: "message", type: "string" }] };
export const EnterBattleAsSpectator: PacketDef = { id: -1315002220, name: "EnterBattleAsSpectator", direction: "c2s", schema: [] };
export const EquipmentChanged: PacketDef = { id: -1767633906, name: "EquipmentChanged", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };
export const ExitFromBattle: PacketDef = { id: 377959142, name: "ExitFromBattle", direction: "c2s", schema: [{ name: "layout", type: "i32" }] };
export const SendBattleChatMessage: PacketDef = { id: 945463181, name: "SendBattleChatMessage", direction: "c2s", schema: [{ name: "message", type: "string" }, { name: "team", type: "bool" }] };
export const TimeChecker: PacketDef = { id: 34068208, name: "TimeChecker", direction: "s2c", schema: [{ name: "value1", type: "i32" }, { name: "value2", type: "i32" }] };
export const TimeCheckerResponse: PacketDef = { id: 2074243318, name: "TimeCheckerResponse", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "serverTime", type: "i32" }] };
export const UpdateBattleUserDM: PacketDef = { id: 696140460, name: "UpdateBattleUserDM", direction: "s2c", schema: [{ name: "deaths", type: "i16" }, { name: "kills", type: "i16" }, { name: "score", type: "i32" }, { name: "nickname", type: "string" }] };
export const UpdateBattleUserTeam: PacketDef = { id: -497293992, name: "UpdateBattleUserTeam", direction: "s2c", schema: [{ name: "deaths", type: "i16" }, { name: "kills", type: "i16" }, { name: "score", type: "i32" }, { name: "nickname", type: "string" }, { name: "team", type: "i32" }] };
export const UpdateSpectatorList: PacketDef = { id: -1331361684, name: "UpdateSpectatorList", direction: "s2c", schema: [{ name: "spectatorList", type: "string" }] };
export const UserConnectDM: PacketDef = { id: 862913394, name: "UserConnectDM", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "usersInfo", type: "list", of: USER_CONNECT_ENTRY }] };
export const UserConnectTeam: PacketDef = { id: 2040021062, name: "UserConnectTeam", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "usersInfo", type: "list", of: USER_CONNECT_ENTRY }, { name: "team", type: "i32" }] };
export const UserDisconnectedDm: PacketDef = { id: -1689876764, name: "UserDisconnectedDm", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };
export const SendBattleInvite: PacketDef = { id: -864265623, name: "SendBattleInvite", direction: "c2s", schema: [{ name: "targetNickname", type: "string" }, { name: "battleId", type: "string" }] };
export const ShowBattleInvite: PacketDef = { id: 810713262, name: "ShowBattleInvite", direction: "s2c", schema: [{ name: "inviterNickname", type: "string" }, { name: "flag1", type: "bool" }, { name: "flag2", type: "bool" }, { name: "battleId", type: "string" }, { name: "battleName", type: "string" }, { name: "battleMode", type: "i32" }, { name: "flag3", type: "bool" }, { name: "flag4", type: "bool" }] };
export const DeclineBattleInvite: PacketDef = { id: 1152865919, name: "DeclineBattleInvite", direction: "c2s", schema: [{ name: "inviterNickname", type: "string" }] };
export const BattleInviteDeclined: PacketDef = { id: 1015650019, name: "BattleInviteDeclined", direction: "s2c", schema: [{ name: "targetNickname", type: "string" }] };
export const AcceptBattleInvite: PacketDef = { id: 814687528, name: "AcceptBattleInvite", direction: "c2s", schema: [{ name: "inviterNickname", type: "string" }] };
export const BattleInviteAccepted: PacketDef = { id: -1851236532, name: "BattleInviteAccepted", direction: "s2c", schema: [{ name: "targetNickname", type: "string" }] };
export const RequestBattleEntrance: PacketDef = { id: -983139626, name: "RequestBattleEntrance", direction: "c2s", schema: [{ name: "battleId", type: "string" }] };
export const BattleEntranceAck: PacketDef = { id: 1152930968, name: "BattleEntranceAck", direction: "s2c", schema: [{ name: "battleId", type: "string" }] };
export const UserDisconnectTeam: PacketDef = { id: 1411656080, name: "UserDisconnectTeam", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };

// ===== flags (CTF) =====

export const TakeFlag: PacketDef = { id: -1282406496, name: "TakeFlag", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "team", type: "i32" }] };
export const DropFlagRequest: PacketDef = { id: -1832611824, name: "DropFlagRequest", direction: "c2s", schema: [] };
export const DropFlag: PacketDef = { id: 1925237062, name: "DropFlag", direction: "s2c", schema: [{ name: "position", type: "vector3" }, { name: "team", type: "i32" }] };
export const ReturnFlag: PacketDef = { id: -1026428589, name: "ReturnFlag", direction: "s2c", schema: [{ name: "team", type: "i32" }, { name: "nickname", type: "string" }] };
export const SetCtfScore: PacketDef = { id: 561771020, name: "SetCtfScore", direction: "s2c", schema: [{ name: "team", type: "i32" }, { name: "score", type: "i32" }] };
export const CaptureFlag: PacketDef = { id: -1870108387, name: "CaptureFlag", direction: "s2c", schema: [{ name: "team", type: "i32" }, { name: "nickname", type: "string" }] };

// ===== bonus =====

export const SpawnBonus: PacketDef = { id: 1831462385, name: "SpawnBonus", direction: "s2c", schema: [{ name: "id", type: "string" }, { name: "position", type: "vector3" }, { name: "disappearingTimeMs", type: "i32" }] };
export const RemoveBonus: PacketDef = { id: -2026749922, name: "RemoveBonus", direction: "s2c", schema: [{ name: "id", type: "string" }] };
export const TakeBonus: PacketDef = { id: -1291499147, name: "TakeBonus", direction: "s2c", schema: [{ name: "id", type: "string" }] };
export const GoldBoxTakenNotification: PacketDef = { id: 463494974, name: "GoldBoxTakenNotification", direction: "s2c", schema: [{ name: "nickname", type: "string" }] };
export const GoldBoxComingNotification: PacketDef = { id: -666893269, name: "GoldBoxComingNotification", direction: "s2c", schema: [{ name: "message", type: "string" }, { name: "sound", type: "resource" }] };
export const TakeBonusCommand: PacketDef = { id: -1047185003, name: "TakeBonusCommand", direction: "c2s", schema: [{ name: "id", type: "string" }] };

// ===== mine (hot-path; server usa codec manual) =====

export const PutMine: PacketDef = { id: 272183855, name: "PutMine", direction: "s2c", schema: [{ name: "id", type: "string" }, { name: "position", type: "object", of: VEC3_INLINE }, { name: "owner", type: "string" }] };
export const ActivateMine: PacketDef = { id: -624217047, name: "ActivateMine", direction: "s2c", schema: [{ name: "id", type: "string" }] };
export const DetonateMine: PacketDef = { id: 1387974401, name: "DetonateMine", direction: "s2c", schema: [{ name: "id", type: "string" }, { name: "victim", type: "string" }] };
export const RemoveMines: PacketDef = { id: -1200619383, name: "RemoveMines", direction: "s2c", schema: [{ name: "owner", type: "string" }] };

// ===== domination =====

export const PointTankEntered: PacketDef = { id: -456245145, name: "PointTankEntered", direction: "s2c", schema: [{ name: "pointId", type: "i32" }, { name: "nickname", type: "string" }] };
export const PointTankLeft: PacketDef = { id: -1410197917, name: "PointTankLeft", direction: "s2c", schema: [{ name: "pointId", type: "i32" }, { name: "nickname", type: "string" }] };
export const PointScoreChanged: PacketDef = { id: -2141998253, name: "PointScoreChanged", direction: "s2c", schema: [{ name: "pointId", type: "i32" }, { name: "score", type: "f32" }, { name: "scoreChangeRate", type: "f32" }] };
export const PointCaptureStarted: PacketDef = { id: -1346883037, name: "PointCaptureStarted", direction: "s2c", schema: [{ name: "team", type: "i32" }] };
export const PointCaptureStopped: PacketDef = { id: -1701488017, name: "PointCaptureStopped", direction: "s2c", schema: [{ name: "team", type: "i32" }] };
export const PointStateChanged: PacketDef = { id: -1073178885, name: "PointStateChanged", direction: "s2c", schema: [{ name: "pointId", type: "i32" }, { name: "state", type: "i32" }] };
