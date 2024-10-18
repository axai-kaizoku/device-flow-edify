'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { useRouter } from 'next/navigation';

import { Device } from '@/server/deviceActions';
import { devicesFields, filterDevice } from '@/server/filterActions';
import { useQueryState } from 'nuqs';

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
	const [device, setDevice] = useState(data);
	const [searchTerm, setSearchTerm] = useQueryState('searchQuery');
	const [openFilter, setOpenFilter] = useState(false);
	const [filters, setFilters] = useState<any[]>([]); // Store applied filters
	const [pageLength, setPageLength] = useState(20); // Default is 20
	const [filterInputs, setFilterInputs] = useState([
		{ field: '', operator: '', value: '' },
	]); // Store dynamic filter fields
	const [availableOperators, setAvailableOperators] =
		useState(generalOperators);

	const handleSearchAndFilter = async () => {
		// Combine search term and filters
		const query = {
			searchQuery: searchTerm || '',
			filters: filters.length > 0 ? filters : [],
			pageLength: pageLength,
		};

		try {
			const res = await filterDevice(query);
			setDevice(res.devices);
		} catch (error) {
			console.error('Error fetching devices:', error);
			alert('Failed to fetch data. Please try again.');
		}
	};

	// Trigger search and filter on searchTerm, filters, or pageLength change
	useEffect(() => {
		handleSearchAndFilter();
	}, [searchTerm, filters, pageLength]);

	// Add a new filter input row
	const addFilter = () => {
		setFilterInputs([...filterInputs, { field: '', operator: '', value: '' }]);
	};

	// Remove a specific filter input row
	const removeFilter = (index: number) => {
		const updatedFilters = [...filterInputs];
		updatedFilters.splice(index, 1);
		setFilterInputs(updatedFilters);
	};

	// Update available operators based on the selected field
	const handleFieldChange = (index: number, field: string) => {
		const updatedFilters = [...filterInputs];
		updatedFilters[index].field = field;
		setFilterInputs(updatedFilters);

		if (numericFields.includes(field)) {
			setAvailableOperators(numericOperators);
		} else {
			setAvailableOperators(generalOperators);
		}
	};

	const handleInputChange = (index: number, key: string, value: string) => {
		const updatedFilters = [...filterInputs];
		updatedFilters[index][key] = value;
		setFilterInputs(updatedFilters);
	};

	const handleApplyFilters = () => {
		// Validate and create filters
		const newFilters = filterInputs
			.filter((f) => f.field && f.operator && f.value)
			.map((f) => {
				let finalValue = f.value.trim();
				if (f.operator === 'Like') finalValue = `%${finalValue}%`;
				if (f.field === 'purchase_value') finalValue = parseInt(finalValue);
				return [f.field, f.operator, finalValue];
			});

		if (newFilters.length === 0) {
			alert('Please fill in all filter fields.');
			return;
		}

		setFilters(newFilters); // Set the new filters
		setOpenFilter(false); // Close filter modal
	};

	const handleResetFilters = () => {
		setFilters([]); // Clear all filters
		setSearchTerm('');
		setFilterInputs([{ field: '', operator: '', value: '' }]); // Reset filters
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				className="border p-2"
				value={searchTerm || ''}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search devices..."
			/>
			<div className="flex gap-4 w-full">
				<button
					className="bg-gray-400 p-2 rounded text-black w-40"
					onClick={() => setOpenFilter(!openFilter)}>
					Filter
				</button>
				{filters.length > 0 && (
					<button
						className="bg-red-400 p-2 rounded text-white w-10"
						onClick={handleResetFilters}>
						X
					</button>
				)}
			</div>
			{openFilter && (
				<div className="py-4">
					<div className="flex flex-col gap-4">
						{/* Dynamically render filter inputs */}
						{filterInputs.map((filter, index) => (
							<div key={index} className="flex gap-2">
								<select
									value={filter.field}
									onChange={(e) => handleFieldChange(index, e.target.value)}
									className="border w-60 rounded p-2 outline-none focus:ring-2">
									<option value="">Select Field</option>
									{devicesFields.map((key) => (
										<option key={key} value={key}>
											{key}
										</option>
									))}
								</select>
								<select
									value={filter.operator}
									onChange={(e) =>
										handleInputChange(index, 'operator', e.target.value)
									}
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
									value={filter.value}
									onChange={(e) =>
										handleInputChange(index, 'value', e.target.value)
									}
									className="border w-60 rounded p-2 outline-none focus:ring-2"
									placeholder="Enter filter value"
								/>
								{index > 0 && (
									<button
										className="bg-red-500 p-2 rounded text-white"
										onClick={() => removeFilter(index)}>
										Remove
									</button>
								)}
							</div>
						))}
						<button
							className="bg-green-500 p-2 rounded text-white"
							onClick={addFilter}>
							Add Filter
						</button>
						<div className="flex gap-4">
							<button
								className="bg-blue-500 p-2 rounded text-white"
								onClick={handleApplyFilters}>
								Apply Filters
							</button>
							<button
								className="bg-gray-400 p-2 rounded text-black"
								onClick={handleResetFilters}>
								Reset Filters
							</button>
						</div>
					</div>
				</div>
			)}
			{filters.length > 0 && (
				<div className="mt-4">
					<h4>Applied Filters:</h4>
					<ul>
						{filters.map((filter, index) => (
							<li key={index} className="flex items-center">
								<span>{`${filter[0]} ${filter[1]} ${filter[2]}`}</span>
							</li>
						))}
					</ul>
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
								<Icon name="Open" />
							</div>
						),
					},
				]}
			/>
			{/* Pagination Control */}
			<div className="flex w-full justify-center items-center gap-4 mt-4">
				<button
					className="bg-gray-200 p-2"
					onClick={() => setPageLength((prev) => Math.max(prev - 10, 10))}>
					-
				</button>
				<p className="font-bold">{pageLength}</p>
				<button
					className="bg-gray-200 p-2"
					onClick={() => setPageLength((prev) => prev + 10)}>
					+
				</button>
			</div>
		</div>
	);
}
