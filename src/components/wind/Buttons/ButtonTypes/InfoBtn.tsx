import * as React from "react";
import { Colors } from "../styles/colors";
import { Button } from "../Button";
import { ButtonTypeProps } from "./ButtonTypeProps";

export const InfoButton = (props: ButtonTypeProps) => {
  return (
    <Button
      color={Colors.info_500}
      hoverColor={Colors.info_700}
      focusColor={Colors.info_900}
      
      {...props}
    />
  );
};
