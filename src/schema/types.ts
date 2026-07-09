/**
 * Declarative packet field schema. Defining the wire format once (field order +
 * type) and generating read/write removes the recurring class of bugs from
 * hand-written codecs (wrong int width, swapped order, resource = 8 bytes, etc.).
 *
 * `string` is the optional-string encoding used everywhere (1-byte null flag +
 * int32 length + utf8). `optStringArray` reads like a string array but writes
 * with the "optional" empty flag, matching the existing helpers. `bytes` is an
 * int32 length followed by that many raw bytes (e.g. captcha images).
 *
 * Composite types:
 *  - `list`      — an int32 count followed by N items, each described by `of`.
 *  - `object`    — a nested object serialized inline by `of` (no length/flag).
 *  - `optObject` — a 1-byte null flag (1 = absent) then, if present, `of` inline.
 */
export type PrimitiveType =
    | "u8"
    | "i8"
    | "i16"
    | "i32"
    | "f32"
    | "bool"
    | "resource"
    | "string"
    | "stringArray"
    | "optStringArray"
    | "i16Array"
    | "vector3"
    | "vector3Array"
    | "bytes";

export interface PrimitiveField {
    name: string;
    type: PrimitiveType;
}

export interface CompositeField {
    name: string;
    type: "list" | "object" | "optObject";
    of: PacketSchema;
}

export type SchemaField = PrimitiveField | CompositeField;
export type PacketSchema = readonly SchemaField[];
