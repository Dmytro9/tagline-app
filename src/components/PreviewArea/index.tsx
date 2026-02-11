import { FC } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useStores } from "@/stores/RootStore";
import { elementRegistry } from "@/config/elementRegistry";
import { PreviewWrapper, PreviewSection, PreviewTitle } from "./index.styles";

export const PreviewArea: FC = observer(() => {
  const { currentStore, selectedElementType } = useStores();
  const { items, styles } = currentStore;
  const config = elementRegistry[selectedElementType];

  return (
    <PreviewWrapper>
      <PreviewSection>
        <PreviewTitle>{config.displayName} element</PreviewTitle>
        {config.renderPreview(toJS(items), toJS(styles))}
      </PreviewSection>
    </PreviewWrapper>
  );
});
