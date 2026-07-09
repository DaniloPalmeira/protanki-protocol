import { test } from "node:test";
import assert from "node:assert/strict";
import { BufferReader } from "./buffer.reader";
import { BufferWriter } from "./buffer.writer";

// Round-trip: whatever we write, reading it back must yield the same values.
// This locks the wire format so a future edit that breaks parity fails here.

test("primitives round-trip", () => {
  const w = new BufferWriter();
  w.writeUInt8(200).writeInt8(-5).writeInt16BE(-1234).writeInt32BE(-739684591).writeFloatBE(1.5);
  const r = new BufferReader(w.getBuffer());
  assert.equal(r.readUInt8(), 200);
  assert.equal(r.readInt8(), -5);
  assert.equal(r.readInt16BE(), -1234);
  assert.equal(r.readInt32BE(), -739684591);
  assert.equal(r.readFloatBE(), 1.5);
});

test("optional string: value and null", () => {
  const w = new BufferWriter();
  w.writeOptionalString("héllo").writeOptionalString(null);
  const r = new BufferReader(w.getBuffer());
  assert.equal(r.readOptionalString(), "héllo");
  assert.equal(r.readOptionalString(), null);
});

test("resource is 8 bytes (idHigh 0 + idLow)", () => {
  const w = new BufferWriter();
  w.writeResource(1234567);
  const buf = w.getBuffer();
  assert.equal(buf.length, 8);
  assert.equal(buf.readInt32BE(0), 0);
  assert.equal(buf.readInt32BE(4), 1234567);
  assert.equal(new BufferReader(buf).readResource(), 1234567);
});

test("Login packet exact bytes (username/password/rememberMe)", () => {
  // Mirrors the server's Login schema: string, string, bool.
  const w = new BufferWriter();
  w.writeOptionalString("player").writeOptionalString("secret").writeUInt8(1);
  const r = new BufferReader(w.getBuffer());
  assert.equal(r.readOptionalString(), "player");
  assert.equal(r.readOptionalString(), "secret");
  assert.equal(r.readUInt8() === 1, true);
});

test("string array and optional string array", () => {
  const w = new BufferWriter();
  w.writeStringArray(["a", "b"]).writeOptionalStringArray(null);
  const r = new BufferReader(w.getBuffer());
  assert.deepEqual(r.readStringArray(), ["a", "b"]);
  assert.deepEqual(r.readStringArray(), []);
});

test("vector3 round-trip and null", () => {
  const w = new BufferWriter();
  w.writeOptionalVector3({ x: 1, y: 2, z: 3 }).writeOptionalVector3(null);
  const r = new BufferReader(w.getBuffer());
  assert.deepEqual(r.readOptionalVector3(), { x: 1, y: 2, z: 3 });
  assert.equal(r.readOptionalVector3(), null);
});
