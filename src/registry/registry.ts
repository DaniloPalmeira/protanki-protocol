import { PacketDef } from "./packet-def";
import * as definitions from "../definitions";

// Achata todos os namespaces de feature (defs.auth.*, defs.lobby.*, ...) numa lista.
// Ignora exports auxiliares (ex.: schemas hit/miss do shaft) — só entram PacketDefs (com `id`).
const ALL: PacketDef[] = Object.values(definitions).flatMap((feature) =>
    (Object.values(feature) as any[]).filter((d): d is PacketDef => d != null && typeof d.id === "number")
);

export const byId = new Map<number, PacketDef>(ALL.map((d) => [d.id, d]));
export const byName = new Map<string, PacketDef>(ALL.map((d) => [d.name, d]));

export function defById(id: number): PacketDef | undefined {
    return byId.get(id);
}

export function defByName(name: string): PacketDef | undefined {
    return byName.get(name);
}

/** Todas as definições registradas (útil para tooling/inspeção). */
export function allDefs(): readonly PacketDef[] {
    return ALL;
}
