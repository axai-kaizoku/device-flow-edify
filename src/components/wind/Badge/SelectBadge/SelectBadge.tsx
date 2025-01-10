import React from "react";
import { StyledSelectBadge } from "./style";
import { Colors } from "../styles/colors";
import { Icon } from "../../Icons";
import { Typography } from "../../Typography";
import { IconsType } from "../../Icons/components/icons/interface";

export const SelectBadge = ({
  children,
  size = "md",
  selected,
  onClick,
  icon,
  image,
  iconRight,
}: SelectBadgeProps) => {
  return (
    <StyledSelectBadge onClick={onClick} selected={selected || false}>
      {icon && (
        <Icon
          size="xs"
          type={icon}
          style={{ marginRight: 10 }}
          color={selected ? Colors.info_500 : Colors.grey_500}
        />
      )}
      {image && (
        <img src={image} style={{ width: 16, height: 16, marginRight: 5 }} />
      )}
      <Typography
        type="medium"
        color={selected ? Colors.info_700 : Colors.grey_700}
        variant={size === "lg" ? "body-text2" : "body-text3"}
      >
        {children}
      </Typography>
      {iconRight ? (
        <Icon
          size="sm"
          type={iconRight}
          style={{ marginLeft: 10 }}
          color={Colors.grey_600}
        />
      ) : (
        <></>
      )}
    </StyledSelectBadge>
  );
};

export interface SelectBadgeProps {
  children?: React.ReactNode;
  size?: "md" | "lg";
  selected?: boolean;
  onClick: () => void;
  icon?: IconsType;
  iconRight?: IconsType;
  image?: string;
}
