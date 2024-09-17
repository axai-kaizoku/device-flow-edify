import React, { useState } from 'react';

function ExtraDetails({ data, onUpdate }: any) {
	const [formData, setFormData] = useState(
		data || {
			brand: '',
			assignedTo: '',
			officeLocation: '',
			purchaseOrder: '',
			purchaseValue: '',
			ownership: '',
		},
	);

	const handleChange = (e: any) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormData((prev: any) => ({ ...prev, [name]: newValue }));
		onUpdate({ ...formData, [name]: newValue });
	};

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold py-5">Extra Details</h1>
			<div className="py-4">
				<label>Brand</label>
				<input
					type="text"
					name="brand"
					value={formData.brand}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Assigned To</label>
				<input
					type="text"
					name="assignedTo"
					value={formData.assignedTo}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Office Location</label>
				<input
					type="text"
					name="officeLocation"
					value={formData.officeLocation}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Purchase Order</label>
				<input
					type="text"
					name="purchaseOrder"
					value={formData.purchaseOrder}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Purchase Value</label>
				<input
					type="number"
					name="purchaseValue"
					value={formData.purchaseValue}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
				/>
			</div>
			<div className="py-4">
				<label>Ownership</label>
				<select
					name="ownership"
					value={formData.ownership}
					onChange={handleChange}
					className="px-2 py-3 w-full border border-gray-300 rounded-lg">
					<option value="">Select Ownership</option>
					<option value="company">Company</option>
					<option value="personal">Personal</option>
				</select>
			</div>
		</div>
	);
}

export default ExtraDetails;
