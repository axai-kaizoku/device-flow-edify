import { Issues } from '@/server/issueActions'
import React from 'react'
import IssueTableDisplay from './IssueTableDisplay'

const ClosedIssues = ({issues, tag}:{issues:Issues[]; tag:string;}) => {
  return (
    <div className="flex flex-col gap-12">
			<IssueTableDisplay data={issues} tag={tag}/>
	</div>
  )
}

export default ClosedIssues