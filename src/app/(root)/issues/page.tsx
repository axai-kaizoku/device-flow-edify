import { getAllIssues } from '@/server/issueActions';
import IssueTable from './_components/IssueTable';
import { CombinedContainer } from '@/components/container/container';

async function Issues() {
	const data = await getAllIssues();
	return (
		<CombinedContainer title="Issues">
			<IssueTable data={data} />
		</CombinedContainer>
	);
}

export default Issues;
