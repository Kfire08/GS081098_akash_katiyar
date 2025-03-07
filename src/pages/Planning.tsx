import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Planning = () => {
  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          Akash
        </div>
      </div>
    </div>
  );
};

export default Planning;
