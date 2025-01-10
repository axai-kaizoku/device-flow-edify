export interface ToastType {
  color?: Color | string;
  autoHideDuration?: number;
  position?: Position | string;
  message: string;
  toastId?: string;
}

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Color = "info" | "success" | "warning" | "error" | "grey";
