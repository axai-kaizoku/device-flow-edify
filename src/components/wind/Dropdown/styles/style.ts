import styled, { css } from "styled-components";
import { Colors } from "./colors";
import { Typography } from "../../Typography";
import { getShadow } from "./shadow";
import { zindex_dropdown } from "../../Utility";

let dropDownPosition = {
  top: css`
    bottom: calc(100% + 10px) !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
  `,
  bottom: css`
    top: calc(100% + 10px) !important;
    left: 50% !important;
    transform: translateX(-50%);
  `,
};

export const Dimension = styled.div`
  display: inline-block;
  position: relative;
  ${(props: DimensionProps) => css`
    height: ${props.height}px;
    width: ${props.width}px;
  `}
`;

export const Position = styled.div`
  ${(props: PositionProps) => css`
    top: ${props.top}px;
    left: ${props.left}px;
  `}
  position: fixed;
  z-index: ${zindex_dropdown};
`;

export const StyledDropdown = styled.div`
  position: absolute;
  background: ${Colors.light};
  border: 1px solid ${Colors.grey_50};
  ${getShadow("lg")}
  border-radius: 4px;
  width: ${({ width }: DirectionProps) => width || "380px"};
  ${({ direction }: DirectionProps) => dropDownPosition[direction]}
`;

export const DropdownWrapper = styled.div`
  cursor: pointer;
  /* width: fit-content; */
`;

export const DropdownHeader = styled(Typography)`
  padding: 12px;
`;

export const DropdownFooterWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 12px;
`;

interface PositionProps {
  top: number;
  left: number;
}
export interface DirectionProps {
  direction: "top" | "bottom";
  width?: string;
}
interface DimensionProps {
  height: number;
  width: number;
}
