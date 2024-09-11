'use client';
import { AvatarCircle } from '@/components/wind/Avatar/styles/style';
import { OutlinedDownChevron } from '@/components/wind/Icons/components/icons/OutlineIcons/OutlinedDownChevron';
import { OutlinedHamburger } from '@/components/wind/Icons/components/icons/OutlineIcons/OutlinedHamburger';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
	return (
		<section className="flex flex-col w-full overflow-hidden">
			{/* Header */}
			<div className="h-[16%] w-full bg-slate-200 p-8 flex items-end">
				<div className="flex flex-col gap-1">
					<div className="text-3xl font-medium">User Management</div>
					<div>Manage employees and assign IT assets</div>
				</div>
			</div>
			{/* Search Bar & Profile section */}
			<div className="h-20 w-full flex justify-between items-center py-3 px-6">
				<div className="flex items-center gap-3">
					<OutlinedHamburger />
					<input type="search" className="border p-1" />
				</div>
				<div className="flex items-center gap-4">
					<AvatarCircle />
					<div className="flex text-sm flex-col">
						<Profile />
						<span>Admin</span>
					</div>
					<OutlinedDownChevron />
				</div>
			</div>
			{/* Table */}
			<div>TABLE</div>
		</section>
	);
}

const Profile = () => {
	const { data, status } = useSession();
	return (
		<div>
			{status === 'loading' ? (
				<span>Loading...</span>
			) : (
				<div className=" whitespace-nowrap">
					{data?.user.name ? (
						<span>{data?.user.name}</span>
					) : (
						<span>
							{data?.user.first_name} {data?.user.last_name}
						</span>
					)}
				</div>
			)}
		</div>
	);
};
