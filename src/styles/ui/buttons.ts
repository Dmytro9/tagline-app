import { colors } from './../colors';
import styled, { css } from "styled-components";

export const IconButton = styled.button<{ $position?: 'left' | 'right' }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  color: ${colors.text.disabled};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  position: absolute;
  ${(props) => props.$position === 'left' ? 'left: 12px;' : 'right: 12px;'}
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background: ${colors.opacity.white10};
    color: ${colors.text.secondary};
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
`;

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${(props) =>
    props.$variant === "primary"
      ? css`
          background: ${colors.primary.main};
          color: ${colors.background.primary};
          &:hover {
            background: ${colors.primary.hover};
          }
        `
      : css`
          background: none;
          color: ${colors.text.secondary};
          &:hover {
            background: ${colors.surface.base};
            color: ${colors.text.primary};
          }
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const AddButton = styled(Button)`
  color: ${colors.text.disabled};
  padding-left: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;

  &:hover {
     background: ${colors.surface.dark};
     color: ${colors.text.disabled};
  }
`;

export const NavigationButton = styled(Button)`
  color: ${colors.text.primary};
  border-top: 1px solid ${colors.opacity.white10};
  border-radius: 0;
  padding: 14px 16px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  text-align: left;

  & svg {
    color: ${colors.text.disabled};
  }

  &:hover svg {
    color: ${colors.text.primary};
  }

  & span > svg {
    position: relative;
    top: 4px;
    margin-right: 14px;
  }
`;

export const OptionButton = styled.button<{ $isActive?: boolean }>`
  padding: 8px;
  border: 1px solid
    ${(props) => (props.$isActive ? colors.primary.main : colors.opacity.white10)};
  border-radius: 6px;
  background: ${(props) =>
    props.$isActive ? colors.opacity.primaryLight15 : colors.surface.base};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => (props.$isActive ? colors.primary.main : colors.text.disabled)};
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${(props) =>
      props.$isActive ? colors.primary.main : colors.opacity.white10};
    background: ${(props) =>
      props.$isActive ? colors.opacity.primaryLight20 : colors.surface.base};
  }
`;

export const StyleVariantButton = styled(OptionButton)`
  height: 48px;
  font-size: 16px;
`;
