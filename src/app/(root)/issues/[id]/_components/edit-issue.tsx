'use client';

import { updateIssue } from '@/server/issueActions';
import { useState } from 'react';
import { DeleteIssues } from './delete-issue';

// import { useSearchParams } from 'next/navigation';
function EditIssue({ data }: { data: any }) {
	const [isEditing, setIsEditing] = useState(false);
	const [issueData, setIssueData] = useState(data);

	// Handle Edit Save
	const handleSave = async () => {
		const updatedIssue = await updateIssue(data._id, issueData);
		if (updatedIssue) {
			alert('Issue updated successfully');
			setIsEditing(false);
			setIssueData(updatedIssue);
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
							value={issueData.userId}
							onChange={(e) =>
								setIssueData({ ...issueData, userId: e.target.value })
							}
							placeholder="userId"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.orgId}
							onChange={(e) =>
								setIssueData({ ...issueData, orgId: e.target.value })
							}
							placeholder="Org Id"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.status}
							onChange={(e) =>
								setIssueData({ ...issueData, status: e.target.value })
							}
							placeholder="Status"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.priority}
							onChange={(e) =>
								setIssueData({
									...issueData,
									priority: e.target.value,
								})
							}
							placeholder="Priority"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.createdAt}
							onChange={(e) =>
								setIssueData({
									...issueData,
									createdAt: e.target.value,
								})
							}
							placeholder="Created at"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.processor}
							onChange={(e) =>
								setIssueData({
									...issueData,
									processor: e.target.value,
								})
							}
							placeholder="Processor"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.storage}
							onChange={(e) =>
								setIssueData({
									...issueData,
									storage: e.target.value,
								})
							}
							placeholder="Storage"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.brand}
							onChange={(e) =>
								setIssueData({
									...issueData,
									brand: e.target.value,
								})
							}
							placeholder="Brand"
							className="border p-2"
						/>
						<input
							type="date"
							value={issueData.device_purchase_date}
							onChange={(e) =>
								setIssueData({
									...issueData,
									device_purchase_date: e.target.value,
								})
							}
							placeholder="Purchase Date"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.warranty_status}
							onChange={(e) =>
								setIssueData({
									...issueData,
									warranty_status: e.target.value,
								})
							}
							placeholder="Warranty Status"
							className="border p-2"
						/>
						<input
							type="date"
							value={issueData.warranty_expiary_date}
							onChange={(e) =>
								setIssueData({
									...issueData,
									warranty_expiary_date: e.target.value,
								})
							}
							placeholder="Warranty Expiary"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.ownership}
							onChange={(e) =>
								setIssueData({
									...issueData,
									ownership: e.target.value,
								})
							}
							placeholder="Ownership"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.os}
							onChange={(e) =>
								setIssueData({
									...issueData,
									os: e.target.value,
								})
							}
							placeholder="OS"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.custom_model}
							onChange={(e) =>
								setIssueData({ ...issueData, custom_model: e.target.value })
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
							<strong>Device Name:</strong> {issueData.device_name}
						</p>
						<p>
							<strong>Model:</strong> {issueData.custom_model}
						</p>
						<p>
							<strong>Brand:</strong> {issueData.brand}
						</p>
						<p>
							<strong>Serial Number:</strong> {issueData.serial_no}
						</p>
						<p>
							<strong>OS:</strong> {issueData.os}
						</p>
						<p>
							<strong>Processor:</strong> {issueData.processor}
						</p>
						<p>
							<strong>RAM:</strong> {issueData.ram}
						</p>
						<p>
							<strong>Storage:</strong> {issueData.storage}
						</p>
						<p>
							<strong>Warranty Status:</strong>{' '}
							{issueData.warranty_status ? 'Active' : 'Inactive'}
						</p>
						<p>
							<strong>Purchase Date:</strong> {issueData.device_purchase_date}
						</p>
						<p>
							<strong>Purchase Value:</strong> {issueData.purchase_value}
						</p>
						<p>
							<strong>Asset Serial Value:</strong> {issueData.asset_serial_no}
						</p>
						<p>
							<strong>Purchase Order:</strong> {issueData.purchase_order}
						</p>
						{/* Buttons for Edit and Delete */}
						<div className="space-x-4">
							<button
								onClick={() => setIsEditing(true)}
								className="bg-slate-400 text-white p-2 rounded">
								Edit
							</button>
							<DeleteIssues id={data._id}>
								<button className="bg-red-500 p-2 rounded">Delete</button>
							</DeleteIssues>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default EditIssue;
