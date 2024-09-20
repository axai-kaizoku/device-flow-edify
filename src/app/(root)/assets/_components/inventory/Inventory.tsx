'use client';

import { Icon } from '@/components/wind/Icons';

import { Table } from '@/components/wind/Table';
import Header from '../addDevices/Header';
import { DropdownActions } from '@/app/(root)/teams/_components/custom-actions';

function Inventory() {
	const devices = [
		{
			name: 'Ashish',
			currently_at: 'Banglore',
			serial_no: 'ASH1234',
			ownership: 'Rented',
		},
		{
			name: 'Akshay',
			currently_at: 'Hyderabad',
			serial_no: 'AKSH1237',
			ownership: 'Lost',
		},
		{
			name: 'Amar',
			currently_at: 'Pune',
			serial_no: 'AMR1234',
			ownership: 'Lease',
		},
		{
			name: 'Harsh',
			currently_at: 'Delhi',
			serial_no: 'HAR1234',
			ownership: 'Not working',
		},
	];
	return (
		<div className="flex flex-col  gap-12">
			<Header button="Add Devices" />
			<Table
				data={devices}
				columns={[
					{
						title: 'Device',
						dataIndex: 'name',
					},
					{
						title: 'currently At ',
						dataIndex: 'currently_at',
					},
					{
						title: 'Ownership',
						dataIndex: 'ownership',
					},
					{
						title: 'Serial Number',
						dataIndex: 'serial_no',
					},
					{
						title: 'Actions',
						render: () => (
							<div className="flex w-full justify-center">
								<DropdownActions />
							</div>
						),
					},
				]}
			/>
		</div>
	);
}

export default Inventory;
