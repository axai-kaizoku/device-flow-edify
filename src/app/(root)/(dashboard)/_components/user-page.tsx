import { CombinedContainer } from '@/components/container/container';
import { SearchBarWithProfile } from '@/components/container/search-bar-with-profile';

export default function UserDashboard() {
	return (
		<CombinedContainer title="User Dashboard">
			<SearchBarWithProfile />
			<div className="h-20" />
			<div>This is the user dashboard.</div>
		</CombinedContainer>
	);
}
