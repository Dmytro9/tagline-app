import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/RootStore";
import { elementRegistry } from "@/config/elementRegistry";
import { PANEL } from "@/types/elements";
import { SortableItem } from "./SortableItem";
import { PanelHeaderComponent } from "@/components/PanelHeaderComponent";
import PlusIcon from "@/assets/icons/plus.svg?react";
import StylesIcon from "@/assets/icons/styles.svg?react";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import UnionIcon from "@/assets/icons/union.svg?react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Panel,
  PanelContent,
  AddButton,
  NavigationButton,
  EmptyState,
} from "@/styles";

export const MainPanel: FC = observer(() => {
  const {
    currentStore,
    uiStore: { openPanel, closePanel },
    selectedElementType,
  } = useStores();
  const config = elementRegistry[selectedElementType];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentStore.items.findIndex(
        (item) => item.id === active.id,
      );
      const newIndex = currentStore.items.findIndex(
        (item) => item.id === over.id,
      );
      currentStore.reorderItems(oldIndex, newIndex);
    }
  }, [currentStore]);

  const handleItemClick = useCallback((itemId: string | number) =>
    openPanel(PANEL.EDIT, itemId.toString()),
  [openPanel]);

  const handleAddClick = useCallback(() => openPanel(PANEL.CREATE), [openPanel]);

  const handleStylesClick = useCallback(() => openPanel(PANEL.STYLES), [openPanel]);

  const handleDeleteItem = useCallback((itemId: string | number) => {
    currentStore.deleteItem(itemId.toString());
  }, [currentStore]);

  return (
    <Panel>
      <PanelHeaderComponent
        title={config.displayName}
        icon={<UnionIcon />}
        onClose={closePanel}
      />

      <PanelContent>
        {currentStore.items.length === 0 ? (
          <EmptyState role="status">
            No items yet. Add your first {config.displayName.toLowerCase()}!
          </EmptyState>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentStore.items}
              strategy={verticalListSortingStrategy}
            >
              <div role="list" aria-label="Items list">
              {currentStore.items.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  onEdit={handleItemClick}
                  onDelete={handleDeleteItem}
                />
              ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <AddButton $variant="secondary" onClick={handleAddClick} aria-label="Add new item">
          <PlusIcon aria-hidden="true" />
          Add item
        </AddButton>
      </PanelContent>
      <NavigationButton $variant="secondary" onClick={handleStylesClick} aria-label="Open styles panel">
        <span>
          <StylesIcon aria-hidden="true" />
          <span>Styles</span>
        </span>
        <ChevronRightIcon />
      </NavigationButton>
    </Panel>
  );
});
