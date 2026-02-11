import { FC, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/RootStore";
import { PANEL } from "@/types/elements";
import {
  AppContainer,
  MainContent,
  PreviewColumn,
  PanelsColumn,
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
import { useDraggable } from "@/hooks/useDraggable";

const AppContent: FC = observer(() => {
  const {
    uiStore: { currentPanel },
    selectedElementType,
  } = useStores();
  const config = elementRegistry[selectedElementType];

  const CurrentMainPanel = useMemo(
    () => config.MainPanel || MainPanel,
    [config.MainPanel],
  );
  const CurrentCreatePanel = useMemo(
    () => config.CreateItemPanel || CreateItemPanel,
    [config.CreateItemPanel],
  );
  const CurrentEditPanel = useMemo(
    () => config.EditItemPanel || EditItemPanel,
    [config.EditItemPanel],
  );
  const CurrentStylesPanel = useMemo(
    () => config.StylesPanel || StylesPanel,
    [config.StylesPanel],
  );

  return (
    <>
      {currentPanel === PANEL.MAIN && <CurrentMainPanel />}
      {currentPanel === PANEL.CREATE && <CurrentCreatePanel />}
      {currentPanel === PANEL.EDIT && <CurrentEditPanel />}
      {currentPanel === PANEL.STYLES && <CurrentStylesPanel />}
    </>
  );
});

const App: FC = observer(() => {
  const {
    uiStore: { isOpen },
  } = useStores();
  const { panelRef } = useDraggable();

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <PreviewColumn role="region" aria-label="Preview area">
            <PreviewArea />
          </PreviewColumn>

          <PanelsColumn ref={panelRef} $isCollapsed={!isOpen}>
            {isOpen && <AppContent />}
          </PanelsColumn>
        </MainContent>
      </AppContainer>
    </>
  );
});

export default App;
