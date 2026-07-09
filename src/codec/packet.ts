import { readSchema, writeSchema } from "../schema/serializer";
import { defById } from "../registry/registry";
import { PacketDef } from "../registry/packet-def";

/** Result of a read: packet id, name (when known) and the decoded fields. */
export interface DecodedPacket<F = Record<string, any>> {
    id: number;
    name: string | null;
    fields: F;
}

function bodyOf(id: number, fields: Record<string, any>): Buffer {
    const d = defById(id);
    if (!d) throw new Error(`unknown packet: ${id}`);
    if (!d.schema) throw new Error(`packet ${d.name} (${id}) is opaque (no schema) — use the manual codec`);
    return writeSchema(fields, d.schema);
}

/**
 * Encode a WHOLE packet (int32 id + body).
 * Typed when given the definition; untyped when given the raw id.
 *
 *   encode(defs.auth.Login, { username, password, rememberMe }) => Buffer   (fields checked)
 *   encode(defs.auth.Login.id, { ... })                         => Buffer   (Record<string, any>)
 */
export function encode<F>(def: PacketDef<F>, fields: F): Buffer;
export function encode(id: number, fields?: Record<string, any>): Buffer;
export function encode(target: number | PacketDef<any>, fields: any = {}): Buffer {
    const id = typeof target === "number" ? target : target.id;
    const body = bodyOf(id, fields);
    const head = Buffer.alloc(4);
    head.writeInt32BE(id, 0);
    return Buffer.concat([head, body]);
}

/** Encode only the BODY (when the transport writes the id) — same typing as `encode`. */
export function encodeBody<F>(def: PacketDef<F>, fields: F): Buffer;
export function encodeBody(id: number, fields?: Record<string, any>): Buffer;
export function encodeBody(target: number | PacketDef<any>, fields: any = {}): Buffer {
    const id = typeof target === "number" ? target : target.id;
    return bodyOf(id, fields);
}

/**
 * Decode a WHOLE packet (int32 id + body). Not typed per-field because the id is only known at
 * runtime — use `decodeBody(def, ...)` when you want the fields typed.
 */
export function decode(buffer: Buffer): DecodedPacket {
    const id = buffer.readInt32BE(0);
    const d = defById(id);
    const fields: Record<string, any> = {};
    if (d?.schema) readSchema(fields, d.schema, buffer.subarray(4));
    return { id, name: d?.name ?? null, fields };
}

/**
 * Decode only the BODY (id already stripped by the transport). Typed when given the definition:
 *
 *   const { fields } = decodeBody(defs.auth.Login, body);   // fields: { username: string | null; ... }
 */
export function decodeBody<F>(def: PacketDef<F>, body: Buffer): DecodedPacket<F>;
export function decodeBody(id: number, body: Buffer): DecodedPacket;
export function decodeBody(target: number | PacketDef<any>, body: Buffer): DecodedPacket<any> {
    const id = typeof target === "number" ? target : target.id;
    const d = defById(id);
    const fields: Record<string, any> = {};
    if (d?.schema) readSchema(fields, d.schema, body);
    return { id, name: d?.name ?? null, fields };
}
