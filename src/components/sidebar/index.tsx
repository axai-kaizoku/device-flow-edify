import Image from 'next/image';
import { SIDEBAR } from '@/constants';
import Link from 'next/link';
import { AuthBtn } from './side-profile';

export default function Sidebar() {
	return (
		<section className="hidden w-[20%] flex-col gap-0.5 items-center sm:flex h-screen overflow-auto border-r">
			<div className="px-2 w-24 h-14 flex justify-center items-center">
				<Image
					src="/logo/logo.png"
					width={133}
					height={43}
					alt="edify-logo"
					quality={100}
				/>
			</div>
			{SIDEBAR.MainPages.map((page, i) => (
				<SidebarItem
					href={page.path}
					icon={page.icon}
					label={page.label}
					key={page.label}
				/>
			))}
			<div className="h-[1px] w-full border-b" />
			{SIDEBAR.Pages.map((page, i) => (
				<SidebarItem
					href={page.path}
					icon={page.icon}
					label={page.label}
					key={page.label}
				/>
			))}
			<div className="h-[1px] w-full border-b" />
			{SIDEBAR.Functions.map((page, i) => (
				<SidebarItem
					href={page.path}
					icon={page.icon}
					label={page.label}
					key={page.label}
				/>
			))}
			<div className="w-full flex justify-between text-sm">
				<div className={` w-[2%] rounded-e`} />
				<div className={` p-4 rounded w-[78%] flex gap-4 items-center`}>
					<Image
						src="/sidebar/logout.svg"
						alt="Logout"
						width={20}
						height={20}
						className="object-contain"
					/>
					<div>
						<AuthBtn />
					</div>
				</div>
				<div className="w-[1%]" />
			</div>
		</section>
	);
}

type SidebarItemProps = {
	href: string;
	label: string;
	icon: string;
};

const SidebarItem = ({ href, label, icon }: SidebarItemProps) => {
	return (
		<Link href={href} className="w-full flex justify-between text-sm ">
			<div
				className={`${
					label === 'Dashboard' ? 'bg-black' : ''
				} w-[2%] rounded-e`}
			/>
			<div
				className={`${
					label === 'Dashboard' ? 'bg-black text-white' : ''
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
