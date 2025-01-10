import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
import * as React from "react";
export const OutlinedSwitch = ({ size, color, style, onClick }: IconProps) => {
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
        d="M5 4.75C3.20507 4.75 1.75 6.20507 1.75 8C1.75 9.79493 3.20507 11.25 5 11.25H11C12.7949 11.25 14.25 9.79493 14.25 8C14.25 6.20507 12.7949 4.75 11 4.75H5ZM0.25 8C0.25 5.37665 2.37665 3.25 5 3.25H11C13.6234 3.25 15.75 5.37665 15.75 8C15.75 10.6234 13.6234 12.75 11 12.75H5C2.37665 12.75 0.25 10.6234 0.25 8Z"
        fill={color || "#3995E5"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 6.75C4.30964 6.75 3.75 7.30964 3.75 8C3.75 8.69036 4.30964 9.25 5 9.25C5.69036 9.25 6.25 8.69036 6.25 8C6.25 7.30964 5.69036 6.75 5 6.75ZM2.25 8C2.25 6.48122 3.48122 5.25 5 5.25C6.51878 5.25 7.75 6.48122 7.75 8C7.75 9.51878 6.51878 10.75 5 10.75C3.48122 10.75 2.25 9.51878 2.25 8Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
