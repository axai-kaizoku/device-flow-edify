import {
	Keyboard,
	Laptop,
	Monitor,
	Mouse,
	SmartphoneCharging,
	Star,
} from 'lucide-react';
import React, { useState } from 'react';

type FormType = {
	deviceType: string;
};

type DeviceTypeProps = {
	data: FormType;
	setData: (newData: FormType) => void;
};

function DeviceType({ data, setData }: DeviceTypeProps) {
	const [selectedDevice, setSelectedDevice] = useState<string | null>(
		data.deviceType || '',
	);

	const handleSelect = (device: string) => {
		setSelectedDevice(device);
		setData({ deviceType: device });
	};

	const deviceList = [
		{
			id: 'laptop',
			label: 'Laptop',
			logo: <Laptop />,
		},
		{
			id: 'keyboard',
			label: 'Keyboard',
			logo: <Keyboard />,
		},
		{
			id: 'mobile',
			label: 'Mobile',
			logo: <SmartphoneCharging />,
		},
		{
			id: 'mouse',
			label: 'Mouse',
			logo: <Mouse />,
		},
		{
			id: 'monitor',
			label: 'Monitor',
			logo: <Monitor />,
		},
		{
			id: 'other',
			label: 'Other',
			logo: <Star />,
		},
	];

	return (
		<>
			<div className="w-full">
				<h1 className="text-lg font-medium my-8 ">Device Type</h1>
				<div className="grid grid-cols-2 gap-8 mb-4">
					{deviceList.map((device) => (
						<div
							key={device.id}
							className={`flex items-center border rounded-lg px-2 py-4 text-lg cursor-pointer ${
								selectedDevice === device.id
									? 'border-black'
									: 'border-gray-300'
							}`}
							onClick={() => handleSelect(device.id)}>
							<input
								type="radio"
								id={device.id}
								name="device"
								checked={selectedDevice === device.id}
								onChange={() => handleSelect(device.id)}
								className="mr-4 h-10 w-4 accent-black"
							/>
							<label
								htmlFor={device.id}
								className={`cursor-pointer ${
									selectedDevice === device.id ? 'text-black' : 'text-gray-600'
								} flex justify-center items-center gap-1`}>
								<span>{device.logo}</span>
								<span>{device.label}</span>
							</label>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default DeviceType;
