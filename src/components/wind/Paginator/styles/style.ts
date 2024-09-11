import styled from "styled-components";
import { Colors } from "./colors";

export const CenterFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PageNumberContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
`;
interface PageNumberProps {
  active?: boolean;
}
export const PageNumber = styled(CenterFlex)`
  padding: 4px;
  min-width: 32px;
  height: 32px;
  background: ${({ active }: PageNumberProps) => active && Colors.info_100};
  color: ${({ active }: PageNumberProps) =>
    active ? Colors.info_900 : Colors.grey_600};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    color: ${({ active }: PageNumberProps) =>
      active ? Colors.info_900 : Colors.grey_900};
  }
`;

export const PreviousPage = styled(PageNumber)`
  background: ${Colors.white_1};
  cursor: ${({ active }) => !active && "not-allowed"};
`;

export const NextPage = styled(PageNumber)`
  background: ${Colors.white_1};
  cursor: ${({ active }) => !active && "not-allowed"};
`;

export const CheckBox = styled.input`
  cursor: pointer;
`;

export const RowSelectionText = styled.p`
  display: flex;
  position: absolute;
  left: 40px;
`;

interface SortIconContainerProps {
  isRotate?: boolean;
}
export const SortIcon = styled.svg`
  margin-left: 20px;
  transition: transform 0.6s ease;
  transform: ${({ isRotate }: SortIconContainerProps) =>
    isRotate ? "rotate(180deg)" : ""};
`;

interface SortArrowContainerProps {
  active?: boolean;
}
export const SortArrowContainer = styled.div`
  display: ${({ active }: SortArrowContainerProps) =>
    active ? "block" : "none"};
  position: relative;
`;

interface SortIconTextContainerProps {
  disableCursor?: boolean;
}
export const SortIconTextContainer = styled(CenterFlex)`
  cursor: ${({ disableCursor }: SortIconTextContainerProps) =>
    disableCursor ? `default` : `pointer`};
  &:hover {
    ${SortArrowContainer} {
      display: block;
    }
  }
`;
