import React from "react";
import { Icon } from "../../Icons";
import { Wrapper, ChildWrapper, SpinnerIcon } from "../styles/style";
import { ButtonLoader } from "./style";

export const Spinner = ({
  loading,
  children,
  color,
  isButtonLoader,
}: SpinnerProps) => {
  return isButtonLoader && loading ? (
    <ButtonLoader>
      <Icon type="OutlinedLoader" color={color} />
    </ButtonLoader>
  ) : (
    <Wrapper>
      {loading && <SpinnerIcon color={color} />}
      <ChildWrapper loading={loading}>{children}</ChildWrapper>
    </Wrapper>
  );
};

export interface SpinnerProps {
  loading: boolean; // loading state
  children?: React.ReactNode; // element wrapped by spinner tags
  color?: string; // change spinner color
  isButtonLoader?: boolean; // If true, spinner will be inside a button
}
