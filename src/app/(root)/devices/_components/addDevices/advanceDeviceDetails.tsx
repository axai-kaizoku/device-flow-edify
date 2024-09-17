import React, { useRef, useState } from 'react';

function AdvanceDeviceDetails({ data, onUpdate }: any) {
	const [formData, setFormData] = useState(
		data || {
			serialNumber: '',
			invoiceFile: null,
			purchaseDate: '',
			warrantyDate: '',
		},
	);
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileUploadClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev: any) => ({ ...prev, [name]: value }));
		onUpdate({ ...formData, [name]: value });
	};

	const handleFileChange = (e: any) => {
		const file = e.target.files[0];
		setFormData((prev: any) => ({ ...prev, invoiceFile: file }));
		onUpdate({ ...formData, invoiceFile: file });
	};

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold py-5">Advance Details</h1>
			<div className="py-4">
				<label>Serial Number</label>
				<input
					type="text"
					name="serialNumber"
					value={formData.serialNumber}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Purchase Date</label>
				<input
					type="date"
					name="purchaseDate"
					value={formData.purchaseDate}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Warranty Date</label>
				<input
					type="date"
					name="warrantyDate"
					value={formData.warrantyDate}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Invoice File</label>
				<div
					className="px-2 py-3 w-full border border-gray-300 rounded-lg cursor-pointer"
					onClick={handleFileUploadClick}>
					{formData.invoiceFile ? formData.invoiceFile.name : 'Upload Invoice'}
				</div>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
				/>
			</div>
		</div>
	);
}

export default AdvanceDeviceDetails;
