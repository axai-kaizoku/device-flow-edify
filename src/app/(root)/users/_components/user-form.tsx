//// @ts-nocheck
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

export const UserForm = ({
	closeBtn,
	isEditForm,
	userData,
}: {
	closeBtn?: any;
	isEditForm?: boolean;
	userData?: CreateUserArgs | User;
}) => {
	const router = useRouter();
	const [next, setNext] = useState(0);

	const [formData, setFormData] = useState({
		firstN: userData ? userData.first_name : '',
		lastN: userData ? userData.last_name : '',
		phone: userData ? userData.phone : '',
		email: userData ? userData.email : '',
		designation: userData ? userData.designation : '',
		team: userData?.teamId ? userData.teamId.name : '',
		reportM: userData?.reporting_manager ? userData.reporting_manager.name : '',
		gender: userData ? userData.gender : '',
		employment: userData ? userData.employment_type : '',
		dob: userData ? userData.date_of_birth : '',
		onboarding: userData ? userData.onboarding_date : '',
		marital_status: userData ? userData.marital_status : '',
		physically_handicapped: userData ? userData.physically_handicapped : '',
		interests_and_hobbies: userData ? userData.interests_and_hobbies : '',
		about: userData ? userData.about : '',
	});

	const designations = [
		{ label: 'Frontend Developer', value: 'frontend-developer' },
		{ label: 'Backend Developer', value: 'backend-developer' },
		{ label: 'QC', value: 'qc' },
	];

	const genders = [
		{ label: 'Male', value: 'male' },
		{ label: 'Female', value: 'female' },
	];

	const employments = [
		{ label: 'Full Time', value: 'full_time' },
		{ label: 'Internship', value: 'internship' },
		{ label: 'Part Time', value: 'part_time' },
		{ label: 'Contract', value: 'contract' },
	];

	const handleSubmit = async (e: any) => {
		const user = {
			first_name: formData.firstN,
			last_name: formData.lastN,
			email: formData.email,
			phone: formData.phone,
			designation: formData.designation,
			teamId: formData.team,
			onboarding_date: formData.onboarding,
			reporting_manager: formData.reportM,
			employment_type: formData.employment,
			date_of_birth: formData.dob,
			gender: formData.gender,
			marital_status: formData.marital_status,
			physically_handicapped: formData.physically_handicapped,
			interests_and_hobbies: formData.interests_and_hobbies,
			about: formData.about,
		};

		if (isEditForm) {
			if (user) {
				await updateUser(userData?._id!, user);
				router.refresh();
				closeBtn(false);
			}
		} else {
			if (user) {
				await createUser(user);
				console.log(user);
				router.refresh();
				closeBtn(false);
			}
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
								requiredKeys={[
									'first_name',
									'last_name',
									'email',
									'password',
									'phone',
									'reporting_manager',
									'employment_type',
									'about',
									'interests_and_hobbies',
									'date_of_birth',
									'gender',
									'marital_status',
									'physically_handicapped',
									'onboarding_date',
								]}
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
										onChange={(e) =>
											setFormData({ ...formData, gender: e.target.value })
										}
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
										value={formData.reportM}
										onChange={(e: any) =>
											setFormData({ ...formData, reportM: e.target.value })
										}
										placeholder="Select Reporting Manager"
									/>
								</div>
							</div>

							<div className="flex justify-end">
								<Button
									onClick={() => setNext(1)}
									hoverColor="#000000"
									type="submit"
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
										onChange={(e) =>
											setFormData({ ...formData, designation: e.target.value })
										}
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
										onChange={(e: any) =>
											setFormData({ ...formData, team: e.target.value })
										}
										value={formData.team}
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
										onChange={(e) =>
											setFormData({ ...formData, employment: e.target.value })
										}
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
									onClick={() => {}}
									hoverColor="#000000"
									type={next === 1 ? 'submit' : 'button'}
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
