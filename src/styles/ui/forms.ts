import styled from "styled-components";
import { colors } from "../colors";

export const FormGroup = styled.div<{ $variant?: "floating" | "default"; $withBorder?: boolean }>`
  margin-bottom: 16px;
  position: ${({ $variant }) => ($variant === "floating" ? "relative" : "static")};
  ${({ $withBorder }) =>
    $withBorder &&
    `
    padding: 6px 20px;
    border-bottom: 1px solid ${colors.opacity.white10};
    margin-bottom: 10px;
  `}
  &:last-of-type {
    margin-bottom: 0;
    ${({ $withBorder }) => $withBorder && "border-bottom: none;"}
  }
`;

export const Label = styled.label<{ $variant?: "floating" | "default" }>`
  ${({ $variant }) =>
    $variant === "floating"
      ? `
    position: absolute;
    top: 4px;
    left: 10px;
    font-size: 12px;
    font-weight: 500;
    color: ${colors.text.disabled};
    letter-spacing: 0.5px;
    pointer-events: none;
    transition: all 0.2s ease;
    z-index: 1;
  `
      : `
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: ${colors.text.primary};
    letter-spacing: 0.5px;
  `}
`;

export const Input = styled.input<{ $variant?: "floating" | "default" }>`
  width: 100%;
  padding: ${({ $variant }) => ($variant === "floating" ? "22px 10px 8px" : "8px 10px")};
  border: 1px solid ${colors.opacity.white10};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-sizing: border-box;
  background: ${colors.surface.base};
  color: ${colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${colors.text.primary};
    background: ${colors.surface.base};
  }

  ${({ $variant }) =>
    $variant === "floating" &&
    `
    &:focus + ${Label} {
      color: ${colors.text.primary};
    }
  `}

  &::placeholder {
    color: ${colors.text.dim};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px ${colors.autofill.background} inset !important;
    -webkit-text-fill-color: ${colors.autofill.text} !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
