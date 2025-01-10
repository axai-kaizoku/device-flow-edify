export interface ButtonTypeProps {
	// The content of the button.
	children: React.ReactNode;
	// The size of the button. md is default button size.
	size?: 'sm' | 'md' | 'lg';
	// The color of the button. Default color is Colors.info_500. Value for color property will be taken from Color enums.
	color?: string;
	// The variant to use. Default variant is primary
	variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-wrap' | 'startup';
	// handler on button click
	onClick: (e?: any) => void;
	// If true, the button is disabled.
	disabled?: boolean;
	// Extra styles for component.
	style?: React.CSSProperties;
	// if true, width of the button will be 100%
	block?: boolean;
	// min width of the button
	minWidth?: string;
	// If true, button will be in loading state
	loading?: boolean;
	// color of the spinner
	spinnerColor?: string;
	// The type attribute specifies the type of button.
	// submit button submits form-data
	// reset button resets the form-data to its initial values
	type?: 'submit' | 'button';
	// handle on submit
	onSubmit?: () => void;
	// predefined
	form?: string;
}
