import { PacketDef, def } from "../registry/packet-def";

// Codec manual no server (lista de botões, cada um = 2 optString). Schema para o bridge.
export const SocialNetwork = def({ id: -1715719586, name: "SocialNetwork", direction: "s2c", schema: [{ name: "socialNetworkParams", type: "list", of: [{ name: "url", type: "string" }, { name: "label", type: "string" }] }] });
