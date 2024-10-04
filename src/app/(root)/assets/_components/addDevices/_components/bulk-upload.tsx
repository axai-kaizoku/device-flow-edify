'use client';
import { bulkUploadDevices } from '@/server/deviceActions';
import React, { useRef, useState } from 'react';
import { checkForDuplicates, parseCSV } from './CSVHelper';
import { useRouter } from 'next/navigation';
type dataProps = {
	closeBtn: () => void;
};
function BulkUpload({ closeBtn }: dataProps) {
	const [csvError, setCsvError] = useState<string | null>(null);
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
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
	];

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

				if (headers.length !== requiredKeys.length) {
					setCsvError(
						`Invalid number of fields. Expected ${requiredKeys.length} fields but got ${headers.length}.`,
					);
					return;
				}

				const missingKeys = requiredKeys.filter(
					(key) => !headers.includes(key),
				);
				if (missingKeys.length > 0) {
					setCsvError(`Missing fields: ${missingKeys.join(', ')}`);
					return;
				}

				// Check for empty values in required fields
				const emptyRows = data.filter((row) => {
					return requiredKeys.some((key) => !row[key]);
				});

				if (emptyRows.length > 0) {
					setCsvError(`Some rows are empty`);
					return;
				}

				const duplicateCheck = checkForDuplicates(data);
				if (duplicateCheck.hasDuplicates) {
					setCsvError(
						`Duplicate records found. Row(s): ${duplicateCheck.duplicateRows.join(
							', ',
						)}`,
					);
					return;
				}

				// Clear errors and proceed with uploading
				setCsvError(null);
				handleBulkUpload(file);
			} catch (err) {
				setCsvError('Error parsing the file. Please ensure it is a valid CSV.');
			}
		};

		reader.onerror = () => {
			setCsvError('Error reading the file.');
		};

		reader.readAsText(file);

		// Reset file input value after parsing
		if (fileInputRef.current) {
			fileInputRef.current.value = ''; // Reset value after file change
		}
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

	const handleFileUploadClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Trigger hidden file input click
		}
	};

	const downloadSampleCSV = () => {
		const csvContent =
			'device_name,asset_serial_no,ram,processor,storage,warranty_expiary_date,os,price,ownership,purchase_order,device_type,brand,model,serial_no\n' +
			'Sample Device,123456789,8GB,Intel i5,512GB SSD,2025-12-31,Windows 10,800,Company,PO1234,Laptop,Dell,Inspiron 15,DELL12345';

		const blob = new Blob([csvContent], { type: 'text/csv' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'sample.csv';
		link.click();
	};
	return (
		<div>
			<div className="flex justify-between my-8 items-center">
				<h1 className="text-lg font-medium">Device Type</h1>
				<div className="mt-6 flex space-x-4">
					<button
						className="bg-black text-white py-2 px-4 rounded transition duration-300 hover:bg-gray-800"
						onClick={handleFileUploadClick}>
						Upload CSV
					</button>
					<button
						className="bg-gray-200 text-black py-2 px-4 rounded transition duration-300 hover:bg-gray-400"
						onClick={downloadSampleCSV}>
						Download Sample CSV
					</button>
					<input
						type="file"
						accept=".csv"
						ref={fileInputRef}
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								validateCSV(e.target.files[0]);
							}
						}}
						className="hidden"
					/>
				</div>
			</div>

			{csvError && (
				<p className="text-red-500 text-sm font-medium transition-all duration-300 mb-4">
					{csvError}
				</p>
			)}
		</div>
	);
}

export default BulkUpload;
