import * as React from "react";
import { Colors } from "../styles/colors";
import { Button } from "../Button";
import { ButtonTypeProps } from "./ButtonTypeProps";

export const SuccessButton = (props: ButtonTypeProps) => {
  return (
    <Button
      color={Colors.success_500}
      hoverColor={Colors.success_700}
      focusColor={Colors.success_900}
      {...props}
    />
  );
};
