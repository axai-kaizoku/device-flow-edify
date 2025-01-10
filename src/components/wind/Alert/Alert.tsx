import * as React from "react";
import {
  AlertCard,
  CloseIconWrapper,
  Container,
  Description,
  Footer,
  Title,
  Wrapper,
} from "./style/style";
import {Icon} from "../Icons/";
import { Colors } from "./style/colors";

export const Alert = ({ title, description, style }: AlertProps) => {
  const [open, setOpen] = React.useState(true);

  return (
    <AlertCard open={open} style={style}>
      <CloseIconWrapper
        data-testid="alert-icon-wrapper"
        onClick={() => setOpen(false)}
      >
        <Icon type='OutlinedClose' style={{ cursor: "pointer" }} />
      </CloseIconWrapper>
      <Wrapper>
        <Icon type="OutlinedInfo" color={Colors.info_700} size="md" style={{ paddingTop: 1 }} />
        <Container>
          <Title>{title} </Title>
          <Description>{description}</Description>
          <Footer></Footer>
        </Container>
      </Wrapper>
    </AlertCard>
  );
};

export interface AlertProps {
  title: string;
  description?: string;
  style?: React.CSSProperties;
}