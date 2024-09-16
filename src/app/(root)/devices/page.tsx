'use client';
import React, { useState } from 'react';
import { CombinedContainer } from '@/components/container/Container';

type Device = {
	id: number;
	name: string;
	type: string;
	os: string;
};

export default function Devices() {
	const [devices, setDevices] = useState<Device[]>([]);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState<Device>({
		id: 0,
		name: '',
		type: '',
		os: '',
	});
	const [errors, setErrors] = useState<{
		name?: string;
		type?: string;
		os?: string;
	}>({});

	const handleAddDeviceClick = () => {
		setShowForm(!showForm);
		if (showForm) {
			setFormData({ id: 0, name: '', type: '', os: '' }); // Reset form when closing
			setErrors({});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const validateForm = () => {
		const newErrors: { name?: string; type?: string; os?: string } = {};
		if (!formData.name) newErrors.name = 'Device name is required.';
		if (!formData.type) newErrors.type = 'Device type is required.';
		if (!formData.os) newErrors.os = 'OS is required.';
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			if (formData.id) {
				// Update existing device
				setDevices(
					devices.map((device) =>
						device.id === formData.id ? formData : device,
					),
				);
			} else {
				// Add new device
				setDevices([
					...devices,
					{ ...formData, id: Date.now() }, // Using timestamp as unique ID
				]);
			}
			setShowForm(false);
			setFormData({ id: 0, name: '', type: '', os: '' }); // Reset form
			setErrors({});
		}
	};

	const handleEditClick = (device: Device) => {
		setFormData(device);
		setShowForm(true);
	};

	const handleDeleteClick = (id: number) => {
		setDevices(devices.filter((device) => device.id !== id));
	};

	return (
		<CombinedContainer title="Devices">
			<div className="flex flex-col gap-5">
				<button
					className="bg-black w-fit dark:bg-white dark:text-black text-white py-2 px-4 rounded hover:opacity-90 duration-300 transition-all"
					onClick={handleAddDeviceClick}>
					{showForm ? 'Cancel' : 'Add Devices'}
				</button>
				{showForm && (
					<form
						className="flex flex-col gap-4 mt-5 border border-gray-100 shadow-md rounded-md hover:shadow-lg duration-300 transition-shadow w-1/3 p-4"
						onSubmit={handleSubmit}>
						<input
							className={`py-2 px-4 focus:outline-none rounded border border-gray-200 ${
								errors.name ? 'border-red-500' : ''
							}`}
							type="text"
							name="name"
							placeholder="Device name"
							value={formData.name}
							onChange={handleInputChange}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name}</p>
						)}
						<input
							className={`py-2 px-4 focus:outline-none rounded border border-gray-200 ${
								errors.type ? 'border-red-500' : ''
							}`}
							type="text"
							name="type"
							placeholder="Device type"
							value={formData.type}
							onChange={handleInputChange}
						/>
						{errors.type && (
							<p className="text-red-500 text-sm">{errors.type}</p>
						)}
						<input
							className={`py-2 px-4 focus:outline-none rounded border border-gray-200 ${
								errors.os ? 'border-red-500' : ''
							}`}
							type="text"
							name="os"
							placeholder="OS"
							value={formData.os}
							onChange={handleInputChange}
						/>
						{errors.os && <p className="text-red-500 text-sm">{errors.os}</p>}
						<button className="bg-black dark:bg-white dark:text-black text-white py-2 px-4 rounded hover:opacity-90 duration-300 transition-all">
							{formData.id ? 'Update' : 'Submit'}
						</button>
					</form>
				)}
				<div>
					<h1>All Devices ({devices.length})</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{devices.map((device) => (
							<div
								key={device.id}
								className="bg-black dark:bg-white dark:text-black text-white p-4 rounded-lg shadow-md hover:shadow-lg duration-300 transition-shadow">
								<h2 className="text-lg font-semibold">{device.name}</h2>
								<p className="text-sm">Type: {device.type}</p>
								<p className="text-sm">OS: {device.os}</p>
								<div className="mt-4 flex gap-2">
									<button
										className="bg-blue-400 text-white py-1 px-3 rounded hover:opacity-90 duration-300 transition-all"
										onClick={() => handleEditClick(device)}>
										Edit
									</button>
									<button
										className="bg-red-400 text-white py-1 px-3 rounded hover:opacity-90 duration-300 transition-all"
										onClick={() => handleDeleteClick(device.id)}>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</CombinedContainer>
	);
}
