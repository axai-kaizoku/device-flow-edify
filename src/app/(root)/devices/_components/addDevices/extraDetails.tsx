// import React, { useState } from 'react';

// function ExtraDetails({ data, onUpdate }: any) {
// 	const [formData, setFormData] = useState(
// 		data || {
// 			brand: '',
// 			assignedTo: '',
// 			officeLocation: '',
// 			purchaseOrder: '',
// 			purchaseValue: '',
// 			ownership: '',
// 		},
// 	);

// 	const handleChange = (e: any) => {
// 		const { name, value, type, checked } = e.target;
// 		const newValue = type === 'checkbox' ? checked : value;
// 		setFormData((prev: any) => ({ ...prev, [name]: newValue }));
// 		onUpdate({ ...formData, [name]: newValue });
// 	};

// 	return (
// 		<div className="flex flex-col">
// 			<h1 className="text-2xl font-bold py-5">Extra Details</h1>
// 			<div className="py-4">
// 				<label>Brand</label>
// 				<input
// 					type="text"
// 					name="brand"
// 					value={formData.brand}
// 					onChange={handleChange}
// 					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
// 				/>
// 			</div>
// 			<div className="py-4">
// 				<label>Assigned To</label>
// 				<input
// 					type="text"
// 					name="assignedTo"
// 					value={formData.assignedTo}
// 					onChange={handleChange}
// 					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
// 				/>
// 			</div>
// 			<div className="py-4">
// 				<label>Office Location</label>
// 				<input
// 					type="text"
// 					name="officeLocation"
// 					value={formData.officeLocation}
// 					onChange={handleChange}
// 					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
// 				/>
// 			</div>
// 			<div className="py-4">
// 				<label>Purchase Order</label>
// 				<input
// 					type="text"
// 					name="purchaseOrder"
// 					value={formData.purchaseOrder}
// 					onChange={handleChange}
// 					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
// 				/>
// 			</div>
// 			<div className="py-4">
// 				<label>Purchase Value</label>
// 				<input
// 					type="number"
// 					name="purchaseValue"
// 					value={formData.purchaseValue}
// 					onChange={handleChange}
// 					className="px-2 py-3 w-full border border-gray-300 rounded-lg"
// 				/>
// 			</div>
// 			<div className="py-4">
// 				<label>Ownership</label>
// 				<select
// 					name="ownership"
// 					value={formData.ownership}
// 					onChange={handleChange}
// 					className="px-2 py-3 w-full border border-gray-300 rounded-lg">
// 					<option value="">Select Ownership</option>
// 					<option value="company">Company</option>
// 					<option value="personal">Personal</option>
// 				</select>
// 			</div>
// 		</div>
// 	);
// }

// export default ExtraDetails;
import { Dropdown } from '@/components/dropdown/Dropdown';
import React from 'react';

function ExtraDetails() {
	return (
		<>
			<div className="flex flex-col w-full">
				<h1 className="text-xl py-4">Advance Details</h1>
				<div className="flex flex-wrap gap-4">
					<div className="flex flex-col w-72 ">
						<label>Brand</label>
						<input
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72 ">
						<label>Assigned to</label>
						<input
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Office Location</label>
						<input
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Purchase Order</label>
						<input
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Purchase Value</label>
						<input
							type="text"
							className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
						/>
					</div>
					<div className="flex flex-col w-72">
						<label>Ownership</label>
						<Dropdown items={['Rent', 'Not work', 'Rented', 'Lost']} />
					</div>
				</div>
				<div className="flex flex-col py-4 w-fit">
					<label>Recall to Inventory</label>
					<div className="flex gap-3 py-2 w-full">
						<button className="flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded w-full transition duration-300 hover:bg-gray-800">
							Pick up from office
						</button>
						<button className="flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded w-full transition duration-300 hover:bg-gray-800">
							Just assign
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ExtraDetails;
