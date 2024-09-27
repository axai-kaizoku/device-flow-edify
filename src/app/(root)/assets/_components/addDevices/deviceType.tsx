import { bulkUploadDevices } from '@/server/deviceActions';
import {
	Keyboard,
	Laptop,
	Monitor,
	Mouse,
	SmartphoneCharging,
	Star,
} from 'lucide-react';
import React, { useState, useRef } from 'react';

type FormType = {
	deviceType: string;
};

type DeviceTypeProps = {
	data: string;
	setData: (newData: string) => void;
	error?: string;
};

function DeviceType({ data, setData, error }: DeviceTypeProps) {
	const [selectedDevice, setSelectedDevice] = useState<string | null>(
		data || '',
	);
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for hidden file input

	const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setCsvFile(e.target.files[0]);
			handleBulkUpload(e.target.files[0]); // Automatically trigger upload when file is selected
		}
	};

	const handleBulkUpload = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		try {
			const response = await bulkUploadDevices(formData); // Call the API
			alert('Bulk upload successful!');
			console.log('Bulk upload response:', response);
		} catch (error) {
			console.error('Error during bulk upload:', error);
			alert('Bulk upload failed. Please try again.');
		}
	};

	const handleSelect = (device: string) => {
		setSelectedDevice(device);
		setData(device);
	};

	const handleFileUploadClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Trigger hidden file input click
		}
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
				<div className="flex justify-between my-8 items-center">
					<h1 className="text-lg font-medium">Device Type</h1>
					<div className="mt-6">
						<button
							className="bg-black text-white py-2 px-4 rounded w-full transition duration-300 hover:bg-gray-800"
							onClick={handleFileUploadClick}>
							Upload CSV
						</button>
						{/* Hidden file input */}
						<input
							type="file"
							accept=".csv"
							ref={fileInputRef}
							onChange={handleCSVChange}
							className="hidden"
						/>
					</div>
				</div>

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
					{error && (
						<p className="text-red-500 text-sm font-medium transition-all duration-300">
							{error}
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export default DeviceType;
