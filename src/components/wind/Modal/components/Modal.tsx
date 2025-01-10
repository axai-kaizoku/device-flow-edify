import React, { useEffect, useRef } from "react";
import { Colors } from "../styles/colors";
import { FooterButton, ModalFooter } from "./ModalFooter";
import {
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  TitleWrap,
} from "../styles/style";
import { useOnClickOutside } from "./customHooks";
import Portal from "./Portal";
import { Typography } from "../../Typography";
import { Icon } from "../../Icons";
import { IconsType } from "../../Icons/components/icons/interface";

export const Modal = (props: ModalProps) => {
  const {
    open,
    onClose,
    title,
    children,
    footerButtons,
    inlineFooterBtn,
    hideCloseButton,
    modalStyle,
    overlayStyle,
    bodyStyle,
    maskClosable,
    showCancelFooterButton,
    headerIcon,
  } = props;
  const ref: any = useRef<HTMLDivElement>();

  useOnClickOutside(ref, () => maskClosable && onClose());

  const handleCloseModal = () => {
    onClose?.();
  };

  //Prevent background scroll when modal open
  useEffect(() => {
    if (open) {
      document.body.classList.add("modal_open");
    } else {
      document.body.classList.remove("modal_open");
    }
  }, [open]);

  return open ? (
    <Portal>
      <ModalOverlay style={overlayStyle} />
      <ModalContainer ref={ref} {...props} style={modalStyle}>
        <ModalHeader>
          <TitleWrap>
            {headerIcon ? (
              <Icon size="md" type={headerIcon} style={{ marginRight: 10 }} />
            ) : (
              <></>
            )}
            <Typography variant="body-text1" type="semi-bold">
              {title}
            </Typography>
          </TitleWrap>
          {!hideCloseButton && (
            <Icon
              onClick={() => handleCloseModal()}
              style={{ cursor: "pointer" }}
              type="OutlinedClose"
              size="sm"
              color={Colors.grey_500}
            />
          )}
        </ModalHeader>
        <ModalBody
          hasFooter={(footerButtons?.length || [].length) > 0}
          style={bodyStyle}
        >
          {children}
        </ModalBody>
        <ModalFooter
          inlineFooterBtn={inlineFooterBtn}
          footerButtons={footerButtons || []}
          onClose={handleCloseModal}
          showCancelFooterButton={showCancelFooterButton}
        />
      </ModalContainer>
    </Portal>
  ) : (
    <></>
  );
};

export interface ModalProps {
  // Whether the modal dialog is visible or not
  open: boolean;
  // Specifies size of the modal
  size?: "sm" | "md" | "lg";
  // The modal dialog's title
  title: string;
  children?: React.ReactNode;
  // Specify a function that will be called when a user close button on top right or (on clicking cancel button from footer)
  onClose: () => void;
  // Footer content
  footerButtons?: Array<FooterButton>;
  // If true, footer buttons will not take the complete available width, min width will be 120px
  inlineFooterBtn?: boolean;
  // Hide close button icon
  hideCloseButton?: boolean;
  // change modal styles
  modalStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  // If true, the modal will get closed on outside click
  maskClosable?: boolean;
  // If true, a cancel button will be visible in modal footer (also if footerButtons length is 1)
  showCancelFooterButton?: boolean;
  bodyStyle?: React.CSSProperties;
  headerIcon?: IconsType;
}
