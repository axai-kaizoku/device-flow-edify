import { useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: any) => {
  const el = document.createElement("div");
  //@ts-ignore
  useEffect(() => {
    document.body.appendChild(el);
    return () => document.body.removeChild(el);
  }, [el]);

  return createPortal(children, el);
};

export default Portal;
