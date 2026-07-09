import { PacketDef } from "../registry/packet-def";
import { PacketSchema } from "../schema/types";

const NICK: PacketSchema = [{ name: "nickname", type: "string" }];

export const AcceptFriendRequest: PacketDef = { id: -1926185291, name: "AcceptFriendRequest", direction: "c2s", schema: NICK };
export const AcknowledgeNewFriend: PacketDef = { id: 1286861380, name: "AcknowledgeNewFriend", direction: "c2s", schema: NICK };
export const AcknowledgeNewFriendRequest: PacketDef = { id: -1041660861, name: "AcknowledgeNewFriendRequest", direction: "c2s", schema: NICK };
export const AlreadyFriends: PacketDef = { id: -2089008699, name: "AlreadyFriends", direction: "s2c", schema: NICK };
export const CancelFriendRequest: PacketDef = { id: 84050355, name: "CancelFriendRequest", direction: "c2s", schema: NICK };
export const CheckUserExistsForFriend: PacketDef = { id: 126880779, name: "CheckUserExistsForFriend", direction: "c2s", schema: NICK };
export const DeclineAllFriendRequests: PacketDef = { id: -1590185083, name: "DeclineAllFriendRequests", direction: "c2s", schema: [] };
export const DeclineFriendRequest: PacketDef = { id: -1588006900, name: "DeclineFriendRequest", direction: "c2s", schema: NICK };
export const FriendRemoved: PacketDef = { id: 1716773193, name: "FriendRemoved", direction: "s2c", schema: NICK };
export const FriendRequestAccepted: PacketDef = { id: -139645601, name: "FriendRequestAccepted", direction: "s2c", schema: NICK };
export const FriendRequestAlreadySent: PacketDef = { id: 2064692768, name: "FriendRequestAlreadySent", direction: "s2c", schema: NICK };
export const FriendRequestCanceledOrDeclined: PacketDef = { id: 614714702, name: "FriendRequestCanceledOrDeclined", direction: "s2c", schema: NICK };
export const FriendRequestDeclined: PacketDef = { id: -1885167992, name: "FriendRequestDeclined", direction: "s2c", schema: NICK };
export const FriendRequestSent: PacketDef = { id: -1241704092, name: "FriendRequestSent", direction: "s2c", schema: NICK };
export const FriendsList: PacketDef = { id: 1422563374, name: "FriendsList", direction: "s2c", schema: [{ name: "acceptedFriends", type: "optStringArray" }, { name: "newAcceptedFriends", type: "optStringArray" }, { name: "incomingRequests", type: "optStringArray" }, { name: "newIncomingRequests", type: "optStringArray" }, { name: "outgoingRequests", type: "optStringArray" }] };
export const IncomingFriendRequestExists: PacketDef = { id: -1258754138, name: "IncomingFriendRequestExists", direction: "s2c", schema: NICK };
export const LoadFriends: PacketDef = { id: -731115522, name: "LoadFriends", direction: "s2c", schema: [{ name: "unknown", type: "bool" }] };
export const NewFriendRequest: PacketDef = { id: 553380510, name: "NewFriendRequest", direction: "s2c", schema: NICK };
export const RemoveFriend: PacketDef = { id: -221757454, name: "RemoveFriend", direction: "c2s", schema: NICK };
export const UserExistsForFriend: PacketDef = { id: -707501253, name: "UserExistsForFriend", direction: "s2c", schema: [] };
export const UserInvalidForFriend: PacketDef = { id: -1490761936, name: "UserInvalidForFriend", direction: "s2c", schema: [] };
export const SendFriendRequest: PacketDef = { id: -1457773660, name: "SendFriendRequest", direction: "c2s", schema: NICK };
export const RequestFriendsListWindow: PacketDef = { id: 1441234714, name: "RequestFriendsListWindow", direction: "c2s", schema: [] };
export const ShowFriendsListWindow: PacketDef = { id: -437587751, name: "ShowFriendsListWindow", direction: "s2c", schema: [] };
