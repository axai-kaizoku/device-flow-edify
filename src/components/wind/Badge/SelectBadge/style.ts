import styled, { css } from "styled-components";
import { Colors } from "../styles/colors";

const getBorder = css`
   ${(props: Props) =>
    css`
      border: 1.5px solid ${!props.selected ? Colors.grey_100 : Colors.info_500};
      &:hover {
        border: 1.5px solid
          ${!props.selected ? Colors.grey_100 : Colors.info_500};
      }
    `}
`;

export const StyledSelectBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content !important;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 20px;
  ${getBorder}
  background: ${({ selected }: Props) =>
    selected ? Colors.info_100 : Colors.light};
`;

export const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: ${({ hasLabel }: {hasLabel: boolean}) => (hasLabel ? "column" : "row")};
  gap: ${({ hasLabel }: {hasLabel: boolean}) => (hasLabel ? "8px" : "0px")};

`;

export const SelectBadgeGroup = styled.div`
  display: flex;
  gap: 12px;
  @media ( min-width: 760px) {
    flex-wrap: wrap;
  }
`;

interface Props {
  selected: boolean;
}
