import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
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
      headerName: "",
      field: "actions",
      width: 70,
      cellRenderer: (params: any) => (
        <button
          className="cursor-pointer mt-[8px]"
          onClick={() => handleRemoveStore(params.data.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      ),
    },
    {
      headerName: "S.No",
      field: "id",
      sortable: true,
      rowDrag: true,
    },
    {
      headerName: "Store",
      field: "name",
      editable: true,
      sortable: true,
    },
    {
      headerName: "City",
      field: "city",
      editable: true,
      sortable: true,
    },
    {
      headerName: "State",
      field: "state",
      editable: true,
      sortable: true,
    },
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-gray-200">
      <div className="flex-1 bg-white p-4">
        <h2 className="text-xl font-bold mb-4">Stores</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: "80%", width: "100%" }}
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
