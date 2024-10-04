'use client';
import React from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { Issues } from '@/server/issueActions';
import { useRouter } from 'next/navigation';

function IssueTable({ data }: { data: Issues[] }) {
	const router = useRouter();
	const handleIssueClick = (id: string) => {
		router.push(`/issues/${id}`);
	};
	return (
		<div>
			<Table
				data={data}
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
