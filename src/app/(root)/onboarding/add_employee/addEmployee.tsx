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
				<option
					key={option.value}
					value={option.value}>
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

function AddEmployee() {
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
			<h1 className="text-2xl font-bold mb-5">Add Employee</h1>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						label="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleChange}
					/>
					<InputField
						label="Last Name"
						name="lastName"
						value={formData.lastName}
						onChange={handleChange}
					/>
					<InputField
						label="Email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
					<SelectField
						label="Team"
						name="team"
						value={formData.team}
						onChange={handleChange}
						options={[
							{ label: 'Tech', value: 'tech' },
							{ label: 'Marketing', value: 'marketing' },
							{ label: 'Finance', value: 'finance' },
							{ label: 'HR', value: 'hr' },
						]}
					/>
					<InputField
						label="Designation"
						name="designation"
						value={formData.designation}
						onChange={handleChange}
					/>
					<InputField
						label="Reporting Manager"
						name="reportingManager"
						value={formData.reportingManager}
						onChange={handleChange}
						disabled={formData.doesNotReport}
					/>
					<div className="mb-4">
						<label className="inline-flex items-center">
							<input
								type="checkbox"
								name="doesNotReport"
								checked={formData.doesNotReport}
								onChange={handleCheckboxChange}
								className="mr-2"
							/>
							Does not report to anyone
						</label>
					</div>
					<SelectField
						label="Employment Type"
						name="employmentType"
						value={formData.employmentType}
						onChange={handleChange}
						options={[
							{ label: 'Full Time', value: 'full_time' },
							{ label: 'Internship', value: 'internship' },
							{ label: 'Part Time', value: 'part_time' },
							{ label: 'Contract', value: 'contract' },
						]}
					/>
					<InputField
						label="Joining Date"
						type="date"
						name="joiningDate"
						value={formData.joiningDate}
						onChange={handleChange}
					/>
					<InputField
						label="Assigned Device"
						name="assignedDevice"
						value={formData.assignedDevice}
						onChange={handleChange}
					/>
					<FileInputField
						label="Profile Image"
						name="profileImage"
						onChange={handleFileChange}
					/>
					<FileInputField
						label="Documents"
						name="documents"
						onChange={handleFileChange}
						multiple
					/>
				</div>

				{/* Submit Button */}
				<div className="mt-6">
					<button
						type="submit"
						className="w-full px-3 py-2 bg-black text-white rounded-lg hover:bg-black">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddEmployee;
