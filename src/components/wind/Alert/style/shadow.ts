import { css } from "styled-components";

const ShadowSm = css`
  box-shadow: 0px 1px 3px rgba(4, 32, 64, 0.12),
    0px 1px 2px rgba(4, 32, 64, 0.08);
`;

const ShadowMd = css`
  box-shadow: 0px 4px 8px -2px rgba(4, 32, 64, 0.12),
    0px 2px 4px -2px rgba(4, 32, 64, 0.08);
`;

const ShadowLg = css`
  box-shadow: 0px -8px 12px rgba(4, 32, 64, 0.04),
    0px 12px 24px rgba(4, 32, 64, 0.08), 0px 4px 12px rgba(4, 32, 64, 0.04);
`;

const ShadowXl = css`
  box-shadow: 0px 20px 24px -4px rgba(4, 32, 64, 0.08),
    0px 8px 8px -4px rgba(4, 32, 64, 0.04);
`;

const Shadow2xl = css`
  box-shadow: 0px 24px 48px -12px rgba(4, 32, 64, 0.2);
`;

const Shadow3xl = css`
  box-shadow: 0px 32px 64px -12px rgba(4, 32, 64, 0.16);
`;

export const getShadow = (size: ShadowSize) => {
  switch (size) {
    case "sm":
      return ShadowSm;
    case "md":
      return ShadowMd;
    case "lg":
      return ShadowLg;
    case "xl":
      return ShadowXl;
    case "2xl":
      return Shadow2xl;
    case "3xl":
      return Shadow3xl;
    default:
      return "none";
  }
};

export type ShadowSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";