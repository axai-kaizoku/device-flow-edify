import styled, { css } from "styled-components";

const Xs = css`
  ${({ size }: Props) =>
    size === "xs" &&
    css`
      height: 12px;
      width: 12px;
    `}
`;

const Sm = css`
  ${({ size }: Props) =>
    size === "sm" &&
    css`
      height: 16px;
      width: 16px;
    `}
`;
const Md = css`
  ${({ size }: Props) =>
    size === "md" &&
    css`
      height: 20px;
      width: 20px;
    `}
`;
const Lg = css`
  ${({ size }: Props) =>
    size === "lg" &&
    css`
      height: 24px;
      width: 24px;
    `}
`;

const isClickable = css`
  ${({ onClick }: Props) =>
    onClick
      ? css`
          cursor: pointer;
        `
      : css`
          cursor: default;
        `}
`;

export const SVG = styled.svg`
  ${Xs}
  ${Sm}
  ${Md}
  ${Lg}
  ${isClickable}
`;

interface Props {
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
}
