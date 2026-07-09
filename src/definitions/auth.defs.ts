import { PacketDef } from "../registry/packet-def";

// Pacotes de autenticação / tela de login. Direção é best-effort (documental).

export const Language: PacketDef = {
    id: -1864333717,
    name: "Language",
    direction: "c2s",
    schema: [{ name: "lang", type: "string" }],
};

export const CreateAccount: PacketDef = {
    id: 427083290,
    name: "CreateAccount",
    direction: "c2s",
    schema: [
        { name: "nickname", type: "string" },
        { name: "password", type: "string" },
        { name: "rememberMe", type: "bool" },
    ],
};

export const Login: PacketDef = {
    id: -739684591,
    name: "Login",
    direction: "c2s",
    schema: [
        { name: "username", type: "string" },
        { name: "password", type: "string" },
        { name: "rememberMe", type: "bool" },
    ],
};

export const LoginByTokenRequest: PacketDef = {
    id: -845588810,
    name: "LoginByTokenRequest",
    direction: "c2s",
    schema: [{ name: "hash", type: "string" }],
};

export const LoginToken: PacketDef = {
    id: 932564569,
    name: "LoginToken",
    direction: "s2c",
    schema: [{ name: "hash", type: "string" }],
};

export const IncorrectPassword: PacketDef = {
    id: 103812952,
    name: "IncorrectPassword",
    direction: "s2c",
    schema: [],
};

export const CheckNicknameAvailable: PacketDef = {
    id: 1083705823,
    name: "CheckNicknameAvailable",
    direction: "c2s",
    schema: [{ name: "nickname", type: "string" }],
};

export const NicknameAvailable: PacketDef = {
    id: -706679202,
    name: "NicknameAvailable",
    direction: "s2c",
    schema: [],
};

export const NicknameUnavailable: PacketDef = {
    id: 442888643,
    name: "NicknameUnavailable",
    direction: "s2c",
    schema: [{ name: "suggestions", type: "optStringArray" }],
};

export const InvalidNickname: PacketDef = {
    id: 1480924803,
    name: "InvalidNickname",
    direction: "s2c",
    schema: [],
};

export const RequestCaptcha: PacketDef = {
    id: -349828108,
    name: "RequestCaptcha",
    direction: "c2s",
    schema: [{ name: "view", type: "i32" }],
};

export const Captcha: PacketDef = {
    id: -1670408519,
    name: "Captcha",
    direction: "s2c",
    schema: [
        { name: "view", type: "i32" },
        { name: "image", type: "bytes" },
    ],
};

export const CaptchaVerify: PacketDef = {
    id: 1271163230,
    name: "CaptchaVerify",
    direction: "c2s",
    schema: [
        { name: "view", type: "i32" },
        { name: "solution", type: "string" },
    ],
};

export const CaptchaIsValid: PacketDef = {
    id: -819536476,
    name: "CaptchaIsValid",
    direction: "s2c",
    schema: [{ name: "view", type: "i32" }],
};

export const CaptchaIsInvalid: PacketDef = {
    id: -373510957,
    name: "CaptchaIsInvalid",
    direction: "s2c",
    schema: [
        { name: "view", type: "i32" },
        { name: "image", type: "bytes" },
    ],
};

export const RecoveryAccountSendCode: PacketDef = {
    id: 1744584433,
    name: "RecoveryAccountSendCode",
    direction: "c2s",
    schema: [{ name: "email", type: "string" }],
};

export const RecoveryEmailSent: PacketDef = {
    id: -1607756600,
    name: "RecoveryEmailSent",
    direction: "s2c",
    schema: [],
};

export const RecoveryEmailNotExists: PacketDef = {
    id: -262455387,
    name: "RecoveryEmailNotExists",
    direction: "s2c",
    schema: [],
};

export const RecoveryAccountVerifyCode: PacketDef = {
    id: 903498755,
    name: "RecoveryAccountVerifyCode",
    direction: "c2s",
    schema: [{ name: "code", type: "string" }],
};

export const RecoveryEmailInvalidCode: PacketDef = {
    id: -16447159,
    name: "RecoveryEmailInvalidCode",
    direction: "s2c",
    schema: [],
};

export const GoToRecoveryPassword: PacketDef = {
    id: -2118900410,
    name: "GoToRecoveryPassword",
    direction: "s2c",
    schema: [{ name: "email", type: "string" }],
};

export const HideLoginForm: PacketDef = {
    id: -1923286328,
    name: "HideLoginForm",
    direction: "s2c",
    schema: [],
};

export const Punishment: PacketDef = {
    id: 1200280053,
    name: "Punishment",
    direction: "s2c",
    schema: [
        { name: "reason", type: "string" },
        { name: "minutes", type: "i32" },
        { name: "hours", type: "i32" },
        { name: "days", type: "i32" },
    ],
};

export const Registration: PacketDef = {
    id: -1277343167,
    name: "Registration",
    direction: "s2c",
    schema: [
        { name: "bgResource", type: "resource" },
        { name: "enableRequiredEmail", type: "bool" },
        { name: "maxPasswordLength", type: "i32" },
        { name: "minPasswordLength", type: "i32" },
    ],
};
