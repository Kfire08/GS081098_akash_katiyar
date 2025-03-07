import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useStore } from "../zustand/useStore";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const SKUs = () => {
  const { skus, addSKU, removeSKU, updateSKU, setSKUs } = useStore();
  const gridRef = useRef<AgGridReact>(null);

  const [newSKU, setNewSKU] = useState({ sku: "", price: 0, cost: 0 });

  const handleAddSKU = () => {
    if (!newSKU.sku || newSKU.price <= 0 || newSKU.cost <= 0) {
      alert(
        "Please fill in all fields with valid values before adding an SKU."
      );
      return;
    }
    const newId = skus.length ? skus[skus.length - 1].id + 1 : 1;
    addSKU({ id: newId, ...newSKU });
    setNewSKU({ sku: "", price: 0, cost: 0 });
  };

  const handleRemoveSKU = (id: number) => {
    removeSKU(id);
  };

  const handleUpdateSKU = (sku: any) => {
    updateSKU(sku);
  };

  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  const onRowDragEnd = (event: any) => {
    const rowCount = event.api.getDisplayedRowCount();
    const newOrder = [];
    for (let i = 0; i < rowCount; i++) {
      newOrder.push(event.api.getDisplayedRowAtIndex(i).data);
    }
    const reorderedSKUs = newOrder;
    setSKUs(reorderedSKUs);
  };

  const columns = [
    {
      headerName: "S.No",
      field: "id",
      sortable: true,
      filter: true,
      rowDrag: true,
    },
    {
      headerName: "SKU",
      field: "sku",
      editable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Price",
      field: "price",
      editable: true,
      sortable: true,
      filter: true,
      valueFormatter: (params: any) => `$ ${params.value}`,
    },
    {
      headerName: "Cost",
      field: "cost",
      editable: true,
      sortable: true,
      filter: true,
      valueFormatter: (params: any) => `$ ${params.value}`,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <button
          className="cursor-pointer"
          onClick={() => handleRemoveSKU(params.data.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">SKUs</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact
            theme="legacy"
            ref={gridRef}
            rowData={skus}
            columnDefs={columns}
            rowDragManaged={true}
            animateRows={true}
            onGridReady={onGridReady}
            onRowDragEnd={onRowDragEnd}
            onCellValueChanged={(event) => handleUpdateSKU(event.data)}
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="SKU"
            value={newSKU.sku}
            onChange={(e) => setNewSKU({ ...newSKU, sku: e.target.value })}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={newSKU.price}
            onChange={(e) =>
              setNewSKU({ ...newSKU, price: parseFloat(e.target.value) })
            }
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="number"
            placeholder="Cost"
            value={newSKU.cost}
            onChange={(e) =>
              setNewSKU({ ...newSKU, cost: parseFloat(e.target.value) })
            }
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddSKU}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add SKU
          </button>
        </div>
      </div>
    </div>
  );
};

export default SKUs;
