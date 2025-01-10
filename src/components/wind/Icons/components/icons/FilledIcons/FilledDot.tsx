import * as React from "react";
import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";

export const FilledDot = ({ size, color, style, onClick }: IconProps) => {
  return (
    <SVG
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      size={size}
      onClick={onClick}
    >
      <circle cx="3" cy="3" r="3" fill={color || "#3995E5"} />
    </SVG>
  );
};
