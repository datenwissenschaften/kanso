import assert from "node:assert/strict";
import test from "node:test";
import { totalCents } from "../../src/invoice.mjs";

test("rounds the sum of fractional lines once", () => {
  assert.equal(totalCents([0.4, 0.4]), 1);
});

test("rounds a single tie up", () => {
  assert.equal(totalCents([0.5]), 1);
});

test("keeps whole-cent totals", () => {
  assert.equal(totalCents([100, 250]), 350);
});

test("returns zero for an empty invoice", () => {
  assert.equal(totalCents([]), 0);
});
