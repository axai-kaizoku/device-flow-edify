import { Dropdown } from '@/components/dropdown/Dropdown';
import React, { useState } from 'react';

type FormType = {
	brand: string;
	assignedTo: string;
	officeLocation: string;
	purchaseOrder: string;
	purchaseValue: number;
	ownership: string; // Update the type for ownership to string
};

type ExtraDetailsType = {
	data: FormType;
	setData: (newData: FormType) => void;
};

function ExtraDetails({ data, setData }: ExtraDetailsType) {
	const [formData, setFormData] = useState<FormType>(
		data || {
			brand: '',
			assignedTo: '',
			officeLocation: '',
			purchaseOrder: '',
			purchaseValue: 0,
			ownership: '', // Initialize ownership
		},
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setData({
			...formData,
			[name]: value,
		});
	};

	const handleOwnershipChange = (value: string) => {
		setFormData((prevData) => ({
			...prevData,
			ownership: value, // Update ownership
		}));
		setData({
			...formData,
			ownership: value,
		});
	};

	return (
		<>
			<div className="flex flex-col w-full">
				<h1 className="text-xl py-4">Advance Details</h1>
				<div className="flex flex-wrap gap-4">
					<div className="flex flex-col w-72 ">
						<label>Brand</label>
						<input
							name="brand"
							value={formData.brand}
							onChange={handleChange}
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72 ">
						<label>Assigned to</label>
						<input
							name="assignedTo"
							value={formData.assignedTo}
							onChange={handleChange}
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Office Location</label>
						<input
							name="officeLocation"
							value={formData.officeLocation}
							onChange={handleChange}
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Purchase Order</label>
						<input
							name="purchaseOrder"
							value={formData.purchaseOrder}
							onChange={handleChange}
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Purchase Value</label>
						<input
							name="purchaseValue"
							value={formData.purchaseValue}
							onChange={handleChange}
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Ownership</label>
						<Dropdown
							items={['Rent', 'Not work', 'Rented', 'Lost']}
							onSelect={handleOwnershipChange}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ExtraDetails;
