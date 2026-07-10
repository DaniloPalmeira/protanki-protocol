import { def } from "../registry/packet-def";
import { fields } from "../schema/infer";

// Armas: comandos de tiro (C->S) e relays (S->C). A ESTRUTURA do fio fica aqui; server faz só a
// lógica (zip de arrays paralelos, agregação, escolha de branch hit/miss). Direção heurística:
// *Command = cliente→servidor, demais = servidor→cliente.

// ===== railgun =====
export const RailgunShotCommand = def({ id: -484994657, name: "RailgunShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "position", type: "vector3" },
    { name: "targetNicknames", type: "stringArray" }, { name: "targetsPosition", type: "vector3Array" },
    { name: "targetsIncarnation", type: "i16Array" }, { name: "targetsRotation", type: "vector3Array" },
    { name: "targetsOrientation", type: "vector3Array" },
] });
export const RailgunShot = def({ id: -369590613, name: "RailgunShot", direction: "s2c", schema: [
    { name: "shooterNickname", type: "string" }, { name: "hitPosition", type: "vector3" },
    { name: "targetNicknames", type: "optStringArray" }, { name: "targetPositions", type: "vector3Array" },
] });
export const StartChargingCommand = def({ id: -1759063234, name: "StartChargingCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StartCharging = def({ id: 346830254, name: "StartCharging", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

// ===== thunder =====
export const ThunderShotNoTargetCommand = def({ id: -136344740, name: "ThunderShotNoTargetCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const ThunderShotNoTarget = def({ id: 958509220, name: "ThunderShotNoTarget", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const ThunderStaticShotCommand = def({ id: 1501310158, name: "ThunderStaticShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "position", type: "vector3" }] });
export const ThunderStaticShot = def({ id: 1690491826, name: "ThunderStaticShot", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "position", type: "vector3" }] });
export const ThunderTargetShotCommand = def({ id: 259979915, name: "ThunderTargetShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "internalPosition", type: "vector3" }, { name: "nicknameTarget", type: "string" },
    { name: "incarnationTarget", type: "i16" }, { name: "positionTarget", type: "vector3" }, { name: "positionInWorld", type: "vector3" },
] });
export const ThunderTargetShot = def({ id: -190359403, name: "ThunderTargetShot", direction: "s2c", schema: [{ name: "nicknameShooter", type: "string" }, { name: "nicknameTarget", type: "string" }, { name: "internalPosition", type: "vector3" }] });

// ===== smoky =====
export const SmokyStaticShotCommand = def({ id: 1470597926, name: "SmokyStaticShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "hitPosition", type: "vector3" }] });
export const SmokyStaticShot = def({ id: 546849203, name: "SmokyStaticShot", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "hitPosition", type: "vector3" }] });
export const SmokyTargetShotCommand = def({ id: 229267683, name: "SmokyTargetShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "targetUserId", type: "string" }, { name: "targetIncarnation", type: "i16" },
    { name: "targetPosition", type: "vector3" }, { name: "hitLocalPosition", type: "vector3" }, { name: "hitGlobalPosition", type: "vector3" },
] });
export const SmokyTargetShot = def({ id: -1334002026, name: "SmokyTargetShot", direction: "s2c", schema: [
    { name: "nickname", type: "string" }, { name: "targetNickname", type: "string" }, { name: "hitPosition", type: "vector3" },
    { name: "impactForce", type: "f32" }, { name: "critical", type: "bool" },
] });

// ===== twins =====
export const TwinsShotCommand = def({ id: -159686980, name: "TwinsShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "control", type: "i8" }, { name: "shotId", type: "i32" }, { name: "direction", type: "vector3" }] });
export const TwinsShot = def({ id: -44282936, name: "TwinsShot", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "control", type: "i8" }, { name: "direction", type: "vector3" }] });
// Cauda opcional (miss manda pacote curto): server lê head [clientTime, shotId] e, se sobrar, o tail.
export const TwinsTargetShotCommand = def({ id: -1723353904, name: "TwinsTargetShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "shotId", type: "i32" }, { name: "target", type: "string" }, { name: "hitGlobalPosition", type: "vector3" }] });

// ===== ricochet =====
export const RicochetShotCommand = def({ id: -1907971330, name: "RicochetShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "shortId", type: "i32" }, { name: "x", type: "i16" }, { name: "y", type: "i16" }, { name: "z", type: "i16" }] });
export const RicochetTargetShotCommand = def({ id: 1229701582, name: "RicochetTargetShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "target", type: "string" }] });
export const RicochetShot = def({ id: -118119523, name: "RicochetShot", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "x", type: "i16" }, { name: "y", type: "i16" }, { name: "z", type: "i16" }] });

// ===== shaft =====
// Head fixo + tail opcional dos shot-commands (arcade/aiming). Server lê o head e, se sobrar, o tail.
export const ShaftShotCommandHeadSchema = fields([{ name: "clientTime", type: "i32" }, { name: "origin", type: "vector3" }, { name: "unknownA", type: "i32" }, { name: "unknownB", type: "i8" }]);
export const ShaftShotCommandTailSchema = fields([{ name: "target", type: "string" }, { name: "unknownC", type: "i8" }, { name: "unknownD", type: "i32" }, { name: "hit", type: "vector3" }]);
export const ShaftArcadeShotCommand = def({ id: -2030760866, name: "ShaftArcadeShotCommand", direction: "c2s", schema: ShaftShotCommandHeadSchema });
export const ShaftAimingShotCommand = def({ id: 1632423559, name: "ShaftAimingShotCommand", direction: "c2s", schema: ShaftShotCommandHeadSchema });
export const ShaftAimTrackCommand = def({ id: -1517837003, name: "ShaftAimTrackCommand", direction: "c2s", schema: [{ name: "target", type: "string" }, { name: "direction", type: "vector3" }] });
export const ShaftAimTrack = def({ id: 11992250, name: "ShaftAimTrack", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "target", type: "string" }, { name: "direction", type: "vector3" }] });
export const ShaftEnterAiming = def({ id: -367760678, name: "ShaftEnterAiming", direction: "c2s", schema: [] });
export const ShaftAimEngaged = def({ id: -1487306515, name: "ShaftAimEngaged", direction: "c2s", schema: [] });
export const ShaftExitAiming = def({ id: 843751647, name: "ShaftExitAiming", direction: "c2s", schema: [] });
export const ShaftAimEnterRelay = def({ id: -1222085753, name: "ShaftAimEnterRelay", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const ShaftAimExitRelay = def({ id: -380595194, name: "ShaftAimExitRelay", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
// ShaftShot: encoding CONDICIONAL. `schema` = variante HIT; `ShaftShotMissSchema` = variante MISS.
// O server escolhe pelo `target !== null` (lógica) e a lib escreve os bytes.
export const ShaftShot = def({ id: 1184835319, name: "ShaftShot", direction: "s2c", schema: [
    { name: "nickname", type: "string" }, { name: "origin", type: "vector3" }, { name: "padA", type: "i32" }, { name: "padB", type: "i8" },
    { name: "target", type: "string" }, { name: "padC", type: "i8" }, { name: "padD", type: "i32" }, { name: "hit", type: "vector3" }, { name: "power", type: "f32" },
] });
export const ShaftShotMissSchema = fields([{ name: "nickname", type: "string" }, { name: "origin", type: "vector3" }, { name: "target", type: "string" }, { name: "hit", type: "vector3" }, { name: "power", type: "f32" }]);

// ===== flamethrower =====
// HitCommand: lê só clientTime + targets (o resto do fio — short + 2 vec-arrays — é ignorado).
export const FirebirdHitCommand = def({ id: 1395251766, name: "FirebirdHitCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "targets", type: "stringArray" }] });
export const StartShootingFlamethrowerCommand = def({ id: -1986638927, name: "StartShootingFlamethrowerCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StartShootingFlamethrower = def({ id: 1212381771, name: "StartShootingFlamethrower", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const StopShootingFlamethrowerCommand = def({ id: -1300958299, name: "StopShootingFlamethrowerCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StopShootingFlamethrower = def({ id: 1333088437, name: "StopShootingFlamethrower", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

// ===== freeze =====
export const FreezeHitCommand = def({ id: -2123941185, name: "FreezeHitCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "targets", type: "stringArray" }] });
export const StartShootingFreezeCommand = def({ id: -75406982, name: "StartShootingFreezeCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StartShootingFreeze = def({ id: -1171353580, name: "StartShootingFreeze", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const StopShootingFreezeCommand = def({ id: -1654947652, name: "StopShootingFreezeCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StopShootingFreeze = def({ id: 979099084, name: "StopShootingFreeze", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

// ===== machinegun =====
export const StartShootingMachinegunCommand = def({ id: -520655432, name: "StartShootingMachinegunCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StartShootingMachinegun = def({ id: -1616602030, name: "StartShootingMachinegun", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const MachinegunShotCommand = def({ id: -1889502569, name: "MachinegunShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "shotDirection", type: "vector3" },
    { name: "targets", type: "list", of: [
        { name: "localHitPoint", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "position", type: "vector3" },
        { name: "nickname", type: "string" }, { name: "turretAngle", type: "f32" },
    ] },
] });
export const MachinegunShot = def({ id: -891286317, name: "MachinegunShot", direction: "s2c", schema: [
    { name: "nickname", type: "string" }, { name: "shotDirection", type: "vector3" },
    { name: "targets", type: "list", of: [
        { name: "direction", type: "vector3" }, { name: "localHitPoint", type: "vector3" }, { name: "numberHits", type: "i8" }, { name: "nickname", type: "string" },
    ] },
] });
export const StopShootingMachinegunCommand = def({ id: 1794372798, name: "StopShootingMachinegunCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StopShootingMachinegun = def({ id: 133452238, name: "StopShootingMachinegun", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

// ===== shotgun =====
// ShotCommand: lê a list de pellets; server AGREGA em hitsByTarget (lógica).
export const ShotgunShotCommand = def({ id: -541655881, name: "ShotgunShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "direction", type: "vector3" },
    { name: "hits", type: "list", of: [
        { name: "worldHit", type: "vector3" }, { name: "normal", type: "vector3" }, { name: "center", type: "vector3" }, { name: "target", type: "string" }, { name: "unknown", type: "i32" },
    ] },
] });
export const ShotgunShot = def({ id: 471157826, name: "ShotgunShot", direction: "s2c", schema: [
    { name: "nickname", type: "string" }, { name: "direction", type: "vector3" },
    { name: "targets", type: "list", of: [
        { name: "direction", type: "vector3" }, { name: "hit", type: "vector3" }, { name: "pellets", type: "u8" }, { name: "nick", type: "string" },
    ] },
] });
