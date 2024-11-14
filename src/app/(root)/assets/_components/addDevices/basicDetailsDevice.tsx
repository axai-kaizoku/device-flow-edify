// basicDetailsDevice.tsx

import { Icon } from '@/components/wind/Icons';
import { getAllDevices } from '@/server/deviceActions';
import React, { useState } from 'react';
import {
	BasicDetails as BasicDetailsInterface,
	FormErrors,
} from './_components/types';

interface BasicDetailsProps {
	data: BasicDetailsInterface;
	setData: (data: Partial<BasicDetailsInterface>) => void;
	errors: FormErrors;
	deviceType: string;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({
	data,
	setData,
	errors,
	deviceType,
}) => {
	const [selectedOS, setSelectedOS] = useState<string | null>(data.os || '');
	const [formData, setFormData] = useState<BasicDetailsInterface>(data);
	const [deviceOptions, setDeviceOptions] = useState<string[]>([]); // Store device options
	const [isDeviceDropdownActive, setDeviceDropdownActive] =
		useState<boolean>(false); // Trigger fetch on focus

	// Handle text inputs
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		const updatedFormData = {
			...formData,
			[name]: value,
		};
		setFormData(updatedFormData);
		setData(updatedFormData); // Set the data after updating formData to avoid outdated values
	};

	// Handle OS selection
	const handleSelectOS = (os: string) => {
		const updatedFormData = {
			...formData,
			os: os,
		};
		setSelectedOS(os);
		setFormData(updatedFormData);
		setData(updatedFormData); // Ensure you setData after updating formData
	};

	const fetchDevices = async () => {
		try {
			const devices = await getAllDevices(); // API call
			console.log('Devices:', devices);
			// Map to just device names if the API response returns full device objects
			const deviceNames = devices.map((device) => device.device_name);
			console.log('Device Names:', deviceNames);
			setDeviceOptions(deviceNames);
		} catch (error) {
			console.error('Failed to fetch devices:', error);
		}
	};

	// Trigger fetch when device_name is focused
	const handleDeviceNameFocus = () => {
		if (!isDeviceDropdownActive) {
			setDeviceDropdownActive(true); // Prevent multiple calls
			fetchDevices();
		}
	};

	const operatingSystems = [
		{
			id: 'macos',
			name: 'MacOS',
			description: 'High Sierra, Monterey, Ventura',
			icon: <Icon type={'OutlinedNote'} color="black" />,
		},
		{
			id: 'windows',
			name: 'Windows',
			description: 'Windows 8, Windows 10, Windows 11',
			icon: <Icon type={'OutlinedNote'} color="black" />,
		},
		{
			id: 'others',
			name: 'Others',
			description: 'Linux, DOS, Chrome OS',
			icon: <Icon type={'OutlinedNote'} color="black" />,
		},
	];

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold py-5">Basic Details</h1>
			<p className="text-lg py-2">Operating System</p>

			<div className="flex flex-wrap mb-7 gap-4">
				{deviceType === 'laptop' && // Only show OS selection for laptops
					operatingSystems.map((os) => (
						<div
							key={os.id}
							className={`px-4 py-6 flex items-start border rounded-lg w-80 cursor-pointer ${
								selectedOS === os.id ? 'border-black' : 'border-gray-300'
							}`}
							onClick={() => handleSelectOS(os.id)}>
							<input
								type="radio"
								id={os.id}
								checked={selectedOS === os.id}
								onChange={() => handleSelectOS(os.id)}
								className="mr-3 h-4 w-4 mt-1 accent-black"
							/>
							<label htmlFor={os.id} className="flex flex-col">
								<p className="flex items-center font-medium gap-2">
									{os.icon}
									{os.name}
								</p>
								<span className="text-sm text-gray-500">{os.description}</span>
							</label>
						</div>
					))}
				{deviceType !== 'laptop' && ( // Disable OS selection for non-laptops
					<p className="text-sm text-gray-500">
						Operating System selection is disabled for this device type.
					</p>
				)}
			</div>
			{errors?.os && <p className="text-red-500 text-sm">{errors.os}</p>}

			<div>
				<p className="text-lg py-2">Models</p>
				<input
					type="text"
					name="model"
					value={formData.model}
					onChange={handleChange}
					placeholder="What is the laptop lineup"
					className="px-2 focus:outline-none py-3 w-full rounded-lg border border-gray-200"
				/>
				{errors?.model && (
					<p className="text-red-500 text-sm">{errors.model}</p>
				)}

				<div className="py-6 flex justify-between flex-wrap gap-3">
					<div className="flex flex-col">
						<label>Processor</label>
						<input
							type="text"
							name="processor"
							value={formData.processor}
							onChange={handleChange}
							className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
						/>
						{errors?.processor && (
							<p className="text-red-500 text-sm">{errors.processor}</p>
						)}
					</div>
					<div className="flex flex-col">
						<label>RAM</label>
						<input
							type="text"
							name="ram"
							value={formData.ram}
							onChange={handleChange}
							className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
						/>
						{errors?.ram && (
							<p className="text-red-500 text-sm">{errors.ram}</p>
						)}
					</div>
					<div className="flex flex-col">
						<label>Storage</label>
						<input
							type="text"
							name="storage"
							value={formData.storage}
							onChange={handleChange}
							className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
						/>
						{errors?.storage && (
							<p className="text-red-500 text-sm">{errors.storage}</p>
						)}
					</div>
					<div className="flex flex-col">
						<label>Device Name</label>
						<input
							type="text"
							name="device_name"
							value={formData.device_name}
							onChange={handleChange}
							placeholder="Give a Device Name"
							className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
						/>
						{errors?.device_name && (
							<p className="text-red-500 text-sm">{errors.device_name}</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasicDetails;
