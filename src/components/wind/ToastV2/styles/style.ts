import styled, { css } from "styled-components";
import { ToastColors } from "./ToastColors";
import { Position } from "../utility/types";

const positionType = {
  "top-right": "top: 10px; right:10px;",
  "bottom-right": "bottom:10px; right: 10px;",
  "top-left": "top: 10px; left: 10px;",
  "bottom-left": "bottom:10px; left: 10px;",
  "bottom-center": "bottom: 10px; left: 50%; transform: translateX(-50%);",
  "top-center": "top: 10px; left: 50%; transform: translateX(-50%);",
  "top-mobile": "top: 10px; left: 10px; transform: unset;",
  "bottom-mobile": "bottom: 10px; left: 10px; transform: unset;",
};
const handlePosition = (position: any) => {
  //@ts-ignore
  return positionType[position!];
};

const handlePositionMobile = (position: any) => {
  if (["top-right", "top-left", "top-center"].includes(position)) {
    return positionType["top-mobile"];
  } else {
    return positionType["bottom-mobile"];
  }
};

export const FlexDiv = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const getBackground = css`
  background-color: ${({ color }: StyledToastProps) =>
    //@ts-ignore
    ToastColors[color]?.background};
`;

const getColor = css`
  color: ${({ color }: StyledToastProps) =>
    //@ts-ignore
    ToastColors[color]?.text};
`;

const getBorder = css`
  border: ${({ color }: StyledToastProps) =>
    //@ts-ignore
    `1px solid ${ToastColors[color]?.border}`};
`;

interface CardProps {
  position: any;
}
export const PositionContainer = styled.div`
  z-index: 2;
  position: fixed;
  ${(props: CardProps) =>
    props.position
      ? handlePosition(props.position)
      : `bottom: 10px; right: 10px;`}
  @media(max-width: 768px) {
    ${(props: CardProps) =>
      props.position
        ? handlePositionMobile(props.position)
        : `bottom: 10px; right: 10px;`}
  }
`;

export const StyledToast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  width: 560px;
  box-shadow: 0px 1px 3px rgba(4, 32, 64, 0.12),
    0px 1px 2px rgba(4, 32, 64, 0.08);
  border-radius: 8px;
  padding: 18px 16px;
  ${getBackground}
  ${getBorder}
  ${getColor}
  @media (max-width: 768px) {
    width: 85vw;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

export interface StyledToastProps {
  color?: string;
  position?: Position | string;
}
