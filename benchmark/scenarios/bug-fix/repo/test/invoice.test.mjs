import assert from "node:assert/strict";
import test from "node:test";
import { totalCents } from "../src/invoice.mjs";

test("sums whole-cent lines", () => {
  assert.equal(totalCents([100, 250]), 350);
});
