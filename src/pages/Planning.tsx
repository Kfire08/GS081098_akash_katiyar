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
} from "../utils/calculations";
import { config } from "../config/config";
import "./Planning.css"; // Import custom CSS file

const Planning = () => {
  const { stores, skus, planningData, setPlanningData } = useStore();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (planningData.length === 0) {
      const data = [];
      stores.forEach((store) => {
        skus.forEach((sku) => {
          const row = {
            store: store.name,
            sku: sku.sku,
            price: sku.price,
            cost: sku.cost,
          };
          for (let month = 1; month <= config.numberOfMonths; month++) {
            for (let week = 1; week <= 4; week++) {
              row[`salesUnits_M${month}_W${week}`] = 0;
              row[`salesDollars_M${month}_W${week}`] = 0;
              row[`gmDollars_M${month}_W${week}`] = 0;
              row[`gmPercentage_M${month}_W${week}`] = 0;
            }
          }
          data.push(row);
        });
      });
      setRowData(data);
      setPlanningData(data); // Store the planning data in Zustand store
    } else {
      setRowData(planningData);
    }
  }, [stores, skus, planningData, setPlanningData]);

  const onCellValueChanged = (params) => {
    const { data, colDef, newValue } = params;
    const field = colDef.field;

    if (field.startsWith("salesUnits")) {
      const [month, week] = field.match(/M(\d+)_W(\d+)/).slice(1, 3);
      const salesDollarsField = `salesDollars_M${month}_W${week}`;
      const gmDollarsField = `gmDollars_M${month}_W${week}`;
      const gmPercentageField = `gmPercentage_M${month}_W${week}`;

      data[salesDollarsField] = calculateSalesDollars(newValue, data.price);
      data[gmDollarsField] = calculateGMDollars(
        data[salesDollarsField],
        newValue,
        data.cost
      );
      data[gmPercentageField] = calculateGMPercentage(
        data[gmDollarsField],
        data[salesDollarsField]
      );

      params.api.applyTransaction({ update: [data] });
      setPlanningData(params.api.getRowData()); // Update the planning data in Zustand store
    }
  };

  const generateColumns = () => {
    const columns = [
      { headerName: "Store", field: "store", sortable: true },
      { headerName: "SKU", field: "sku", sortable: true },
    ];

    for (let month = 1; month <= config.numberOfMonths; month++) {
      const monthGroup = {
        headerName: `Month ${month}`,
        headerClass: "header-center", // Apply custom CSS class
        children: [],
      };

      for (let week = 1; week <= 4; week++) {
        const weekGroup = {
          headerName: `Week ${week}`,
          headerClass: "header-center", // Apply custom CSS class
          children: [
            {
              headerName: "Sales Units",
              field: `salesUnits_M${month}_W${week}`,
              editable: true,
            },
            {
              headerName: "Sales Dollars",
              field: `salesDollars_M${month}_W${week}`,
              valueFormatter: (params) => `$${params.value.toFixed(2)}`,
            },
            {
              headerName: "GM Dollars",
              field: `gmDollars_M${month}_W${week}`,
              valueFormatter: (params) => `$${params.value.toFixed(2)}`,
            },
            {
              headerName: "GM %",
              field: `gmPercentage_M${month}_W${week}`,
              valueFormatter: (params) => `${params.value.toFixed(2)}%`,
              cellStyle: (params) => ({
                backgroundColor: getGMPercentageColor(params.value),
              }),
            },
          ],
        };
        monthGroup.children.push(weekGroup);
      }

      columns.push(monthGroup);
    }

    return columns;
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <div
          className="ag-theme-alpine"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            theme="legacy"
            rowData={rowData}
            columnDefs={generateColumns()}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default Planning;
