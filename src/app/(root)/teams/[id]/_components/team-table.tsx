'use client';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { User } from '@/server/userActions';

export default function TeamTable({ data }: { data: User[] }) {
	
	return (
		<Table
			data={data}
			columns={[
				{ title: 'User', dataIndex: 'first_name' },
				{ title: 'Role', dataIndex: 'designation' },
				{
					title: 'Joining Date',
					render: (data) => (
						<div className="w-full flex justify-center">
							<div>
								{data.onboarding_date
									? new Date(data.onboarding_date).toLocaleDateString()
									: 'NULL'}
							</div>
						</div>
					),
				},
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
				// {
				// 	title: 'Actions',
				// 	render: () => (
				// 		<div className="w-full flex justify-center">
				// 			<Icon type="OutlinedDotsVertical" color="black" />
				// 		</div>
				// 	),
				// },
			]}
		/>
	);
}
