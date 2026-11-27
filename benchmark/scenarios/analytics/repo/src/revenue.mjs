// Returns the Monday (UTC, YYYY-MM-DD) of the week that contains `timestamp`.
export function weekStart(timestamp) {
  const date = new Date(timestamp);
  date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  return date.toISOString().slice(0, 10);
}

// Revenue in cents per week for orders with at least one payment.
export function weeklyRevenue(orders, payments) {
  const revenue = {};
  for (const payment of payments) {
    const order = orders.find((candidate) => candidate.id === payment.orderId);
    if (!order) continue;
    const week = weekStart(order.createdAt);
    revenue[week] = (revenue[week] ?? 0) + order.amountCents;
  }
  return revenue;
}
