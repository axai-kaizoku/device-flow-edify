// app/assets/_components/addDevices/DeviceTable.tsx

'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { useRouter } from 'next/navigation';
import { Device, deviceSearchAPI } from '@/server/deviceActions';
import { SearchInput } from '@/app/(root)/users/_components/search-params';

interface DeviceTableProps {
	data: Device[];
	searchTerm: string;
}

export default function DeviceTable({ data, searchTerm }: DeviceTableProps) {
	const [filteredData, setFilteredData] = useState<Device[]>(data);
	const router = useRouter();
	const [device, setDevice] = useState(data);
	const handleFilteredData = (filtered: typeof data) => {
		setDevice(filtered);
	};
	useEffect(() => {
		const filtered = data.filter((device: Device) => {
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
			<SearchInput
				data={device}
				onFiltered={handleFilteredData}
				searchAPI={deviceSearchAPI}
				queryName="query"
			/>
			<Table
				data={device}
				columns={[
					{
						title: 'Device',
						dataIndex: 'device_name',
					},
					{
						title: 'Assigned to',
						dataIndex: 'userName', // Ensure 'userName' exists in Device type or adjust accordingly
					},
					{
						title: 'Serial Number',
						dataIndex: 'serial_no',
					},
					{
						title: 'Warranty Status',
						render: (record: Device) => (
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
						render: (record: any) => (
							<div
								className="flex w-full justify-center cursor-pointer"
								onClick={() => handleDeviceClick(record._id || '')} // Handle undefined '_id'
							>
								<Icon type="OutlinedDotsVertical" color="black" />
							</div>
						),
					},
				]}
			/>
		</div>
	);
}
