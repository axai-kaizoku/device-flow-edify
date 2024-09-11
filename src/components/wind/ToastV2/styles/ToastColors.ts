import { Colors } from "./colors";

export const ToastColors: ToastColorsType = {
  info: {
    background: Colors.info_25,
    text: Colors.info_700,
    border: Colors.info_300,
  },
  success: {
    background: Colors.success_25,
    text: Colors.success_700,
    border: Colors.success_300,
  },
  warning: {
    background: Colors.warning_25,
    text: Colors.warning_700,
    border: Colors.warning_300,
  },
  error: {
    background: Colors.error_25,
    text: Colors.error_700,
    border: Colors.error_300,
  },
  grey: {
    background: Colors.white_1,
    text: Colors.grey_700,
    border: Colors.grey_300,
  },
};

interface ColorData {
  background: string;
  text: string;
  border: string;
}

interface ToastColorsType {
  [key: string]: ColorData;
}
