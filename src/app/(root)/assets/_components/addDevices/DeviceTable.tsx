'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { useRouter } from 'next/navigation';

export default function DeviceTable({
	data,
	searchTerm,
}: {
	data: any;
	searchTerm: string;
}) {
	const [filteredData, setFilteredData] = useState(data);
	const router = useRouter();
	useEffect(() => {
		const filtered = data.filter((device: any) => {
			const { device_name, brand, custom_model } = device;
			return (
				(device_name &&
					device_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
				(brand && brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
				(custom_model &&
					custom_model.toLowerCase().includes(searchTerm.toLowerCase()))
			);
		});
		setFilteredData(filtered);
	}, [searchTerm, data]);
	const handleDeviceClick = (id: string) => {
		router.push(`/assets/${id}`);
	};
	return (
		<div>
			<Table
				data={filteredData}
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
						title: 'Brand',
						dataIndex: 'brand',
					},
					{
						title: 'Model',
						dataIndex: 'custom_model',
					},
					{
						title: 'Actions',
						render: (record) => (
							<div
								className="flex w-full justify-center cursor-pointer"
								onClick={() => handleDeviceClick(record._id)}>
								<Icon type="OutlinedDotsVertical" color="black" />
							</div>
						),
					},
				]}
			/>
		</div>
	);
}
