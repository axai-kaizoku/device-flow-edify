'use client';

import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import { createAddress, updateAddress } from '@/server/addressActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const AddressForm = ({
	closeBtn,
	isEditForm,
	id,
	city,
	isPrimary = false, // Optional prop to indicate if the address is primary
}: {
	closeBtn: (value: boolean) => void;
	isEditForm?: boolean;
	id?: string;
	city?: string;
	isPrimary?: boolean;
}) => {
	const router = useRouter();
	const [primaryStatus, setPrimaryStatus] = useState(isPrimary);

	const data = {
		city: city ?? '',
		isPrimary,
	};

	interface AddressFormData {
		city: string;
		isPrimary: boolean;
	}

	const handleSubmit = async (e: AddressFormData) => {
		if (isEditForm) {
			if (e.city) {
				await updateAddress(id!, e.city, primaryStatus);
				router.refresh();
				closeBtn(false);
			}
		} else {
			if (e.city) {
				await createAddress(e.city, primaryStatus);
				router.refresh();
				closeBtn(false);
			}
		}
	};

	return (
		<div className="flex justify-center items-center bg-gray-50 p-6 rounded-lg shadow-lg">
			<div className="flex flex-col w-[90%] h-[80%] justify-start items-center">
				<Typography
					variant="h3"
					align="left"
					style={{ width: '100%', padding: '0.8rem 0', color: '#333' }}>
					{isEditForm ? 'Edit Address' : 'Create a New Address'}
				</Typography>
				<Form
					prefill={{
						city: data.city,
					}}
					width="100%"
					formId="address-form"
					onFormSubmit={handleSubmit}>
					<Input
						label="City"
						rules={{ required: true }}
						width="100%"
						name="city"
						type="text"
					/>

					<Typography
						variant="body-text1"
						align="left"
						style={{ paddingTop: '1rem', paddingBottom: '0.5rem' }}>
						Set as Primary Address
					</Typography>
					<div className="flex gap-4">
						<label className="flex items-center">
							<input
								type="radio"
								name="isPrimary"
								value="yes"
								checked={primaryStatus}
								onChange={() => setPrimaryStatus(true)}
								className="mr-2 accent-blue-500"
							/>
							Yes
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="isPrimary"
								value="no"
								checked={!primaryStatus}
								onChange={() => setPrimaryStatus(false)}
								className="mr-2 accent-blue-500"
							/>
							No
						</label>
					</div>

					<div className="flex justify-end mt-4">
						<Button
							onClick={() => {}}
							hoverColor="#000000"
							type="submit"
							color="black">
							{isEditForm ? 'Edit Address' : 'Create Address'}
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};
