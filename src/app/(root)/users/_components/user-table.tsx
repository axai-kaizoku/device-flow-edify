'use client';

import { Table } from '@/components/wind/Table';
import { Icon } from '@/components/wind/Icons';
import { User } from '@/server/userActions';
import Link from 'next/link';

export default function UserTable({ users }: { users: User[] }) {
	return (
		<Table
			data={users}
			className="w-full"
			columns={[
				{ title: 'User', dataIndex: 'first_name' },
				{ title: 'Role', dataIndex: 'role' },
				{ title: 'Joining Date', dataIndex: 'onboarding_date' },
				{
					title: 'Reporting Manager',
					render: (data) => (
						<div className="w-full flex justify-center">
							<div>
								{data.reporting_manager?.first_name
									? data.reporting_manager?.first_name
									: 'NULL'}
							</div>
						</div>
					),
				},
				{
					title: 'Actions',
					render: (data) => (
						<div className="w-full flex justify-center">
							<Link href={`/users/${data._id}`}>
								<Icon type="OutlinedDotsVertical" color="black" />
							</Link>
						</div>
					),
				},
			]}
		/>
	);
}
