import assert from "node:assert/strict";
import test from "node:test";
import { NotFoundError, readDocument } from "../src/documents.mjs";

const documents = [
  { id: 1, tenantId: "a", title: "Plan" },
  { id: 42, tenantId: "b", title: "Payroll" },
];

test("reads a document of the caller's tenant", () => {
  assert.equal(readDocument(documents, { tenantId: "a" }, 1).title, "Plan");
});

test("rejects a document of another tenant as not found", () => {
  assert.throws(() => readDocument(documents, { tenantId: "a" }, 42), NotFoundError);
});

test("rejects a caller without a tenant", () => {
  assert.throws(() => readDocument([{ id: 2 }], {}, 2), NotFoundError);
});
