'use client';
import React, { useState } from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { Issues, issueSearchAPI } from '@/server/issueActions';
import { useRouter } from 'next/navigation';
import { SearchInput } from '../../people/_components/search-params';

function IssueTable({
	data,
	searchTerm,
	setSearchTerm,
}: {
	data: Issues[];
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const router = useRouter();
	const [issue, setIssue] = useState(data);
	const handleFilteredData = (filtered: typeof data) => {
		setIssue(filtered);
	};
	const handleIssueClick = (id: string) => {
		router.push(`/issues/${id}`);
	};

	// Filter data based on the search term
	const filteredData = data.filter((issue) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return (
			(issue.status?.toLowerCase() || '').includes(lowerSearchTerm) || // Ensure status is defined
			(issue.email?.toLowerCase() || '').includes(lowerSearchTerm) || // Ensure email is defined
			(issue.serial_no?.toLowerCase() || '').includes(lowerSearchTerm) // Ensure serial_no is defined
		);
	});

	return (
		<div>
			{/* <IssueHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
			<SearchInput
				onFiltered={handleFilteredData}
				data={issue}
				searchAPI={issueSearchAPI}
				queryName="query"
			/>
			<Table
				data={issue}
				columns={[
					{
						title: 'Title',
						dataIndex: 'title',
					},
					{
						title: 'Description',
						dataIndex: 'description',
					},
					{
						title: 'Raised by',
						dataIndex: 'userName',
					},
					{
						title: 'User Email',
						dataIndex: 'email',
					},
					{
						title: 'Priority',
						dataIndex: 'priority',
					},
					{
						title: 'Issued At',
						render: (data) => (
							<div className="w-full flex justify-center">
								<div>
									{data.createdAt
										? new Date(data.createdAt).toLocaleDateString()
										: 'NULL'}
								</div>
							</div>
						),
					},
					{
						title: 'Status',
						dataIndex: 'status',
					},
					{
						title: 'Serial No',
						dataIndex: 'serial_no',
					},
					{
						title: 'Actions',
						render: (record) => (
							<div
								className="flex w-full justify-center"
								onClick={() => handleIssueClick(record._id)}>
								<Icon type="OutlinedDotsVertical" color="black" />
							</div>
						),
					},
				]}
			/>
		</div>
	);
}

export default IssueTable;
