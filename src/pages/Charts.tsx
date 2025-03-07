import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { week: "Week 1", GM_Dollars: 4000, GM_Percentage: 30 },
  { week: "Week 2", GM_Dollars: 3000, GM_Percentage: 50 },
];

const Charts = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Chart</h2>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="GM_Dollars" fill="#8884d8" />
          <Bar dataKey="GM_Percentage" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Charts;
