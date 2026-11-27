import assert from "node:assert/strict";
import test from "node:test";
import { NotFoundError, readDocument } from "../../src/documents.mjs";

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

test("rejects a missing document as not found", () => {
  assert.throws(() => readDocument(documents, { tenantId: "a" }, 7), NotFoundError);
});

test("lets the owning tenant read its document", () => {
  assert.equal(readDocument(documents, { tenantId: "b" }, 42).title, "Payroll");
});
