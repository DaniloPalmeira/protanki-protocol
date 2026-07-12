import { PacketDef, def } from "../registry/packet-def";

export const SystemMessage = def({ id: -600078553, name: "SystemMessage", direction: "s2c", schema: [{ name: "text", type: "string" }] });
// Modal com botão OK (modelo 25). Amostra: "Você foi removido da batalha por inatividade".
export const ShowAlertMessage = def({ id: -322235316, name: "ShowAlertMessage", direction: "s2c", schema: [{ name: "text", type: "string" }] });
export const Ping = def({ id: -555602629, name: "Ping", direction: "s2c", schema: [] });
export const Pong = def({ id: 1484572481, name: "Pong", direction: "c2s", schema: [] });
// Codec manual no server (lista de i32 sem flag). Schema para o bridge.
export const CaptchaLocation = def({ id: 321971701, name: "CaptchaLocation", direction: "s2c", schema: [{ name: "captchaLocations", type: "list", of: [{ name: "location", type: "i32" }] }] });
export const InviteEnabled = def({ id: 444933603, name: "InviteEnabled", direction: "s2c", schema: [{ name: "requireInviteCode", type: "bool" }] });
export const ConfirmLayoutChange = def({ id: -593368100, name: "ConfirmLayoutChange", direction: "s2c", schema: [{ name: "fromLayout", type: "i32" }, { name: "toLayout", type: "i32" }] });
export const SetLayout = def({ id: 1118835050, name: "SetLayout", direction: "s2c", schema: [{ name: "layoutId", type: "i32" }] });

// Aviso de reinício do servidor (modelo 2, payload vazio): alerta "SERVER_IS_RESTARTING_LOGIN_TEXT",
// com flag persistente que re-exibe o alerta na tela de login.
export const ServerRestartWarning = def({ id: -1317889894, name: "ServerRestartWarning", direction: "s2c", schema: [] });
// Tela de prêmio "cartão bônus" (modelo 21): objeto 3D "BonusObject" + textos. Amostra: cartão
// "Double Crystal" válido por 24h (header veio vazio na única amostra).
export const ShowBonusCard = def({ id: -875418096, name: "ShowBonusCard", direction: "s2c", schema: [
    { name: "itemPreview", type: "resource" }, { name: "header", type: "string" }, { name: "text", type: "string" },
] });

// ===== halt (system/halt.packets.ts) — codec manual no server =====
export const HaltServer = def({ id: -1712113407, name: "HaltServer", direction: "s2c", schema: [{ name: "seconds", type: "i32" }] });
export const BattleHalt = def({ id: -831998018, name: "BattleHalt", direction: "s2c", schema: [{ name: "text", type: "string" }] });
