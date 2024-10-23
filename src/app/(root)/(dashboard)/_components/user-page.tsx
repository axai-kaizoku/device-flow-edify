import { CombinedContainer } from '@/components/container/container';
import { SearchBarWithProfile } from '@/components/container/search-bar-with-profile';

export default function UserDashboard() {
	return (
		<CombinedContainer title="User Dashboard">
			<div className="min-h-screen py-2 px-2">
				<SearchBarWithProfile />
				<div className="h-10" />
				<div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-gray-100">
						Welcome to your Dashboard
					</h2>
					<p className="text-gray-600 dark:text-gray-300">
						This is the user dashboard. Use this space to navigate through your options and check your progress.
					</p>
				</div>
			</div>
		</CombinedContainer>
	);
}
