import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedSearch = ({ size, color, style, onClick }: IconProps) => {
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
        d="M6.61567 2.75C4.48069 2.75 2.74994 4.48075 2.74994 6.61573C2.74994 8.75071 4.48069 10.4815 6.61567 10.4815C8.75065 10.4815 10.4814 8.75071 10.4814 6.61573C10.4814 4.48075 8.75065 2.75 6.61567 2.75ZM1.24994 6.61573C1.24994 3.65232 3.65226 1.25 6.61567 1.25C9.57908 1.25 11.9814 3.65232 11.9814 6.61573C11.9814 9.57914 9.57908 11.9815 6.61567 11.9815C3.65226 11.9815 1.24994 9.57914 1.24994 6.61573Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.77689 9.7771C10.0698 9.48421 10.5447 9.48421 10.8376 9.7771L14.5301 13.4697C14.823 13.7626 14.823 14.2375 14.5301 14.5303C14.2372 14.8232 13.7624 14.8232 13.4695 14.5303L9.77689 10.8378C9.484 10.5449 9.484 10.07 9.77689 9.7771Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
