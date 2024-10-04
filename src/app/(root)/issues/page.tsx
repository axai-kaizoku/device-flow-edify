import { getAllIssues } from '@/server/issueActions';
import IssueTable from './_components/IssueTable';
import { CombinedContainer } from '@/components/container/container';

async function Issues() {
	try {
		const data = await getAllIssues();
		return (
			<CombinedContainer title="Issues">
				<IssueTable data={data} />
			</CombinedContainer>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<CombinedContainer title="Issues">
				<div className="text-red-500">
					Failed to load data. Please try again later.
				</div>
			</CombinedContainer>
		);
	}
}

export default Issues;
