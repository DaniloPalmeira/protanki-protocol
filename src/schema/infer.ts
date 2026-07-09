import { IVector3 } from "../codec/vector3";
import { PacketSchema } from "./types";

// Mapeia cada `type` primitivo do schema para o tipo TypeScript correspondente.
type PrimMap = {
    u8: number;
    i8: number;
    i16: number;
    i32: number;
    f32: number;
    bool: boolean;
    resource: number;
    string: string | null;
    stringArray: string[];
    optStringArray: string[];
    i16Array: number[];
    vector3: IVector3 | null;
    vector3Array: (IVector3 | null)[];
    bytes: Buffer;
};

// Tipo de um único campo. Primitivos vêm do PrimMap; compostos recorrem em FieldsOf(of).
type FieldValue<F> = F extends { type: infer T }
    ? T extends keyof PrimMap
        ? PrimMap[T]
        : F extends { of: infer O extends PacketSchema }
            ? T extends "list"
                ? FieldsOf<O>[]
                : T extends "object"
                    ? FieldsOf<O>
                    : T extends "optObject"
                        ? FieldsOf<O> | null
                        : unknown
            : unknown
    : unknown;

/**
 * Deriva o objeto de campos a partir de um schema (tupla literal). Ex.:
 *   FieldsOf<[{name:"a";type:"i32"},{name:"b";type:"string"}]>
 *     => { a: number; b: string | null }
 */
export type FieldsOf<S extends PacketSchema> = {
    [K in S[number]["name"]]: FieldValue<Extract<S[number], { name: K }>>;
};

/**
 * Preserva um schema (ou lista de campos reutilizável) como tupla literal para a inferência,
 * validando que é um PacketSchema. Identidade em runtime.
 */
export function fields<const S extends PacketSchema>(s: S): S {
    return s;
}
