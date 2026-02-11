import { FC } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/RootStore";
import { PanelHeaderComponent } from "@/components/PanelHeaderComponent";
import { useCreateItem } from "./useCreateItem";
import UnionIcon from "@/assets/icons/union.svg?react";
import { Panel, PanelContent, FormGroup, Label, Input } from "@/styles";

export const CreateItemPanel: FC = observer(() => {
  const {
    uiStore: { goBack, closePanel },
  } = useStores();
  const { label, link, handleLabelChange, handleLinkChange, handleKeyDown } =
    useCreateItem();

  return (
    <Panel>
      <PanelHeaderComponent
        title="Item"
        icon={<UnionIcon />}
        onClose={closePanel}
        onBack={goBack}
      />

      <PanelContent>
        <FormGroup $variant="floating">
          <Input
            id="label"
            type="text"
            value={label}
            onChange={handleLabelChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter label"
            autoFocus
            $variant="floating"
            aria-label="Item label"
            aria-required="true"
          />
          <Label htmlFor="label" $variant="floating">
            Label
          </Label>
        </FormGroup>

        <FormGroup $variant="floating">
          <Input
            id="link"
            type="url"
            value={link}
            onChange={handleLinkChange}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
            $variant="floating"
            aria-label="Item link"
          />
          <Label htmlFor="link" $variant="floating">
            Link
          </Label>
        </FormGroup>
      </PanelContent>
    </Panel>
  );
});
