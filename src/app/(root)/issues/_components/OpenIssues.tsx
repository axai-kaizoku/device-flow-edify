import { Issues } from '@/server/issueActions';
import React from 'react'
import IssueTableDisplay from './IssueTableDisplay';

interface OpenIssuesProps {
	issues: Issues[];
	totalDocuments: number;
    tag:string;
}

const OpenIssues = ({issues, totalDocuments, tag}:OpenIssuesProps) => {
  return (
    <div className="flex flex-col gap-12">
			<IssueTableDisplay data={issues} tag={tag}/>
	</div>
  )
}

export default OpenIssues