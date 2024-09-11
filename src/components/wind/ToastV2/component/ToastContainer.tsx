import { useToast } from "../hook/useToast";
import { PositionContainer } from "../styles/style";
import { ToastType } from "../utility/types";
import { Toast } from "./Toast";
import Portal from "./Portal";

export const ToastContainer = () => {
  const { toastToRender, isToastActive, removeToast } = useToast();

  const renderToast = (toasts: Array<ToastType>, position: string) => {
    return (
      toasts.length > 0 &&
      toasts.map((config: ToastType) => {
        return (
          config?.position === position &&
          isToastActive(config?.toastId) && (
            <Toast
              key={config?.toastId}
              data={{
                color: config?.color,
                autoHideDuration: config?.autoHideDuration,
                position: config?.position,
                message: config?.message,
                toastId: config?.toastId,
                closeToast: removeToast,
              }}
            />
          )
        );
      })
    );
  };

  return (
    <>
      {toastToRender?.length > 0 && (
        <Portal>
          <PositionContainer position={"top-left"}>
            {renderToast(toastToRender, "top-left")}
          </PositionContainer>
          <PositionContainer position={"top-center"}>
            {renderToast(toastToRender, "top-center")}
          </PositionContainer>
          <PositionContainer position={"top-right"}>
            {renderToast(toastToRender, "top-right")}
          </PositionContainer>
          <PositionContainer position={"bottom-right"}>
            {renderToast(toastToRender, "bottom-right")}
          </PositionContainer>
          <PositionContainer position={"bottom-left"}>
            {renderToast(toastToRender, "bottom-left")}
          </PositionContainer>
          <PositionContainer position={"bottom-center"}>
            {renderToast(toastToRender, "bottom-center")}
          </PositionContainer>
        </Portal>
      )}
    </>
  );
};
