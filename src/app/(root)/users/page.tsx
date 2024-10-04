import { CombinedContainer } from '@/components/container/container';
import { Input } from '@/components/wind/Input';
import { fetchUsers } from '@/server/userActions';
import UserTable from './_components/user-table';
import CreateUser from './_components/create-user';

export default async function Users() {
	try {
		const users = await fetchUsers();

		return (
			<CombinedContainer title="Users">
				<div className="flex justify-end w-full">
					<div className="flex gap-5">
						<Input placeholder="Search users" />
						<CreateUser />
					</div>
				</div>
				<div className="h-10" />
				<div className="w-full">
					<UserTable users={users} />
				</div>
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
