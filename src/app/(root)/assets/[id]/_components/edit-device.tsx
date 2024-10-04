'use client';
import { CombinedContainer } from '@/components/container/container';
import React, { useState } from 'react';
import { deleteDevice, updateDevice } from '@/server/deviceActions'; // Import your delete and update functions
import { useRouter } from 'next/navigation';
import { DeleteDevice } from './delete-device';
// import { useSearchParams } from 'next/navigation';
function EditDevice({ data }: { data: any }) {
	const [isEditing, setIsEditing] = useState(false);
	const [deviceData, setDeviceData] = useState(data);
	const navigate = useRouter();
	// const params = useSearchParams();
	// console.log(params);
	// Handle Delete
	const handleDelete = async () => {
		const confirmed = confirm('Are you sure you want to delete this device?');
		if (confirmed) {
			const deletedDevice = await deleteDevice(data._id);
			if (deletedDevice) {
				navigate.push('/assets');
				// Redirect or perform any post-delete action
			}
		}
	};

	// Handle Edit Save
	const handleSave = async () => {
		const updatedDevice = await updateDevice(data._id, deviceData);
		if (updatedDevice) {
			alert('Device updated successfully');
			setIsEditing(false);
			setDeviceData(updatedDevice);
		}
	};

	return (
		<>
			<div className="p-6 space-y-4">
				<h1 className="text-2xl font-bold">Device Details</h1>

				{isEditing ? (
					<div className="flex flex-col space-y-2">
						{/* Editable Form */}
						<input
							type="text"
							value={deviceData.device_name}
							onChange={(e) =>
								setDeviceData({ ...deviceData, device_name: e.target.value })
							}
							placeholder="Device Name"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.device_type}
							onChange={(e) =>
								setDeviceData({ ...deviceData, device_type: e.target.value })
							}
							placeholder="Device Type"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.serial_no}
							onChange={(e) =>
								setDeviceData({ ...deviceData, serial_no: e.target.value })
							}
							placeholder="Serial Number"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.asset_serial_no}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									asset_serial_no: e.target.value,
								})
							}
							placeholder="Asset Serial Number"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.ram}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									ram: e.target.value,
								})
							}
							placeholder="RAM"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.processor}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									processor: e.target.value,
								})
							}
							placeholder="Processor"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.storage}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									storage: e.target.value,
								})
							}
							placeholder="Storage"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.brand}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									brand: e.target.value,
								})
							}
							placeholder="Brand"
							className="border p-2"
						/>
						<input
							type="date"
							value={deviceData.device_purchase_date}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									device_purchase_date: e.target.value,
								})
							}
							placeholder="Purchase Date"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.warranty_status}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									warranty_status: e.target.value,
								})
							}
							placeholder="Warranty Status"
							className="border p-2"
						/>
						<input
							type="date"
							value={deviceData.warranty_expiary_date}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									warranty_expiary_date: e.target.value,
								})
							}
							placeholder="Warranty Expiary"
							className="border p-2"
						/>
						<input
							type="date"
							value={deviceData.city}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									city: e.target.value,
								})
							}
							placeholder="Device Location"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.ownership}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									ownership: e.target.value,
								})
							}
							placeholder="Ownership"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.os}
							onChange={(e) =>
								setDeviceData({
									...deviceData,
									os: e.target.value,
								})
							}
							placeholder="OS"
							className="border p-2"
						/>
						<input
							type="text"
							value={deviceData.custom_model}
							onChange={(e) =>
								setDeviceData({ ...deviceData, custom_model: e.target.value })
							}
							placeholder="Model"
							className="border p-2"
						/>
						{/* Repeat inputs for other fields as needed */}

						<button
							onClick={handleSave}
							className="bg-gray-500 text-white p-2 rounded">
							Save Changes
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="bg-gray-500 text-white p-2 rounded">
							Cancel
						</button>
					</div>
				) : (
					<div className="flex flex-col space-y-2">
						<p>
							<strong>Device Name:</strong> {deviceData.device_name}
						</p>
						<p>
							<strong>Model:</strong> {deviceData.custom_model}
						</p>
						<p>
							<strong>Brand:</strong> {deviceData.brand}
						</p>
						<p>
							<strong>Serial Number:</strong> {deviceData.serial_no}
						</p>
						<p>
							<strong>OS:</strong> {deviceData.os}
						</p>
						<p>
							<strong>Processor:</strong> {deviceData.processor}
						</p>
						<p>
							<strong>RAM:</strong> {deviceData.ram}
						</p>
						<p>
							<strong>Storage:</strong> {deviceData.storage}
						</p>
						<p>
							<strong>Warranty Status:</strong>{' '}
							{deviceData.warranty_status ? 'Active' : 'Inactive'}
						</p>
						<p>
							<strong>Purchase Date:</strong> {deviceData.device_purchase_date}
						</p>
						<p>
							<strong>Purchase Value:</strong> {deviceData.purchase_value}
						</p>
						<p>
							<strong>Device Location:</strong> {deviceData.city}
						</p>
						<p>
							<strong>Asset Serial Value:</strong> {deviceData.asset_serial_no}
						</p>
						<p>
							<strong>Purchase Order:</strong> {deviceData.purchase_order}
						</p>
						{/* Buttons for Edit and Delete */}
						<div className="space-x-4">
							<button
								onClick={() => setIsEditing(true)}
								className="bg-slate-400 text-white p-2 rounded">
								Edit
							</button>
							<DeleteDevice id={data._id}>
								<button className="bg-red-500 p-2 rounded">Delete</button>
							</DeleteDevice>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default EditDevice;
