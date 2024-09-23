'use client';

import { Icon } from '@/components/wind/Icons';
import Header from './Header';
import { Table } from '@/components/wind/Table';

function AddDevices() {
	const devices = [
		{
			name: 'Ashish',
			assignedTo: 'ashish',
			serial_no: 'ASH1234',
			warrantyStatus: 'Nhi bataunga',
		},
		{
			name: 'Ashish',
			assignedTo: 'ashish',
			serial_no: 'ASH1234',
			warrantyStatus: 'Nhi bataunga',
		},
		{
			name: 'Ashish',
			assignedTo: 'ashish',
			serial_no: 'ASH1234',
			warrantyStatus: 'Nhi bataunga',
		},
		{
			name: 'Ashish',
			assignedTo: 'ashish',
			serial_no: 'ASH1234',
			warrantyStatus: 'Nhi bataunga',
		},
	];
	return (
		<div className="flex flex-col  gap-12">
			<Header button="Add Device" />
			<Table
				data={devices}
				columns={[
					{
						title: 'Device',
						dataIndex: 'name',
					},
					{
						title: 'Assigned to',
						dataIndex: 'assignedTo',
					},
					{
						title: 'Serial Number',
						dataIndex: 'serial_no',
					},
					{
						title: 'Warranty Status',
						dataIndex: 'warrantyStatus',
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

export default AddDevices;
