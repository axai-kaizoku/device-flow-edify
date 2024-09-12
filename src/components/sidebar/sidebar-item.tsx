import Image from 'next/image';
import Link from 'next/link';

type SidebarItemProps = {
	href: string;
	label: string;
	icon: string;
	isActive?: boolean;
};

const SidebarItem = ({ href, label, icon, isActive }: SidebarItemProps) => {
	return (
		<Link href={href} className="w-full flex justify-between text-sm ">
			<div
				className={`${
					isActive ? 'bg-black dark:bg-white' : ''
				} w-[2%] rounded-e`}
			/>
			<div
				className={`${
					isActive ? 'bg-black text-white dark:bg-white dark:text-black' : ''
				} p-4 rounded w-[78%] flex gap-4 items-center`}>
				<Image
					src={icon}
					alt={label}
					width={20}
					height={20}
					className="object-contain"
				/>
				<div>{label}</div>
			</div>
			<div className="w-[1%]" />
		</Link>
	);
};

export default SidebarItem;
