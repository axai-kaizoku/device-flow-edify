import { Issues } from '@/server/issueActions';
import IssueTable from './IssueTable';

interface IssueTableDisplayProps {
	data: Issues[];
	tag:string
}

function IssueTableDisplay({ data, tag }: IssueTableDisplayProps) {
	return (
		<>
			<IssueTable data={data} tag={tag}/>
		</>
	);
}

export default IssueTableDisplay;
