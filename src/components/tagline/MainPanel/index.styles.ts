import styled from "styled-components";

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: #6a6a6a;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.2s ease;

  &:active {
    cursor: grabbing;
  }
`;

export const TagListItemLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #6a6a6a;
  cursor: pointer;
  padding: 0;
  opacity: 0;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ffffff;
  }
`;

export const TagListItem = styled.div`
  padding: 10px 6px;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    border-color: rgba(255, 255, 255, 0.12);
    background: #232323;
    
    ${DragHandle},
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;
