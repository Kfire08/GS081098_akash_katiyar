import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useStore } from "../zustand/useStore";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const Stores = () => {
  const { stores, addStore, removeStore, updateStore, setStores } = useStore();
  const gridRef = useRef<AgGridReact>(null);

  const [newStore, setNewStore] = useState({ name: "", city: "", state: "" });

  const handleAddStore = () => {
    if (!newStore.name || !newStore.city || !newStore.state) {
      alert("Please fill in all fields before adding a store.");
      return;
    }
    const newId = stores.length ? stores[stores.length - 1].id + 1 : 1;
    addStore({ id: newId, ...newStore });
    setNewStore({ name: "", city: "", state: "" });
  };

  const handleRemoveStore = (id: number) => {
    removeStore(id);
  };

  const handleUpdateStore = (store: any) => {
    updateStore(store);
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
    const reorderedStores = newOrder;
    setStores(reorderedStores);
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
      headerName: "Store",
      field: "name",
      editable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: "City",
      field: "city",
      editable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: "State",
      field: "state",
      editable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: any) => (
        <button
          className="cursor-pointer"
          onClick={() => handleRemoveStore(params.data.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Stores</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact
            theme="legacy"
            ref={gridRef}
            rowData={stores}
            columnDefs={columns}
            rowDragManaged={true}
            animateRows={true}
            onGridReady={onGridReady}
            onRowDragEnd={onRowDragEnd}
            onCellValueChanged={(event) => handleUpdateStore(event.data)}
          />
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            placeholder="City"
            value={newStore.city}
            onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            placeholder="State"
            value={newStore.state}
            onChange={(e) =>
              setNewStore({ ...newStore, state: e.target.value })
            }
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddStore}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stores;
