import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
  KeyboardEvent,
} from "react";
import { useStores } from "@/stores/RootStore";

export const useEditItem = () => {
  const { currentStore, uiStore } = useStores();

  const currentItem = uiStore.editingItemId
    ? currentStore.getItemById(uiStore.editingItemId)
    : null;

  const [label, setLabel] = useState(() => currentItem?.label || "");
  const [link, setLink] = useState(() => currentItem?.link || "");
  const initialLoadRef = useRef<boolean>(true);
  const itemIdRef = useRef<string>(uiStore.editingItemId || "");
  const itemDeletedRef = useRef<boolean>(false);
  const prevLabelRef = useRef<string>(currentItem?.label || "");

  // Debounce label updates to store
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      prevLabelRef.current = label;
      return;
    }

    const timeoutId = setTimeout(() => {
      if (label.trim()) {
        // If item was deleted, create a new one with the same ID
        if (itemDeletedRef.current) {
          currentStore.addItem({ id: itemIdRef.current, label, link });
          itemDeletedRef.current = false;
        } else if (uiStore.editingItemId && label !== prevLabelRef.current) {
          // Update if label has value and changed
          currentStore.updateItem(uiStore.editingItemId, { label });
        }
        prevLabelRef.current = label;
      } else if (uiStore.editingItemId && !itemDeletedRef.current) {
        // Remove item if label is cleared (only once)
        currentStore.deleteItem(uiStore.editingItemId);
        itemDeletedRef.current = true;
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [label, currentStore, uiStore.editingItemId, link]);

  // Debounce link updates to store
  useEffect(() => {
    if (initialLoadRef.current) return;

    const timeoutId = setTimeout(() => {
      if (
        uiStore.editingItemId &&
        link !== currentItem?.link &&
        !itemDeletedRef.current
      ) {
        currentStore.updateItem(uiStore.editingItemId, { link });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [link, currentStore, uiStore.editingItemId, currentItem?.link]);

  const handleLabelChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  }, []);

  const handleLinkChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        uiStore.goBack();
      }
    },
    [uiStore],
  );

  return {
    label,
    link,
    handleLabelChange,
    handleLinkChange,
    handleKeyDown,
  };
};
