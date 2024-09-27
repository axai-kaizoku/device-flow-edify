import { Icon } from '@/components/wind/Icons';
import React, { useState } from 'react';

type FormType = {
	model: string;
	processor: string;
	ram: string;
	storage: string;
	os: string;
	device_name: string;
};

type BasicDetailsForm = {
	data: FormType;
	setData: (newData: FormType) => void;
};

function BasicDetails({ data, setData }: BasicDetailsForm) {
	const [selectedOS, setSelectedOS] = useState<string | null>(data.os || '');
	const [formData, setFormData] = useState<FormType>(
		data || {
			model: '',
			processor: '',
			os: '',
			ram: '',
			storage: '',
			device_name: '',
		},
	);

	// Handle text inputs
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
		setData({
			...formData,
			[name]: value,
		});
	};

	// Handle OS selection
	const handleSelectOS = (os: string) => {
		setSelectedOS(os);
		setFormData((prevData) => ({
			...prevData,
			os: os,
		}));
		setData({
			...formData,
			os: os,
		});
	};

	const operatingSystems = [
		{
			id: 'macos',
			name: 'MacOS',
			description: 'High Sierra, Monterey, Ventura',
			icon: <Icon type={'OutlinedNote'} color="black" />,
		},
		{
			id: 'windows',
			name: 'Windows',
			description: 'Windows 8, Windows 10, Windows 11',
			icon: <Icon type={'OutlinedNote'} color="black" />,
		},
		{
			id: 'others',
			name: 'Others',
			description: 'Linux, DOS, Chrome OS',
			icon: <Icon type={'OutlinedNote'} color="black" />,
		},
	];

	return (
		<>
			<div className="flex flex-col">
				<h1 className="text-2xl font-bold py-5">Basic Details</h1>
				<p className="text-lg py-2">Operating System</p>

				<div className="flex flex-wrap mb-7 gap-4">
					{operatingSystems.map((os) => (
						<div
							key={os.id}
							className={`px-4 py-6 flex items-start border rounded-lg w-80 cursor-pointer ${
								selectedOS === os.id ? 'border-black' : 'border-gray-300'
							}`}
							onClick={() => handleSelectOS(os.id)}>
							<input
								type="radio"
								id={os.id}
								checked={selectedOS === os.id}
								onChange={() => handleSelectOS(os.id)}
								className="mr-3 h-4 w-4 mt-1 accent-black"
							/>
							<label htmlFor={os.id} className="flex flex-col">
								<p className="flex items-center font-medium gap-2">
									{os.icon}
									{os.name}
								</p>
								<span className="text-sm text-gray-500">{os.description}</span>
							</label>
						</div>
					))}
				</div>
				<div>
					<p className="text-lg py-2">Models</p>
					<input
						type="text"
						name="model"
						value={formData.model}
						onChange={handleChange}
						placeholder="What is the laptop lineup"
						className="px-2 focus:outline-none py-3 w-full rounded-lg border border-gray-200"
					/>
					<div className="py-6 flex justify-between flex-wrap gap-3">
						<div className="flex flex-col">
							<label>Processor</label>
							<input
								type="text"
								name="processor"
								value={formData.processor}
								onChange={handleChange}
								className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
							/>
						</div>
						<div className="flex flex-col">
							<label>RAM</label>
							<input
								type="text"
								name="ram"
								value={formData.ram}
								onChange={handleChange}
								className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
							/>
						</div>
						<div className="flex flex-col">
							<label>Storage</label>
							<input
								type="text"
								name="storage"
								value={formData.storage}
								onChange={handleChange}
								className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
							/>
						</div>
						<div className="flex flex-col">
							<label>Device Name</label>
							<input
								type="text"
								name="device_name"
								value={formData.device_name}
								onChange={handleChange}
								className="focus:outline-none px-2 w-52 py-3 rounded-lg border border-gray-200"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BasicDetails;
