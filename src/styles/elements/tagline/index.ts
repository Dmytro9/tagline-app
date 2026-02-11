import styled, { css } from "styled-components";
import {
  StyleVariant,
  ElementSize,
  BorderRadius,
  Alignment,
} from "@/types/elements";
import { colors } from "../../colors";

type TagContainerProps = {
  $alignment: Alignment;
};

export const TagContainer = styled.div<TagContainerProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: ${({ $alignment }) => $alignment};
  max-width: 452px;
`;

// Tag Styles
const tagSizes = {
  xs: css`
    padding: 4px 10px;
    font-size: 11px;
  `,
  s: css`
    padding: 6px 12px;
    font-size: 12px;
  `,
  m: css`
    padding: 6px 14px;
    font-size: 13px;
  `,
  l: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  xl: css`
    padding: 10px 20px;
    font-size: 16px;
  `,
};

const tagVariants = {
  primary: css`
    background: ${colors.primary.dark};
    color: ${colors.text.primary};
    border: 1px solid ${colors.opacity.white10};
    &:hover {
      background: ${colors.primary.darker};
      border-color: ${colors.opacity.white10};
    }
  `,
  secondary: css`
    background: ${colors.opacity.blueDark20};
    color: ${colors.primary.light};
    border: none;
    &:hover {
      background: ${colors.opacity.blueDark30};
      border-color: ${colors.opacity.white10};
    }
  `,
  outline: css`
    background: transparent;
    color: ${colors.text.primary};
    border: 1px solid ${colors.opacity.white10};
    &:hover {
      background: ${colors.opacity.white10};
      border-color: ${colors.opacity.white10};
    }
  `,
  contained: css`
    background: ${colors.surface.base};
    color: ${colors.text.primary};
    border: none;
    &:hover {
      background: ${colors.surface.dark};
      border-color: ${colors.opacity.white10};
    }
  `,
};

type TagButtonProps = {
  $variant: StyleVariant;
  $size: ElementSize;
  $radius: BorderRadius;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
};

export const TagButton = styled.button<TagButtonProps>`
  border-radius: ${({ $radius }) => $radius}px;
  ${({ $size }) => tagSizes[$size]}
  ${({ $variant }) => tagVariants[$variant]}
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  text-decoration: none;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;

  &:active {
    transform: scale(0.98);
  }
`;

export const TagListItem = styled.div`
  padding: 10px 12px;
  border: 1px solid ${colors.opacity.white10};
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.surface.base};

  &:hover {
    border-color: ${colors.opacity.white10};
    background: ${colors.surface.base};
  }
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: ${colors.text.dim};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const TagListItemLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.text.secondary};
  flex: 1;
`;
