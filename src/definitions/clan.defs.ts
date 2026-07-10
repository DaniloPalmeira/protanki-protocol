import { PacketDef, def } from "../registry/packet-def";
import { fields } from "../schema/infer";
import { PacketSchema } from "../schema/types";

// Clã. A ESTRUTURA do fio (incl. o Long de 8 bytes = i64, os models e os vetores com presence byte)
// fica aqui; o server passa os VALORES (ClanView/MemberModel → campos). `stringArray` = writeUInt8(0)
// + int32 count + optStrings (o "presence byte" vector do cliente).

const USER = fields([{ name: "username", type: "string" }]);
const TAG = fields([{ name: "tag", type: "string" }]);
const NAME = fields([{ name: "name", type: "string" }]);

// Modelo LIGHT de clã (my-clan window field0, join-request card, ratings list). Ordem validada byte-a-byte.
const LIGHT_CLAN_MODEL: PacketSchema = [
    { name: "f1", type: "u8" }, { name: "clanId", type: "i64" }, { name: "leader", type: "string" }, { name: "description", type: "string" },
    { name: "recruiting", type: "bool" }, { name: "f6", type: "i32" }, { name: "f7", type: "i32" }, { name: "minRank", type: "i8" },
    { name: "name", type: "string" }, { name: "s10", type: "string" }, { name: "f11", type: "u8" }, { name: "tag", type: "string" },
    { name: "memberNicks", type: "stringArray" }, { name: "logo", type: "string" }, { name: "rating", type: "i32" },
];
// Modelo de 10 campos do membro (Long lastOnlineDate = i64).
const MEMBER_MODEL: PacketSchema = [
    { name: "secondsInClan", type: "i32" }, { name: "deaths", type: "i32" }, { name: "kills", type: "i32" }, { name: "lastOnlineDate", type: "i64" },
    { name: "permission", type: "i32" }, { name: "score", type: "i32" }, { name: "nick", type: "string" },
    { name: "minesUsed", type: "i32" }, { name: "clanScore", type: "i32" }, { name: "weeklyClanScore", type: "i32" },
];

export const KickClanMember = def({ id: 459991202, name: "KickClanMember", direction: "c2s", schema: USER });
export const SetClanMemberPosition = def({ id: 90109270, name: "SetClanMemberPosition", direction: "c2s", schema: [{ name: "username", type: "string" }, { name: "position", type: "i32" }] });
export const SetClanLogo = def({ id: 99387765, name: "SetClanLogo", direction: "c2s", schema: [{ name: "image", type: "bytes" }] });
export const LeaveClan = def({ id: -1298483664, name: "LeaveClan", direction: "c2s", schema: [] });
export const ClanPermissions = def({ id: -453603415, name: "ClanPermissions", direction: "s2c", schema: [{ name: "flags", type: "list", of: [{ name: "flag", type: "i32" }] }] });
export const ClanCooldown = def({ id: -745085341, name: "ClanCooldown", direction: "s2c", schema: [{ name: "seconds", type: "i32" }] });
export const RemoveClanMember = def({ id: 1039356886, name: "RemoveClanMember", direction: "s2c", schema: USER });
export const MemberStatusNotify = def({ id: 1059383280, name: "MemberStatusNotify", direction: "s2c", schema: USER });
export const MarkMemberSeen = def({ id: -1922978824, name: "MarkMemberSeen", direction: "c2s", schema: USER });
export const OpenMyClanWindow = def({ id: 2073319841, name: "OpenMyClanWindow", direction: "c2s", schema: [] });
export const NotifyJoinRequest = def({ id: 1321902609, name: "NotifyJoinRequest", direction: "s2c", schema: USER });
export const AddJoinRequest = def({ id: 273571175, name: "AddJoinRequest", direction: "s2c", schema: USER });
export const AcceptJoinRequest = def({ id: -2875943, name: "AcceptJoinRequest", direction: "c2s", schema: USER });
export const SelectJoinRequest = def({ id: -344258352, name: "SelectJoinRequest", direction: "c2s", schema: USER });
export const DeclineAllJoinRequests = def({ id: -304905793, name: "DeclineAllJoinRequests", direction: "c2s", schema: [] });
export const DeclineJoinRequest = def({ id: 1327826221, name: "DeclineJoinRequest", direction: "c2s", schema: USER });
export const JoinRequestDeclined = def({ id: -1735563082, name: "JoinRequestDeclined", direction: "s2c", schema: USER });
export const RemoveJoinRequest = def({ id: 1452773298, name: "RemoveJoinRequest", direction: "s2c", schema: USER });
export const ShowNotInClanPanel = def({ id: -1123511676, name: "ShowNotInClanPanel", direction: "c2s", schema: [] });
export const CloseClanWindow = def({ id: 924070374, name: "CloseClanWindow", direction: "both", schema: [] });
export const HideNotInClanPanel = def({ id: -2002206647, name: "HideNotInClanPanel", direction: "c2s", schema: [] });
export const GetClanRatingsData = def({ id: -2080893689, name: "GetClanRatingsData", direction: "c2s", schema: [{ name: "startIndex", type: "i32" }, { name: "count", type: "i32" }] });
export const SetClanRatingsData = def({ id: 134406915, name: "SetClanRatingsData", direction: "s2c", schema: [{ name: "startIndex", type: "i32" }, { name: "clans", type: "list", of: LIGHT_CLAN_MODEL }] });
export const ShowForeignClan = def({ id: 947733823, name: "ShowForeignClan", direction: "c2s", schema: TAG });
export const CreateClan = def({ id: -1267250495, name: "CreateClan", direction: "c2s", schema: [{ name: "name", type: "string" }, { name: "tag", type: "string" }] });
export const CheckClanTag = def({ id: -1879289905, name: "CheckClanTag", direction: "c2s", schema: TAG });
export const CheckClanName = def({ id: 1591528838, name: "CheckClanName", direction: "c2s", schema: NAME });
export const CheckInviteUser = def({ id: 819097883, name: "CheckInviteUser", direction: "c2s", schema: USER });
export const InviteUserValid = def({ id: 1796904481, name: "InviteUserValid", direction: "s2c", schema: [] });
export const InviteUserInvalid = def({ id: -616439158, name: "InviteUserInvalid", direction: "s2c", schema: [] });
export const SetClanDescription = def({ id: -1752335888, name: "SetClanDescription", direction: "both", schema: [{ name: "description", type: "string" }] });
export const SetClanMinRank = def({ id: -1145619463, name: "SetClanMinRank", direction: "c2s", schema: [{ name: "minRank", type: "i8" }] });
export const SetClanRecruiting = def({ id: -614563927, name: "SetClanRecruiting", direction: "c2s", schema: [{ name: "recruiting", type: "bool" }] });
export const SendClanInvite = def({ id: -2053489715, name: "SendClanInvite", direction: "c2s", schema: USER });
export const ClanInviteSentAck = def({ id: 1921140979, name: "ClanInviteSentAck", direction: "s2c", schema: USER });
export const CancelClanInvite = def({ id: 2041223590, name: "CancelClanInvite", direction: "c2s", schema: USER });
export const ClanInviteCancelledAck = def({ id: 112423798, name: "ClanInviteCancelledAck", direction: "s2c", schema: USER });
export const ViewInviteClan = def({ id: 405171321, name: "ViewInviteClan", direction: "c2s", schema: TAG });
export const ViewInviteClanResponse = def({ id: 781410259, name: "ViewInviteClanResponse", direction: "s2c", schema: TAG });
export const AcceptClanInvite = def({ id: 1533026019, name: "AcceptClanInvite", direction: "c2s", schema: TAG });
export const DeclineClanInvite = def({ id: 1010729260, name: "DeclineClanInvite", direction: "c2s", schema: TAG });
export const ClanInviteNotify = def({ id: 134379747, name: "ClanInviteNotify", direction: "s2c", schema: TAG });
export const ClanInviteAck = def({ id: 1901058987, name: "ClanInviteAck", direction: "s2c", schema: TAG });
export const JoinClanRequest = def({ id: -1137965580, name: "JoinClanRequest", direction: "c2s", schema: TAG });
export const SearchClanByName = def({ id: -378947621, name: "SearchClanByName", direction: "c2s", schema: NAME });
export const ClanSearchFound = def({ id: 1726541163, name: "ClanSearchFound", direction: "s2c", schema: [] });
export const ClanSearchUnavailable = def({ id: -866005248, name: "ClanSearchUnavailable", direction: "s2c", schema: [] });
export const JoinClanByName = def({ id: -705969616, name: "JoinClanByName", direction: "c2s", schema: NAME });
export const CancelJoinClanRequest = def({ id: 1913571122, name: "CancelJoinClanRequest", direction: "c2s", schema: TAG });
export const CancelJoinRequestFromModal = def({ id: -930926299, name: "CancelJoinRequestFromModal", direction: "c2s", schema: TAG });
export const MyClanWindow = def({ id: -8296541, name: "MyClanWindow", direction: "s2c", schema: [
    { name: "clanModel", type: "object", of: LIGHT_CLAN_MODEL },
    { name: "members", type: "list", of: MEMBER_MODEL },
    { name: "perms", type: "list", of: [{ name: "ordinal", type: "i32" }] },
    { name: "memberNicks", type: "stringArray" }, { name: "joinRequests", type: "stringArray" }, { name: "sentInvites", type: "stringArray" },
] });
export const ClanTagNotify = def({ id: -88976442, name: "ClanTagNotify", direction: "s2c", schema: TAG });
export const ClanNameNotify = def({ id: -1673544562, name: "ClanNameNotify", direction: "s2c", schema: NAME });
export const AddClanMember = def({ id: 1741285576, name: "AddClanMember", direction: "s2c", schema: MEMBER_MODEL });
export const MemberAddedNotify = def({ id: 385150953, name: "MemberAddedNotify", direction: "s2c", schema: USER });
export const ClanLeaderNotify = def({ id: -915300943, name: "ClanLeaderNotify", direction: "s2c", schema: [{ name: "nick", type: "string" }] });
// Card de pedido de entrada: tag externa + um light model com layout PRÓPRIO (não é o LIGHT_CLAN_MODEL).
export const JoinRequestModel = def({ id: 325031295, name: "JoinRequestModel", direction: "s2c", schema: [
    { name: "outerTag", type: "string" }, { name: "f1", type: "u8" }, { name: "clanId", type: "i64" }, { name: "leader", type: "string" },
    { name: "recruiting", type: "bool" }, { name: "f6", type: "u8" }, { name: "f7", type: "i32" }, { name: "f8", type: "i32" }, { name: "minRank", type: "i8" },
    { name: "name", type: "string" }, { name: "f11", type: "u8" }, { name: "f12", type: "u8" }, { name: "tag", type: "string" },
    { name: "memberNicks", type: "stringArray" }, { name: "logo", type: "string" }, { name: "rating", type: "i32" },
] });
export const JoinRequestSent = def({ id: -905757704, name: "JoinRequestSent", direction: "s2c", schema: TAG });
export const JoinRequestCancelled = def({ id: -2007179326, name: "JoinRequestCancelled", direction: "s2c", schema: TAG });
export const ClanTagAvailable = def({ id: -965581529, name: "ClanTagAvailable", direction: "s2c", schema: [] });
export const ClanTagTaken = def({ id: 1873830541, name: "ClanTagTaken", direction: "s2c", schema: [] });
export const ClanNameAvailable = def({ id: -148282578, name: "ClanNameAvailable", direction: "s2c", schema: [] });
export const ClanNameTaken = def({ id: -253044119, name: "ClanNameTaken", direction: "s2c", schema: [] });
export const ShowNotInClanWindow = def({ id: 560344632, name: "ShowNotInClanWindow", direction: "s2c", schema: [{ name: "intro", type: "resource" }, { name: "card", type: "resource" }] });
// Janela de clã (read-only). Layout PRÓPRIO (members SEM presence byte). Nomes recuperados do
// client decompilado: o pacote é 1 composite de 16 campos; a UI da janela (botão de entrada,
// labels CLAN_*) fixa a semântica de cada um.
export const ShowForeignClanWindow = def({ id: -1855118498, name: "ShowForeignClanWindow", direction: "s2c", schema: [
    // Clã bloqueado (esconde o botão de entrada; par do blockReason e do evento CLAN_BLOCK).
    { name: "blocked", type: "bool" },
    // Data de criação em ms epoch — a UI faz new Date(Number(x)) p/ "CLAN_CREATION_DATE_WITH_COLON".
    // (Antes nomeado clanId — o client NÃO trata como id.)
    { name: "creationDate", type: "i64" },
    // Nick do fundador (label "CLAN_FOUNDER_WITH_COLON").
    { name: "founder", type: "string" },
    { name: "description", type: "string" },
    // false → botão desabilitado com "CLAN_NOT_RECRUITING".
    { name: "recruiting", type: "bool" },
    // Limite de membros do clã (lado servidor; o client carrega mas não lê este campo).
    { name: "maxMembers", type: "i32" },
    // true → esconde o botão de entrada (provável "é o seu próprio clã"). Confiança baixa.
    { name: "joinHidden", type: "bool" },
    // Rank mínimo p/ pedir entrada (byte; se > rank do usuário, esconde o botão).
    { name: "minRank", type: "u8" },
    { name: "name", type: "string" },
    // Mensagem exibida quando blocked=true (slot do CLAN_BLOCK).
    { name: "blockReason", type: "string" },
    // true → você recebeu convite p/ entrar neste clã (botão vira "CLAN_ACCEPT_REQUEST").
    { name: "invitedYou", type: "bool" },
    // true → você pediu p/ entrar neste clã (botão vira "CLAN_REMOVE_REQUEST_TO_CLAN").
    { name: "requestSent", type: "bool" },
    { name: "tag", type: "string" },
    { name: "members", type: "list", of: MEMBER_MODEL },
    // URL/resource string do logo (vai junto com a tag pro loader da janela).
    { name: "logo", type: "string" },
    // Pontuação do clã (stat "CLAN_SCORE").
    { name: "score", type: "i32" },
] });
export const OpenClanMissions = def({ id: -2127613673, name: "OpenClanMissions", direction: "c2s", schema: [] });
export const ShowClanMissions = def({ id: 1720177051, name: "ShowClanMissions", direction: "s2c", schema: [
    { name: "missions", type: "list", of: [
        { name: "id", type: "i32" }, { name: "icon", type: "resource" }, { name: "description", type: "string" },
        { name: "prizes", type: "list", of: [{ name: "count", type: "i32" }, { name: "name", type: "string" }] },
        { name: "criteria", type: "i32" }, { name: "progress", type: "i32" }, { name: "secondsToReset", type: "i32" }, { name: "completed", type: "bool" },
    ] },
] });
