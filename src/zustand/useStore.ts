import { create } from "zustand";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

interface SKU {
  id: number;
  sku: string;
  price: number;
  cost: number;
}

interface StoreState {
  stores: Store[];
  skus: SKU[];
  addStore: (store: Store) => void;
  removeStore: (id: number) => void;
  updateStore: (store: Store) => void;
  setStores: (stores: Store[]) => void;
  addSKU: (sku: SKU) => void;
  removeSKU: (id: number) => void;
  updateSKU: (sku: SKU) => void;
  setSKUs: (skus: SKU[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  stores: [
    { id: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
    { id: 2, name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
    // Add initial stores here
  ],
  skus: [
    { id: 1, sku: "SKU 101", price: 10.0, cost: 5.0 },
    { id: 2, sku: "SKU 102", price: 20.0, cost: 10.0 },
    // Add initial SKUs here
  ],
  addStore: (store) => set((state) => ({ stores: [...state.stores, store] })),
  removeStore: (id) =>
    set((state) => ({
      stores: state.stores.filter((store) => store.id !== id),
    })),
  updateStore: (updatedStore) =>
    set((state) => ({
      stores: state.stores.map((store) =>
        store.id === updatedStore.id ? updatedStore : store
      ),
    })),
  setStores: (stores) => set({ stores }),
  addSKU: (sku) => set((state) => ({ skus: [...state.skus, sku] })),
  removeSKU: (id) =>
    set((state) => ({ skus: state.skus.filter((sku) => sku.id !== id) })),
  updateSKU: (updatedSKU) =>
    set((state) => ({
      skus: state.skus.map((sku) =>
        sku.id === updatedSKU.id ? updatedSKU : sku
      ),
    })),
  setSKUs: (skus) => set({ skus }),
}));
