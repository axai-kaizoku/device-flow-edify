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
	return (
		<div className="flex flex-col gap-12">
			<DevicesHeader totalDocuments={totalDocuments} button="Add Device" />
			<DeviceTable data={devices} />
		</div>
	);
}

export default AddDevices;
