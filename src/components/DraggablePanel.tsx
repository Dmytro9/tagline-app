import { FC, type ReactNode, memo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { DragHandleContext } from "@/contexts/DragHandleContext";
import { PanelsColumn } from "@/styles";

type DraggablePanelProps = {
  children: ReactNode;
  isOpen: boolean;
  position: { x: number; y: number };
};

const DraggablePanelComponent: FC<DraggablePanelProps> = ({
  children,
  isOpen,
  position,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    setActivatorNodeRef,
  } = useDraggable({
    id: "panel",
    disabled: !isOpen,
  });

  const x = position.x + (transform?.x ?? 0);
  const y = position.y + (transform?.y ?? 0);

  return (
    <PanelsColumn
      ref={setNodeRef}
      $isCollapsed={!isOpen}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      {...attributes}
    >
      <DragHandleContext.Provider
        value={{ setActivatorNodeRef, listeners, attributes }}
      >
        {children}
      </DragHandleContext.Provider>
    </PanelsColumn>
  );
};

export const DraggablePanel = memo(DraggablePanelComponent);
