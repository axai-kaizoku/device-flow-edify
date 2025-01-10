'use client';
import styled, { css } from 'styled-components';

const sizeStyles = {
	xs: css`
		height: 12px;
		width: 12px;
	`,
	sm: css`
		height: 16px;
		width: 16px;
	`,
	md: css`
		height: 20px;
		width: 20px;
	`,
	lg: css`
		height: 24px;
		width: 24px;
	`,
};

const size = ({ size }: Props) => sizeStyles[size || 'md']; // Default to 'md' if size is not provided

const isClickable = css<Props>`
	${({ onClick }: Props) =>
		onClick
			? css`
					cursor: pointer;
			  `
			: css`
					cursor: default;
			  `}
`;

export const SVG = styled.svg<Props>`
	${size}
	${isClickable}
`;

interface Props {
	size?: 'xs' | 'sm' | 'md' | 'lg';
	onClick?: () => void;
}
