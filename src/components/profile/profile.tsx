'use client';
import { useSession } from 'next-auth/react';

export const Profile = () => {
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
