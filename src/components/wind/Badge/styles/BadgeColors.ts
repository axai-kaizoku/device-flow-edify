import { Colors } from "./colors";

export const BadgeColors: BadgeColorsType = {
  info: {
    background: Colors.info_100,
    text: Colors.info_700,
    icon: Colors.info_500,
  },
  success: {
    background: Colors.success_100,
    text: Colors.success_700,
    icon: Colors.success_500,
  },
  warning: {
    background: Colors.warning_100,
    text: Colors.warning_700,
    icon: Colors.warning_500,
  },
  error: {
    background: Colors.error_100,
    text: Colors.error_700,
    icon: Colors.error_500,
  },
  light_blue: {
    background: Colors.lBlue_100,
    text: Colors.lBlue_700,
    icon: Colors.lBlue_500,
  },
  pink: {
    background: Colors.pink_100,
    text: Colors.pink_700,
    icon: Colors.pink_500,
  },
  turquoise: {
    background: Colors.turq_100,
    text: Colors.turq_700,
    icon: Colors.turq_500,
  },
  orange: {
    background: Colors.oran_100,
    text: Colors.oran_700,
    icon: Colors.oran_500,
  },
  violet: {
    background: Colors.violet_100,
    text: Colors.violet_700,
    icon: Colors.violet_500,
  },
  grey: {
    background: Colors.grey_100,
    text: Colors.grey_700,
    icon: Colors.grey_500,
  },
  yellow: {
    background: Colors.yell_100,
    text: Colors.yell_700,
    icon: Colors.yell_500,
  },
  red: {
    background: Colors.red_100,
    text: Colors.red_700,
    icon: Colors.red_500,
  },
  success_dark: {
    background: Colors.success_700,
    text: Colors.light,
    icon: Colors.light,
  },
  success_dark_outline: {
    background: Colors.light,
    text: Colors.success_700,
    icon: Colors.success_500,
    border: Colors.success_500
  },
  grey_dark: {
    background: Colors.grey_400,
    text: Colors.light,
    icon: Colors.light,
  },
  grey_dark_outline: {
    background: Colors.light,
    text: Colors.grey_700,
    icon: Colors.grey_500,
    border: Colors.grey_200
  },
  error_dark: {
    background: Colors.error_500,
    text: Colors.light,
    icon: Colors.light,
  },
  warning_dark: {
    background: Colors.warning_500,
    text: Colors.light,
    icon: Colors.light,
  }
};

interface ColorData {
  background: string;
  text: string;
  icon: string;
  border?: string;
}

interface BadgeColorsType {
  [key: string]: ColorData;
}
