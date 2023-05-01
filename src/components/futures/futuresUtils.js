export function calculatePercentChange(
  currentPrice,
  entryPrice,
  leverage,
  position
) {
  let percentChange = (
    ((currentPrice - entryPrice) / entryPrice) *
    100
  ).toFixed(2);
  percentChange = (percentChange * leverage).toFixed(2);
  if (position === "Short") {
    percentChange = percentChange * -1;
  }
  return percentChange;
}
