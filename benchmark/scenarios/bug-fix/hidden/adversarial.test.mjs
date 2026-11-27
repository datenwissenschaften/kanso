import assert from "node:assert/strict";
import test from "node:test";
import { totalCents } from "../../src/invoice.mjs";

test("accumulates many small fractions", () => {
  assert.equal(totalCents(Array(10).fill(0.1)), 1);
});

test("keeps large whole-cent totals exact", () => {
  assert.equal(totalCents([1_000_000, 1]), 1_000_001);
});

test("mixes whole and fractional lines", () => {
  assert.equal(totalCents([199, 0.3, 0.3]), 200);
});

test("does not mutate the input lines", () => {
  const lines = [0.4, 0.4];
  totalCents(lines);
  assert.deepEqual(lines, [0.4, 0.4]);
});
