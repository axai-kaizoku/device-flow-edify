import React, { useState } from 'react';
import { Icon } from '@/components/wind/Icons';

function DeviceType({ data, onUpdate }: any) {
	const [selectedDevice, setSelectedDevice] = useState(data || null);

	const handleSelect = (device: string) => {
		setSelectedDevice(device);
		onUpdate(device);
	};

	const deviceList = [
		{
			id: 'laptop',
			label: 'Laptop',
			logo: (
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
			),
		},
		{
			id: 'keyboard',
			label: 'Keyboard',
			logo: (
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
			),
		},
		{
			id: 'mobile',
			label: 'Mobile',
			logo: (
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
			),
		},
		{
			id: 'mouse',
			label: 'Mouse',
			logo: (
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
			),
		},
		{
			id: 'monitor',
			label: 'Monitor',
			logo: (
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
			),
		},
		{
			id: 'other',
			label: 'Other',
			logo: (
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
			),
		},
	];

	return (
		<div className="w-full">
			<h1 className="text-lg font-medium mb-4">Device Type</h1>
			<div className="grid grid-cols-2 gap-4">
				{deviceList.map((device) => (
					<div
						key={device.id}
						className={`flex items-center border rounded-lg p-2 cursor-pointer ${
							selectedDevice === device.id ? 'border-black' : 'border-gray-300'
						}`}
						onClick={() => handleSelect(device.id)}>
						<input
							type="radio"
							id={device.id}
							name="device"
							checked={selectedDevice === device.id}
							onChange={() => handleSelect(device.id)}
							className="mr-2 h-10 w-4 accent-black"
						/>
						<label
							htmlFor={device.id}
							className="flex justify-center items-center gap-2">
							{device.logo}
							{device.label}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default DeviceType;
