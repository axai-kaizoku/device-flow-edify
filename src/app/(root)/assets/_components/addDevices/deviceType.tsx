'use client';

import {
	Keyboard,
	Laptop,
	Monitor,
	Mouse,
	SmartphoneCharging,
	Star,
} from 'lucide-react';
import React, { useState, useRef } from 'react';
import BulkUpload from './_components/bulk-upload';

type DeviceTypeProps = {
	data: string;
	setData: (newData: string) => void;
	error?: string;
	closeBtn: () => void;
};

function DeviceType({ data, setData, error, closeBtn }: DeviceTypeProps) {
	const [selectedDevice, setSelectedDevice] = useState<string | null>(
		data || '',
	);

	const handleSelect = (device: string) => {
		setSelectedDevice(device);
		setData(device);
	};

	const deviceList = [
		{ id: 'laptop', label: 'Laptop', logo: <Laptop /> },
		{ id: 'keyboard', label: 'Keyboard', logo: <Keyboard /> },
		{ id: 'mobile', label: 'Mobile', logo: <SmartphoneCharging /> },
		{ id: 'mouse', label: 'Mouse', logo: <Mouse /> },
		{ id: 'monitor', label: 'Monitor', logo: <Monitor /> },
		{ id: 'other', label: 'Other', logo: <Star /> },
	];

	return (
		<div className="w-full">
			<BulkUpload closeBtn={closeBtn} />
			<div className="grid grid-cols-2 gap-8 mb-4">
				{deviceList.map((device) => (
					<div
						key={device.id}
						className={`flex items-center border rounded-lg px-2 py-4 text-lg cursor-pointer ${
							selectedDevice === device.id ? 'border-black' : 'border-gray-300'
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
				{error && (
					<p className="text-red-500 text-sm font-medium transition-all duration-300">
						{error}
					</p>
				)}
			</div>
		</div>
	);
}

export default DeviceType;
