'use client';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { Device } from '@/server/deviceActions';
import { useRouter } from 'next/navigation';
import React from 'react';
interface InventoryProps {
	devices: Device[];
}

function InventoryTable({ devices }: InventoryProps) {
	const router = useRouter();

	const handleClick = (id: string) => {
		router.push(`/assets/${id}`);
	};
	return (
		<>
			<Table
				data={devices}
				columns={[
					{
						title: 'Device',
						dataIndex: 'device_name',
					},
					{
						title: 'currently At ',
						dataIndex: 'city',
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
						render: (record) => (
							<div
								className="flex w-full justify-center cursor-pointer"
								onClick={() => handleClick(record._id)}>
								<Icon type="OutlinedDotsVertical" color="black" />
							</div>
						),
					},
				]}
			/>
		</>
	);
}

export default InventoryTable;
