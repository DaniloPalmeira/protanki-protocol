import { PacketDef } from "../registry/packet-def";

export const RequestSettings: PacketDef = { id: 850220815, name: "RequestSettings", direction: "c2s", schema: [] };
// Codec manual no server (lista de social links). Schema para o bridge.
export const UserSettingsSocial: PacketDef = { id: -583564465, name: "UserSettingsSocial", direction: "s2c", schema: [{ name: "passwordCreated", type: "bool" }, { name: "socialLinks", type: "list", of: [{ name: "authorizationUrl", type: "string" }, { name: "isLinked", type: "bool" }, { name: "snId", type: "string" }] }] };
export const UserSettingsNotifications: PacketDef = { id: 1447082276, name: "UserSettingsNotifications", direction: "s2c", schema: [{ name: "notificationsEnabled", type: "bool" }] };
export const SetNotifications: PacketDef = { id: 1312986424, name: "SetNotifications", direction: "c2s", schema: [{ name: "enabled", type: "bool" }] };
export const UpdatePassword: PacketDef = { id: 762959326, name: "UpdatePassword", direction: "c2s", schema: [{ name: "password", type: "string" }, { name: "email", type: "string" }] };
export const UpdatePasswordResult: PacketDef = { id: 1570555748, name: "UpdatePasswordResult", direction: "s2c", schema: [{ name: "isError", type: "bool" }, { name: "message", type: "string" }] };
export const RequestChangePasswordForm: PacketDef = { id: -1507635228, name: "RequestChangePasswordForm", direction: "c2s", schema: [] };
export const ChangePasswordForm: PacketDef = { id: 600420685, name: "ChangePasswordForm", direction: "s2c", schema: [] };
export const CreatePasswordForm: PacketDef = { id: 133238100, name: "CreatePasswordForm", direction: "s2c", schema: [] };
export const LinkEmailRequest: PacketDef = { id: -20486732, name: "LinkEmailRequest", direction: "c2s", schema: [{ name: "email", type: "string" }] };
export const LinkAccountResultSuccess: PacketDef = { id: 2098576423, name: "LinkAccountResultSuccess", direction: "s2c", schema: [{ name: "identifier", type: "string" }] };
export const LinkAccountResultError: PacketDef = { id: -541741971, name: "LinkAccountResultError", direction: "s2c", schema: [] };
export const LinkAccountFailedAccountInUse: PacketDef = { id: -20513325, name: "LinkAccountFailedAccountInUse", direction: "s2c", schema: [{ name: "method", type: "string" }] };
