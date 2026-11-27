import assert from "node:assert/strict";
import test from "node:test";
import { weeklyRevenue } from "../../src/revenue.mjs";

const orders = [
  { id: 7, amountCents: 5000, createdAt: "2026-11-24T09:00:00Z" },
  { id: 8, amountCents: 1200, createdAt: "2026-11-26T09:00:00Z" },
];

test("counts an order paid in two instalments once", () => {
  const payments = [{ orderId: 7 }, { orderId: 7 }];
  assert.deepEqual(weeklyRevenue(orders, payments), { "2026-11-23": 5000 });
});

test("adds distinct paid orders of the same week", () => {
  const payments = [{ orderId: 7 }, { orderId: 8 }, { orderId: 7 }];
  assert.deepEqual(weeklyRevenue(orders, payments), { "2026-11-23": 6200 });
});

test("excludes unpaid orders", () => {
  assert.deepEqual(weeklyRevenue(orders, [{ orderId: 8 }]), { "2026-11-23": 1200 });
});

test("returns no weeks without payments", () => {
  assert.deepEqual(weeklyRevenue(orders, []), {});
});
