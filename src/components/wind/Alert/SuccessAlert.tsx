import * as React from "react";
import { Colors } from "./style/colors";
import {Icon} from "../Icons";
import {
  AlertCard,
  CloseIconWrapper,
  Container,
  Description,
  Title,
  Wrapper,
} from "./style/style";

export const SuccessAlert = ({ icon, title, description }: AlertProps) => {
  const [open, setOpen] = React.useState(true);

  return (
    <AlertCard
      borderColor={Colors.success_300}
      backgroundColor={Colors.success_25}
      open={open}
    >
      <CloseIconWrapper onClick={() => setOpen(false)}>
        <Icon
          type="OutlinedClose"
          color={Colors.success_700}
          style={{ cursor: "pointer" }}
        />
      </CloseIconWrapper>
      <Wrapper>
        {icon || (
          <Icon
            type="OutlinedInfo"
            size="md"
            style={{ paddingTop: 1 }}
            color={Colors.success_700}
          />
        )}
        <Container>
          <Title color={Colors.success_700}>{title} </Title>
          {description && (
            <Description color={Colors.success_700}>{description}</Description>
          )}
        </Container>
      </Wrapper>
    </AlertCard>
  );
};

export interface AlertProps {
  icon?: React.ReactElement;
  title: string;
  description?: string;
  learnMore?: () => void;
  ViewChanges?: () => void;
}