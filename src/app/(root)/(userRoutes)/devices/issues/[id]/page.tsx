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
			<div className="bg-white p-6 rounded-lg shadow-md space-y-6">
				{/* Header */}
				<div className="flex justify-between items-center border-b pb-4 mb-4">
					<h2 className="text-2xl font-bold text-gray-800">
						{data?.title}
					</h2>
					<div className={`text-sm font-semibold px-3 py-1 rounded-lg ${
						data?.priority === 'Critical' ? ('bg-red-100 text-red-700') : (
						data?.priority === 'Medium' ? ('bg-yellow-100 text-yellow-700') : (
							'bg-green-100 text-green-700'
						))
					}`}>
						Priority: {data?.priority}
					</div>
				</div>

				{/* Issue Details */}
				<div className="space-y-4">
					<p>
						<strong className="font-medium text-gray-700">Raised by:</strong>{' '}
						<span className="text-gray-600">{data?.userName}</span>
					</p>
					<p>
						<strong className="font-medium text-gray-700">Status:</strong>{' '}
						<span
							className={`font-semibold px-2 py-1 rounded-md ${
								data?.status === 'Open'
									? 'bg-green-100 text-green-700'
									: 'bg-gray-100 text-gray-700'
							}`}
						>
							{data?.status}
						</span>
					</p>
					<p>
						<strong className="font-medium text-gray-700">Created at:</strong>{' '}
						<span className="text-gray-600">{data?.createdAt}</span>
					</p>
					<p>
						<strong className="font-medium text-gray-700">Description:</strong>
						<span className="block mt-1 text-gray-600">{data?.description}</span>
					</p>
					<p>
						<strong className="font-medium text-gray-700">Serial Number:</strong>{' '}
						<span className="text-gray-600">{data?.serial_no}</span>
					</p>
					<p>
						<strong className="font-medium text-gray-700">Email:</strong>{' '}
						<span className="text-gray-600">{data?.email}</span>
					</p>
				</div>
			</div>
		</CombinedContainer>
	);
}

export default SignleIssue;
