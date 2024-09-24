'use client';
import React from 'react';
import { ButtonTypeProps } from './ButtonTypes/ButtonTypeProps';
import { StyledButton } from './styles/style';
import { Spinner } from '../../wind/Spinner';

export const Button = (props: ButtonProps) => {
	const {
		size = 'md',
		variant = 'primary',
		children,
		style,
		minWidth,
		loading,
		spinnerColor,
		disabled,
		type = 'button',
		className,
	} = props;
	return (
		<StyledButton
			{...props}
			variant={variant}
			size={size}
			style={style}
			minWidth={minWidth}
			type={type}
			className={className}>
			{!disabled && (
				<Spinner
					isButtonLoader
					loading={loading || false}
					color={spinnerColor}
				/>
			)}
			{children}
		</StyledButton>
	);
};

export interface ButtonProps extends ButtonTypeProps {
	// color of the button on mouse hover. Value for hoverColor property will be taken from Color enums
	hoverColor?: string;
	// color of the button in focus. Value for focusColor property will be taken from Color enums
	focusColor?: string;
	// If true, border will have different color (as per design system in Grey button)
	isGreyButton?: boolean;
	// Extra classnames for customization
	className?: string;
}
