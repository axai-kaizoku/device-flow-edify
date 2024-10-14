'use client';

import { useState } from 'react';

type ApiDropdownProps = {
	fetching: () => Promise<any[]>; // API call to fetch the dropdown options
	name: string; // Name for the input field
	value: string; // Current value of the input
	onChange: any; // Function to handle input change
	placeholder?: string; // Optional placeholder text
	resName: string;
};

export default function ApiDropdown({
	fetching,
	name,
	value,
	onChange,
	placeholder = 'Select an option',
	resName,
}: ApiDropdownProps) {
	const [apiOptions, setApiOptions] = useState<any[]>([]);
	const [isApiDropdownActive, setIsApiDropdownActive] = useState(false);

	const fetchApi = async () => {
		try {
			const apiRes = await fetching(); // Fetch the data
			const apiResNames = apiRes.map((val) => ({
				name: val[`${resName}`],
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
			fetchApi(); // Fetch data only on first focus
		}
	};

	return (
		<div>
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange} // Pass the selected value to parent
				onClick={handleApiNameFocus}
				list="apiOptions"
				placeholder={placeholder}
				className="focus:outline-none px-2 w-full py-2 rounded-lg border border-gray-200"
			/>
			<datalist id="apiOptions">
				{apiOptions.map((option) => (
					<option key={option.id} className="bg-red-100" value={option.name}>
						{/* {option.name} */}
					</option>
				))}
			</datalist>
		</div>
	);
}
