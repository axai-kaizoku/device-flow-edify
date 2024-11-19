import { CombinedContainer } from '@/components/container/container';
import { SearchBarWithProfile } from '@/components/container/search-bar-with-profile';
import { AdminMain } from './admin-main';

export default function AdminDashboard() {
	return (
		<CombinedContainer title="Admin Dashboard">
			<SearchBarWithProfile />
			<div className="h-20" />
			<AdminMain />
			<div className="flex gap-8 flex-wrap">
				{[...Array(8)].map((_, i) => (
					<DashCard key={i} />
				))}
			</div>
			
		</CombinedContainer>
	);
}

const DashCard = () => {
	return (
		<div className="w-64 h-24 rounded-md text-muted-foreground bg-muted px-10 py-4 flex justify-between items-center">
			<div className="text-3xl font-bold">34</div>
			<span>
				Total Laptops
				<br /> Used
			</span>
		</div>
	);
};
