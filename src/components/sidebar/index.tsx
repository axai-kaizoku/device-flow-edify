import { ToggleTheme } from '../utils/toggle-theme';
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
				<Link
					href={page.path}
					key={page.label}
					className="w-full flex justify-between text-sm focus:outline-none">
					<div
						className={`${
							page.label === 'Dashboard' ? 'bg-black' : ''
						} w-[2%] rounded-e`}
					/>
					<div
						className={`${
							page.label === 'Dashboard' ? 'bg-black text-white' : ''
						} p-4 rounded w-[78%] flex gap-4 items-center`}>
						<Image
							src={page.icon}
							alt={page.label}
							width={20}
							height={20}
							className="object-contain"
						/>
						<div>{page.label}</div>
					</div>
					<div className="w-[1%]" />
				</Link>
			))}
			<div className="h-[1px] w-full border-b" />
			{SIDEBAR.Pages.map((page, i) => (
				<Link
					href={page.path}
					key={page.label}
					className="w-full flex justify-between text-sm">
					<div
						className={`${
							page.label === 'Dashboard' ? 'bg-black' : ''
						} w-[2%] rounded-e`}
					/>
					<div
						className={`${
							page.label === 'Dashboard' ? 'bg-black text-white' : ''
						} p-4 rounded w-[78%] flex gap-4 items-center`}>
						<Image
							src={page.icon}
							alt={page.label}
							width={20}
							height={20}
							className="object-contain"
						/>
						<div>{page.label}</div>
					</div>
					<div className="w-[1%]" />
				</Link>
			))}
			<div className="h-[1px] w-full border-b" />
			{SIDEBAR.Functions.map((page, i) => (
				<Link
					href={page.path}
					key={page.label}
					className="w-full flex justify-between text-sm">
					<div
						className={`${
							page.label === 'Dashboard' ? 'bg-black' : ''
						} w-[2%] rounded-e`}
					/>
					<div
						className={`${
							page.label === 'Dashboard' ? 'bg-black text-white' : ''
						} p-4 rounded w-[78%] flex gap-4 items-center`}>
						<Image
							src={page.icon}
							alt={page.label}
							width={20}
							height={20}
							className="object-contain"
						/>
						<div>{page.label}</div>
					</div>
					<div className="w-[1%]" />
				</Link>
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

			{/* <ToggleTheme /> */}
		</section>
	);
}
