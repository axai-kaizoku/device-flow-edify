import { CombinedContainer } from '@/components/container/container';
import ProfileContainer from './_components/profileContainer';
import { getUserById, User } from '@/server/userActions';
import { getSession } from '@/server/helper';



export default async function Profile() {
	const session = await getSession();
	const userId = session?.user && session?.user.id;
	// console.log(typeof userId)
	const userDetails:User = await getUserById(userId!);

	return (
		<CombinedContainer title="Profile" description="Manage your profile">
			<ProfileContainer user={userDetails}/>
		</CombinedContainer>
	);
}
