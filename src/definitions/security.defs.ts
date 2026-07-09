import { PacketDef, def } from "../registry/packet-def";

// Handshake de proteção do protocolo. Codec manual no server (lista de i8 sem flag).
export const Protection = def({ id: 2001736388, name: "Protection", direction: "s2c", schema: [{ name: "keys", type: "list", of: [{ name: "key", type: "i8" }] }] });
