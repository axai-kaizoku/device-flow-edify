'use client';

import { Dropdown } from '@/components/dropdown/Dropdown';
import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input, Textarea } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import {
	createUser,
	CreateUserArgs,
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
		role: userData ? userData.role : '',
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

	const roles = ['Frontend Developer', 'Backend Developer'];
	const genders = ['Male', 'Female'];
	const employments = ['Full Time', 'Part Time'];

	const teams = [
		{ name: 'Tech', id: '66f657965405df8b0ca7e086' },
		{ name: 'HR', id: '66f68d9168f3d2918d38ec21' },
		{ name: 'Finance', id: '66f696d268f3d2918d38ec90' },
	];

	const dropdownTeams = teams.map((v) => v.name);

	const reporting_managers = [
		{ name: 'Ashwini', id: '66f4fd33f12d3d8756fcbaf8' },
		{ name: 'Abhinav', id: '66f2a59efb1ea7c81cc967e6' },
	];

	const dropdownReport = reporting_managers.map((v) => v.name);

	const data = {
		_id: userData?._id,
		first_name: userData?.first_name,
		last_name: userData?.last_name,
		phone: userData?.phone,
		email: userData?.email,
		role: userData?.role,
		team: userData?.teamId,
		onboarding_date: userData?.onboarding_date,
		reporting_manager: userData?.reporting_manager,
		employment_type: userData?.employment_type,
		dob: userData?.date_of_birth,
		gender: userData?.gender,
		marital_status: userData?.marital_status,
		physically_handicapped: userData?.physically_handicapped,
		interests_and_hobbies: userData?.interests_and_hobbies,
		about: userData?.about,
	};

	const handleSubmit = async (e: any) => {
		const user = {
			first_name: formData.firstN,
			last_name: formData.lastN,
			email: formData.email,
			phone: formData.phone,
			role: formData.role,
			teamId: teams.filter((v) => {
				if (v.name === formData.team) return `${v.id}`;
			})[0].id,
			onboarding_date: formData.onboarding,
			reporting_manager: reporting_managers.filter((v) => {
				if (v.name === formData.reportM) return `${v.id}`;
			})[0].id,
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
								<div>
									<label className="text-sm font-semibold">Role</label>
									<Dropdown
										value={formData.role}
										onSelect={(e) => setFormData({ ...formData, role: e })}
										items={roles}
									/>
								</div>
								<div>
									<label className="text-sm font-semibold">Team</label>
									<Dropdown
										value={formData.team}
										onSelect={(e) => setFormData({ ...formData, team: e })}
										items={dropdownTeams}
									/>
								</div>
							</div>
							<div className="w-[48%] flex items-center gap-6">
								<div className="w-1/2">
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
								<div>
									<label className="text-sm font-semibold">
										Reporting Manger
									</label>
									<Dropdown
										value={formData.reportM}
										onSelect={(e) => setFormData({ ...formData, reportM: e })}
										items={dropdownReport}
									/>
								</div>
								<div>
									<label className="text-sm font-semibold">
										Employment Type
									</label>
									<Dropdown
										value={formData.employment}
										onSelect={(e) =>
											setFormData({ ...formData, employment: e })
										}
										items={employments}
									/>
								</div>
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
								<div>
									<label className="text-sm font-semibold">Gender</label>
									<br />
									<Dropdown
										value={formData.gender}
										onSelect={(e) => setFormData({ ...formData, gender: e })}
										items={genders}
									/>
								</div>
							</div>
							<div className="w-full flex items-center gap-6">
								<Input
									label="Maritial Status"
									rules={{
										required: true,
									}}
									value={formData.marital_status}
									onChange={(e) =>
										setFormData({ ...formData, marital_status: e.target.value })
									}
									name="maritial_status"
									type="text"
									width="100%"
								/>
								<Input
									label="Physically Handicapped"
									rules={{
										required: true,
									}}
									value={formData.physically_handicapped}
									onChange={(e) =>
										setFormData({
											...formData,
											physically_handicapped: e.target.value,
										})
									}
									name="physically_handicapped"
									type="text"
									width="100%"
								/>
							</div>

							<Input
								label="Interests and Hobbies"
								rules={{
									required: true,
								}}
								value={formData.interests_and_hobbies}
								onChange={(e) =>
									setFormData({
										...formData,
										interests_and_hobbies: e.target.value,
									})
								}
								name="interests_and_hobbies"
								type="text"
								width="100%"
							/>
							<Textarea
								rules={{ required: true }}
								label="About"
								value={formData.about}
								onChange={(e) =>
									setFormData({ ...formData, about: e.target.value })
								}
								width="100%"
								name="about"
							/>

							<div className="flex justify-end">
								<Button
									onClick={() => {}}
									hoverColor="#000000"
									type="submit"
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
