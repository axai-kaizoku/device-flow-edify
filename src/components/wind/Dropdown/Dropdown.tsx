import { DropdownFooter, FooterButton } from "./DropdownFooter";
import * as React from "react";
import {
  DropdownHeader,
  DropdownWrapper,
  Position,
  StyledDropdown,
  Dimension,
} from "./styles/style";
import { useOnClickOutside } from "./customHooks";
import { Colors } from "./styles/colors";
import { useRef } from "react";
import Portal from "./Portal";
import { DirectionProps } from "./styles/style";

export const Dropdown = ({
  children,
  width,
  headerText,
  footerButtons,
  wrapper,
  trigger,
  visible,
  setDropdownVisibility,
  containerStyle,
}: DropdownProps) => {
  const [localState, setLocalState] = React.useState<boolean>(false);
  const [openDirection, setOpenDirection] =
    React.useState<DirectionProps["direction"]>("bottom");
  const ref: any = useRef<HTMLDivElement>();
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useOnClickOutside(ref, () => {
    if (visible || setDropdownVisibility) {
      setDropdownVisibility?.(false);
    } else {
      setLocalState(false);
    }
  });

  const handleHover = (open?: boolean) => {
    if (trigger === "hover") {
      if (visible || setDropdownVisibility) {
        setDropdownVisibility?.(open || false);
      } else {
        setLocalState(() => !localState);
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    if (!trigger || trigger === "click") {
      if (visible || setDropdownVisibility) {
        setDropdownVisibility?.(!visible);
        setPosition({
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
        });
      } else {
        setLocalState(() => !localState);
        setPosition({
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
        });
      }
    }
  };

  //Dropdown Direction
  React.useEffect(() => {
    let maxHeight =
      typeof containerStyle?.maxHeight === "number"
        ? containerStyle?.maxHeight
        : //@ts-ignore
          parseInt(containerStyle?.maxHeight, 10);

    if (position?.y && position?.y + maxHeight > window.innerHeight) {
      setOpenDirection("top");
    } else {
      setOpenDirection("bottom");
    }
  }, [position?.y]);

  return (
    <div>
      <DropdownWrapper
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onClick={(e) => handleClick(e)}
      >
        {wrapper}
      </DropdownWrapper>
      {(visible ? visible : localState) ? (
        <Portal>
          <Position ref={ref} top={position?.y || 0} left={position?.x || 0}>
            <Dimension
              height={position?.height || 0}
              width={position?.width || 0}
            >
              <StyledDropdown
                width={width}
                style={containerStyle}
                direction={openDirection}
              >
                {headerText ? (
                  <DropdownHeader variant="body-text2" color={Colors.grey_700}>
                    {headerText}
                  </DropdownHeader>
                ) : null}
                <div>{children}</div>
                {footerButtons ? (
                  <DropdownFooter
                    footerButtons={footerButtons}
                  ></DropdownFooter>
                ) : null}
              </StyledDropdown>
            </Dimension>
          </Position>
        </Portal>
      ) : null}
    </div>
  );
};

export interface DropdownProps {
  // The content of the Dropdown.
  children: React.ReactNode;
  // The width of the Dropdown.
  width?: string;
  // action buttons list in footer
  footerButtons?: Array<FooterButton>;
  // text for Dropdown  Header
  headerText?: string;
  // Element on which dropdown will be triggered
  wrapper: React.ReactElement;
  // Event on which dropdown open/close will be triggered. (Default is click)
  trigger?: "hover" | "click";
  // If true, children of dropdown wrapper will be visibleåß (Control visiblity from parents)
  visible?: boolean;
  // to handle dropdown visibility (Control visiblity from parents)
  setDropdownVisibility?: (visible: boolean) => void;
  // Dropdown container style
  containerStyle?: React.CSSProperties;
}
