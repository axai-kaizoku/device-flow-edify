'use client';

import { useState } from 'react';
import Header from './DevicesHeader';
import DeviceTable from './DeviceTable';
import { Device } from '@/server/deviceActions';
interface AddDevicesProps {
	devices: Device[];
}
function AddDevices({ devices }: AddDevicesProps) {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className="flex flex-col gap-12">
			<Header
				button="Add Device"
				total={devices.length}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			<DeviceTable data={devices} searchTerm={searchTerm} />
		</div>
	);
}

export default AddDevices;
