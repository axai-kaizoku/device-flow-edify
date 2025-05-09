import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedFile = ({ size, color, style, onClick }: IconProps) => {
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
        d="M3.75 2.75V13.25H12.25V5.81066L9.18934 2.75H3.75ZM2.61612 1.61612C2.85054 1.3817 3.16848 1.25 3.5 1.25H9.5C9.69891 1.25 9.88968 1.32902 10.0303 1.46967L13.5303 4.96967C13.671 5.11032 13.75 5.30109 13.75 5.5V13.5C13.75 13.8315 13.6183 14.1495 13.3839 14.3839C13.1495 14.6183 12.8315 14.75 12.5 14.75H3.5C3.16848 14.75 2.85054 14.6183 2.61612 14.3839C2.3817 14.1495 2.25 13.8315 2.25 13.5V2.5C2.25 2.16848 2.3817 1.85054 2.61612 1.61612Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 1.25C9.91421 1.25 10.25 1.58579 10.25 2V4.75H13C13.4142 4.75 13.75 5.08579 13.75 5.5C13.75 5.91421 13.4142 6.25 13 6.25H9.5C9.08579 6.25 8.75 5.91421 8.75 5.5V2C8.75 1.58579 9.08579 1.25 9.5 1.25Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
