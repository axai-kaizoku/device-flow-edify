import * as React from "react";
import { Colors } from "../styles/colors";
import { Button } from "../Button";
import { ButtonTypeProps } from "./ButtonTypeProps";

export const WarningButton = (props: ButtonTypeProps) => {
  return (
    <Button
      color={Colors.warning_500}
      hoverColor={Colors.warning_700}
      focusColor={Colors.warning_900}
      {...props}
    />
  );
};
