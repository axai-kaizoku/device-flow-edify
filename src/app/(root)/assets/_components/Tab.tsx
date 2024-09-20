import { Icon } from '@/components/wind/Icons';
import { IconsType } from '@/components/wind/Icons/components/icons/interface';

interface TabProps {
	active: boolean;
	onClick: () => void;
	iconType: IconsType;
	label: string;
}

export function Tab({ active, onClick, iconType, label }: TabProps) {
	return (
		<div
			className={`flex justify-center items-center gap-2 cursor-pointer p-2 transition-all duration-300 ${
				active ? 'bg-black text-white rounded' : 'text-black bg-white'
			}`}
			onClick={onClick}>
			<Icon
				type={iconType}
				color={active ? 'white' : 'black'}
			/>
			{label}
		</div>
	);
}
