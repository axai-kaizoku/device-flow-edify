import { IssueResponse, paginatedIssue } from '@/server/issueActions';
import { CombinedContainer } from '@/components/container/container';
import IssueTableDisplay from './_components/IssueTableDisplay';
import { notFound } from 'next/navigation';
import { filterIssues } from '@/server/filterActions';
interface IssueProps {
	searchParams: {
		page?: string;
	};
}
async function Issues({ searchParams }: IssueProps) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	try {
		const issueResponse: IssueResponse = await filterIssues();

		if (!issueResponse.issues) {
			notFound();
		}
		return (
			<CombinedContainer title="Issues">
				Total Issues Raised :- {issueResponse.issues.length} of{' '}
				{issueResponse.total_count}
				<IssueTableDisplay data={issueResponse.issues} />
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
