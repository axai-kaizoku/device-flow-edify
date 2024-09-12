import styled, { css } from 'styled-components';
import { Colors } from './colors';
import { BadgeColors } from './BadgeColors';

const medium = css`
	font-size: 12px;
	line-height: 20px;
	height: 24px;
`;

const large = css`
	font-size: 14px;
	line-height: 22px;
	height: 26px;
`;

const getFont = css<StyleProps>`
	font-family: 'Inter-Medium';
	${({ size }) => {
		switch (size) {
			case 'lg':
				return large;
			case 'md':
			default:
				return medium;
		}
	}}
`;

const getBackground = css<StyleProps>`
	background-color: ${({ color }) =>
		color && BadgeColors[color]?.background
			? BadgeColors[color].background
			: Colors.info_100};
`;

const getColor = css<StyleProps>`
	color: ${({ color }) =>
		color && BadgeColors[color]?.text
			? BadgeColors[color].text
			: Colors.info_700};
`;

const getBorder = css<StyleProps>`
	border-radius: ${({ border }) => (border === 'squared' ? '4px' : '20px')};
`;

const getBorderColor = css<StyleProps>`
	border: ${({ color }) =>
		color && BadgeColors[color]?.border
			? `1px solid ${BadgeColors[color].border}`
			: 'none'};
`;

export const StyledBadge = styled.div<StyleProps>`
	display: flex;
	align-items: center;
	width: max-content;
	padding: 2px 8px;
	gap: ${({ hasRightIcon }) => (hasRightIcon ? '2px' : '6px')};
	${getBorder};
	${getFont};
	${getColor};
	${getBackground};
	${getBorderColor};
`;

interface StyleProps {
	hasRightIcon?: boolean;
	color?:
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| 'light_blue'
		| 'pink'
		| 'turquoise'
		| 'orange'
		| 'violet'
		| 'grey'
		| 'yellow'
		| 'red'
		| 'success_dark'
		| 'success_dark_outline'
		| 'grey_dark'
		| 'grey_dark_outline'
		| 'error_dark'
		| 'warning_dark';
	size?: 'md' | 'lg';
	border?: 'rounded' | 'squared';
}
