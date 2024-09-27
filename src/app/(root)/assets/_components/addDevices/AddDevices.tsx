import { useState, useEffect } from 'react';
// Adjust the import path
import { Table } from '@/components/wind/Table';
import { getAllDevices } from '@/server/deviceActions';
import Header from './Header';
import { Icon } from '@/components/wind/Icons';

function AddDevices() {
	const [devices, setDevices] = useState([]);

	useEffect(() => {
		const fetchDevices = async () => {
			try {
				const deviceData = await getAllDevices();
				setDevices(deviceData || []);
			} catch (error) {
				console.error('Error loading devices:', error);
			}
		};

		fetchDevices();
	}, []);

	return (
		<div className="flex flex-col gap-12">
			<Header button="Add Device" />
			<Table
				data={devices}
				columns={[
					{
						title: 'Device',
						dataIndex: 'device_name',
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
