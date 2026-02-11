import { FC, ReactNode } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react";
import {
  PanelHeader,
  PanelHeaderContent,
  PanelTitle,
  IconButton,
} from "@/styles";

type PanelHeaderComponentProps = {
  title: string;
  icon: ReactNode;
  onClose: () => void;
  onBack?: () => void;
}

export const PanelHeaderComponent: FC<PanelHeaderComponentProps> = ({
  title,
  icon,
  onClose,
  onBack,
}) => {
  return (
    <PanelHeader>
      {onBack && (
        <IconButton onClick={onBack} $position="left" aria-label="Go back">
          <ArrowLeftIcon aria-hidden="true" />
        </IconButton>
      )}
      <PanelHeaderContent>
        {icon}
        <PanelTitle>{title}</PanelTitle>
      </PanelHeaderContent>
      <IconButton onClick={onClose} aria-label="Close panel">
        <CloseIcon aria-hidden="true" />
      </IconButton>
    </PanelHeader>
  );
};
