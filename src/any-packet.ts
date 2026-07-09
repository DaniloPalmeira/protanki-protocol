import type { PacketDef } from "./registry/packet-def";

// Tipo do módulo de definições, obtido sem import de runtime (evita ciclo).
type Defs = typeof import("./definitions");

type ValuesOf<T> = T[keyof T];

// Achata os namespaces por feature (defs.auth.*, defs.lobby.*, ...) numa union de todos os PacketDef.
type EveryDef = ValuesOf<{ [Feat in keyof Defs]: ValuesOf<Defs[Feat]> }>;

// Mapeia cada PacketDef<F, N> para o formato decodificado { id; name: N; fields: F }.
type DecodedOf<D> = D extends PacketDef<infer F, infer N> ? { id: number; name: N; fields: F } : never;

/**
 * Union discriminada de TODOS os pacotes conhecidos, mais o caso desconhecido/opaco sem nome.
 * Retornada por `decode(buffer)`: estreite pelo `name` para obter os campos tipados.
 *
 *   const pkt = decode(buffer);
 *   if (pkt.name === "Login") pkt.fields.username;  // string | null
 */
export type AnyPacket = DecodedOf<EveryDef> | { id: number; name: null; fields: Record<string, any> };
