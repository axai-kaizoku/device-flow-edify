'use client';

import { Icon } from '@/components/wind/Icons';

import { Table } from '@/components/wind/Table';
import Header from '../addDevices/Header';

function Issues() {
	const devices = [
		{
			name: 'Ashish',
			issued_at: '02-11-2024',
			serial_no: 'ASH1234',
			status: 'Resolved',
		},
		{
			name: 'Akshay',
			issued_at: '02-11-2024',
			serial_no: 'AKSH1237',
			status: 'not resolved',
		},
		{
			name: 'Amar',
			issued_at: '02-11-2024',
			serial_no: 'AMR1234',
			status: 'out of the box',
		},
		{
			name: 'Harsh',
			issued_at: '02-11-2024',
			serial_no: 'HAR1234',
			status: 'easy',
		},
	];
	return (
		<div className="flex flex-col  gap-12">
			<Header button="Report an Issue" />
			<Table
				data={devices}
				columns={[
					{
						title: 'Device',
						dataIndex: 'name',
					},
					{
						title: 'Issued At ',
						dataIndex: 'issued_at',
					},
					{
						title: 'Status',
						dataIndex: 'status',
					},
					{
						title: 'Serial Number',
						dataIndex: 'serial_no',
					},
					{
						title: 'Actions',
						render: () => (
							<div className="flex w-full justify-center">
								<Icon type="OutlinedDotsVertical" color="black" />
							</div>
						),
					},
				]}
			/>
		</div>
	);
}

export default Issues;
