import React from "react";
import { StyledBtn } from "./style";
import { Icon } from "../../Icons";
import { Typography } from "../../Typography";
import { Colors } from "../styles/colors";
import { IconsType } from "../../Icons/components/icons/interface";

export const Btn = ({
  children,
  onClick,
  index,
  icon,
  totalButtons,
  active,
  size = "sm",
}: BtnProps) => {
  return (
    <StyledBtn
      index={index}
      onClick={onClick}
      totalButtons={totalButtons}
      active={active}
    >
      {icon ? (
        <Icon
          size={size}
          color={active ? Colors.info_700 : Colors.grey_600}
          type={icon}
          style={{ cursor: "pointer" }}
        />
      ) : null}
      {children ? (
        <Typography
          variant={size === "xs" ? "body-text3" : "body-text2"}
          type="medium"
          color={active ? Colors.info_700 : Colors.grey_600}
        >
          {children}
        </Typography>
      ) : null}
    </StyledBtn>
  );
};

export interface BtnProps {
  // The content rendered within the Button.
  children?: React.ReactNode;
  // handler for button click
  onClick: () => void;
  // index of the button
  index: number;
  // prefix icon for the button
  icon?: IconsType;
  // total count of all the buttons inside button group
  totalButtons: number;
  // active flag for currently active button
  active: boolean;
  // size of the button
  size?: "xs" | "sm";
}
