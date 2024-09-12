import styled, { css } from 'styled-components';
import { Colors } from './colors';

interface AvatarCircleProps {
	size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const AvatarCircle = styled.div<AvatarCircleProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	${({ size }) =>
		size === 'xs'
			? css`
					height: 24px;
					width: 24px;
			  `
			: size === 'sm'
			? css`
					height: 32px;
					width: 32px;
			  `
			: size === 'md'
			? css`
					height: 40px;
					width: 40px;
			  `
			: size === 'lg'
			? css`
					height: 48px;
					width: 48px;
			  `
			: css`
					height: 32px;
					width: 32px;
			  `}
	border-radius: 50%;
	border: 1px solid ${Colors.info_500};
	background-color: ${Colors.info_100};
`;

export const AvatarText = styled.div<AvatarCircleProps>`
	font-family: Inter, sans-serif;
	font-weight: 500;
	color: #3995e5;
	${({ size }) =>
		size === 'xs'
			? css`
					font-size: 8px;
			  `
			: size === 'sm'
			? css`
					font-size: 10px;
			  `
			: size === 'md'
			? css`
					font-size: 14px;
			  `
			: size === 'lg'
			? css`
					font-size: 16.8px;
			  `
			: css`
					font-size: 10px;
			  `}
`;

export const AvatarImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 50%;
`;
