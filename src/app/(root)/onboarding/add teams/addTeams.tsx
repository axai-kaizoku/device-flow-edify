import React, { useState } from 'react';

// Reusable Input Field Component
const InputField = ({
	label,
	type = 'text',
	name,
	value,
	onChange,
	disabled = false,
}: {
	label: string;
	type?: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}) => (
	<div className="mb-4">
		<label className="block mb-2">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			className="w-full px-3 py-2 border border-gray-300 rounded-lg"
		/>
	</div>
);

// Reusable Select Field Component
const SelectField = ({
	label,
	name,
	value,
	onChange,
	options,
}: {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: { label: string; value: string }[];
}) => (
	<div className="mb-4">
		<label className="block mb-2">{label}</label>
		<select
			name={name}
			value={value}
			onChange={onChange}
			className="w-full px-3 py-2 border border-gray-300 rounded-lg">
			<option value="">Select {label}</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	</div>
);

// Reusable File Input Field Component
const FileInputField = ({
	label,
	name,
	onChange,
	multiple = false,
}: {
	label: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	multiple?: boolean;
}) => (
	<div className="mb-4">
		<label className="block mb-2">{label}</label>
		<input
			type="file"
			name={name}
			onChange={onChange}
			multiple={multiple}
			className="w-full"
		/>
	</div>
);

function AddTeams() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		team: '',
		designation: '',
		reportingManager: '',
		doesNotReport: false,
		employmentType: '',
		joiningDate: '',
		assignedDevice: '',
		profileImage: null,
		documents: null,
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		if (files) {
			setFormData((prevData) => ({
				...prevData,
				[name]: files[0],
			}));
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: checked,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Handle form submission (e.g., send data to server)
		console.log('Form Data:', formData);
	};

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-5">Add Teams</h1>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						label="Title"
						name="title"
						value={formData.firstName}
						onChange={handleChange}
					/>
					<InputField
						label="Description"
						name="description"
						value={formData.lastName}
						onChange={handleChange}
					/>
					<InputField
						label="Image URL"
						type="url"
						name="image"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				{/* Submit Button */}
				<div className="mt-6">
					<div className="flex justify-between">
						<button className="w-fit px-3 py-2 bg-black text-white rounded-lg hover:bg-black">
							Add team
						</button>
						<button className="w-fit px-3 py-2 bg-black text-white rounded-lg hover:bg-black">
							Continue
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddTeams;
