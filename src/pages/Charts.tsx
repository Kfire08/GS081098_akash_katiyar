import React from "react";
import { useStore } from "../zustand/useStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Charts = () => {
  const { stores, skus } = useStore();

  const data = stores.map((store) => {
    const storeData = { name: store.name };
    skus.forEach((sku) => {
      const salesUnits = Math.floor(Math.random() * 100); // Replace with actual data
      const salesDollars = salesUnits * sku.price;
      const gmDollars = salesDollars - salesUnits * sku.cost;
      const gmPercentage = (gmDollars / salesDollars) * 100;
      storeData[sku.sku] = gmPercentage;
    });
    return storeData;
  });

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <BarChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {skus.map((sku) => (
            <Bar key={sku.sku} dataKey={sku.sku} fill="#8884d8" />
          ))}
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;
