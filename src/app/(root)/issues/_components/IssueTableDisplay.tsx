import { Issues } from '@/server/issueActions';
import IssueTable from './IssueTable';

interface IssueTableDisplayProps {
	data: Issues[];
}

function IssueTableDisplay({ data }: IssueTableDisplayProps) {
	return (
		<>
			<IssueTable data={data} />
		</>
	);
}

export default IssueTableDisplay;
