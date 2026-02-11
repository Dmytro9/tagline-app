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
      const baseUrl = elementType ? `/api/${elementType}/items` : "/api/items";
      store.simulateApiCall("POST", baseUrl, newItem);
    },

    updateItem(id: ElementId, updates: Partial<Omit<TElement, "id">>) {
      const index = store.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        store.items[index] = { ...store.items[index], ...updates };
        const baseUrl = elementType ? `/api/${elementType}/items/${id}` : `/api/items/${id}`;
        store.simulateApiCall("PUT", baseUrl, store.items[index]);
      }
    },

    deleteItem(id: ElementId) {
      store.items = store.items.filter((item) => item.id !== id);
      const baseUrl = elementType ? `/api/${elementType}/items/${id}` : `/api/items/${id}`;
      store.simulateApiCall("DELETE", baseUrl, { id });
    },

    reorderItems(startIndex: number, endIndex: number) {
      const result = Array.from(store.items);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      store.items = result;
      const baseUrl = elementType ? `/api/${elementType}/items/reorder` : "/api/items/reorder";
      store.simulateApiCall("PUT", baseUrl, {
        items: store.items,
      });
    },

    updateStyles(updates: Partial<TStyles>) {
      store.styles = { ...store.styles, ...updates };
      const baseUrl = elementType ? `/api/${elementType}/styles` : "/api/styles";
      store.simulateApiCall("PUT", baseUrl, store.styles);
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
