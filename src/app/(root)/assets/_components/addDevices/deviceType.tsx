'use client';

import { bulkUploadDevices } from '@/server/deviceActions';
import {
	Keyboard,
	Laptop,
	Monitor,
	Mouse,
	SmartphoneCharging,
	Star,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';

type FormType = {
	deviceType: string;
};

type DeviceTypeProps = {
	data: string;
	setData: (newData: string) => void;
	error?: string;
	closeBtn: () => void;
};

function DeviceType({ data, setData, error, closeBtn }: DeviceTypeProps) {
	const router = useRouter();
	const [selectedDevice, setSelectedDevice] = useState<string | null>(
		data || '',
	);
	const [csvFile, setCsvFile] = useState<File | null>(null);
	const [csvError, setCsvError] = useState<string | null>(null); // Error state for CSV validation
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Required keys for the CSV file
	const requiredKeys = [
		'device_name',
		'asset_serial_no',
		'ram',
		'processor',
		'storage',
		'warranty_expiary_date',
		'os',
		'price',
		'ownership',
		'purchase_order',
		'device_type',
		'brand',
		'model',
		'serial_no',
		'warranty_status',
	];

	const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setCsvFile(file);
			validateCSV(file); // Validate before uploading
		}
	};

	// Simple CSV parser without external libraries
	const parseCSV = (csvText: string): { headers: string[]; data: any[] } => {
		const lines = csvText.trim().split('\n');
		const headers = lines[0].split(',').map((header) => header.trim());
		const data = lines.slice(1).map((line) => {
			const values = line.split(',').map((value) => value.trim());
			const entry: { [key: string]: string } = {};
			headers.forEach((header, index) => {
				entry[header] = values[index] || '';
			});
			return entry;
		});
		return { headers, data };
	};

	// Validate CSV keys
	const validateCSV = (file: File) => {
		const reader = new FileReader();
		reader.onload = (event) => {
			const csvText = event.target?.result as string;
			if (!csvText) {
				setCsvError('The file is empty or not formatted correctly.');
				return;
			}

			try {
				const { headers, data } = parseCSV(csvText);
				const missingKeys = requiredKeys.filter(
					(key) => !headers.includes(key),
				);

				if (missingKeys.length > 0) {
					setCsvError(`Missing keys: ${missingKeys.join(', ')}`);
				} else {
					setCsvError(null); // No error, proceed to bulk upload
					handleBulkUpload(file);
				}
			} catch (err) {
				setCsvError('Error parsing the file. Please ensure it is a valid CSV.');
			}
		};

		reader.onerror = () => {
			setCsvError('Error reading the file.');
		};

		reader.readAsText(file);
	};

	const handleBulkUpload = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		try {
			const response = await bulkUploadDevices(formData); // Call the API
			router.refresh();
			closeBtn();
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

				{csvError && (
					<p className="text-red-500 text-sm font-medium transition-all duration-300 mb-4">
						{csvError}
					</p>
				)}

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
