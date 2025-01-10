import { Colors } from "../styles/colors";
import styled, { css } from "styled-components";

export const getBorderRadius = css`
  ${({ index, totalButtons }: StyledBtnProps) => {
    if (index === 0 && index === totalButtons - 1) {
      return css`
        border-radius: 8px;
      `;
    } else if (index === 0) {
      return css`
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      `;
    } else if (index === totalButtons - 1) {
      return css`
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      `;
    }
  }}
`;

export const getActiveButton = css`
  ${({ active }: StyledBtnProps) =>
    active &&
    css`
      background: ${Colors.info_100};
      border-color: ${Colors.info_500};
      color: ${Colors.info_700};
    `}
`;

export const StyledBtn = styled.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  cursor: pointer;
  border: 1px solid ${Colors.grey_100};
  ${getBorderRadius}
  ${getActiveButton}
  align-items: center;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
`;

interface StyledBtnProps {
  active: boolean;
  index: number;
  totalButtons: number;
}
