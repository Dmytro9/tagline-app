import { FC, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/RootStore";
import { PANEL } from "@/types/elements";
import {
  AppContainer,
  MainContent,
  PreviewColumn,
  PanelsColumn,
  ExpandButton,
  GlobalStyle,
} from "@/styles";
import {
  PreviewArea,
  MainPanel,
  CreateItemPanel,
  EditItemPanel,
  StylesPanel,
} from "@/components";
import { elementRegistry } from "@/config/elementRegistry";

const App: FC = observer(() => {
  const {
    uiStore: { isOpen, currentPanel, openPanel },
    selectedElementType,
  } = useStores();
  const config = elementRegistry[selectedElementType];

  const handleOpenMainPanel = useCallback(() => openPanel(PANEL.MAIN), [openPanel]);

  // Use custom panels from config or fall back to defaults
  const CurrentMainPanel = config.MainPanel || MainPanel;
  const CurrentCreatePanel = config.CreateItemPanel || CreateItemPanel;
  const CurrentEditPanel = config.EditItemPanel || EditItemPanel;
  const CurrentStylesPanel = config.StylesPanel || StylesPanel;

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <PreviewColumn role="region" aria-label="Preview area">
            <PreviewArea />
          </PreviewColumn>

          <PanelsColumn $isCollapsed={!isOpen}>
            {!isOpen ? (
              <ExpandButton onClick={handleOpenMainPanel}>☰</ExpandButton>
            ) : (
              <>
                {currentPanel === PANEL.MAIN && <CurrentMainPanel />}
                {currentPanel === PANEL.CREATE && <CurrentCreatePanel />}
                {currentPanel === PANEL.EDIT && <CurrentEditPanel />}
                {currentPanel === PANEL.STYLES && <CurrentStylesPanel />}
              </>
            )}
          </PanelsColumn>
        </MainContent>
      </AppContainer>
    </>
  );
});

export default App;
