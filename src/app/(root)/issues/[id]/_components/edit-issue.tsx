'use client';

import { useState } from 'react';
import { DeleteIssues } from './delete-issue';
import { updateIssue } from '@/server/issueActions';

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
				<h1 className="text-2xl font-bold">Issues Details</h1>

				{isEditing ? (
					<div className="flex flex-col space-y-2">
						{/* Editable Form */}
						<input
							type="text"
							value={issueData.title}
							onChange={(e) =>
								setIssueData({ ...issueData, title: e.target.value })
							}
							placeholder="Title"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.description}
							onChange={(e) =>
								setIssueData({ ...issueData, description: e.target.value })
							}
							placeholder="Description"
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
							value={issueData.userName}
							onChange={(e) =>
								setIssueData({
									...issueData,
									userName: e.target.value,
								})
							}
							placeholder="User Name"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.email}
							onChange={(e) =>
								setIssueData({
									...issueData,
									email: e.target.value,
								})
							}
							placeholder="Email"
							className="border p-2"
						/>
						<input
							type="text"
							value={issueData.serial_no}
							onChange={(e) =>
								setIssueData({
									...issueData,
									serial_no: e.target.value,
								})
							}
							placeholder="Serial No"
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
							<strong>Raised by:</strong> {issueData.userName}
						</p>
						<p>
							<strong>Title</strong> {issueData.title}
						</p>
						<p>
							<strong>Priority:</strong> {issueData.priority}
						</p>
						<p>
							<strong>Status</strong> {issueData.status}
						</p>
						<p>
							<strong>Created at:</strong> {issueData.createdAt}
						</p>
						<p>
							<strong>Description:</strong> {issueData.description}
						</p>
						<p>
							<strong>Serial Number:</strong> {issueData.serial_no}
						</p>
						<p>
							<strong>Email:</strong> {issueData.email}
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
