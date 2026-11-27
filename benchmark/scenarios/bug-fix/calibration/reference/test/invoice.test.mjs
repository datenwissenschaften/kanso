import assert from "node:assert/strict";
import test from "node:test";
import { totalCents } from "../src/invoice.mjs";

test("sums whole-cent lines", () => {
  assert.equal(totalCents([100, 250]), 350);
});

test("rounds the sum of fractional lines once", () => {
  assert.equal(totalCents([0.4, 0.4]), 1);
});

test("rounds a tie up", () => {
  assert.equal(totalCents([0.25, 0.25]), 1);
});
