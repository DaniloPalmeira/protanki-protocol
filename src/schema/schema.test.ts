import { test } from "node:test";
import assert from "node:assert/strict";
import { readSchema, writeSchema } from "./serializer";
import { PacketSchema } from "./types";

test("Login schema round-trip", () => {
  const schema: PacketSchema = [
    { name: "username", type: "string" },
    { name: "password", type: "string" },
    { name: "rememberMe", type: "bool" },
  ];
  const source = { username: "player", password: "secret", rememberMe: true };
  const buf = writeSchema(source, schema);
  const out: Record<string, any> = {};
  readSchema(out, schema, buf);
  assert.deepEqual(out, source);
});

test("nested list + object + optObject round-trip", () => {
  const schema: PacketSchema = [
    { name: "id", type: "i32" },
    {
      name: "users",
      type: "list",
      of: [
        { name: "nick", type: "string" },
        { name: "rank", type: "u8" },
        { name: "pos", type: "optObject", of: [
          { name: "x", type: "f32" },
          { name: "y", type: "f32" },
        ]},
      ],
    },
  ];
  const source = {
    id: -123456,
    users: [
      { nick: "a", rank: 5, pos: { x: 1.5, y: 2.5 } },
      { nick: "b", rank: 30, pos: null },
    ],
  };
  const out: Record<string, any> = {};
  readSchema(out, schema, writeSchema(source, schema));
  assert.deepEqual(out, source);
});

test("resource field is 8 bytes on the wire", () => {
  const schema: PacketSchema = [{ name: "bg", type: "resource" }];
  const buf = writeSchema({ bg: 987654 }, schema);
  assert.equal(buf.length, 8);
  const out: Record<string, any> = {};
  readSchema(out, schema, buf);
  assert.equal(out.bg, 987654);
});
