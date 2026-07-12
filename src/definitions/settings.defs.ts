import { PacketDef, def } from "../registry/packet-def";

export const RequestSettings = def({ id: 850220815, name: "RequestSettings", direction: "c2s", schema: [] });
// Codec manual no server (lista de social links). Schema para o bridge.
export const UserSettingsSocial = def({ id: -583564465, name: "UserSettingsSocial", direction: "s2c", schema: [{ name: "passwordCreated", type: "bool" }, { name: "socialLinks", type: "list", of: [{ name: "authorizationUrl", type: "string" }, { name: "isLinked", type: "bool" }, { name: "snId", type: "string" }] }] });
export const UserSettingsNotifications = def({ id: 1447082276, name: "UserSettingsNotifications", direction: "s2c", schema: [{ name: "notificationsEnabled", type: "bool" }] });
export const SetNotifications = def({ id: 1312986424, name: "SetNotifications", direction: "c2s", schema: [{ name: "enabled", type: "bool" }] });
export const UpdatePassword = def({ id: 762959326, name: "UpdatePassword", direction: "c2s", schema: [{ name: "password", type: "string" }, { name: "email", type: "string" }] });
export const UpdatePasswordResult = def({ id: 1570555748, name: "UpdatePasswordResult", direction: "s2c", schema: [{ name: "isError", type: "bool" }, { name: "message", type: "string" }] });
export const RequestChangePasswordForm = def({ id: -1507635228, name: "RequestChangePasswordForm", direction: "c2s", schema: [] });
export const ChangePasswordForm = def({ id: 600420685, name: "ChangePasswordForm", direction: "s2c", schema: [] });
export const CreatePasswordForm = def({ id: 133238100, name: "CreatePasswordForm", direction: "s2c", schema: [] });
export const LinkEmailRequest = def({ id: -20486732, name: "LinkEmailRequest", direction: "c2s", schema: [{ name: "email", type: "string" }] });
// Fluxo de credenciais do modelo 24: verifica a senha atual
// (evento "AccountSettingsEventCheckPassword"); server responde Accept/Reject.
export const CheckPassword = def({ id: -196636211, name: "CheckPassword", direction: "c2s", schema: [{ name: "password", type: "string" }] });
export const CheckPasswordAccept = def({ id: 652872053, name: "CheckPasswordAccept", direction: "s2c", schema: [] });
export const CheckPasswordReject = def({ id: 2029312880, name: "CheckPasswordReject", direction: "s2c", schema: [] });
// Submissão login/e-mail + senha (após captcha) no form de vincular conta.
export const LinkEmailWithPassword = def({ id: 668890771, name: "LinkEmailWithPassword", direction: "c2s", schema: [{ name: "login", type: "string" }, { name: "password", type: "string" }] });
export const LinkAccountResultSuccess = def({ id: 2098576423, name: "LinkAccountResultSuccess", direction: "s2c", schema: [{ name: "identifier", type: "string" }] });
export const LinkAccountResultError = def({ id: -541741971, name: "LinkAccountResultError", direction: "s2c", schema: [] });
export const LinkAccountFailedAccountInUse = def({ id: -20513325, name: "LinkAccountFailedAccountInUse", direction: "s2c", schema: [{ name: "method", type: "string" }] });
