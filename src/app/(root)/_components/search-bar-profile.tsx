import { Profile } from '@/components/profile/profile';
import { AvatarCircle } from '@/components/wind/Avatar/styles/style';
import { Icon } from '@/components/wind/Icons';

export const SearchBarWithProfile = () => {
	return (
		<div className=" w-full flex justify-between items-center ">
			<div className="flex items-center gap-3">
				<Icon type="OutlinedHamburger" />
				<input type="search" className="border p-1" />
			</div>
			<div className="flex items-center gap-4">
				<AvatarCircle />
				<div className="flex text-sm flex-col">
					<Profile />
					<span>Admin</span>
				</div>
				<Icon type="OutlinedDownChevron" />
			</div>
		</div>
	);
};
