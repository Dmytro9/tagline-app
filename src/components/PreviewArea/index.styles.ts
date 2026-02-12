import styled from "styled-components";

export const PreviewWrapper = styled.div`
  position: relative;
`;

export const PreviewSection = styled.section`
  background: #252525;
  border-radius: 12px;
  padding: 120px 40px 60px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PreviewTitle = styled.h2`
  font-size: 37px;
  font-weight: 500;
  margin: 0 0 116px 0;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-align: center;
  cursor: pointer;
`;
