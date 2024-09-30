'use client';

import Header from './Header';
import DeviceTable from './DeviceTable';
import { Device } from '@/server/deviceActions';
interface AddDevicesProps {
	devices: Device[];
}
function AddDevices({ devices }: AddDevicesProps) {
	return (
		<div className="flex flex-col gap-12">
			<Header button="Add Device" total={devices.length} />
			<DeviceTable data={devices} />
		</div>
	);
}

export default AddDevices;
