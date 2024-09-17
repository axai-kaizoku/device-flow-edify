// import React, { useState } from 'react';
// import { Icon } from '@/components/wind/Icons';

// function DeviceType({ data, onUpdate }: any) {
// 	const [selectedDevice, setSelectedDevice] = useState(data || null);

// 	const handleSelect = (device: string) => {
// 		setSelectedDevice(device);
// 		onUpdate(device);
// 	};

// 	const deviceList = [
// 		{
// 			id: 'laptop',
// 			label: 'Laptop',
// 			logo: (
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'keyboard',
// 			label: 'Keyboard',
// 			logo: (
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'mobile',
// 			label: 'Mobile',
// 			logo: (
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'mouse',
// 			label: 'Mouse',
// 			logo: (
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'monitor',
// 			label: 'Monitor',
// 			logo: (
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'other',
// 			label: 'Other',
// 			logo: (
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 			),
// 		},
// 	];

// 	return (
// 		<div className="w-full py-8">
// 			<h1 className="text-lg font-medium mb-4">Device Type</h1>
// 			<div className="grid grid-cols-2 gap-4">
// 				{deviceList.map((device) => (
// 					<div
// 						key={device.id}
// 						className={`flex items-center border rounded-lg px-2 py-4 cursor-pointer ${
// 							selectedDevice === device.id ? 'border-black' : 'border-gray-300'
// 						}`}
// 						onClick={() => handleSelect(device.id)}>
// 						<input
// 							type="radio"
// 							id={device.id}
// 							name="device"
// 							checked={selectedDevice === device.id}
// 							onChange={() => handleSelect(device.id)}
// 							className="mr-2 h-10 w-4 accent-black"
// 						/>
// 						<label
// 							htmlFor={device.id}
// 							className="flex justify-center items-center gap-2 text-lg">
// 							{device.logo}
// 							{device.label}
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 		</div>
// 	);
// }

// export default DeviceType;
import { Icon } from '@/components/wind/Icons';
import {
	Keyboard,
	Laptop,
	Monitor,
	Mouse,
	SmartphoneCharging,
	Star,
} from 'lucide-react';
import React, { useState } from 'react';

function DeviceType() {
	const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

	const handleSelect = (device: string) => {
		setSelectedDevice(device);
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
								className="mr-4  h-10 w-4 accent-black"
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
