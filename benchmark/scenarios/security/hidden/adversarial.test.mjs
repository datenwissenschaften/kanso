import assert from "node:assert/strict";
import test from "node:test";
import { readDocument } from "../../src/documents.mjs";

const documents = [
  { id: 42, tenantId: "b", title: "Payroll" },
  { id: 43, title: "Orphan" },
];

const message = (read) => {
  try {
    read();
  } catch (error) {
    return error.message;
  }
  assert.fail("expected the read to be rejected");
};

test("a foreign document is indistinguishable from a missing one", () => {
  const caller = { tenantId: "a" };
  const foreign = message(() => readDocument(documents, caller, 42));
  const missing = message(() => readDocument([], caller, 42));
  assert.equal(foreign, missing);
});

test("a caller without a tenant cannot read a document without a tenant", () => {
  assert.throws(() => readDocument(documents, {}, 43));
});

test("a missing caller cannot read anything", () => {
  assert.throws(() => readDocument(documents, null, 42));
});

test("tenant identifiers are compared exactly", () => {
  assert.throws(() => readDocument(documents, { tenantId: "B" }, 42));
});
