export const isStr = (str: any) => {
  return typeof str === "string";
};
export const isNum = (num: any) => {
  return typeof num === "number";
};
export function isToastIdValid(toastId: any) {
  return toastId != null;
}
