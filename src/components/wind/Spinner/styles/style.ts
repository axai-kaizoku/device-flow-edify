'use client';
import React from 'react';
import styled from 'styled-components';
import { Colors } from './colors';
interface SpinnerIconProps {
	color?: string;
	style?: React.CSSProperties;
}
export const SpinnerIcon = styled.span<SpinnerIconProps>`
	animation: spin 1s linear infinite;
	position: absolute;
	z-index: 2;
	left: 48%;
	top: 40%;
	transform: translate(-50%, 0);
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	width: 42px;
	height: 42px;
	background: ${(props) =>
		`linear-gradient(180deg, ${
			props.color ? props.color : Colors.info_500
		} 0%, rgba(65, 165, 253, 0) 100%)`};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	&::after {
		content: '';
		width: 34px;
		height: 34px;
		background-color: ${Colors.light};
		border-radius: 50%;
	}
`;

export const Wrapper = styled.div`
	position: relative;
`;

interface ChildWrapperProps {
	loading?: boolean;
}
export const ChildWrapper = styled.div<ChildWrapperProps>`
	opacity: ${(props) => (props.loading ? 0.2 : 1)};
`;
