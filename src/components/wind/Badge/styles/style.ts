import { Colors } from "./colors";
import styled, { css } from "styled-components";
import { BadgeProps } from "../Badge";
import { BadgeColors } from "./BadgeColors";

const medium = css`
  font-size: 12px;
  line-height: 20px;
  height: 24px;
`;

const large = css`
  font-size: 14px;
  line-height: 22px;
  height: 26px;
`;

const getFont = css`
  font-family: "Inter-Medium";
  ${({ size }: StyleProps) => {
    switch (size) {
      case "md":
        return medium;
      case "lg":
        return large;
      default:
        return medium;
    }
  }}
`;

const getBackground = css`
  background-color: ${({ color }: StyleProps) =>
    color ? BadgeColors?.[color]?.background : Colors.info_100};
`;

const getColor = css`
  color: ${({ color }: StyleProps) =>
    color ? BadgeColors?.[color]?.text : Colors.info_700};
`;

const getBorder = css`
  border-radius: ${({ border }: StyleProps) =>
    border === "squared" ? "4px" : "20px"};
`;

const getBorderColor = css`
  border: ${({ color }: StyleProps) =>
    color && BadgeColors?.[color]?.hasOwnProperty("border")
      ? `1px solid ${BadgeColors?.[color]?.border}`
      : ""};
`;

export const StyledBadge = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 2px 8px;
  gap: ${({ hasRightIcon }: StyleProps) => (hasRightIcon ? "2px" : "6px")};
  ${getBorder};
  ${getFont};
  ${getColor};
  ${getBackground};
  ${getBorderColor};
`;

interface StyleProps {
  hasRightIcon?: boolean;
  color?: any;
  size?: 'md' | 'lg';
  border?: any;
}
