import { SVG } from "../../../styles/style";
import { IconProps } from "../interface";
export const OutlinedSchedule = ({
  size,
  style,
  color,
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
      color={color}
      onClick={onClick}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.25 3.25V12.75H12.75V3.25H3.25ZM1.75 3C1.75 2.30964 2.30964 1.75 3 1.75H13C13.6904 1.75 14.25 2.30964 14.25 3V13C14.25 13.6904 13.6904 14.25 13 14.25H3C2.30964 14.25 1.75 13.6904 1.75 13V3Z"
        fill={color || "#3995E5"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 0.75C11.4142 0.75 11.75 1.08579 11.75 1.5V3.5C11.75 3.91421 11.4142 4.25 11 4.25C10.5858 4.25 10.25 3.91421 10.25 3.5V1.5C10.25 1.08579 10.5858 0.75 11 0.75Z"
        fill={color || "#3995E5"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 0.75C5.41421 0.75 5.75 1.08579 5.75 1.5V3.5C5.75 3.91421 5.41421 4.25 5 4.25C4.58579 4.25 4.25 3.91421 4.25 3.5V1.5C4.25 1.08579 4.58579 0.75 5 0.75Z"
        fill={color || "#3995E5"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.75 5.5C1.75 5.08579 2.08579 4.75 2.5 4.75H13.5C13.9142 4.75 14.25 5.08579 14.25 5.5C14.25 5.91421 13.9142 6.25 13.5 6.25H2.5C2.08579 6.25 1.75 5.91421 1.75 5.5Z"
        fill={color || "#3995E5"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.7959 7.48568C11.0799 7.78716 11.0658 8.26183 10.7643 8.54588L7.84557 11.2959C7.55598 11.5687 7.10374 11.5679 6.81508 11.2941L5.23383 9.79413C4.93332 9.50906 4.9208 9.03435 5.20587 8.73383C5.49095 8.43332 5.96565 8.4208 6.26617 8.70587L7.333 9.71789L9.73568 7.45412C10.0372 7.17008 10.5118 7.18421 10.7959 7.48568Z"
        fill={color || "#3995E5"}
      />
    </SVG>
  );
};
