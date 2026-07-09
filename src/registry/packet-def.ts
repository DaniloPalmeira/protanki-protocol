import { PacketSchema } from "../schema/types";

/** Direção do pacote no fluxo cliente↔servidor (documental; ajuda o bridge a rotular capturas). */
export type Direction = "c2s" | "s2c" | "both";

/**
 * Definição única de um pacote do protocolo — fonte de verdade compartilhada por
 * letanki-server (gera as classes) e protanki-bridge (decodifica capturas).
 *
 * `schema` ausente = pacote opaco / com codec manual (ex.: relay de movimento e
 * colocação de mina, que usam read/write monomórficos por performance no V8).
 * Nesse caso o server mantém seu codec manual; o schema pode ser preenchido depois
 * só para o bridge conseguir decodificar.
 */
export interface PacketDef {
    id: number;
    name: string;
    schema?: PacketSchema;
    direction?: Direction;
}
