import * as React from "react";
import { DropdownFooterWrap } from "./styles/style";
import { IconsType } from "../Icons/components/icons/interface";

export const DropdownFooter = ({ footerButtons }: FooterProps) => {
  return (
    <DropdownFooterWrap>
      {footerButtons.map((footerBtn: FooterButton, index: number) => (
        // <Tag
        //   key={`dropdownFooterBtn-${index}`}
        //   borderStyle="dashed"
        //   icon={footerBtn.icon}
        //   onClick={footerBtn.onClick}
        // >
        //   {footerBtn.text}
        // </Tag>
        <></>
      ))}
    </DropdownFooterWrap>
  );
};

export interface FooterButton {
  // Text of the footer button
  text: string;
  // handler on click
  onClick: () => void;
  // optional prefix icon
  icon?: IconsType;
}

interface FooterProps {
  footerButtons: Array<FooterButton>;
}
