// @ts-nocheck
'use client';

import BulkUpload from '@/components/bulk-upload';
import ApiDropdown from '@/components/dropdown/api-dropdown';
import { SelectDropdown } from '@/components/dropdown/dropdown';
import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import { fetchTeams } from '@/server/teamActions';
import {
	bulkUploadUsers,
	createUser,
	CreateUserArgs,
	fetchUsers,
	updateUser,
	User,
} from '@/server/userActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
	bulkUploadKeys,
	designations,
	employments,
	genders,
} from './helper/utils';

interface UserFormProps {
	closeBtn?: (state: boolean) => void;
	isEditForm?: boolean;
	userData?: CreateUserArgs | User;
}

export const UserForm = ({ closeBtn, isEditForm, userData }: UserFormProps) => {
	const router = useRouter();
	const [next, setNext] = useState(0);

	const [formData, setFormData] = useState({
		firstN: userData ? userData.first_name : '',
		lastN: userData ? userData.last_name : '',
		phone: userData ? userData.phone : '',
		email: userData ? userData.email : '',
		designation: userData ? userData.designation : '',
		team: userData?.teamId
			? { name: userData.teamId.title, value: userData.teamId._id }
			: { name: '', value: '' },
		reportM: userData?.reporting_manager
			? {
					name: userData.reporting_manager.first_name,
					value: userData.reporting_manager._id,
			  }
			: { name: '', value: '' },
		gender: userData ? userData.gender : '',
		employment: userData ? userData.employment_type : '',
		dob: userData ? userData.date_of_birth : '',
		onboarding: userData ? userData.onboarding_date : '',
		marital_status: userData ? userData.marital_status : '',
		physically_handicapped: userData ? userData.physically_handicapped : '',
		interests_and_hobbies: userData ? userData.interests_and_hobbies : '',
		about: userData ? userData.about : '',
	});

	const handleChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
		};

	const handleApiChange =
		(field: 'team' | 'reportM') =>
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

	const handleSubmit = async () => {
		const user = {
			first_name: formData.firstN,
			last_name: formData.lastN,
			email: formData.email,
			phone: formData.phone,
			designation: formData.designation,
			teamId: formData.team.value,
			onboarding_date: formData.onboarding,
			reporting_manager: formData.reportM.value,
			employment_type: formData.employment,
			date_of_birth: formData.dob,
			gender: formData.gender,
			marital_status: formData.marital_status,
			physically_handicapped: formData.physically_handicapped,
			interests_and_hobbies: formData.interests_and_hobbies,
			about: formData.about,
		};

		try {
			if (isEditForm) {
				await updateUser(userData?._id!, user);
			} else {
				await createUser(user);
				console.log('Front-end', user);
			}
			router.refresh();
			closeBtn?.(false);
		} catch (error) {
			console.error('Error submitting form:', error);
			// Optionally, display an error message to the user
		}
	};

	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col w-[90%] h-[80%] justify-start items-center">
				<Typography
					variant="h3"
					align="left"
					style={{ width: '100%', padding: '0.8rem 0' }}>
					{isEditForm ? 'Edit User' : 'Create a New User'}
				</Typography>
				{!isEditForm ? (
					next === 0 ? (
						<div className="w-full flex justify-between items-center py-8">
							<div className="text-lg font-semibold mt-4">Bulk Upload</div>
							<BulkUpload
								bulkApi={bulkUploadUsers}
								closeBtn={closeBtn}
								requiredKeys={bulkUploadKeys}
							/>
						</div>
					) : (
						<></>
					)
				) : (
					<></>
				)}

				<Form width="100%" formId="user-form" onFormSubmit={handleSubmit}>
					{next === 0 ? (
						<>
							<div className="w-full flex items-center gap-6">
								<Input
									label="First Name"
									rules={{ required: true }}
									width="100%"
									value={formData.firstN}
									onChange={(e) =>
										setFormData({ ...formData, firstN: e.target.value })
									}
									name="first_name"
									type="text"
								/>
								<Input
									label="Last Name"
									rules={{ required: true }}
									width="100%"
									value={formData.lastN}
									onChange={(e) =>
										setFormData({ ...formData, lastN: e.target.value })
									}
									name="last_name"
									type="text"
								/>
							</div>
							<div className="w-full flex items-center gap-6">
								<Input
									label="Email"
									rules={{
										required: true,
									}}
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									name="email"
									type="email"
									width="100%"
								/>
								<Input
									label="Phone"
									rules={{
										required: true,
									}}
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									name="phone"
									type="number"
									width="100%"
								/>
							</div>
							<div className="w-full flex items-center gap-6">
								<div className="w-1/2">
									<label className="text-sm font-semibold">Date of Birth</label>
									<br />
									<input
										type="date"
										value={formData.dob}
										onChange={(e) =>
											setFormData({ ...formData, dob: e.target.value })
										}
										className="p-2 border rounded-md"
									/>
								</div>
								<div className="w-1/2">
									<label className="text-sm font-semibold">Gender</label>
									<br />
									<SelectDropdown
										value={formData.gender}
										label="gender"
										onChange={handleChange('gender')}
										options={genders}
										name="Gender"
									/>
								</div>
							</div>
							<div className="w-full flex items-center gap-6">
								<div className="w-1/2">
									<label className="text-sm font-semibold">
										Reporting Manager
									</label>
									<ApiDropdown
										fetching={fetchUsers}
										name="reporting_manager"
										resName="first_name"
										value={formData.reportM.value}
										onChange={handleApiChange('reportM')}
										placeholder="Select Reporting Manager"
									/>
								</div>
								{/* <div className="w-1/2">
									<label className="text-sm font-semibold">Image</label>
									<input
										type="date"
										value={formData.image}
										onChange={(e) =>
											setFormData({ ...formData, image: e.target.value })
										}
										className="p-2 border rounded-md"
									/>
								</div> */}
							</div>

							<div className="flex justify-end">
								<Button
									onClick={() => setNext(1)}
									hoverColor="#000000"
									type="button" // Changed to "button" to prevent form submission
									color="black">
									Next
								</Button>
							</div>
						</>
					) : (
						<>
							<div className="w-full flex items-center gap-6">
								<div className="w-1/2">
									<label className="text-sm font-semibold">Designation</label>
									<br />
									<SelectDropdown
										label="designation"
										name="designation"
										onChange={handleChange('designation')}
										options={designations}
										value={formData.designation}
									/>
								</div>
								<div className="flex flex-col w-1/2">
									<label>Team</label>
									<ApiDropdown
										fetching={fetchTeams}
										resName="title"
										name="team"
										onChange={handleApiChange('team')}
										value={formData.team.value}
										placeholder="Select Team"
									/>
								</div>
							</div>
							<div className="w-full flex items-center gap-6">
								<div className="w-1/2">
									<label className="text-sm font-semibold">
										Employment Type
									</label>
									<br />
									<SelectDropdown
										label="employment type"
										name="employment_type"
										onChange={handleChange('employment')}
										options={employments}
										value={formData.employment}
									/>
								</div>
							</div>
							<div className="w-[48%] flex items-center gap-6">
								<div>
									<label className="text-sm font-semibold">
										Onboarding Date
									</label>
									<br />
									<input
										type="date"
										value={formData.onboarding}
										onChange={(e) =>
											setFormData({ ...formData, onboarding: e.target.value })
										}
										className="p-2 border rounded-md"
									/>
								</div>
							</div>
							<div className="flex gap-4 justify-end">
								<Button
									onClick={() => setNext(0)}
									hoverColor="#000000"
									type="button"
									color="black">
									Previous
								</Button>
								<Button
									onClick={handleSubmit} // Trigger form submission here
									hoverColor="#000000"
									type="button" // Changed to "button" to handle submission manually
									color="black">
									{isEditForm ? 'Edit User' : 'Create User'}
								</Button>
							</div>
						</>
					)}
				</Form>
			</div>
		</div>
	);
};
