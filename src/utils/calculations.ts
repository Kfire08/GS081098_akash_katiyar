export const calculateGMDollars = (
  salesUnits: number,
  price: number,
  cost: number
) => {
  return salesUnits * price - salesUnits * cost;
};

export const calculateGMPercentage = (
  gmDollars: number,
  salesDollars: number
) => {
  return salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
};
