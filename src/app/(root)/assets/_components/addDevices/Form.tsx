import { Icon } from '@/components/wind/Icons';
import React, { useState } from 'react';
import DeviceType from './deviceType';
import BasicDetails from './basicDetailsDevice';
import AdvanceDeviceDetails from './advanceDeviceDetails';
import ExtraDetails from './extraDetails';
import { createDevices, Device } from '@/server/deviceActions';

function Form() {
	const [step, setStep] = useState(1);

	const [formData, setFormData] = useState({
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
			assignedTo: '',
			officeLocation: '',
			purchaseOrder: '',
			purchaseValue: 0,
			ownership: '',
		},
	});

	// Utility function to update nested form data
	const updateFormData = (section: string, data: any) => {
		setFormData((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				...data,
			},
		}));
		console.log('Updated Form Data:', formData); // Log the form data after updating
	};

	const handleNextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const handlePrevStep = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	};

	const handleSubmit = async () => {
		try {
			console.log('Form Data Before Submission:', formData); // Add this line to check the form data

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
				warranty_expiary_date: formData.advanceDeviceDetails.warrantyExpiryDate,
				brand: formData.extraDetails.brand,
				ownership: formData.extraDetails.ownership,
				purchase_value: formData.extraDetails.purchaseValue,
				asset_serial_no: 'Asset serial no',
			};

			const response = await createDevices(deviceDetails);
			console.log('Device Details', response);
		} catch (error) {
			console.log(error);
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
					setData={(data: any) =>
						setFormData((prev) => ({ ...prev, deviceType: data }))
					}
				/>
			)}
			{step === 2 && (
				<BasicDetails
					data={formData.basicDetails}
					setData={(data: any) => updateFormData('basicDetails', data)}
				/>
			)}
			{step === 3 && (
				<AdvanceDeviceDetails
					data={formData.advanceDeviceDetails}
					setData={(data: any) => updateFormData('advanceDeviceDetails', data)}
				/>
			)}
			{step === 4 && (
				<ExtraDetails
					data={formData.extraDetails}
					setData={(data: any) => updateFormData('extraDetails', data)}
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
						className="flex items-center justify-center gap-2  bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800"
						onClick={handleNextStep}>
						Next
						<Icon type="OutlinedArrowRight" color="white" />
					</button>
				) : (
					<button
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
