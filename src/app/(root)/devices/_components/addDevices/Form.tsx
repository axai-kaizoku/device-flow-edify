// import React, { useState } from 'react';
// import { Icon } from '@/components/wind/Icons';
// import DeviceType from './deviceType';
// import BasicDetails from './basicDetailsDevice';
// import AdvanceDeviceDetails from './advanceDeviceDetails';
// import ExtraDetails from './extraDetails';

// function Form() {
// 	// State to track current step
// 	const [step, setStep] = useState(1);

// 	// State to collect form data
// 	const [formData, setFormData] = useState({
// 		deviceType: '',
// 		basicDetails: {
// 			os: '',
// 			model: '',
// 			processor: '',
// 			ram: '',
// 			storage: '',
// 		},
// 		advanceDeviceDetails: {
// 			serialNumber: '',
// 			invoiceFile: null,
// 			purchaseDate: '',
// 			warrantyDate: '',
// 		},
// 		extraDetails: {
// 			brand: '',
// 			assignedTo: '',
// 			officeLocation: '',
// 			purchaseOrder: '',
// 			purchaseValue: '',
// 			ownership: '',
// 		},
// 	});

// 	// Handle next step
// 	const handleNext = () => {
// 		setStep(step + 1);
// 	};

// 	// Handle previous step
// 	const handleBack = () => {
// 		setStep(step - 1);
// 	};

// 	// Handle form submission
// 	const handleSubmit = () => {
// 		console.log('Final form data: ', formData);
// 	};

// 	// Handle individual form data updates
// 	const updateFormData = (section: string, data: any) => {
// 		setFormData((prev) => ({
// 			...prev,
// 			[section]: data,
// 		}));
// 	};

// 	return (
// 		<div className="flex flex-col justify-center items-start pt-12 px-4 space-y-6">
// 			<div className="flex justify-start items-center gap-2 text-xl font-semibold">
// 				<Icon
// 					type="OutlinedLaptop"
// 					color="black"
// 				/>
// 				<span>Add a Device</span>
// 			</div>

// 			{step === 1 && (
// 				<DeviceType
// 					data={formData.deviceType}
// 					onUpdate={(data: any) => updateFormData('deviceType', data)}
// 				/>
// 			)}

// 			{step === 2 && (
// 				<BasicDetails
// 					data={formData.basicDetails}
// 					onUpdate={(data: any) => updateFormData('basicDetails', data)}
// 				/>
// 			)}

// 			{step === 3 && (
// 				<AdvanceDeviceDetails
// 					data={formData.advanceDeviceDetails}
// 					onUpdate={(data: any) => updateFormData('advanceDeviceDetails', data)}
// 				/>
// 			)}

// 			{step === 4 && (
// 				<ExtraDetails
// 					data={formData.extraDetails}
// 					onUpdate={(data: any) => updateFormData('extraDetails', data)}
// 				/>
// 			)}

// 			<div className="flex gap-3 w-full">
// 				{step > 1 && (
// 					<button
// 						onClick={handleBack}
// 						className="flex items-center justify-center gap-2 bg-black text-white py-2 px-6 rounded w-full transition duration-300 hover:bg-gray-800">
// 						<Icon
// 							type="OutlinedArrowLeft"
// 							color="white"
// 						/>
// 						Back
// 					</button>
// 				)}

// 				{step < 4 && (
// 					<button
// 						onClick={handleNext}
// 						className="flex text-xl items-center justify-center gap-2 bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800">
// 						Next
// 						<Icon
// 							type="OutlinedArrowRight"
// 							color="white"
// 						/>
// 					</button>
// 				)}

// 				{step === 4 && (
// 					<button
// 						onClick={handleSubmit}
// 						className="flex items-center justify-center gap-2 bg-black text-white py-2 px-6 rounded w-full transition duration-300 hover:bg-gray-800">
// 						Submit
// 						<Icon
// 							type="OutlinedSuccess"
// 							color="white"
// 						/>
// 					</button>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

// export default Form;
import { Icon } from '@/components/wind/Icons';
import React, { useState } from 'react';
import DeviceType from './deviceType';
import BasicDetails from './basicDetailsDevice';
import AdvanceDeviceDetails from './advanceDeviceDetails';
import ExtraDetails from './extraDetails';

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
			purchaseValue: '',
			ownership: '',
		},
	});

	// Utility function to update nested form data
	const updateFormData = (section: string, data: any) => {
		setFormData((prev: any) => ({
			...prev,
			[section]: {
				...prev[section],
				...data,
			},
		}));
	};

	const handleNextStep = () => {
		setStep((prevStep) => prevStep + 1);
	};

	const handlePrevStep = () => {
		setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
	};

	const handleSubmit = () => {
		// Handle the form submission logic here
		console.log('Form submitted with data: ', formData);
		// You can make an API call or any action needed here
	};

	return (
		<div className="flex flex-col justify-center items-start pt-12 px-4 space-y-6">
			<div className="flex justify-start items-center gap-2 text-xl font-semibold">
				<Icon
					type="OutlinedLaptop"
					color="black"
				/>
				<span>Add a Device</span>
			</div>

			{/* Render different components based on the current step */}
			{step === 1 && (
				<DeviceType
					data={formData.deviceType}
					setData={(data: any) =>
						updateFormData('deviceType', { deviceType: data })
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
						<Icon
							type="OutlinedArrowLeft"
							color="white"
						/>
						Back
					</button>
				)}

				{/* Conditionally render Next/Submit button based on the current step */}
				{step < 4 ? (
					<button
						className="flex items-center justify-center gap-2  bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800"
						onClick={handleNextStep}>
						Next
						<Icon
							type="OutlinedArrowRight"
							color="white"
						/>
					</button>
				) : (
					<button
						className="flex items-center justify-center gap-2 bg-black text-white py-4 px-6 rounded w-full transition duration-300 hover:bg-gray-800"
						onClick={handleSubmit}>
						Submit
						<Icon
							type="OutlinedSuccess"
							color="white"
						/>
					</button>
				)}
			</div>
		</div>
	);
}

export default Form;
