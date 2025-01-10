import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedMail = ({ size, color, style, onClick }: IconProps) => {
  return (
    <SVG
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      style={style}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 3.5C1.25 3.08579 1.58579 2.75 2 2.75H14C14.4142 2.75 14.75 3.08579 14.75 3.5V12C14.75 12.3315 14.6183 12.6495 14.3839 12.8839C14.1495 13.1183 13.8315 13.25 13.5 13.25H2.5C2.16849 13.25 1.85054 13.1183 1.61612 12.8839C1.3817 12.6495 1.25 12.3315 1.25 12V3.5ZM2.75 4.25V11.75H13.25V4.25H2.75Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.44714 2.99321C1.72703 2.68787 2.20146 2.66724 2.5068 2.94714L8 7.98258L13.4932 2.94714C13.7986 2.66724 14.273 2.68787 14.5529 2.99321C14.8328 3.29855 14.8121 3.77298 14.5068 4.05287L8.5068 9.55287C8.22006 9.81572 7.77995 9.81572 7.49321 9.55287L1.49321 4.05287C1.18787 3.77298 1.16724 3.29855 1.44714 2.99321Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
