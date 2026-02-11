import { FC, type MouseEvent, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragHandleIcon from "@/assets/icons/drag-handle.svg?react";
import CloseIcon from "@/assets/icons/close.svg?react";
import {
  TagListItem,
  TagListItemLabel,
  DragHandle,
  DeleteButton,
} from "./index.styles";

type SortableItemProps = {
  item: {
    id: string | number;
    label: string;
  };
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
};

export const SortableItem: FC<SortableItemProps> = observer(
  ({ item, onEdit, onDelete }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: item.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const handleEdit = useCallback(() => onEdit(item.id), [onEdit, item.id]);

    const handleDelete = useCallback((e: MouseEvent) => {
      e.stopPropagation();
      onDelete(item.id);
    }, [onDelete, item.id]);

    return (
      <TagListItem 
        ref={setNodeRef} 
        style={style} 
        onClick={handleEdit}
        role="listitem"
        aria-label={`Edit ${item.label}`}
      >
        <DragHandle {...attributes} {...listeners} aria-label={`Drag ${item.label}`}>
          <DragHandleIcon aria-hidden="true" />
        </DragHandle>
        <TagListItemLabel>{item.label}</TagListItemLabel>
        <DeleteButton onClick={handleDelete} aria-label={`Delete ${item.label}`}>
          <CloseIcon aria-hidden="true" />
        </DeleteButton>
      </TagListItem>
    );
  },
);
