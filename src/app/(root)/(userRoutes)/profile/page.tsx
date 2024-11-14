import { CombinedContainer } from '@/components/container/container';
import ProfileContainer from './_components/profileContainer';
import { getUserById, User } from '@/server/userActions';
import { getSession } from '@/server/helper';

export default async function Profile() {
	try {
		const session = await getSession();
		const userId = session?.user && session?.user.id;
		// console.log(typeof userId)
		const userDetails: User = await getUserById(userId!);

		return (
			<CombinedContainer title="Profile" description="Manage your profile">
				<ProfileContainer user={userDetails} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Profile">
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
