import { IssueResponse, paginatedIssue } from '@/server/issueActions';
import { CombinedContainer } from '@/components/container/container';
import IssueTableDisplay from './_components/IssueTableDisplay';
import { notFound } from 'next/navigation';
interface IssueProps {
	searchParams: {
		page?: string;
	};
}
async function Issues({ searchParams }: IssueProps) {
	const page = searchParams.page ? parseInt(searchParams.page) : 1;
	try {
		const issueResponse: IssueResponse = await paginatedIssue(page.toString());

		if (!issueResponse.documents.length) {
			notFound();
		}
		return (
			<CombinedContainer title="Issues">
				Total Issues Raised :- {issueResponse.currentDocumentCount} of{' '}
				{issueResponse.totalDocuments}
				<IssueTableDisplay
					data={issueResponse.documents}
					currentPage={issueResponse.currentPage}
					totalPages={issueResponse.totalPages}
					currentDocumentCount={issueResponse.currentDocumentCount}
					pageSize={issueResponse.pageSize}
				/>
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
