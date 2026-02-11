import { makeAutoObservable } from "mobx";
import type { PanelType, ElementId } from "@/types/elements";
import { PANEL } from "@/types/elements";

export const createUIStore = () => {
  const store = {
    currentPanel: PANEL.MAIN as PanelType,
    editingItemId: null as ElementId | null,
    panelHistory: [] as PanelType[],

    openPanel(panel: PanelType, itemId?: ElementId) {
      if (store.currentPanel) {
        store.panelHistory.push(store.currentPanel);
      }
      store.currentPanel = panel;
      store.editingItemId = itemId || null;
    },

    closePanel() {
      store.currentPanel = null;
      store.editingItemId = null;
      store.panelHistory = [];
    },

    goBack() {
      const previousPanel = store.panelHistory.pop();
      if (previousPanel) {
        store.currentPanel = previousPanel;
        store.editingItemId = null;
      } else {
        store.closePanel();
      }
    },

    get isOpen() {
      return store.currentPanel !== null;
    },
  };

  return makeAutoObservable(store);
};
