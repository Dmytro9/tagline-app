import styled, { keyframes } from "styled-components";
import { colors } from "../colors";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: radial-gradient(ellipse at center, ${colors.background.primary} 0%, ${colors.background.primary} 100%);
  background-attachment: fixed;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  padding: 40px;
  gap: 40px;
  margin: 0 auto;
  width: 100%;
  overflow: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
`;

export const PreviewColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    order: 1;
  }
`;

export const PanelsColumn = styled.div<{ $isCollapsed?: boolean }>`
  width: ${props => props.$isCollapsed ? '60px' : '280px'};
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  transition: width 0.2s cubic-bezier(0.2, 0.0, 0.3, 1);

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
  }
`;

export const ExpandButton = styled.button`
  width: 100%;
  height: 60px;
  background: ${colors.opacity.white10};
  border: 1px solid ${colors.opacity.white10};
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.2s cubic-bezier(0.2, 0.0, 0.3, 1);
  
  &:hover {
    background: ${colors.opacity.white10};
    border-color: ${colors.opacity.white10};
    color: rgba(255, 255, 255, 0.8);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const OptionGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns || 4}, 1fr);
  gap: 6px;
  margin-bottom: 10px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 30px 20px;
  color: ${colors.text.dim};
  font-size: 13px;
`;
