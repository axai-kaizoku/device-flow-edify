import styled, { css } from 'styled-components';
import { Colors } from './colors';

interface CardProps {
	hover?: boolean;
}

export const StyledCard = styled.div<CardProps>`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	border-radius: 8px;
	background: ${Colors.white_1};
	border: 1px solid ${Colors.grey_50};
	box-shadow: 0px 1px 3px rgba(4, 32, 64, 0.12),
		0px 1px 2px rgba(4, 32, 64, 0.08);
	width: 100%;
	padding: 10px;
	box-sizing: border-box;

	${({ hover }) =>
		hover &&
		css`
			&:hover {
				border: 1px solid ${Colors.info_500};
				background: ${Colors.info_50};
				cursor: pointer;
			}
		`}
`;

export const CardHeader = styled.div`
	display: flex;
	width: 100%;
	padding: 20px 24px;
	border-bottom: 1px solid ${Colors.grey_100};

	@media (max-width: 600px) {
		padding: 20px;
	}
`;

export const CardFooter = styled.div`
	display: flex;
	width: 100%;
	padding: 20px 24px;
	border-top: 1px solid ${Colors.grey_100};
	margin-top: auto;
	gap: 10px;

	@media (max-width: 600px) {
		padding: 20px;
	}
`;

export const ActionButtonContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	margin-left: auto;

	@media (max-width: 600px) {
		margin-top: 16px;
		margin-left: unset;
	}
`;

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const LearnMoreContainer = styled.div`
	margin-right: auto;
`;

export const MenuContainer = styled.div`
	margin-left: 16px;
	margin-bottom: auto;

	div {
		// Open dropdown menu inside card
		right: 0;
	}
`;

export const HeaderLeft = styled.div`
	display: flex;
	width: 100%;
	align-items: center;

	@media (max-width: 600px) {
		flex-direction: column;
		align-items: start;
	}
`;

export const HeaderIconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 56px;
	height: 56px;
	background: ${Colors.info_100};
	border-radius: 96px;
`;

export const TitleIcon = styled.div`
	margin-right: 16px;
`;

export const TitleText = styled.div`
	margin-right: 16px;
`;
