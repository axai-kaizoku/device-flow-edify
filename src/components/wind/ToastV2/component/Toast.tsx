import React, { useEffect, useState } from "react";
import { FlexDiv, StyledToast } from "../styles/style";
import { Icon } from "../../Icons";
import { Typography } from "../../Typography";
import { ToastColors } from "../styles/ToastColors";
import { ToastType } from "../utility/types";

export const Toast = ({ data }: Props) => {
  const initialValue = {
    color: "info",
    position: "bottom-center",
    message: "",
  };

  const [localState, setLocalState] = useState<ToastType>(initialValue);

  useEffect(() => {
    let updated = JSON.parse(JSON.stringify(data));
    setLocalState((prev) => ({ ...prev, ...updated }));
  }, [data]);

  return (
    <>
      <StyledToast color={localState?.color} position={localState?.position}>
        <FlexDiv>
          <Icon
            size="md"
            type="OutlinedInfo"
            //@ts-ignore
            color={ToastColors[localState?.color]?.text}
          />
          <Typography
            variant="body-text2"
            //@ts-ignore
            color={ToastColors[localState?.color]?.text}
            type="medium"
          >
            {localState?.message}
          </Typography>
        </FlexDiv>
        <FlexDiv>
          <Typography
            variant="body-text2"
            //@ts-ignore
            color={ToastColors[localState?.color]?.text}
            type="medium"
          >
            Undo
          </Typography>
          <Icon
            size="md"
            type="OutlinedClose"
            //@ts-ignore
            color={ToastColors[localState?.color]?.text}
            onClick={() => {
              data?.closeToast?.(localState?.toastId);
            }}
          />
        </FlexDiv>
      </StyledToast>
    </>
  );
};

export type Position =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastProps extends ToastType {
  closeToast?: (id: any) => void;
}

interface Props {
  data: ToastProps;
}
