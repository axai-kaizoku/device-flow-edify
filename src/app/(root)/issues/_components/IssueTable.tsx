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
			{JSON.stringify(data)}
			<Table
				data={data}
				columns={[
					{
						title: 'Raised by',
						dataIndex: 'userId',
					},
					{
						title: 'Priority',
						dataIndex: 'priority',
					},
					{
						title: 'Issued At ',
						dataIndex: 'createdAt',
					},
					{
						title: 'Status',
						dataIndex: 'status',
					},
					{
						title: 'Org Id',
						dataIndex: 'orgId',
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
