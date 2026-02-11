import { makeAutoObservable, toJS } from "mobx";
import { BaseElement, BaseStyles, ElementId } from "../types/elements";

// Generic element store that can handle any element type
export const createElementStore = <
  TElement extends BaseElement,
  TStyles extends BaseStyles,
>(
  initialItems: TElement[],
  initialStyles: TStyles,
  elementType?: string,
) => {
  const store = {
    items: initialItems as TElement[],
    styles: initialStyles as TStyles,

    addItem(item: Omit<TElement, "id"> | TElement) {
      const newItem: TElement = {
        id: "id" in item ? item.id : Date.now().toString(),
        ...item,
      } as TElement;
      store.items.push(newItem);
      store.simulateApiCall("POST", "/api/items", newItem);
    },

    updateItem(id: ElementId, updates: Partial<Omit<TElement, "id">>) {
      const index = store.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        store.items[index] = { ...store.items[index], ...updates };
        store.simulateApiCall("PUT", `/api/items/${id}`, store.items[index]);
      }
    },

    deleteItem(id: ElementId) {
      store.items = store.items.filter((item) => item.id !== id);
      store.simulateApiCall("DELETE", `/api/items/${id}`, { id });
    },

    reorderItems(startIndex: number, endIndex: number) {
      const result = Array.from(store.items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      store.items = result;
      store.simulateApiCall("PUT", "/api/items/reorder", {
        items: store.items,
      });
    },

    updateStyles(updates: Partial<TStyles>) {
      store.styles = { ...store.styles, ...updates };
      store.simulateApiCall("PUT", "/api/styles", store.styles);
    },

    getItemById(id: ElementId): TElement | undefined {
      const item = store.items.find((item) => item.id === id);
      return item ? toJS(item) : undefined;
    },

    simulateApiCall(method: string, url: string, data: unknown) {
      const prefix = elementType ? `[${elementType}]` : '';
      console.log(`${prefix}[${method}] ${url}`, toJS(data));
    },
  };

  return makeAutoObservable(store);
};

// Type helper to get the store type
export type ElementStore<
  TElement extends BaseElement,
  TStyles extends BaseStyles,
> = ReturnType<typeof createElementStore<TElement, TStyles>>;
