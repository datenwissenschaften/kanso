import assert from "node:assert/strict";
import test from "node:test";
import { weeklyRevenue } from "../src/revenue.mjs";

test("counts a paid order in the week of its creation", () => {
  const orders = [{ id: 1, amountCents: 2500, createdAt: "2026-11-25T10:00:00Z" }];
  assert.deepEqual(weeklyRevenue(orders, [{ orderId: 1 }]), { "2026-11-23": 2500 });
});

test("counts an order paid in two instalments once", () => {
  const orders = [{ id: 7, amountCents: 5000, createdAt: "2026-11-24T09:00:00Z" }];
  assert.deepEqual(weeklyRevenue(orders, [{ orderId: 7 }, { orderId: 7 }]), { "2026-11-23": 5000 });
});
