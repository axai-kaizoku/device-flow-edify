// Form.tsx

'use client';

import { Icon } from '@/components/wind/Icons';
import React, { useState } from 'react';
import DeviceType from './deviceType';

import { createDevices, Device } from '@/server/deviceActions';
import { useRouter } from 'next/navigation';
import BasicDetails from './basicDetailsDevice';
import AdvanceDeviceDetails from './advanceDeviceDetails';
import ExtraDetails from './extraDetails';
import {
	FormData,
	FormErrors,
	BasicDetails as BasicDetailsInterface,
	AdvanceDeviceDetails as AdvanceDeviceDetailsInterface,
	ExtraDetails as ExtraDetailsInterface,
} from './_components/types';
type FormProps = {
	closeBtn: () => void; // Define the type for closeBtn
};

function Form({ closeBtn }: FormProps) {
	const [step, setStep] = useState<number>(1);
	const [errors, setErrors] = useState<FormErrors>({});
	const router = useRouter();

	const [formData, setFormData] = useState<FormData>({
		deviceType: '',
		basicDetails: {
			os: '',
			model: '',
			processor: '',
			ram: '',
			storage: '',
			device_name: '',
		},
		advanceDeviceDetails: {
			serialNumber: '',
			invoiceFile: null,
			purchaseDate: '',
			warrantyExpiryDate: '',
		},
		extraDetails: {
			brand: '',
			assignedTo: {
				name:'',
				value:''
			},
			officeLocation: {
				name:'',
				value:''
			},
			purchaseOrder: '',
			purchaseValue: 0,
			ownership: '',
			image: '',
		},
	});

	// Utility function to update nested form data with better type safety
	const updateFormData = <K extends keyof FormData>(
		section: K,
		data: Partial<FormData[K]>,
	) => {
		setFormData((prev) => ({
			...prev,
			[section]: {
				...(prev[section] as object),
				...data,
			},
		}));
	};
	const validate = (): boolean => {
		let currentErrors: FormErrors = {};

		switch (step) {
			case 1:
				if (!formData.deviceType) {
					currentErrors.deviceType = 'Please select a device type.';
				}
				break;
			case 2:
				const basic = formData.basicDetails;
				if (!basic.os) currentErrors.os = 'Operating System is required.';
				if (!basic.model) currentErrors.model = 'Model is required.';
				if (!basic.processor)
					currentErrors.processor = 'Processor is required.';
				if (!basic.ram) currentErrors.ram = 'RAM is required.';
				if (!basic.storage) currentErrors.storage = 'Storage is required.';
				if (!basic.device_name)
					currentErrors.device_name = 'Device Name is required.';
				break;
			case 3:
				const advance = formData.advanceDeviceDetails;
				if (!advance.serialNumber)
					currentErrors.serialNumber = 'Serial Number is required.';
				if (!advance.purchaseDate)
					currentErrors.purchaseDate = 'Purchase Date is required.';
				if (!advance.warrantyExpiryDate)
					currentErrors.warrantyExpiryDate =
						'Warranty Expiry Date is required.';
				if (!advance.invoiceFile)
					currentErrors.invoiceFile = 'Invoice File is required.';
				break;
			case 4:
				const extra = formData.extraDetails;
				if (!extra.brand) currentErrors.brand = 'Brand is required.';
				if (!extra.assignedTo)
					currentErrors.assignedTo = 'Assigned To is required.';
				if (!extra.officeLocation)
					currentErrors.officeLocation = 'Office Location is required.';
				if (!extra.purchaseOrder)
					currentErrors.purchaseOrder = 'Purchase Order is required.';
				if (extra.purchaseValue <= 0)
					currentErrors.purchaseValue =
						'Purchase Value must be greater than 0.';
				if (!extra.ownership)
					currentErrors.ownership = 'Ownership is required.';
				if (!extra.image) currentErrors.image = 'Device Image is required.';
				break;
			default:
				break;
		}

		setErrors(currentErrors);

		return Object.keys(currentErrors).length === 0;
	};

	const handleNextStep = () => {
		if (validate()) {
			setStep((prevStep) => prevStep + 1);
		}
	};

	const handlePrevStep = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	};

	const handleSubmit = async () => {
		if (validate()) {
			try {
				const deviceDetails: Device = {
					device_type: formData.deviceType,
					device_name: formData.basicDetails.device_name,
					os: formData.basicDetails.os,
					custom_model: formData.basicDetails.model,
					processor: formData.basicDetails.processor,
					ram: formData.basicDetails.ram,
					storage: formData.basicDetails.storage,
					serial_no: formData.advanceDeviceDetails.serialNumber,
					device_purchase_date: formData.advanceDeviceDetails.purchaseDate,
					purchase_order: formData.extraDetails.purchaseOrder,
					warranty_expiary_date:
						formData.advanceDeviceDetails.warrantyExpiryDate,
					brand: formData.extraDetails.brand,
					image: formData.extraDetails.image,
					userId: formData.extraDetails.assignedTo.value,
					ownership: formData.extraDetails.ownership,
					purchase_value: formData.extraDetails.purchaseValue,
					asset_serial_no: 'Asset serial no', // Consider making this dynamic if needed
					addressId: formData.extraDetails.officeLocation.value
				};
				console.log(formData.extraDetails);
				const response = await createDevices(deviceDetails);
				console.log('Device Details', response);
				closeBtn(); // Close the sheet after successful submission
				router.refresh();
			} catch (error) {
				console.error('Error submitting form:', error);
				// Optionally, handle the error and display a message to the user
			}
		}
	};

	return (
		<div className="flex flex-col justify-center items-start pt-12 px-4 space-y-6">
			<div className="flex justify-start items-center gap-2 text-xl font-semibold">
				<Icon type="OutlinedLaptop" color="black" />
				<span>Add a Device</span>
			</div>

			{/* Render different components based on the current step */}
			{step === 1 && (
				<DeviceType
					data={formData.deviceType}
					setData={(data: string) =>
						setFormData((prev) => ({ ...prev, deviceType: data }))
					}
					error={errors.deviceType}
					closeBtn={closeBtn}
				/>
			)}
			{step === 2 && (
				<BasicDetails
					data={formData.basicDetails}
					setData={(data: Partial<BasicDetailsInterface>) =>
						updateFormData('basicDetails', data)
					}
					errors={errors}
				/>
			)}
			{step === 3 && (
				<AdvanceDeviceDetails
					data={formData.advanceDeviceDetails}
					setData={(data: Partial<AdvanceDeviceDetailsInterface>) =>
						updateFormData('advanceDeviceDetails', data)
					}
					errors={errors}
				/>
			)}
			{step === 4 && (
				<ExtraDetails
					data={formData.extraDetails}
					setData={(data: Partial<ExtraDetailsInterface>) =>
						updateFormData('extraDetails', data)
					}
					errors={errors}
				/>
			)}

			{/* Navigation buttons */}
			<div className="flex gap-3 w-full">
				{/* Back button - only show if not on the first step */}
				{step > 1 && (
					<button
						className="flex items-center justify-center gap-2 bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800"
						onClick={handlePrevStep}>
						<Icon type="OutlinedArrowLeft" color="white" />
						Back
					</button>
				)}

				{/* Conditionally render Next/Submit button based on the current step */}
				{step < 4 ? (
					<button
						type="button"
						className="flex items-center justify-center gap-2 bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800"
						onClick={handleNextStep}>
						Next
						<Icon type="OutlinedArrowRight" color="white" />
					</button>
				) : (
					<button
						type="button"
						className="flex items-center justify-center gap-2 bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800"
						onClick={handleSubmit}>
						Submit
						<Icon type="OutlinedSuccess" color="white" />
					</button>
				)}
			</div>
		</div>
	);
}

export default Form;
