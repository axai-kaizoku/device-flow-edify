'use client';
import Image from 'next/image';
import { SIDEBAR } from '@/constants';
import { ToggleTheme } from '../utils/toggle-theme';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import SidebarItem from './sidebar-item';

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<section className="hidden w-[20%] flex-col py-4 gap-0.5 items-center sm:flex h-screen overflow-auto border-r">
			<div className="px-2 w-24 h-14 pb-4 flex justify-center items-center">
				<Image
					src="/assets/logo/logo.png"
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
					isActive={pathname === page.path}
					key={page.label}
				/>
			))}
			<div className="h-[1px] w-full border-b" />
			{SIDEBAR.Pages.map((page, i) => (
				<SidebarItem
					href={page.path}
					icon={page.icon}
					label={page.label}
					isActive={pathname === page.path}
					key={page.label}
				/>
			))}
			<div className="h-[1px] w-full border-b" />
			{SIDEBAR.Functions.map((page, i) => (
				<SidebarItem
					href={page.path}
					icon={page.icon}
					label={page.label}
					isActive={pathname === page.path}
					key={page.label}
				/>
			))}
			<div
				onClick={() => signOut()}
				className="w-full flex justify-between cursor-pointer text-sm">
				<div className={` w-[2%] rounded-e`} />
				<div className={` p-4 rounded w-[78%] flex gap-4 items-center`}>
					<Image
						src="/assets/sidebar/logout.svg"
						alt="Logout"
						width={20}
						height={20}
						className="object-contain"
					/>
					<div>Logout</div>
				</div>
				<div className="w-[1%]" />
			</div>
			<ToggleTheme />
		</section>
	);
}
