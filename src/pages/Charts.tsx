import React, { useState } from "react";
import { useStore } from "../zustand/useStore";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = () => {
  const { stores, planningData } = useStore();
  const [selectedStore, setSelectedStore] = useState(stores[0]?.name || "");

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const data = [];
  for (let week = 1; week <= 52; week++) {
    const weekData = { week: `W${week}` };
    let totalSalesDollars = 0;
    let totalGMDollars = 0;

    planningData.forEach((row) => {
      if (row.store === selectedStore) {
        const salesUnits = row[`salesUnits_M1_W${week}`] || 0;
        const salesDollars = row[`salesDollars_M1_W${week}`] || 0;
        const gmDollars = row[`gmDollars_M1_W${week}`] || 0;
        totalSalesDollars += salesDollars;
        totalGMDollars += gmDollars;
      }
    });

    weekData.gmDollars = totalGMDollars;
    weekData.gmPercentage = totalSalesDollars
      ? (totalGMDollars / totalSalesDollars) * 100
      : 0;
    data.push(weekData);
  }

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <select
          value={selectedStore}
          onChange={handleStoreChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        >
          {stores.map((store) => (
            <option key={store.name} value={store.name}>
              {store.name}
            </option>
          ))}
        </select>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#8884d8"
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#ff7300"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "gmDollars") {
                  return [`$${value.toFixed(2)}`, "GM Dollars"];
                }
                if (name === "gmPercentage") {
                  return [`${value.toFixed(2)}%`, "GM Percentage"];
                }
                return value;
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="gmPercentage"
              stroke="#ff7300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
