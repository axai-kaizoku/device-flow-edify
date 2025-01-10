import { useRef, useEffect, useState } from "react";
import { ToastType } from "../utility/types";
import { isToastIdValid } from "../utility/utility";
import { eventManager } from "../utility/eventManager";

export const useToast = () => {
  const toastToRender = useRef(new Map()).current;
  const [toastIds, setToastIds] = useState<string[]>([]);

  const isToastActive = (id: any) => toastIds.indexOf(id) !== -1;

  useEffect(() => {
    //initalize Map() with "show" key
    eventManager.on("show", (e: any) => toastBuilder(e));
  }, []);

  const toastBuilder = (e: ToastType) => {
    appendToast(e.toastId!, e);
    //Auto Remove after 4000ms
    let timeout: any = setTimeout(() => {
      removeToast(e?.toastId || "");
      return clearTimeout(timeout);
    }, e.autoHideDuration);
  };

  //Append Toast in Map toastRender
  function appendToast(id: string, config: ToastType) {
    toastToRender.set(id, config);
    setToastIds((state) => [...state, id]);
  }

  function removeToast(toastId: string) {
    setToastIds((state) => {
      return isToastIdValid(toastId)
        ? state.filter((id) => id !== toastId)
        : [];
    });
    toastToRender.delete(toastId);
  }

  return {
    //return array of object of type ToastType
    toastToRender: Array.from(toastToRender.values()),
    //takes toastId and update toastIds
    removeToast,
    //takes toastId and return boolean
    isToastActive,
  };
};
