import { PacketSchema } from "../schema/types";
import { FieldsOf } from "../schema/infer";

/** Direção do pacote no fluxo cliente↔servidor (documental; ajuda o bridge a rotular capturas). */
export type Direction = "c2s" | "s2c" | "both";

/**
 * Definição única de um pacote do protocolo — fonte de verdade compartilhada por
 * letanki-server (gera as classes) e protanki-bridge (decodifica capturas).
 *
 * O parâmetro de tipo `F` é o formato dos campos, inferido do schema pelo helper `def()`.
 * Pacotes opacos (sem schema) ficam com `F = Record<string, any>`.
 *
 * `schema` ausente = pacote opaco / com codec manual (ex.: relay de movimento e
 * colocação de mina, que usam read/write monomórficos por performance no V8).
 */
export interface PacketDef<F = Record<string, any>> {
    id: number;
    name: string;
    schema?: PacketSchema;
    direction?: Direction;
    /** Phantom: carrega o tipo `F` dos campos. Não existe em runtime. */
    readonly __fields?: F;
}

/**
 * Declara um pacote COM schema, inferindo o tipo dos campos a partir do próprio schema
 * (via `const S`). Identidade em runtime — só carrega o tipo. Ex.:
 *
 *   export const Login = def({
 *     id: -739684591, name: "Login", direction: "c2s",
 *     schema: [{ name: "username", type: "string" }, { name: "rememberMe", type: "bool" }],
 *   });
 *   // Login: PacketDef<{ username: string | null; rememberMe: boolean }>
 */
export function def<const S extends PacketSchema>(d: {
    id: number;
    name: string;
    direction?: Direction;
    schema: S;
}): PacketDef<FieldsOf<S>> {
    return d as PacketDef<FieldsOf<S>>;
}
