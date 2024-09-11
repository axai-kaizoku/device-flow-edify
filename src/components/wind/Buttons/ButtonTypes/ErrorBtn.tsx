import * as React from "react";
import { Button } from "../Button";
import { Colors } from "../styles/colors";
import { ButtonTypeProps } from "./ButtonTypeProps";

export const ErrorButton = (props: ButtonTypeProps) => {
  return (
    <Button
      color={Colors.error_500}
      hoverColor={Colors.error_700}
      focusColor={Colors.error_900}
      {...props}
    />
  );
};
