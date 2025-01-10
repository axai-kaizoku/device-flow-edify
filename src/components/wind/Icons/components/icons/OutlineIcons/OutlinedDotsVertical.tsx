import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedDotsVertical = ({
  size,
  color,
  style,
  onClick,
}: IconProps) => {
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
        d="M8 9.5C8.82843 9.5 9.5 8.82843 9.5 8C9.5 7.17157 8.82843 6.5 8 6.5C7.17157 6.5 6.5 7.17157 6.5 8C6.5 8.82843 7.17157 9.5 8 9.5Z"
        fill={color || "#3995E5"}
      />
      <path
        d="M8 5C8.82843 5 9.5 4.32843 9.5 3.5C9.5 2.67157 8.82843 2 8 2C7.17157 2 6.5 2.67157 6.5 3.5C6.5 4.32843 7.17157 5 8 5Z"
        fill={color || "#3995E5"}
      />
      <path
        d="M8 14C8.82843 14 9.5 13.3284 9.5 12.5C9.5 11.6716 8.82843 11 8 11C7.17157 11 6.5 11.6716 6.5 12.5C6.5 13.3284 7.17157 14 8 14Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
