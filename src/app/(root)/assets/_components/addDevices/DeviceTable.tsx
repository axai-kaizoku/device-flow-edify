'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { useRouter } from 'next/navigation';
import { devicesFields, filterDevice } from '@/server/filterActions';
import { Device } from '@/server/deviceActions';
import { useSearchParams } from 'next/navigation';

interface DeviceTableProps {
	data: Device[];
}

const numericFields = [
	'purchase_value',
	'warranty_expiry_date',
	'ram',
	'storage',
];
const numericOperators = ['>=', '<=', '>', '<', 'Equals'];
const generalOperators = ['Equals', 'Not Equals', 'Like', 'In', 'Not In', 'Is'];

export default function DeviceTable({ data }: DeviceTableProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [device, setDevice] = useState(data);
	const [originalData, setOriginalData] = useState(data); // Store original data
	const [searchTerm, setSearchTerm] = useState(
		searchParams.get('search') || '',
	);
	const [openFilter, setOpenFilter] = useState(false);
	const [filterField, setFilterField] = useState('');
	const [filterType, setFilterType] = useState('');
	const [filterValue, setFilterValue] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [availableOperators, setAvailableOperators] =
		useState(generalOperators);
	const [filtersApplied, setFiltersApplied] = useState(false); // Track if filters are applied

	// Update available operators based on the selected field
	useEffect(() => {
		if (numericFields.includes(filterField)) {
			setAvailableOperators(numericOperators);
		} else {
			setAvailableOperators(generalOperators);
		}
	}, [filterField]);

	const handleFilterApply = async () => {
		if (!filterField || !filterType || !filterValue) {
			alert('Please fill in all filter fields.');
			return;
		}

		let finalFilterValue = filterValue.trim();

		// Handle 'like' operator by adding wildcards
		if (filterType === 'Like') {
			finalFilterValue = `%${finalFilterValue}%`;
		}

		if (filterField === 'purchase_value') {
			finalFilterValue = parseInt(finalFilterValue);
		}
		// Prepare the filter
		const filters = [filterField, filterType, finalFilterValue];

		console.log('Applying Filter:', { modelName: 'Issue', filters });

		try {
			// Call the search API with the filter, passing modelName as 'Issue'
			const filteredIssues = await filterDevice(filters);
			console.log('Filtered Issues:', filteredIssues); // Verify the response

			if (filteredIssues && Array.isArray(filteredIssues.devices)) {
				setDevice(filteredIssues.devices); // Update the table data
				setFiltersApplied(true); // Set filters as applied
			} else {
				console.error('Invalid response structure:', filteredIssues);
				alert('Unexpected response from the server.');
			}

			setOpenFilter(false); // Close the filter modal
		} catch (error) {
			console.error('Error applying filters:', error);
			alert('Failed to apply filters. Please try again.');
		}
	};

	const handleResetFilters = () => {
		setDevice(originalData); // Reset to original data
		setFilterField(''); // Clear filter field
		setFilterType(''); // Clear filter type
		setFilterValue(''); // Clear filter value
		setFiltersApplied(false); // Reset filters applied status
		setOpenFilter(false); // Close the filter modal
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-4 w-full">
				<button
					className="bg-gray-400 p-2 rounded text-black w-40"
					onClick={() => setOpenFilter(!openFilter)}>
					Filter
				</button>
				{filtersApplied && (
					<button
						className="bg-red-400 p-2 rounded text-white w-10"
						onClick={handleResetFilters}>
						X
					</button>
				)}
			</div>
			{openFilter && (
				<div className="py-4">
					<div className="flex gap-2">
						<select
							value={filterField}
							onChange={(e) => setFilterField(e.target.value)}
							className="border w-60 rounded p-2 outline-none focus:ring-2">
							<option value="">Select Field</option>
							{devicesFields.map((key) => (
								<option key={key} value={key}>
									{key}
								</option>
							))}
						</select>
						<select
							value={filterType}
							onChange={(e) => setFilterType(e.target.value)}
							className="border w-60 rounded p-2 outline-none focus:ring-2">
							<option value="">Select Operator</option>
							{availableOperators.map((operator) => (
								<option key={operator} value={operator}>
									{operator}
								</option>
							))}
						</select>
						<input
							type="text"
							value={filterValue}
							onChange={(e) => setFilterValue(e.target.value)}
							className="border w-60 rounded p-2 outline-none focus:ring-2"
						/>
						<button
							className="bg-blue-500 p-2 rounded text-white"
							onClick={handleFilterApply}>
							Apply Filter
						</button>
					</div>
				</div>
			)}
			<Table
				data={device}
				columns={[
					{
						title: 'Device',
						dataIndex: 'device_name',
					},
					{
						title: 'Assigned to',
						dataIndex: 'userName',
					},
					{
						title: 'Serial Number',
						dataIndex: 'serial_no',
					},
					{
						title: 'Warranty Status',
						render: (record: Device) => (
							<span>{record.warranty_status ? 'Active' : 'Inactive'}</span>
						),
					},
					{
						title: 'Price',
						dataIndex: 'purchase_value',
					},
					{
						title: 'Brand',
						dataIndex: 'brand',
					},
					{
						title: 'Model',
						dataIndex: 'custom_model',
					},
					{
						title: 'Actions',
						render: (record: Device) => (
							<div
								className="flex w-full justify-center cursor-pointer"
								onClick={() => {
									router.push(`/assets/${record._id}`);
								}}>
								<Icon type="OutlinedDotsVertical" color="black" />
							</div>
						),
					},
				]}
			/>
			<div className="flex justify-between mt-4">
				<button disabled={page === 1}>Previous</button>
				<span>
					Page {page} of {totalPages}
				</span>
				<button disabled={page === totalPages}>Next</button>
			</div>
		</div>
	);
}
