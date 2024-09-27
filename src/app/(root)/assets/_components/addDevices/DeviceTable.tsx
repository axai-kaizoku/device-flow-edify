'use client';

import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';

export default function DeviceTable({ data }: { data: any }) {
	return (
		<Table
			data={data}
			columns={[
				{
					title: 'Device',
					dataIndex: 'device_name',
				},
				{
					title: 'Assigned to',
					dataIndex: 'userName',
				},
				{
					title: 'Serial Number',
					dataIndex: 'serial_no',
				},
				{
					title: 'Warranty Status',
					render: (record) => (
						<span>{record.warranty_status ? 'Active' : 'Inactive'}</span>
					),
				},
				{
					title: 'Price',
					dataIndex: 'purchase_value',
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
	);
}
