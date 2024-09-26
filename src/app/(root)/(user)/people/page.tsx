'use client';
import { CombinedContainer } from '@/components/container/container';

import { Table } from '@/components/wind/Table';

import { Icon } from '@/components/wind/Icons';
import { Button } from '@/components/wind/Buttons';

export default function People() {
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
		<CombinedContainer
			title="People"
			description="Your Peers">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					<input
						className="border-2 rounded-md p-2"
						placeholder="Search People .."
					/>
					<Button
						onClick={() => {}}
						focusColor="black"
						color="black"
						hoverColor="gray">
						Filter
					</Button>
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full">
				<Table
					data={teams}
					className="w-full"
					columns={[
						{ title: 'User', dataIndex: 'name' },
						{ title: 'Role', dataIndex: 'role' },
						{ title: 'Joining Date', dataIndex: 'joining_date' },
						{ title: 'Reporting Manager', dataIndex: 'reporting_manager' },
						{
							title: 'Actions',
							render: (data) => (
								<div className="w-full flex justify-center">
									<Icon
										type="OutlinedDotsVertical"
										color="black"
									/>
								</div>
							),
						},
					]}
				/>
			</div>
		</CombinedContainer>
	);
}
