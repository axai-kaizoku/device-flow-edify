import { CombinedContainer } from '@/components/container/container';
import React from 'react';
import EditIssue from './_components/edit-issue';
import { getIssueById, Issues } from '@/server/issueActions';

interface IssuePageProps {
	params: { id: string };
}

async function SignleIssue({ params }: IssuePageProps) {
	const data: Issues = await getIssueById(params.id);

	return (
		<CombinedContainer title="Issue Details">
			<EditIssue data={data} />
		</CombinedContainer>
	);
}

export default SignleIssue;
