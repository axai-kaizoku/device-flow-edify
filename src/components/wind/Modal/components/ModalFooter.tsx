import React from "react";
import { Colors } from "../styles/colors";
import { GreyButton, InfoButton } from "../../Buttons";
import { ModalFooterWrap } from "../styles/style";

export const ModalFooter = ({
  footerButtons,
  onClose,
  inlineFooterBtn,
  showCancelFooterButton,
}: ModalFooterProps) => {
  const hideCancelButton = () =>
    footerButtons?.length === 1 && !showCancelFooterButton;

  const isPrimaryVariant = (index: number) => {
    return index === 1 || footerButtons.length === 1;
  };

  return footerButtons?.length > 0 ? (
    <ModalFooterWrap inline={hideCancelButton() ? true : inlineFooterBtn}>
      {footerButtons.length === 1 && showCancelFooterButton && (
        <GreyButton
          minWidth="120px"
          variant="secondary"
          block={!inlineFooterBtn}
          onClick={() => onClose()}
        >
          Cancel
        </GreyButton>
      )}
      {footerButtons.map(
        (button: FooterButton, index) =>
          (index === 0 || index === 1) && (
            <InfoButton
              type={button?.type}
              form={button?.formId}
              disabled={button.disabled}
              loading={button.loading}
              spinnerColor={isPrimaryVariant(index) ? Colors.light : ""}
              minWidth="120px"
              block={hideCancelButton() ? false : !inlineFooterBtn}
              variant={isPrimaryVariant(index) ? "primary" : "secondary"}
              key={`fb-${index}`}
              onClick={() => button?.type !== "submit" && button?.onClick?.()}
            >
              {button.text}
            </InfoButton>
          )
      )}
    </ModalFooterWrap>
  ) : null;
};

export interface FooterButton {
  text: string;
  onClick?: () => void;
  // If true, footer button will be in disabled state
  disabled?: boolean;
  // If true, footer button will be in loading state
  loading?: boolean;
  // if submit button
  type?: "submit";
  // formId;
  formId?: string;
}

interface ModalFooterProps {
  // list of footer buttons
  footerButtons: Array<FooterButton>;
  // Specify a function that will be called when a user close button on top right or (on clicking cancel button from footer)
  onClose: () => void;
  inlineFooterBtn?: boolean;
  // If true, a cancel button will be visible (only if total no. of footerButton is 1)
  showCancelFooterButton?: boolean;
}
