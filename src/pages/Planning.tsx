import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useStore } from "../zustand/useStore";
import {
  calculateSalesDollars,
  calculateGMDollars,
  calculateGMPercentage,
  getGMPercentageColor,
} from "../utils/calculations.ts";

const Planning = () => {
  const { stores, skus } = useStore();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = [];
    stores.forEach((store) => {
      skus.forEach((sku) => {
        data.push({
          store: store.name,
          sku: sku.sku,
          price: sku.price,
          cost: sku.cost,
          salesUnits: 0,
          salesDollars: 0,
          gmDollars: 0,
          gmPercentage: 0,
        });
      });
    });
    setRowData(data);
  }, [stores, skus]);

  const onCellValueChanged = (params) => {
    const { data } = params;
    data.salesDollars = calculateSalesDollars(data.salesUnits, data.price);
    data.gmDollars = calculateGMDollars(
      data.salesDollars,
      data.salesUnits,
      data.cost
    );
    data.gmPercentage = calculateGMPercentage(
      data.gmDollars,
      data.salesDollars
    );
    params.api.applyTransaction({ update: [data] });
  };

  const columns = [
    { headerName: "Store", field: "store", sortable: true },
    { headerName: "SKU", field: "sku", sortable: true },
    {
      headerName: "Price",
      field: "price",
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: "Cost",
      field: "cost",
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    { headerName: "Sales Units", field: "salesUnits", editable: true },
    {
      headerName: "Sales Dollars",
      field: "salesDollars",
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: "GM Dollars",
      field: "gmDollars",
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      headerName: "GM %",
      field: "gmPercentage",
      valueFormatter: (params) => `${params.value.toFixed(2)}%`,
      cellStyle: (params) => ({
        backgroundColor: getGMPercentageColor(params.value),
      }),
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            theme="legacy"
            rowData={rowData}
            columnDefs={columns}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default Planning;
