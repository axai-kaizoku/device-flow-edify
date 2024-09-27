'use client';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { deleteTeam, Team } from '@/server/teamActions';
import Link from 'next/link';

export default function TeamsTable({ data }: { data: any }) {
	// console.log(data);
	return (
		<Table
			data={data}
			className="w-full"
			columns={[
				{ title: 'Teams', dataIndex: 'title' },
				{ title: 'Total Employees', dataIndex: 'size' },
				{
					title: 'Actions',
					render: (data: Team) => (
						<div className="w-full flex gap-4 justify-center">
							<Link href={`/teams/${data._id}`}>
								<Icon
									type="OutlinedEye"
									style={{ cursor: 'pointer' }}
									color="grey"
								/>
							</Link>
							<Icon
								onClick={() => {
									console.log(data._id);
								}}
								type="OutlinedEdit"
								color="grey"
							/>
							<Icon
								onClick={async () => {
									if (data._id) {
										await deleteTeam(data._id);
									}
								}}
								type="OutlinedBin"
								color="grey"
							/>
						</div>
					),
				},
			]}
		/>
	);
}
