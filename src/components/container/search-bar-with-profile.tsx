import { getSession } from '@/server/helper';

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
				</div>
				<Icon type="OutlinedDownChevron" />
			</div>
		</div>
	);
};

export const Profile = async () => {
	const session = await getSession();

	return (
		<div>
			{session && (
				<div className="whitespace-nowrap flex flex-col gap-0.5">
					{session?.user.name ? (
						<>
							<span>{session?.user.name}</span>
							<span>Employee</span>
						</>
					) : (
						<>
							<span>
								{session?.user.first_name} {session?.user.last_name}
							</span>
							<span>{session.user.role === 1 ? 'Employee' : 'Admin'}</span>
						</>
					)}
				</div>
			)}
		</div>
	);
};
