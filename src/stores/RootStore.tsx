import { createContext, useContext, ReactNode } from "react";
import { makeAutoObservable } from "mobx";
import { createTaglineStore } from "./TaglineStore";
import { createUIStore } from "./UIStore";
import { RegisteredElementType } from "../config/elementRegistry";
import { PANEL } from "../types/elements";

const createRootStore = () => {
  const store = {
    // Element stores
    taglineStore: createTaglineStore(),
    uiStore: createUIStore(),

    // Current selected element type
    selectedElementType: "tagline" as RegisteredElementType,

    setElementType(type: RegisteredElementType) {
      store.selectedElementType = type;
      // Reset to main panel when switching element types
      store.uiStore.currentPanel = PANEL.MAIN;
      store.uiStore.editingItemId = null;
      store.uiStore.panelHistory = [];
    },

    // Get the current active store based on selected element type
    get currentStore() {
      return store.taglineStore;
    },
  };

  return makeAutoObservable(store);
};

type RootStore = ReturnType<typeof createRootStore>;

const rootStore = createRootStore();
const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStores must be used within StoreProvider");
  }
  return context;
};
