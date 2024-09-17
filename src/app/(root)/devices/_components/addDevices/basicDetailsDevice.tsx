import React, { useState } from 'react';

function BasicDetails({ data, onUpdate }: any) {
	const [formData, setFormData] = useState(
		data || { os: '', model: '', processor: '', ram: '', storage: '' },
	);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev: any) => ({ ...prev, [name]: value }));
		onUpdate({ ...formData, [name]: value });
	};

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold py-5">Basic Details</h1>
			<div className="py-4">
				<label>Operating System</label>
				<input
					type="text"
					name="os"
					value={formData.os}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Model</label>
				<input
					type="text"
					name="model"
					value={formData.model}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Processor</label>
				<input
					type="text"
					name="processor"
					value={formData.processor}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>RAM</label>
				<input
					type="text"
					name="ram"
					value={formData.ram}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Storage</label>
				<input
					type="text"
					name="storage"
					value={formData.storage}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
		</div>
	);
}

export default BasicDetails;
