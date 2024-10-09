import { CombinedContainer } from '@/components/container/container';
import React from 'react';
import { getIssueById, Issues } from '@/server/issueActions';

interface IssuePageProps {
	params: { id: string };
}

async function SignleIssue({ params }: IssuePageProps) {
	const data: Issues = await getIssueById(params.id);

	return (
		<CombinedContainer title="Issue Details">
			<div className="flex flex-col space-y-2">
						<p>
							<strong>Raised by:</strong> {data?.userName}
						</p>
						<p>
							<strong>Title</strong> {data?.title}
						</p>
						<p>
							<strong>Priority:</strong> {data?.priority}
						</p>
						<p>
							<strong>Status</strong> {data?.status}
						</p>
						<p>
							<strong>Created at:</strong> {data?.createdAt}
						</p>
						<p>
							<strong>Description:</strong> {data?.description}
						</p>
						<p>
							<strong>Serial Number:</strong> {data?.serial_no}
						</p>
						<p>
							<strong>Email:</strong> {data?.email}
						</p>
					</div>
		</CombinedContainer>
	);
}

export default SignleIssue;
