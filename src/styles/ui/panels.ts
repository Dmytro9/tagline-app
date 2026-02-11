import styled from "styled-components";
import { slideIn } from "./layout";
import { colors } from "../colors";

export const PanelOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
`;

export const Panel = styled.aside<{ $isOpen?: boolean }>`
  background: ${colors.surface.base};
  border-radius: 10px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.45),
    0 0 0 1px ${colors.opacity.white10};
  display: ${(props) => (props.$isOpen === false ? "none" : "flex")};
  flex-direction: column;
  animation: ${slideIn} 0.3s ease;
  overflow: hidden;
`;

export const PanelHeader = styled.div`
  padding: 16px 16px 14px;
  border-bottom: 1px solid ${colors.opacity.white10};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  position: relative;
`;

export const PanelHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  svg {
    position: relative;
    top: -10px;
  }
`;

export const PanelTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: ${colors.text.primary};
  text-align: center;
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

export const PanelFooter = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${colors.opacity.white10};
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
