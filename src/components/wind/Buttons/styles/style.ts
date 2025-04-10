'use client';
import { ButtonProps } from '../Button';
import styled, { css } from 'styled-components';
import { Colors } from './colors';

// Default Button - Info (md)

// Text color of the button
const getColor = css<ButtonProps>`
	color: ${({ color, variant }) =>
		variant === 'primary' ? '#ffffff' : color || Colors.info_500};
	&:hover {
		color: ${({ hoverColor, variant }) =>
			variant === 'primary' ? '#ffffff' : hoverColor || Colors.info_700};
	}
	&:focus {
		color: ${({ focusColor, variant }) =>
			variant === 'primary' ? '#ffffff' : focusColor || Colors.info_900};
	}
`;

// Background color of the button
const getBackground = css<ButtonProps>`
	background-color: ${({ color, variant }) =>
		variant === 'primary' ? color || Colors.info_500 : 'transparent'};
	&:hover {
		background-color: ${({ hoverColor, variant }) =>
			variant === 'primary' ? hoverColor || Colors.info_700 : 'transparent'};
	}
	&:focus {
		background-color: ${({ focusColor, variant }) =>
			variant === 'primary' ? focusColor || Colors.info_900 : 'transparent'};
	}
`;

const handleGreyBorder = (defaultState?: boolean) => {
	return `1px solid ${defaultState ? Colors.grey_100 : Colors.grey_200}`;
};

// Border of the button
const getBorder = css<ButtonProps>`
	border: ${({ color, variant, isGreyButton }) =>
		variant === 'primary' || variant === 'secondary'
			? isGreyButton
				? handleGreyBorder(true)
				: `1px solid ${color || Colors.info_500}`
			: 'none'};
	&:hover {
		border: ${({ hoverColor, variant, isGreyButton }) =>
			variant === 'primary' || variant === 'secondary'
				? isGreyButton
					? handleGreyBorder()
					: `1px solid ${hoverColor || Colors.info_700}`
				: 'none'};
	}
	&:focus {
		border: ${({ focusColor, variant, isGreyButton }) =>
			variant === 'primary' || variant === 'secondary'
				? isGreyButton
					? handleGreyBorder()
					: `1px solid ${focusColor || Colors.info_900}`
				: 'none'};
	}
`;

// Disabled button
const disabledButton = css<ButtonProps>`
	${({ disabled }) =>
		disabled && 'opacity: 0.2; cursor: not-allowed !important'};
`;

// Loading Button
const loadingButton = css<ButtonProps>`
	${({ loading }) => loading && 'opacity: 0.6; cursor: not-allowed !important'};
`;

// small, medium and large button - (font size, line height and padding)
const small = css`
	font-size: 12px;
	line-height: 20px;
	padding: 8px 16px;
`;

const medium = css`
	font-size: 14px;
	line-height: 22px;
	padding: 8px 20px;
`;

const large = css`
	font-size: 16px;
	line-height: 24px;
	padding: 10px 28px;
`;

// Font family and font styles for (sm, md and lg) size
const getFont = css<ButtonProps>`
	font-family: ${({ variant }) =>
		variant === 'primary' || variant === 'secondary'
			? 'Inter-SemiBold'
			: 'Inter-Medium'};

	${({ size }) => {
		switch (size) {
			case 'sm':
				return small;
			case 'md':
				return medium;
			case 'lg':
				return large;
			default:
				return medium;
		}
	}}
`;

export const StyledButton = styled.button<ButtonProps>`
	width: ${({ block }) => (block ? '100%' : 'fit-content')};
	min-width: ${({ minWidth }) => minWidth || 'fit-content'};
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.375rem;
	padding: ${({ variant }) =>
		variant === 'tertiary-wrap' ? '0px !important' : 'initial'};
	${getFont}
	${getColor}
  ${getBackground}
  ${getBorder}
  ${loadingButton}
  ${disabledButton}
  &:hover {
		cursor: pointer;
		transition: all 0.2s ease-in-out 0.2s
	}
`;
