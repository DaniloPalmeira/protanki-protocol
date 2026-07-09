import { PacketSchema } from "../schema/types";
import { FieldsOf } from "../schema/infer";

/** Direção do pacote no fluxo cliente↔servidor (documental; ajuda o bridge a rotular capturas). */
export type Direction = "c2s" | "s2c" | "both";

/**
 * Definição única de um pacote do protocolo — fonte de verdade compartilhada por
 * letanki-server (gera as classes) e protanki-bridge (decodifica capturas).
 *
 * `F` = formato dos campos (inferido do schema por `def()`). `N` = nome literal do pacote,
 * usado como discriminante na union de leitura (ver `AnyPacket`). Pacotes opacos (sem schema)
 * ficam com `F = Record<string, any>` mas ainda carregam o nome literal.
 *
 * `schema` ausente = pacote opaco / com codec manual (ex.: movimento hot-path).
 */
export interface PacketDef<F = Record<string, any>, N extends string = string> {
    id: number;
    name: N;
    schema?: PacketSchema;
    direction?: Direction;
    /** Phantom: carrega o tipo `F` dos campos. Não existe em runtime. */
    readonly __fields?: F;
}

/**
 * Declara um pacote. Com schema, infere o tipo dos campos a partir do próprio schema; sem schema,
 * declara um pacote opaco (campos `Record<string, any>`). Nos dois casos captura o `name` literal
 * (via `const N`) para a discriminação na leitura. Identidade em runtime — só carrega o tipo.
 *
 *   export const Login = def({ id: -739684591, name: "Login", direction: "c2s",
 *     schema: [{ name: "username", type: "string" }, { name: "rememberMe", type: "bool" }] });
 *   // PacketDef<{ username: string | null; rememberMe: boolean }, "Login">
 */
export function def<const S extends PacketSchema, const N extends string>(d: {
    id: number;
    name: N;
    direction?: Direction;
    schema: S;
}): PacketDef<FieldsOf<S>, N>;
export function def<const N extends string>(d: {
    id: number;
    name: N;
    direction?: Direction;
}): PacketDef<Record<string, any>, N>;
export function def(d: any): any {
    return d;
}
