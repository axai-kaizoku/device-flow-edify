import * as React from 'react';
import { Colors } from './style/colors';
import { Icon } from '../Icons';
import {
	AlertCard,
	CloseIconWrapper,
	Container,
	Description,
	Footer,
	FooterLink,
	Title,
	ViewChangesButton,
	Wrapper,
} from './style/style';

export const ErrorAlert = ({
	icon,
	title,
	description,
	learnMore,
	ViewChanges,
}: AlertProps) => {
	const [open, setOpen] = React.useState(true);

	return (
		<AlertCard
			borderColor={Colors.error_300}
			backgroundColor={Colors.error_25}
			open={open}>
			<CloseIconWrapper onClick={() => setOpen(false)}>
				<Icon
					type="OutlinedClose"
					color={Colors.error_700}
					style={{ cursor: 'pointer' }}
				/>
			</CloseIconWrapper>
			<Wrapper>
				{icon || (
					<Icon
						type="OutlinedInfo"
						size="md"
						style={{ paddingTop: 1 }}
						color={Colors.error_700}
					/>
				)}
				<Container>
					<Title color={Colors.error_700}>{title} </Title>
					<Description color={Colors.error_700}>{description}</Description>
					{/* <Footer>
            <FooterLink color={Colors.error_500} onClick={learnMore}>
              Learn More
            </FooterLink>
            <ViewChangesButton color={Colors.error_700} onClick={ViewChanges}>
              View Changes{" "}
              <Icon type="OutlinedArrowRight" color={Colors.error_500} />
            </ViewChangesButton>
          </Footer> */}
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
