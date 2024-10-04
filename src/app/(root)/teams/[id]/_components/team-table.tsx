'use client';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';

export default function TeamTable({ data }: { data?: any }) {
	const teams = [
		{
			_id: '66e40351b83635490e26bda4',
			name: 'Ashish',
			role: 'Frontend Developer',
			joining_date: '17-09-2024',
			reporting_manager: 'Abhinav',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:18:09.972Z',
			updatedAt: '2024-09-13T09:18:09.972Z',
			__v: 0,
		},
		{
			_id: '66e40351b83635490e26bda4',
			name: 'Akshay',
			role: 'Frontend Developer',
			joining_date: '10-09-2024',
			reporting_manager: 'Abhinav',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:18:09.972Z',
			updatedAt: '2024-09-13T09:18:09.972Z',
			__v: 0,
		},
		{
			_id: '66e40351b83635490e26bda4',
			name: 'Harsh',
			role: 'Frontend Developer',
			joining_date: '17-09-2024',
			reporting_manager: 'Abhinav',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:18:09.972Z',
			updatedAt: '2024-09-13T09:18:09.972Z',
			__v: 0,
		},
	];
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
