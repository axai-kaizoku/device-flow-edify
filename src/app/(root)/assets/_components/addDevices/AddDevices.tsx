// Adjust the import path
import { getAllDevices } from '@/server/deviceActions';
import Header from './Header';
import DeviceTable from './DeviceTable';

async function AddDevices() {
	const devices = await getAllDevices();

	return (
		<div className="flex flex-col gap-12">
			<Header button="Add Device" total={devices.length} />
			<DeviceTable data={devices} />
		</div>
	);
}

export default AddDevices;
