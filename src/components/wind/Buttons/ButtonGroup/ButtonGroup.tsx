import React, { useState } from "react";
import { IconsType } from "../../Icons/components/icons/interface";
import { Btn } from "./Btn";
import { StyledButtonGroup } from "./style";

export const ButtonGroup = ({ buttons, size }: ButtonGroupProps) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const handleClick = (index: number) => {
    setActiveBtn(index);
    buttons[index].onClick();
  };
  return (
    <StyledButtonGroup>
      {buttons?.length > 0 &&
        buttons?.map((button, index) => (
          <Btn
            size={size}
            active={index === activeBtn}
            icon={button.icon}
            totalButtons={buttons.length}
            index={index}
            onClick={() => handleClick(index)}
          >
            {button.name}
          </Btn>
        ))}
    </StyledButtonGroup>
  );
};

export interface ButtonGroupData {
  // name of the button
  name?: string;
  // prefix icon for the button
  icon?: IconsType;
  // handler on button click
  onClick: () => void;
}

export interface ButtonGroupProps {
  // List of Buttons Data
  buttons: Array<ButtonGroupData>;
  // size for button group, default size is sm
  size?: "xs" | "sm";
}
