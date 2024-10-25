// extraDetails.tsx

import React, { useState } from 'react';
import { Address, getAddress } from '@/server/addressActions';
import { fetchUsers, User } from '@/server/userActions';
import { Dropdown } from '@/components/dropdown/dropdown';
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
	const [assignedOptions, setAssignedOptions] = useState<string[]>([]);
	const [locationsOptions, setLocationsOptions] = useState<string[]>([]);
	const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);
	const [formData, setFormData] = useState<ExtraDetailsInterface>(
		data || {
			brand: '',
			assignedTo: '',
			officeLocation: {
				name: '',
				value: ''
			},
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
		(field: string) =>
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedOption = e.target.options[e.target.selectedIndex];
			setFormData((prev) => ({
				...prev,
				[field]: {
					name: selectedOption.text,
					value: e.target.value,
				},
			}));
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

	const fetchAPIs = async () => {
		try {
			const [assignedUsers, officeLocations]: [User[], Address[]] =
				await Promise.all([fetchUsers(), getAddress()]);

			const assignedUserNames = assignedUsers.map((user) => user.email);
			const locationNames: string[] = officeLocations
				.map((address) => address.city)
				.filter((city): city is string => city !== undefined);

			setAssignedOptions(assignedUserNames);
			setLocationsOptions(locationNames);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const imageUrl = URL.createObjectURL(file);
			setFormData((prevData) => ({
				...prevData,
				image: imageUrl, // Store the selected file
			}));
			setData({
				...formData,
				image: imageUrl,
			});
		}
	};

	const handleNameFocus = () => {
		if (!isDropdownActive) {
			setIsDropdownActive(true);
			fetchAPIs(); // Invoke the function
		}
	};

	return (
		<div className="flex flex-col w-full">
			<h1 className="text-xl py-4">Extra Details</h1>
			<div className="flex flex-wrap gap-4">
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
				<div className="flex flex-col w-72">
					<label>Assigned to</label>

					<ApiDropdown
						fetching={fetchUsers}
						name="userId"
						resName="first_name"
						value={formData.assignedTo.value}
						onChange={handleApiChange('assignedTo')}
						placeholder="Select a User to Assign"
					/>
					
				</div>


				<div className="flex flex-col w-72">
					<label>Office Location</label>

					<ApiDropdown
						fetching={getAddress}
						name="addressId"
						resName="city"
						value={formData.officeLocation.value}
						onChange={handleApiChange('officeLocation')}
						placeholder="Select a Location"
					/>

					{errors?.assignedTo && (
						<p className="text-red-500 text-sm">{errors.officeLocation}</p>
					)}
				
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
					{errors?.purchaseOrder && (
						<p className="text-red-500 text-sm">{errors.purchaseOrder}</p>
					)}
				</div>
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
				<div className="flex flex-col w-72">
					<label>Ownership</label>
					<Dropdown
						items={['Rent', 'Not work', 'Rented', 'Lost']}
						onSelect={handleOwnershipChange}
					/>
					{errors?.ownership && (
						<p className="text-red-500 text-sm">{errors.ownership}</p>
					)}
				</div>
				{/* New image upload field */}
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
			</div>
		</div>
	);
};

export default ExtraDetails;
