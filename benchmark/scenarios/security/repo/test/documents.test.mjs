import assert from "node:assert/strict";
import test from "node:test";
import { readDocument } from "../src/documents.mjs";

test("reads a document of the caller's tenant", () => {
  const documents = [{ id: 1, tenantId: "a", title: "Plan" }];
  assert.equal(readDocument(documents, { tenantId: "a" }, 1).title, "Plan");
});
