'use client';

import { useState, useEffect } from 'react';

type ApiDropdownProps = {
	fetching: () => Promise<any[]>; // API call to fetch the dropdown options
	name: string; // Name for the input field
	value: string; // Current value of the input (id)
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Function to handle input change
	placeholder?: string; // Optional placeholder text
	resName: string; // The field name to display (e.g., "first_name" or "title")
};

export default function ApiDropdown({
	fetching,
	name,
	value,
	onChange,
	placeholder = 'Select an option',
	resName,
}: ApiDropdownProps) {
	const [apiOptions, setApiOptions] = useState<{ name: string; id: string }[]>(
		[],
	);
	const [isApiDropdownActive, setIsApiDropdownActive] = useState(false);

	useEffect(() => {
		if (isApiDropdownActive && apiOptions.length === 0) {
			fetchApi();
		}
	}, [isApiDropdownActive]);

	const fetchApi = async () => {
		try {
			const apiRes = await fetching(); // Fetch the data
			const apiResNames = apiRes.map((val: any) => ({
				name: val[resName],
				id: val._id,
			}));
			setApiOptions(apiResNames);
		} catch (error) {
			console.error('Failed to fetch:', error);
		}
	};

	const handleApiNameFocus = () => {
		if (!isApiDropdownActive) {
			setIsApiDropdownActive(true);
		}
	};

	return (
		<div>
			<select
				name={name}
				value={value}
				onChange={onChange}
				onFocus={() => setIsApiDropdownActive(true)}
				className="focus:outline-none px-2 w-full py-2 rounded-lg border border-gray-200">
				<option value="">{placeholder}</option>
				{apiOptions.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
}
