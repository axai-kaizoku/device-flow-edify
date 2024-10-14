// src/components/IssueTable.tsx
'use client';
import React, { useState } from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { Issues, issueSearchAPI } from '@/server/issueActions';
import { useRouter } from 'next/navigation';
import { SearchInput } from '../../people/_components/search-params';
import { filterUsers } from '@/server/filterActions'; // Updated import

function IssueTable({ data }: { data: Issues[] }) {
	const router = useRouter();
	const [issue, setIssue] = useState<Issues[]>(data);
	const [showFilter, setShowFilter] = useState(false); // State to show/hide filter modal
	const [filterField, setFilterField] = useState<string>('status'); // Default field to filter
	const [filterType, setFilterType] = useState<string>('like'); // Default filter type
	const [filterValue, setFilterValue] = useState<string>(''); // Filter value input

	const handleFilteredData = (filtered: Issues[]) => {
		setIssue(filtered);
	};

	const handleIssueClick = (id: string) => {
		router.push(`/issues/${id}`);
	};

	const handleFilterApply = async () => {
		if (!filterField || !filterType || !filterValue) {
			alert('Please fill in all filter fields.');
			return;
		}

		let finalFilterValue = filterValue.trim();

		// Handle 'like' operator by adding wildcards
		if (filterType === 'like') {
			finalFilterValue = `%${finalFilterValue}%`;
		}

		// Optionally, convert to lowercase to handle case insensitivity if API requires
		finalFilterValue = finalFilterValue.toLowerCase();

		// Prepare the filter
		const filters: [string, string, string][] = [
			[filterField, filterType, finalFilterValue],
		];

		console.log('Applying Filter:', { modelName: 'Issue', filters });

		try {
			// Call the search API with the filter, passing modelName as 'Issue'
			const filteredIssues = await filterUsers({ modelName: 'Issue', filters });
			console.log('Filtered Issues:', filteredIssues); // Verify the response

			if (filteredIssues && Array.isArray(filteredIssues.documents)) {
				setIssue(filteredIssues.documents); // Update the table data
			} else if (filteredIssues && Array.isArray(filteredIssues)) {
				setIssue(filteredIssues); // If API returns an array directly
			} else {
				console.error('Invalid response structure:', filteredIssues);
				alert('Unexpected response from the server.');
			}

			setShowFilter(false); // Close the filter modal
		} catch (error) {
			console.error('Error applying filters:', error);
			alert('Failed to apply filters. Please try again.');
		}
	};

	return (
		<div>
			{/* Search Input Component */}
			<SearchInput
				onFiltered={handleFilteredData}
				data={issue}
				searchAPI={issueSearchAPI}
				queryName="query"
			/>

			{/* Filter Button */}
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
				onClick={() => setShowFilter(!showFilter)}>
				Filter
			</button>

			{/* Filter Modal */}
			{showFilter && (
				<div className="bg-white shadow-lg p-4 mt-4 rounded">
					<h3 className="text-lg font-bold">Apply Filters</h3>
					<div className="mt-4 flex flex-col gap-4">
						{/* Field Dropdown */}
						<div>
							<label
								htmlFor="filterField"
								className="block text-sm font-medium text-gray-700">
								Field
							</label>
							<select
								id="filterField"
								className="mt-1 block w-full border p-2 rounded"
								value={filterField}
								onChange={(e) => setFilterField(e.target.value)}>
								<option value="title">Title</option>
								<option value="description">Description</option>
								<option value="userName">Raised by</option>
								<option value="email">User Email</option>
								<option value="priority">Priority</option>
								<option value="status">Status</option>
								<option value="serial_no">Serial No</option>
							</select>
						</div>

						{/* Filter Type Dropdown */}
						<div>
							<label
								htmlFor="filterType"
								className="block text-sm font-medium text-gray-700">
								Filter Type
							</label>
							<select
								id="filterType"
								className="mt-1 block w-full border p-2 rounded"
								value={filterType}
								onChange={(e) => setFilterType(e.target.value)}>
								<option value="equals">Equals</option>
								<option value="not equals">Not Equals</option>
								<option value="like">Like</option>
								<option value=">">Greater Than</option>
								<option value="<">Less Than</option>
							</select>
						</div>

						{/* Filter Value Input */}
						<div>
							<label
								htmlFor="filterValue"
								className="block text-sm font-medium text-gray-700">
								Value
							</label>
							<input
								id="filterValue"
								className="mt-1 block w-full border p-2 rounded"
								type="text"
								placeholder="Enter value"
								value={filterValue}
								onChange={(e) => setFilterValue(e.target.value)}
							/>
						</div>

						{/* Apply Filter Button */}
						<button
							className="bg-green-500 text-white px-4 py-2 rounded"
							onClick={handleFilterApply}>
							Apply Filters
						</button>
					</div>
				</div>
			)}

			{/* Table displaying the issues */}
			{issue && issue.length > 0 ? (
				<Table
					data={issue}
					columns={[
						{
							title: 'Title',
							dataIndex: 'title',
						},
						{
							title: 'Description',
							dataIndex: 'description',
						},
						{
							title: 'Raised by',
							dataIndex: 'userName',
						},
						{
							title: 'User Email',
							dataIndex: 'email',
						},
						{
							title: 'Priority',
							dataIndex: 'priority',
						},
						{
							title: 'Issued At',
							render: (data: Issues) => (
								<div className="w-full flex justify-center">
									<div>
										{data.createdAt
											? new Date(data.createdAt).toLocaleDateString()
											: 'NULL'}
									</div>
								</div>
							),
						},
						{
							title: 'Status',
							dataIndex: 'status',
						},
						{
							title: 'Serial No',
							dataIndex: 'serial_no',
						},
						{
							title: 'Actions',
							render: (record: Issues) => (
								<div
									className="flex w-full justify-center cursor-pointer"
									onClick={() => handleIssueClick(record.id || '')}>
									<Icon type="OutlinedDotsVertical" color="black" />
								</div>
							),
						},
					]}
				/>
			) : (
				<div className="text-center text-gray-500 mt-4">No issues found.</div>
			)}
		</div>
	);
}

export default IssueTable;
