import { def } from "../registry/packet-def";

// Armas: comandos de tiro e relays. Codec customizado no server (arrays paralelos de
// alvos, vetores, etc.). Ficam OPACOS aqui (schema ausente) — o bridge os identifica por
// nome/direção; decodificar o corpo de tiro exige lógica dedicada por arma. Direção é
// heurística: *Command = cliente→servidor, demais = servidor→cliente.

// railgun
export const RailgunShotCommand = def({ id: -484994657, name: "RailgunShotCommand", direction: "c2s" });
export const RailgunShot = def({ id: -369590613, name: "RailgunShot", direction: "s2c" });
export const StartChargingCommand = def({ id: -1759063234, name: "StartChargingCommand", direction: "c2s" });
export const StartCharging = def({ id: 346830254, name: "StartCharging", direction: "s2c" });
// thunder
export const ThunderShotNoTargetCommand = def({ id: -136344740, name: "ThunderShotNoTargetCommand", direction: "c2s" });
export const ThunderShotNoTarget = def({ id: 958509220, name: "ThunderShotNoTarget", direction: "s2c" });
export const ThunderStaticShotCommand = def({ id: 1501310158, name: "ThunderStaticShotCommand", direction: "c2s" });
export const ThunderStaticShot = def({ id: 1690491826, name: "ThunderStaticShot", direction: "s2c" });
export const ThunderTargetShotCommand = def({ id: 259979915, name: "ThunderTargetShotCommand", direction: "c2s" });
export const ThunderTargetShot = def({ id: -190359403, name: "ThunderTargetShot", direction: "s2c" });
// smoky
export const SmokyStaticShotCommand = def({ id: 1470597926, name: "SmokyStaticShotCommand", direction: "c2s" });
export const SmokyStaticShot = def({ id: 546849203, name: "SmokyStaticShot", direction: "s2c" });
export const SmokyTargetShotCommand = def({ id: 229267683, name: "SmokyTargetShotCommand", direction: "c2s" });
export const SmokyTargetShot = def({ id: -1334002026, name: "SmokyTargetShot", direction: "s2c" });
// twins
export const TwinsShotCommand = def({ id: -159686980, name: "TwinsShotCommand", direction: "c2s" });
export const TwinsShot = def({ id: -44282936, name: "TwinsShot", direction: "s2c" });
export const TwinsTargetShotCommand = def({ id: -1723353904, name: "TwinsTargetShotCommand", direction: "c2s" });
// ricochet
export const RicochetShotCommand = def({ id: -1907971330, name: "RicochetShotCommand", direction: "c2s" });
export const RicochetTargetShotCommand = def({ id: 1229701582, name: "RicochetTargetShotCommand", direction: "c2s" });
export const RicochetShot = def({ id: -118119523, name: "RicochetShot", direction: "s2c" });
// shaft
export const ShaftArcadeShotCommand = def({ id: -2030760866, name: "ShaftArcadeShotCommand", direction: "c2s" });
export const ShaftAimingShotCommand = def({ id: 1632423559, name: "ShaftAimingShotCommand", direction: "c2s" });
export const ShaftAimTrackCommand = def({ id: -1517837003, name: "ShaftAimTrackCommand", direction: "c2s" });
export const ShaftAimTrack = def({ id: 11992250, name: "ShaftAimTrack", direction: "s2c" });
export const ShaftEnterAiming = def({ id: -367760678, name: "ShaftEnterAiming", direction: "c2s" });
export const ShaftAimEngaged = def({ id: -1487306515, name: "ShaftAimEngaged", direction: "s2c" });
export const ShaftExitAiming = def({ id: 843751647, name: "ShaftExitAiming", direction: "c2s" });
export const ShaftAimEnterRelay = def({ id: -1222085753, name: "ShaftAimEnterRelay", direction: "s2c" });
export const ShaftAimExitRelay = def({ id: -380595194, name: "ShaftAimExitRelay", direction: "s2c" });
export const ShaftShot = def({ id: 1184835319, name: "ShaftShot", direction: "s2c" });
// flamethrower
export const FirebirdHitCommand = def({ id: 1395251766, name: "FirebirdHitCommand", direction: "c2s" });
export const StartShootingFlamethrowerCommand = def({ id: -1986638927, name: "StartShootingFlamethrowerCommand", direction: "c2s" });
export const StartShootingFlamethrower = def({ id: 1212381771, name: "StartShootingFlamethrower", direction: "s2c" });
export const StopShootingFlamethrowerCommand = def({ id: -1300958299, name: "StopShootingFlamethrowerCommand", direction: "c2s" });
export const StopShootingFlamethrower = def({ id: 1333088437, name: "StopShootingFlamethrower", direction: "s2c" });
// shotgun
export const ShotgunShotCommand = def({ id: -541655881, name: "ShotgunShotCommand", direction: "c2s" });
export const ShotgunShot = def({ id: 471157826, name: "ShotgunShot", direction: "s2c" });
// freeze
export const FreezeHitCommand = def({ id: -2123941185, name: "FreezeHitCommand", direction: "c2s" });
export const StartShootingFreezeCommand = def({ id: -75406982, name: "StartShootingFreezeCommand", direction: "c2s" });
export const StartShootingFreeze = def({ id: -1171353580, name: "StartShootingFreeze", direction: "s2c" });
export const StopShootingFreezeCommand = def({ id: -1654947652, name: "StopShootingFreezeCommand", direction: "c2s" });
export const StopShootingFreeze = def({ id: 979099084, name: "StopShootingFreeze", direction: "s2c" });
// machinegun
export const StartShootingMachinegunCommand = def({ id: -520655432, name: "StartShootingMachinegunCommand", direction: "c2s" });
export const StartShootingMachinegun = def({ id: -1616602030, name: "StartShootingMachinegun", direction: "s2c" });
export const MachinegunShotCommand = def({ id: -1889502569, name: "MachinegunShotCommand", direction: "c2s" });
export const MachinegunShot = def({ id: -891286317, name: "MachinegunShot", direction: "s2c" });
export const StopShootingMachinegunCommand = def({ id: 1794372798, name: "StopShootingMachinegunCommand", direction: "c2s" });
export const StopShootingMachinegun = def({ id: 133452238, name: "StopShootingMachinegun", direction: "s2c" });
