import { createContext, useContext } from 'react';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';

type DragHandleContextType = {
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  listeners?: DraggableSyntheticListeners;
  attributes?: DraggableAttributes;
} | null;

export const DragHandleContext = createContext<DragHandleContextType>(null);

export const useDragHandle = () => {
  return useContext(DragHandleContext);
};
