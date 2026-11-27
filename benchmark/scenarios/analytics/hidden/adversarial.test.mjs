import assert from "node:assert/strict";
import test from "node:test";
import { weeklyRevenue } from "../../src/revenue.mjs";

test("ignores payments for unknown orders", () => {
  const orders = [{ id: 1, amountCents: 100, createdAt: "2026-11-24T09:00:00Z" }];
  assert.deepEqual(weeklyRevenue(orders, [{ orderId: 2 }, { orderId: 1 }]), { "2026-11-23": 100 });
});

test("assigns an order to the UTC week, not the local offset", () => {
  const orders = [{ id: 1, amountCents: 100, createdAt: "2026-11-29T23:30:00-02:00" }];
  assert.deepEqual(weeklyRevenue(orders, [{ orderId: 1 }]), { "2026-11-30": 100 });
});

test("a late payment counts in the order's week", () => {
  const orders = [{ id: 1, amountCents: 300, createdAt: "2026-11-27T09:00:00Z" }];
  const payments = [{ orderId: 1, paidAt: "2026-12-08T09:00:00Z" }];
  assert.deepEqual(weeklyRevenue(orders, payments), { "2026-11-23": 300 });
});

test("many instalments still count the order once", () => {
  const orders = [{ id: 1, amountCents: 900, createdAt: "2026-11-24T09:00:00Z" }];
  const payments = Array.from({ length: 3 }, () => ({ orderId: 1 }));
  assert.deepEqual(weeklyRevenue(orders, payments), { "2026-11-23": 900 });
});
