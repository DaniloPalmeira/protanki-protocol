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
// Estrutura real do client: 2 vec3 no fim (o def antigo deixava 13B sobrando — faltava o 2º vec3).
// 1º vec3 = posição do alvo (mesmo slot/campo do Ricochet; z = altura do chão nas capturas);
// 2º vec3 = ponto de impacto.
export const TwinsTargetShotCommand = def({ id: -1723353904, name: "TwinsTargetShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "shotId", type: "i32" }, { name: "target", type: "string" }, { name: "targetPosition", type: "vector3" }, { name: "hitPoint", type: "vector3" }] });

// ===== ricochet =====
export const RicochetShotCommand = def({ id: -1907971330, name: "RicochetShotCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }, { name: "shortId", type: "i32" }, { name: "x", type: "i16" }, { name: "y", type: "i16" }, { name: "z", type: "i16" }] });
// Estrutura real do client (o def antigo deixava 48B sobrando): shotId + posição do alvo +
// lista de pontos de impacto (os quiques do ricochet no alvo).
export const RicochetTargetShotCommand = def({ id: 1229701582, name: "RicochetTargetShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "target", type: "string" }, { name: "shotId", type: "i32" },
    { name: "targetPosition", type: "vector3" },
    { name: "hitPoints", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
] });
export const RicochetShot = def({ id: -118119523, name: "RicochetShot", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "x", type: "i16" }, { name: "y", type: "i16" }, { name: "z", type: "i16" }] });

// ===== shaft =====
// Estrutura REAL do client (o antigo hack head/tail só cobria 0–1 alvo; o Shaft perfura vários).
// Vetores paralelos indexados por alvo; null quando o tiro não acertou tanque.
// Validado contra capturas (20 comandos, incl. multi-campos preenchidos): incarnations = i16/item.
export const ShaftShotCommandSchema = fields([
    { name: "clientTime", type: "i32" },
    // Ponto atingido no cenário (null-flag no próprio vector3 quando só acertou tanques).
    { name: "staticHitPoint", type: "vector3" },
    { name: "targets", type: "nullableStringArray" },
    { name: "localHitPoints", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
    { name: "incarnations", type: "nullableList", of: [{ name: "i", type: "i16" }] },
    { name: "targetPositions", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
    { name: "globalHitPoints", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
]);
export const ShaftArcadeShotCommand = def({ id: -2030760866, name: "ShaftArcadeShotCommand", direction: "c2s", schema: ShaftShotCommandSchema });
export const ShaftAimingShotCommand = def({ id: 1632423559, name: "ShaftAimingShotCommand", direction: "c2s", schema: ShaftShotCommandSchema });
export const ShaftAimTrackCommand = def({ id: -1517837003, name: "ShaftAimTrackCommand", direction: "c2s", schema: [{ name: "target", type: "string" }, { name: "direction", type: "vector3" }] });
export const ShaftAimTrack = def({ id: 11992250, name: "ShaftAimTrack", direction: "s2c", schema: [{ name: "nickname", type: "string" }, { name: "target", type: "string" }, { name: "direction", type: "vector3" }] });
export const ShaftEnterAiming = def({ id: -367760678, name: "ShaftEnterAiming", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const ShaftAimEngaged = def({ id: -1487306515, name: "ShaftAimEngaged", direction: "c2s", schema: [] });
export const ShaftExitAiming = def({ id: 843751647, name: "ShaftExitAiming", direction: "c2s", schema: [] });
export const ShaftAimEnterRelay = def({ id: -1222085753, name: "ShaftAimEnterRelay", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const ShaftAimExitRelay = def({ id: -380595194, name: "ShaftAimExitRelay", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
// ShaftShot s2c: estrutura REAL do client (substitui as variantes hit/miss com pads —
// no wire é UM schema só; miss = targets/hitPoints null).
export const ShaftShot = def({ id: 1184835319, name: "ShaftShot", direction: "s2c", schema: [
    { name: "nickname", type: "string" },
    { name: "staticHitPoint", type: "vector3" },
    { name: "targets", type: "nullableStringArray" },
    { name: "localHitPoints", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
    { name: "power", type: "f32" },
] });

// ===== flamethrower =====
// HitCommand: lê só clientTime + targets (o resto do fio — short + 2 vec-arrays — é ignorado).
// Estrutura real do client (o def antigo ignorava a cauda — 43B sobrando): vetores paralelos
// por alvo, com incarnations em i16/item (mesmo codec do Shaft).
export const FirebirdHitCommand = def({ id: 1395251766, name: "FirebirdHitCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" },
    { name: "targets", type: "nullableStringArray" },
    { name: "incarnations", type: "nullableList", of: [{ name: "i", type: "i16" }] },
    { name: "targetPositions", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
    { name: "hitPoints", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
] });
export const StartShootingFlamethrowerCommand = def({ id: -1986638927, name: "StartShootingFlamethrowerCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StartShootingFlamethrower = def({ id: 1212381771, name: "StartShootingFlamethrower", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const StopShootingFlamethrowerCommand = def({ id: -1300958299, name: "StopShootingFlamethrowerCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StopShootingFlamethrower = def({ id: 1333088437, name: "StopShootingFlamethrower", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

// ===== freeze =====
// Mesma forma do FirebirdHitCommand (classe irmã no client).
export const FreezeHitCommand = def({ id: -2123941185, name: "FreezeHitCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" },
    { name: "targets", type: "nullableStringArray" },
    { name: "incarnations", type: "nullableList", of: [{ name: "i", type: "i16" }] },
    { name: "targetPositions", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
    { name: "hitPoints", type: "nullableList", of: [{ name: "v", type: "vector3" }] },
] });
export const StartShootingFreezeCommand = def({ id: -75406982, name: "StartShootingFreezeCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StartShootingFreeze = def({ id: -1171353580, name: "StartShootingFreeze", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const StopShootingFreezeCommand = def({ id: -1654947652, name: "StopShootingFreezeCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
export const StopShootingFreeze = def({ id: 979099084, name: "StopShootingFreeze", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

// ===== isis (modelo/space 55 no client) =====
// Módulo do Isis (arma de cura/dano contínuo). Codec do enum aparece SEM ofuscação no client:
// "CodecIsisState" (i32 ordinal 0..3; amostra: 3 com alvo aliado — provável 0=idle e
// healing/damaging entre 1..3, mapeamento exato não confirmado).
export const IsisStartCommand = def({ id: -248693565, name: "IsisStartCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
// §function for var§ é chamado no client ao DESLIGAR o jato (set enabled=false / cleanup).
export const IsisStopCommand = def({ id: -1051248475, name: "IsisStopCommand", direction: "c2s", schema: [{ name: "clientTime", type: "i32" }] });
// Tick periódico enquanto o jato toca um alvo (incarnation = i16, codec "set var break" = short).
export const IsisTargetTickCommand = def({ id: 381067984, name: "IsisTargetTickCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "target", type: "string" },
    { name: "incarnation", type: "i16" }, { name: "localHitPoint", type: "vector3" },
] });
// Variante SEM id do alvo (posição+incarnation apenas) — enviada por outro caminho do controller
// (provável engate/validação de alvo). Semântica exata com confiança média.
export const IsisTargetPositionCommand = def({ id: 244072998, name: "IsisTargetPositionCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "incarnation", type: "i16" },
    { name: "targetPosition", type: "vector3" }, { name: "localHitPoint", type: "vector3" },
] });
// Relay s2c do estado do Isis de outro jogador. targetData.position é um vector3 anulável
// (null-flag do próprio tipo); incarnation aqui é i8 (byte), diferente dos commands (i16).
export const SetIsisState = def({ id: 2001632000, name: "SetIsisState", direction: "s2c", schema: [
    { name: "nickname", type: "string" },
    { name: "state", type: "i32" },
    { name: "position", type: "vector3" },
    { name: "localHitPoint", type: "vector3" },
    { name: "incarnation", type: "i8" },
    { name: "target", type: "string" },
] });
// Par start/stop s2c ({nickname}); mapeamento start×stop com confiança média (contagens 872/858).
export const StartShootingIsis = def({ id: -1271729363, name: "StartShootingIsis", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });
export const StopShootingIsis = def({ id: 981035905, name: "StopShootingIsis", direction: "s2c", schema: [{ name: "nickname", type: "string" }] });

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
// Item do pellet = mesmo formato dos targets do Machinegun (nomes do client):
// hit local, orientação e posição do alvo, id do alvo (null = acertou cenário) e turretAngle f32.
export const ShotgunShotCommand = def({ id: -541655881, name: "ShotgunShotCommand", direction: "c2s", schema: [
    { name: "clientTime", type: "i32" }, { name: "direction", type: "vector3" },
    { name: "hits", type: "list", of: [
        { name: "localHitPoint", type: "vector3" }, { name: "orientation", type: "vector3" }, { name: "position", type: "vector3" }, { name: "target", type: "string" }, { name: "turretAngle", type: "f32" },
    ] },
] });
export const ShotgunShot = def({ id: 471157826, name: "ShotgunShot", direction: "s2c", schema: [
    { name: "nickname", type: "string" }, { name: "direction", type: "vector3" },
    { name: "targets", type: "list", of: [
        { name: "direction", type: "vector3" }, { name: "hit", type: "vector3" }, { name: "pellets", type: "u8" }, { name: "nick", type: "string" },
    ] },
] });
