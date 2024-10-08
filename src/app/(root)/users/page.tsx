import { CombinedContainer } from '@/components/container/container';
import { fetchUsers } from '@/server/userActions';

import UserMain from './_components/user-main';

export default async function Users() {
	try {
		const users = await fetchUsers();

		return (
			<CombinedContainer title="Users">
				<UserMain data={users} />
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
