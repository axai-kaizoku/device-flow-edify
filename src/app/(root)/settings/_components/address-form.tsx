'use client';

import { Button } from '@/components/wind/Buttons';
import { Form } from '@/components/wind/Form';
import { Input } from '@/components/wind/Input';
import { Typography } from '@/components/wind/Typography';
import { createAddress, updateAddress } from '@/server/addressActions';
import { useRouter } from 'next/navigation';

export const AddressForm = ({
	closeBtn,
	isEditForm,
	id,
	city,
}: {
	closeBtn?: any;
	isEditForm?: boolean;
	id?: string;
	city?: string;
}) => {
	const router = useRouter();

	const data = {
		city: city ?? '',
	};

	const handleSubmit = async (e: any) => {
		if (isEditForm) {
			if (e.city) {
				await updateAddress(id!, e.city);
				router.refresh();
				closeBtn(false);
			}
		} else {
			if (e.city) {
				await createAddress(e.city);
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

					<div className="flex justify-end">
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
