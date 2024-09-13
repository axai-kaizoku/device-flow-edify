import { CombinedContainer } from '@/components/container/Container';
import { Profile } from '@/components/profile/profile';
import { Avatar } from '@/components/wind/Avatar';
import { Icon } from '@/components/wind/Icons';

export default function Dashboard() {
	return (
		<CombinedContainer
			title="User Management"
			description="Manage employees and assign IT assets">
			{/* Search Bar & Profile section */}
			<SearchBarWithProfile />
			{/* Table */}
			<div>TABLE</div>
		</CombinedContainer>
	);
}

export const SearchBarWithProfile = () => {
	return (
		<div className=" w-full flex justify-between items-center ">
			<div className="flex items-center gap-3">
				<Icon type="OutlinedHamburger" />
				<input type="search" className="border p-1" />
			</div>
			<div className="flex items-center gap-4">
				<Avatar />
				<div className="flex text-sm flex-col">
					<Profile />
					<span>Admin</span>
				</div>
				<Icon type="OutlinedDownChevron" />
			</div>
		</div>
	);
};
