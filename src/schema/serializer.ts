import { BufferReader } from "../codec/buffer.reader";
import { BufferWriter } from "../codec/buffer.writer";
import { PacketSchema, PrimitiveType } from "./types";

const READERS: Record<PrimitiveType, (r: BufferReader) => unknown> = {
    u8: (r) => r.readUInt8(),
    i8: (r) => r.readInt8(),
    i16: (r) => r.readInt16BE(),
    i32: (r) => r.readInt32BE(),
    i64: (r) => r.readInt64BE(),
    f32: (r) => r.readFloatBE(),
    f64: (r) => r.readDoubleBE(),
    bool: (r) => r.readUInt8() === 1,
    resource: (r) => r.readResource(),
    longPair: (r) => ({ high: r.readInt32BE(), low: r.readInt32BE() }),
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
    i64: (w, v) => w.writeInt64BE(v),
    f32: (w, v) => w.writeFloatBE(v),
    f64: (w, v) => w.writeDoubleBE(v),
    bool: (w, v) => w.writeUInt8(v ? 1 : 0),
    resource: (w, v) => w.writeResource(v),
    longPair: (w, v) => { w.writeInt32BE(v.high); w.writeInt32BE(v.low); },
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
function readList(of: PacketSchema, reader: BufferReader): Record<string, any>[] {
    const count = reader.readInt32BE();
    const items: Record<string, any>[] = [];
    for (let i = 0; i < count; i++) {
        const item: Record<string, any> = {};
        readInto(item, of, reader);
        items.push(item);
    }
    return items;
}

function writeList(items: any[], of: PacketSchema, writer: BufferWriter): void {
    writer.writeInt32BE(items.length);
    for (const item of items) writeInto(item, of, writer);
}

function readInto(target: Record<string, any>, schema: PacketSchema, reader: BufferReader): void {
    for (const field of schema) {
        if (field.type === "list") {
            target[field.name] = readList(field.of, reader);
        } else if (field.type === "nullableList") {
            target[field.name] = reader.readUInt8() === 1 ? null : readList(field.of, reader);
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
            writeList(source[field.name] ?? [], field.of, writer);
        } else if (field.type === "nullableList") {
            const value = source[field.name];
            if (value == null) {
                writer.writeUInt8(1);
            } else {
                writer.writeUInt8(0);
                writeList(value, field.of, writer);
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

// --- Codec compilado (monomórfico) -------------------------------------------------------------

// Expressão de leitura por tipo, referenciando o reader `r`.
const READ_SRC: Record<PrimitiveType, string> = {
    u8: "r.readUInt8()", i8: "r.readInt8()", i16: "r.readInt16BE()", i32: "r.readInt32BE()",
    i64: "r.readInt64BE()", f32: "r.readFloatBE()", f64: "r.readDoubleBE()", bool: "r.readUInt8()===1",
    resource: "r.readResource()", longPair: "({high:r.readInt32BE(),low:r.readInt32BE()})",
    string: "r.readOptionalString()", stringArray: "r.readStringArray()", optStringArray: "r.readStringArray()",
    i16Array: "r.readInt16Array()", vector3: "r.readOptionalVector3()", vector3Array: "r.readVector3Array()",
    bytes: "r.readBytes(r.readInt32BE())",
};

// Statement de escrita por tipo, referenciando o writer `w` e o campo `s[n]` (n = literal do nome).
const WRITE_SRC: Record<PrimitiveType, (n: string) => string> = {
    u8: (n) => `w.writeUInt8(s[${n}])`, i8: (n) => `w.writeInt8(s[${n}])`, i16: (n) => `w.writeInt16BE(s[${n}])`,
    i32: (n) => `w.writeInt32BE(s[${n}])`, i64: (n) => `w.writeInt64BE(s[${n}])`, f32: (n) => `w.writeFloatBE(s[${n}])`,
    f64: (n) => `w.writeDoubleBE(s[${n}])`, bool: (n) => `w.writeUInt8(s[${n}]?1:0)`, resource: (n) => `w.writeResource(s[${n}])`,
    longPair: (n) => `w.writeInt32BE(s[${n}].high);w.writeInt32BE(s[${n}].low)`,
    string: (n) => `w.writeOptionalString(s[${n}])`, stringArray: (n) => `w.writeStringArray(s[${n}])`,
    optStringArray: (n) => `w.writeOptionalStringArray(s[${n}])`, i16Array: (n) => `w.writeInt16Array(s[${n}])`,
    vector3: (n) => `w.writeOptionalVector3(s[${n}])`, vector3Array: (n) => `w.writeVector3Array(s[${n}])`,
    bytes: (n) => `w.writeInt32BE(s[${n}].length);w.writeBuffer(s[${n}])`,
};

export interface CompiledCodec {
    /** Lê `buffer`. Se `target` for passado, popula-o (evita alocar um objeto novo no hot-path). */
    read(buffer: Buffer, target?: Record<string, any>): Record<string, any>;
    write(fields: Record<string, any>): Buffer;
}

/**
 * Gera um codec MONOMÓRFICO (read/write) especializado para `schema`. Para schemas planos (só
 * primitivos — caso dos pacotes de alta frequência como movimento) faz codegen com nomes de campo
 * e chamadas fixos, evitando os sites megamórficos do serializer reflexivo. Schemas com compostos
 * (list/object/optObject) caem no codec reflexivo. Byte-idêntico a `readSchema`/`writeSchema`.
 */
export function compileCodec(schema: PacketSchema): CompiledCodec {
    const flat = schema.every((f) => f.type in READ_SRC);
    if (!flat) {
        return {
            read: (buf, target) => {
                const reader = new BufferReader(buf);
                const out = target ?? {};
                readInto(out, schema, reader);
                return out;
            },
            write: (fields) => writeSchema(fields, schema),
        };
    }
    let rBody = "const o=t||{};";
    let wBody = "";
    for (const f of schema) {
        const n = JSON.stringify(f.name);
        rBody += `o[${n}]=${READ_SRC[f.type as PrimitiveType]};`;
        wBody += WRITE_SRC[f.type as PrimitiveType](n) + ";";
    }
    rBody += "return o;";
    wBody += "return w.getBuffer();";
    // eslint-disable-next-line no-new-func
    const readFn = new Function("R", "buf", "t", `const r=new R(buf);${rBody}`) as (R: any, buf: Buffer, t?: any) => any;
    // eslint-disable-next-line no-new-func
    const writeFn = new Function("W", "s", `const w=new W();${wBody}`) as (W: any, s: any) => Buffer;
    return {
        read: (buf, target) => readFn(BufferReader, buf, target),
        write: (fields) => writeFn(BufferWriter, fields),
    };
}
