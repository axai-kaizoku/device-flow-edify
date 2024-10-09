import { CombinedContainer } from '@/components/container/container';
import { fetchUsers } from '@/server/userActions';

import UserMain from './_components/user-main';
import { getSession } from '@/server/helper';

export default async function Users() {
	const session = await getSession();
	const userRole = session?.user.role;
	try {
		const users = await fetchUsers();

		return (
			<CombinedContainer title="Users">
				<UserMain data={users} userRole={userRole}/>
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Users">
				<div className="text-red-500">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}
