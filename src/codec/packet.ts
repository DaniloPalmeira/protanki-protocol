import { readSchema, writeSchema } from "../schema/serializer";
import { defById } from "../registry/registry";

/** Resultado de uma leitura: id do pacote, nome (se conhecido) e os campos decodificados. */
export interface DecodedPacket {
    id: number;
    name: string | null;
    fields: Record<string, any>;
}

/**
 * escrever: monta um pacote COMPLETO (int32 id + corpo) a partir do id e dos campos.
 * Lança se o id for desconhecido ou se o pacote for opaco (sem schema declarativo).
 *
 *   escrever(defs.auth.Login.id, { username, password, rememberMe }) => Buffer
 */
export function escrever(id: number, fields: Record<string, any> = {}): Buffer {
    const def = defById(id);
    if (!def) throw new Error(`pacote desconhecido: ${id}`);
    if (!def.schema) throw new Error(`pacote ${def.name} (${id}) é opaco (sem schema) — use o codec manual`);
    const body = writeSchema(fields, def.schema);
    const head = Buffer.alloc(4);
    head.writeInt32BE(id, 0);
    return Buffer.concat([head, body]);
}

/**
 * ler: decodifica um pacote COMPLETO (int32 id + corpo) em { id, name, fields }.
 * Se o id não tiver schema, `fields` volta vazio (mas o id/nome ainda são resolvidos).
 *
 *   ler(buffer) => { id: -739684591, name: "Login", fields: { username, password, rememberMe } }
 */
export function ler(buffer: Buffer): DecodedPacket {
    const id = buffer.readInt32BE(0);
    const def = defById(id);
    const fields: Record<string, any> = {};
    if (def?.schema) readSchema(fields, def.schema, buffer.subarray(4));
    return { id, name: def?.name ?? null, fields };
}

/**
 * Variante SÓ-CORPO: quando o transporte já separou o id (como no letanki-server e no
 * protanki-bridge, onde o framing lê o id antes). Retorna/consome apenas o corpo do pacote.
 */
export function escreverCorpo(id: number, fields: Record<string, any> = {}): Buffer {
    const def = defById(id);
    if (!def) throw new Error(`pacote desconhecido: ${id}`);
    if (!def.schema) throw new Error(`pacote ${def.name} (${id}) é opaco (sem schema) — use o codec manual`);
    return writeSchema(fields, def.schema);
}

export function lerCorpo(id: number, body: Buffer): DecodedPacket {
    const def = defById(id);
    const fields: Record<string, any> = {};
    if (def?.schema) readSchema(fields, def.schema, body);
    return { id, name: def?.name ?? null, fields };
}

// Aliases em inglês, para quem preferir.
export const encode = escrever;
export const decode = ler;
export const encodeBody = escreverCorpo;
export const decodeBody = lerCorpo;
