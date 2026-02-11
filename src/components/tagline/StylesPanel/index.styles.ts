import styled from "styled-components";

export const OptionButton = styled.button<{ $isActive?: boolean }>`
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: ${(props) => (props.$isActive ? "#353535" : "none")};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #353535;
  }
`;

export const StyleVariantButton = styled(OptionButton)<{ $variant?: string }>`
  height: 48px;
  font-size: 16px;

  ${({ $variant, $isActive }) => {
    switch ($variant) {
      case "primary":
        return `
          background: #157BDA;
          border: ${$isActive ? "1px solid #ffffff" : "1px solid transparent"};
          &:hover {
            background: #1a85e0;
          }
        `;
      case "secondary":
        return `
          background: rgba(21, 123, 218, 0.2);
          border: ${$isActive ? "1px solid #ffffff" : "1px solid transparent"};
          color: #56ADFF;
          &:hover {
            background: rgba(21, 123, 218, 0.3);
          }
        `;
      case "outline":
        return `
          background: transparent;
          border: ${$isActive ? "1px solid #ffffff" : "1px solid #606060"};
          color: #ffffff;
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        `;
      case "contained":
        return `
          background: #30302E;
          border: ${$isActive ? "1px solid #ffffff" : "1px solid transparent"};
          color: #ffffff;
          &:hover {
            background: #232323;
          }
        `;
      default:
        return `
          border: ${$isActive ? "1px solid #ffffff" : "1px solid transparent"};
        `;
    }
  }}
`;
