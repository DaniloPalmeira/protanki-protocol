import { BufferReader } from "../codec/buffer.reader";
import { BufferWriter } from "../codec/buffer.writer";
import { PacketSchema, PrimitiveType } from "./types";

const READERS: Record<PrimitiveType, (r: BufferReader) => unknown> = {
    u8: (r) => r.readUInt8(),
    i8: (r) => r.readInt8(),
    i16: (r) => r.readInt16BE(),
    i32: (r) => r.readInt32BE(),
    f32: (r) => r.readFloatBE(),
    bool: (r) => r.readUInt8() === 1,
    resource: (r) => r.readResource(),
    string: (r) => r.readOptionalString(),
    stringArray: (r) => r.readStringArray(),
    optStringArray: (r) => r.readStringArray(),
    i16Array: (r) => r.readInt16Array(),
    vector3: (r) => r.readOptionalVector3(),
    vector3Array: (r) => r.readVector3Array(),
    bytes: (r) => r.readBytes(r.readInt32BE()),
};

const WRITERS: Record<PrimitiveType, (w: BufferWriter, value: any) => void> = {
    u8: (w, v) => w.writeUInt8(v),
    i8: (w, v) => w.writeInt8(v),
    i16: (w, v) => w.writeInt16BE(v),
    i32: (w, v) => w.writeInt32BE(v),
    f32: (w, v) => w.writeFloatBE(v),
    bool: (w, v) => w.writeUInt8(v ? 1 : 0),
    resource: (w, v) => w.writeResource(v),
    string: (w, v) => w.writeOptionalString(v),
    stringArray: (w, v) => w.writeStringArray(v),
    optStringArray: (w, v) => w.writeOptionalStringArray(v),
    i16Array: (w, v) => w.writeInt16Array(v),
    vector3: (w, v) => w.writeOptionalVector3(v),
    vector3Array: (w, v) => w.writeVector3Array(v),
    bytes: (w, v: Buffer) => { w.writeInt32BE(v.length); w.writeBuffer(v); },
};

/**
 * Generic reflective (de)serializer. Convenient and correct for the LONG TAIL of packet types, but the
 * shared `source[field.name]` / `target[field.name]` sites go MEGAMORPHIC in V8 under high packet volume
 * (they see every packet shape). So the few HIGH-FREQUENCY packets — movement relay + mine placement —
 * DON'T use this: they carry hand-written monomorphic read()/write() (see battle-combat.packets.ts /
 * battle mine packets). Everything else stays here where volume is low and the megamorphism is harmless.
 */
function readInto(target: Record<string, any>, schema: PacketSchema, reader: BufferReader): void {
    for (const field of schema) {
        if (field.type === "list") {
            const count = reader.readInt32BE();
            const items: Record<string, any>[] = [];
            for (let i = 0; i < count; i++) {
                const item: Record<string, any> = {};
                readInto(item, field.of, reader);
                items.push(item);
            }
            target[field.name] = items;
        } else if (field.type === "object") {
            const obj: Record<string, any> = {};
            readInto(obj, field.of, reader);
            target[field.name] = obj;
        } else if (field.type === "optObject") {
            if (reader.readUInt8() === 1) {
                target[field.name] = null;
            } else {
                const obj: Record<string, any> = {};
                readInto(obj, field.of, reader);
                target[field.name] = obj;
            }
        } else {
            target[field.name] = READERS[field.type](reader);
        }
    }
}

function writeInto(source: Record<string, any>, schema: PacketSchema, writer: BufferWriter): void {
    for (const field of schema) {
        if (field.type === "list") {
            const items: any[] = source[field.name] ?? [];
            writer.writeInt32BE(items.length);
            for (const item of items) {
                writeInto(item, field.of, writer);
            }
        } else if (field.type === "object") {
            writeInto(source[field.name], field.of, writer);
        } else if (field.type === "optObject") {
            const value = source[field.name];
            const isEmpty = value === null || value === undefined;
            writer.writeUInt8(isEmpty ? 1 : 0);
            if (!isEmpty) {
                writeInto(value, field.of, writer);
            }
        } else {
            WRITERS[field.type](writer, source[field.name]);
        }
    }
}

/** Reads `buffer` into `target`'s fields according to `schema` (in order). */
export function readSchema(target: Record<string, any>, schema: PacketSchema, buffer: Buffer): void {
    readInto(target, schema, new BufferReader(buffer));
}

/** Serializes `source`'s fields according to `schema` (in order). */
export function writeSchema(source: Record<string, any>, schema: PacketSchema): Buffer {
    const writer = new BufferWriter();
    writeInto(source, schema, writer);
    return writer.getBuffer();
}

/**
 * Lê `buffer` conforme `schema` e retorna os campos + quantos bytes foram consumidos.
 * `bytesRead < buffer.length` indica payload maior que o schema (schema incompleto) —
 * usado pelo protanki-bridge para sinalizar defs a completar.
 */
export function decodeSchema(schema: PacketSchema, buffer: Buffer): { result: Record<string, any>; bytesRead: number } {
    const reader = new BufferReader(buffer);
    const result: Record<string, any> = {};
    readInto(result, schema, reader);
    return { result, bytesRead: reader.position };
}
