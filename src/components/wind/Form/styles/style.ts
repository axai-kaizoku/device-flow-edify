import { Layout } from "../Form";
import styled, { css } from "styled-components";

const inline = css`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const vertical = css`
  flex-direction: column;
`;

const horizontal = css`
  flex-direction: column;
`;

const getLayout = css`
  ${({ layout }: Props) => {
    switch (layout) {
      case "inline":
        return inline;
      case "horizontal":
        return horizontal;
      case "vertical":
        return vertical;
      default:
        return vertical;
    }
  }}
`;

export const FormWrap = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  gap: 20px;
  ${getLayout}
  @media (max-width: 500px) {
    width: 100% !important;
  }
`;

export const FooterWrap = styled.div`
  display: flex;
  height: fit-content;
  gap: 12px;
`;

export const Footer = styled.div`
  display: flex;
  gap: 15px;
  width: ${({ width }: Props) => width};
  button {
    align-self: center;
  }
`;

interface Props {
  layout?: Layout;
  width?: number | string | undefined;
}
