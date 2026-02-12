import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useStores } from "@/stores/RootStore";
import { elementRegistry } from "@/config/elementRegistry";
import { PreviewWrapper, PreviewSection, PreviewTitle } from "./index.styles";

export const PreviewArea: FC = observer(() => {
  const { currentStore, selectedElementType, uiStore } = useStores();
  const { items, styles } = currentStore;
  const config = elementRegistry[selectedElementType];

  const handleItemClick = useCallback(() => {
    uiStore.openPanel("main");
  }, [uiStore]);

  return (
    <PreviewWrapper>
      <PreviewSection>
        <PreviewTitle onClick={handleItemClick}>{config.displayName} element</PreviewTitle>
        {config.renderPreview(toJS(items), toJS(styles), {
          onItemClick: handleItemClick,
        })}
      </PreviewSection>
    </PreviewWrapper>
  );
});
