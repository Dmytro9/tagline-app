import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
  KeyboardEvent,
} from "react";
import { useStores } from "@/stores/RootStore";

export const useCreateItem = () => {
  const { currentStore, uiStore } = useStores();
  const [label, setLabel] = useState("");
  const [link, setLink] = useState("");
  const itemIdRef = useRef<string>(crypto.randomUUID());
  const itemCreatedRef = useRef<boolean>(false);

  // Debounce label updates to store
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (label) {
        if (!itemCreatedRef.current) {
          currentStore.addItem({ id: itemIdRef.current, label, link });
          itemCreatedRef.current = true;
        } else {
          currentStore.updateItem(itemIdRef.current, { label });
        }
      } else if (itemCreatedRef.current && !label.trim()) {
        // Remove item if label is cleared
        currentStore.deleteItem(itemIdRef.current);
        itemCreatedRef.current = false;
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, currentStore]);

  // Debounce link updates to store
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (itemCreatedRef.current && link !== undefined) {
        currentStore.updateItem(itemIdRef.current, { link });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [link, currentStore]);

  const handleLabelChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  }, []);

  const handleLinkChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && label.trim()) {
        uiStore.goBack();
      }
    },
    [label, uiStore],
  );

  return {
    label,
    link,
    handleLabelChange,
    handleLinkChange,
    handleKeyDown,
  };
};
