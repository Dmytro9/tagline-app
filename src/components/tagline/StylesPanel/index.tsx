import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/RootStore";
import { PanelHeaderComponent } from "@/components/PanelHeaderComponent";
import UnionIcon from "@/assets/icons/union.svg?react";
import { Panel } from "@/styles";
import { StyleVariantSection } from "./StyleVariantSection";
import { SizeSection } from "./SizeSection";
import { RadiusSection } from "./RadiusSection";
import { AlignmentSection } from "./AlignmentSection";
import {
  StyleVariant,
  ElementSize,
  BorderRadius,
  Alignment,
} from "@/types/elements";

export const StylesPanel: FC = observer(() => {
  const { currentStore, uiStore } = useStores();
  const { styles } = currentStore;

  const handleStyleChange = useCallback((variant: StyleVariant) => {
    currentStore.updateStyles({ variant });
  }, [currentStore]);

  const handleSizeChange = useCallback((size: ElementSize) => {
    currentStore.updateStyles({ size });
  }, [currentStore]);

  const handleRadiusChange = useCallback((radius: BorderRadius) => {
    currentStore.updateStyles({ radius });
  }, [currentStore]);

  const handleAlignmentChange = useCallback((alignment: Alignment) => {
    currentStore.updateStyles({ alignment });
  }, [currentStore]);

  return (
    <Panel>
      <PanelHeaderComponent
        title="Styles"
        icon={<UnionIcon />}
        onClose={uiStore.closePanel}
        onBack={uiStore.goBack}
      />

      <StyleVariantSection
        value={styles.variant}
        onChange={handleStyleChange}
      />
      <SizeSection value={styles.size} onChange={handleSizeChange} />
      <RadiusSection value={styles.radius} onChange={handleRadiusChange} />
      <AlignmentSection
        value={styles.alignment}
        onChange={handleAlignmentChange}
      />
    </Panel>
  );
});
