import { CombinedContainer } from '@/components/container/container';
import ProfileContainer from './_components/profileContainer';

export default function Profile() {
	return (
		<CombinedContainer title="Profile" description="Manage your profile">
			<ProfileContainer/>
		</CombinedContainer>
	);
}
