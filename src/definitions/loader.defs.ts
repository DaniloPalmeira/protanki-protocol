import { PacketDef, def } from "../registry/packet-def";

// Tela de carregamento / dependências de recursos.

export const RequestNextTip = def({
    id: -1376947245,
    name: "RequestNextTip",
    direction: "c2s",
    schema: [],
});

export const SetLoadingScreenImage = def({
    id: 2094741924,
    name: "SetLoadingScreenImage",
    direction: "s2c",
    schema: [{ name: "resourceImageIdLow", type: "resource" }],
});

export const ResourceCallback = def({
    id: -82304134,
    name: "ResourceCallback",
    direction: "c2s",
    schema: [{ name: "callbackId", type: "i32" }],
});

// Codec manual no server (serializa a lista de recursos como JSON bare-array).
// Schema aqui é só para o bridge decodificar o wire cru (json string + callbackId).
export const LoadDependencies = def({
    id: -1797047325,
    name: "LoadDependencies",
    direction: "s2c",
    schema: [
        { name: "dependenciesJson", type: "string" },
        { name: "callbackId", type: "i32" },
    ],
});

export const HideLoader = def({
    id: -1282173466,
    name: "HideLoader",
    direction: "s2c",
    schema: [],
});
