import { eventManager } from "./eventManager";
import { ToastType } from "./types";
import { isNum, isStr } from "./utility";

//Generate unique id
function generateUniqlueId() {
  return Math.random().toString(36).substring(2, 9);
}

//Generate unique toastId
function getToastId(config: ToastType) {
  if (config && (isStr(config?.toastId) || isNum(config?.toastId))) {
    return config.toastId;
  }

  return generateUniqlueId();
}

//Append generated toastId to incoming config
function mergeOptions(config: ToastType) {
  return {
    ...config,
    position: config?.position || "bottom-center",
    autoHideDuration: config?.autoHideDuration || 4000,
    toastId: getToastId(config),
  };
}

//Dispatch and action
function dispatchToast(config: ToastType) {
  eventManager.emit("show", config);
  return config?.toastId;
}

//Main method to dispatch toast
export function toast(config: ToastType) {
  return dispatchToast(mergeOptions(config));
}
