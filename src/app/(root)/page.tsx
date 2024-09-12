import { CombinedContainer } from '@/components/container/Container';
import { Profile } from '@/components/profile/profile';
import { AvatarCircle } from '@/components/wind/Avatar/styles/style';
import { OutlinedDownChevron } from '@/components/wind/Icons/components/icons/OutlineIcons/OutlinedDownChevron';
import { OutlinedHamburger } from '@/components/wind/Icons/components/icons/OutlineIcons/OutlinedHamburger';

export default function Dashboard() {
	return (
		<CombinedContainer
			title="User Management"
			description="Manage employees and assign IT assets">
			{/* Search Bar & Profile section */}
			<div className=" w-full flex justify-between items-center ">
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
		</CombinedContainer>
	);
}
