'use client';
import React from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { Issues } from '@/server/issueActions';
// import { useRouter } from 'next/navigation';

function EmpIssueTable({ data }: { data: Issues[] }) {
	// const router = useRouter();
	const handleIssueClick = (id: string) => {
		// router.push(`/issues/${id}`);
	};
	return (
		<div>
			{/* {JSON.stringify(data)} */}
			<Table
				data={data}
				columns={[
                    {
						title: 'Serial No',
						dataIndex: 'serial_no',
					},
					{
						title: 'Title',
						dataIndex: 'title',
					},
					{
						title:"Description",
						dataIndex:"description"
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
						title: 'View',
						render: (record) => (
							<div
								className="flex w-full justify-center"
								onClick={() => handleIssueClick(record._id)}>
								<Icon type="OutlinedEye" color="black" />
							</div>
						),
					},
				]}
			/>
		</div>
	);
}

export default EmpIssueTable;
