import { CombinedContainer } from '@/components/container/container';
import { UserResponse } from '@/server/userActions';

import UserMain from './_components/user-main';
import { getSession } from '@/server/helper';
import { deletedUsers, filterUsers } from '@/server/filterActions';
import TabDisplay from './TabDisplay';

export default async function Users() {
	const session = await getSession();
	const userRole = session?.user.role || 0;
	try {
		const userResponse: UserResponse = await filterUsers();
		const deletedUserResponse: UserResponse = await deletedUsers();
		console.log(deletedUserResponse)

		return (
			<CombinedContainer title="Users">
				<TabDisplay
					users={userResponse.users} // Pass the documents array directly
					currentPage={userResponse.currentPage}
					totalPages={userResponse.totalPages}
					totalDocuments={userResponse.totalDocuments}
					currentDocumentCount={userResponse.currentDocumentCount}
					pageSize={userResponse.pageSize}
					userRole={userRole}
					deletedUserResponse = {deletedUserResponse}
				/>
				{/* <UserMain data={userResponse.users} userRole={userRole} /> */}
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
