import { CombinedContainer } from '@/components/container/container';
import { UserResponse } from '@/server/userActions';

import UserMain from './_components/user-main';
import { getSession } from '@/server/helper';
import { filterUsers } from '@/server/filterActions';

export default async function Users() {
	const session = await getSession();
	const userRole = session?.user.role || 0;
	try {
		const userResponse: UserResponse = await filterUsers();

		return (
			<CombinedContainer title="Users">
				<UserMain data={userResponse.users} userRole={userRole} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="People">
				<div className="text-red-500">
					Failed to load data. Please try again later. <br />{' '}
					<a href="/" className="underline text-blue-500">
						Back to home
					</a>
				</div>
			</CombinedContainer>
		);
	}
}
