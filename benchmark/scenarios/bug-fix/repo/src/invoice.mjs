// Sums invoice line amounts given in fractional cents and returns whole cents.
export function totalCents(amounts) {
  return amounts.reduce((total, amount) => Math.round(total + amount), 0);
}
