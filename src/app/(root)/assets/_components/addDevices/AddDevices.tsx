// app/assets/_components/addDevices/AddDevices.tsx

'use client';

import { useState } from 'react';
import DevicesHeader from './DevicesHeader';
import DeviceTable from './DeviceTable';
import { Device } from '@/server/deviceActions';

interface AddDevicesProps {
	devices: Device[];
	totalDocuments: number;
}

function AddDevices({ devices, totalDocuments }: AddDevicesProps) {
	const [searchTerm, setSearchTerm] = useState('');
	console.log(devices);
	return (
		<div className="flex flex-col gap-12">
			<DevicesHeader
				totalDocuments={totalDocuments}
				button="Add Device"
				total={devices.length}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<DeviceTable data={devices} />
		</div>
	);
}

export default AddDevices;
