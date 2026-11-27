// Sums invoice line amounts given in fractional cents and returns whole cents.
export function totalCents(amounts) {
  return Math.round(amounts.reduce((total, amount) => total + amount, 0));
}
