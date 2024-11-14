import React, { useState } from 'react';
import { getAddress } from '@/server/addressActions';
import { fetchUsers, User } from '@/server/userActions';
import { Dropdown } from '@/components/dropdown/Dropdown';
import ApiDropdown from '@/components/dropdown/api-dropdown';
import {
	ExtraDetails as ExtraDetailsInterface,
	FormErrors,
} from './_components/types';

interface ExtraDetailsProps {
	data: ExtraDetailsInterface;
	setData: (data: Partial<ExtraDetailsInterface>) => void;
	errors?: FormErrors;
}

const ExtraDetails: React.FC<ExtraDetailsProps> = ({
	data,
	setData,
	errors,
}) => {
	const [formData, setFormData] = useState<ExtraDetailsInterface>(
		data || {
			brand: '',
			assignedTo: { name: '', value: '' },
			officeLocation: { name: '', value: '' },
			purchaseOrder: '',
			purchaseValue: 0,
			ownership: '',
			image: '',
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

	const handleApiChange =
		(field: 'assignedTo' | 'officeLocation' | 'ownership') =>
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedOption = e.target.options[e.target.selectedIndex];
			setFormData((prev) => ({
				...prev,
				[field]: {
					name: selectedOption.text,
					value: e.target.value,
				},
			}));
			setData({
				...formData,
				[field]: {
					name: selectedOption.text,
					value: e.target.value,
				},
			});
		};

	const handleOwnershipChange = (value: string) => {
		setFormData((prevData) => ({
			...prevData,
			ownership: value,
		}));
		setData({
			...formData,
			ownership: value,
		});
	};
	const handleClearForm = () => {
		setFormData({
			brand: '',
			assignedTo: {
				name: '',
				value: '',
			},
			officeLocation: {
				name: '',
				value: '',
			},
			purchaseOrder: '',
			purchaseValue: 0,
			ownership: '',
			image: '',
		});
		setData({});
	};
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const imageUrl = URL.createObjectURL(file);
			setFormData((prevData) => ({
				...prevData,
				image: imageUrl,
			}));
			setData({
				...formData,
				image: imageUrl,
			});
		}
	};
	const ownershipValue = ['Rent', 'Not work', 'Rented', 'Lost'];
	return (
		<div className="flex flex-col w-full">
			<h1 className="text-xl py-4">Extra Details</h1>
			<div className="flex flex-wrap gap-4">
				{/* Brand */}
				<div className="flex flex-col w-72">
					<label>Brand</label>
					<input
						name="brand"
						value={formData.brand}
						onChange={handleChange}
						type="text"
						className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
					/>
					{errors?.brand && (
						<p className="text-red-500 text-sm">{errors.brand}</p>
					)}
				</div>

				{/* Assigned To */}
				<div className="flex flex-col w-72">
					<label>Assigned to</label>
					{formData.assignedTo.value ? (
						<input
							name="assignedTo"
							value={formData.assignedTo.name}
							disabled
							className="px-2 py-3 rounded-lg border border-gray-200 bg-gray-100"
						/>
					) : (
						<ApiDropdown
							fetching={fetchUsers}
							name="userId"
							resName="first_name"
							value={formData.assignedTo.value}
							onChange={handleApiChange('assignedTo')}
							placeholder="Select a User to Assign"
						/>
					)}
					{errors?.assignedTo && (
						<p className="text-red-500 text-sm">{errors.assignedTo}</p>
					)}
				</div>

				{/* Office Location */}
				<div className="flex flex-col w-72">
					<label>Office Location</label>
					{formData.officeLocation.value ? (
						<input
							name="officeLocation"
							value={formData.officeLocation.name}
							disabled
							className="px-2 py-3 rounded-lg border border-gray-200 bg-gray-100"
						/>
					) : (
						<ApiDropdown
							fetching={getAddress}
							name="addressId"
							resName="city"
							value={formData.officeLocation.value}
							onChange={handleApiChange('officeLocation')}
							placeholder="Select a Location"
						/>
					)}
					{errors?.officeLocation && (
						<p className="text-red-500 text-sm">{errors.officeLocation}</p>
					)}
				</div>

				{/* Purchase Order */}
				<div className="flex flex-col w-72">
					<label>Purchase Order</label>
					<input
						name="purchaseOrder"
						value={formData.purchaseOrder}
						onChange={handleChange}
						type="text"
						className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
					/>
					{errors?.purchaseOrder && (
						<p className="text-red-500 text-sm">{errors.purchaseOrder}</p>
					)}
				</div>

				{/* Purchase Value */}
				<div className="flex flex-col w-72">
					<label>Purchase Value</label>
					<input
						name="purchaseValue"
						value={formData.purchaseValue}
						onChange={handleChange}
						type="number"
						className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
					/>
					{errors?.purchaseValue && (
						<p className="text-red-500 text-sm">{errors.purchaseValue}</p>
					)}
				</div>

				{/* Ownership */}
				<div className="flex flex-col w-72">
					<label>Ownership</label>
					{formData.ownership ? (
						<input
							name="ownership"
							value={formData.ownership}
							disabled
							className="px-2 py-3 rounded-lg border border-gray-200 bg-gray-100"
						/>
					) : (
						<Dropdown items={ownershipValue} onSelect={handleOwnershipChange} />
					)}
					{errors?.ownership && (
						<p className="text-red-500 text-sm">{errors.ownership}</p>
					)}
				</div>
				{/* Image Upload */}
				<div className="flex flex-col w-72">
					<label>Upload Image</label>
					<input
						type="file"
						onChange={handleImageChange}
						className="focus:outline-none px-2 py-3 rounded-lg border border-gray-200"
					/>
					{errors?.image && (
						<p className="text-red-500 text-sm">{errors.image}</p>
					)}
				</div>
				{/* Clear Form Button */}
				<div className="flex justify-end w-full mt-4">
					<button
						onClick={handleClearForm}
						className="bg-red-500 text-white px-4 py-2 rounded-lg">
						Clear Form
					</button>
				</div>
			</div>
		</div>
	);
};

export default ExtraDetails;
