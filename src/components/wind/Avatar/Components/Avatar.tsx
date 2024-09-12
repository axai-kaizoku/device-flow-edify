import * as React from 'react';
import { AvatarCircle, AvatarText, AvatarImage } from '../styles/style';
import { PlaceHolder } from '../icons/PlaceHolder';

export const Avatar = ({ size, src, alt, children, style }: AvatarProps) => {
	const [isValidImage, setIsValidImage] = React.useState<boolean>(true);

	// generate two letter text from name
	const generateAvatarText = (text: string) => {
		let result;
		if (text.split(' ').length > 1) {
			result =
				text.split(' ')[0][0] +
				(text.split(' ')[1] ? text.split(' ')[1][0] : '');
		} else {
			result = text.substring(0, 2);
		}
		return result;
	};

	const AvatarRender = () => {
		// valid src
		if ((src?.length || [].length) > 0 && isValidImage) {
			return (
				<AvatarImage
					onError={(e) => setIsValidImage(false)}
					src={src}
					alt={alt}
				/>
			);
		}
		// invalid src with children
		else if ((src?.length || [].length) > 0 && children) {
			return (
				<AvatarText size={size}>
					{React.isValidElement(children)
						? children
						: generateAvatarText(String(children))}
				</AvatarText>
			);
		}
		// invalid src with alt
		else if ((src?.length || [].length) > 0 && alt) {
			return <AvatarText size={size}>{generateAvatarText(alt)}</AvatarText>;
		}
		// only children
		else if (!src && children) {
			return (
				<AvatarText size={size}>
					{React.isValidElement(children)
						? children
						: generateAvatarText(String(children))}
				</AvatarText>
			);
		}
		// default placeholder
		else {
			return <PlaceHolder size={size} />;
		}
	};

	return (
		<>
			<AvatarCircle size={size} style={style}>
				{AvatarRender()}
			</AvatarCircle>
		</>
	);
};

export interface AvatarProps {
	size?: 'xs' | 'sm' | 'md' | 'lg'; // size of the avatar circle
	src?: string; // image src for avatar image
	alt?: string; // alternate text for src
	children?: React.ReactNode | string; // insert element or name inside avatar
	style?: React.CSSProperties; // add style to avatar circle
}
