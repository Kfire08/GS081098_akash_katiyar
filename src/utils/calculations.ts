export const calculateSalesDollars = (units: number, price: number): number => {
  return units * price;
};

export const calculateGMDollars = (
  salesDollars: number,
  units: number,
  cost: number
): number => {
  return salesDollars - units * cost;
};

export const calculateGMPercentage = (
  gmDollars: number,
  salesDollars: number
): number => {
  return (gmDollars / salesDollars) * 100;
};

export const getGMPercentageColor = (gmPercentage: number): string => {
  if (gmPercentage >= 40) return "green";
  if (gmPercentage >= 10) return "yellow";
  if (gmPercentage >= 5) return "orange";
  return "red";
};
