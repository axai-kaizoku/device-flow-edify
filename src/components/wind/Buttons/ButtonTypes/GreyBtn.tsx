import * as React from "react";
import { Colors } from "../styles/colors";
import { Button } from "../Button";
import { ButtonTypeProps } from "./ButtonTypeProps";

export const GreyButton = (props: ButtonTypeProps) => {
  return (
    <Button
      isGreyButton
      color={Colors.grey_600}
      hoverColor={Colors.grey_700}
      focusColor={Colors.grey_900}
      {...props}
    />
  );
};
