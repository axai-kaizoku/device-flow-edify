'use client';
import { CombinedContainer } from '@/components/container/container';
import { Table } from '@/components/wind/Table';
import { Icon } from '@/components/wind/Icons';
import { useQueryState } from 'nuqs';
import { InputHTMLAttributes, useEffect, useState } from 'react';

const data = [
	{
		_id: '66e40351b83635490e26bda4',
		name: 'Ashish',
		role: 'Frontend Developer',
		joining_date: '17-09-2024',
		reporting_manager: 'Abhinav',
		image: 'https://picsum.photos/300/300',
		deleted_at: null,
		createdAt: '2024-09-13T09:18:09.972Z',
		updatedAt: '2024-09-13T09:18:09.972Z',
		__v: 0,
	},
	{
		_id: '66e40351b83635490e26bda4',
		name: 'Akshay',
		role: 'Frontend Developer',
		joining_date: '10-09-2024',
		reporting_manager: 'Abhinav',
		image: 'https://picsum.photos/300/300',
		deleted_at: null,
		createdAt: '2024-09-13T09:18:09.972Z',
		updatedAt: '2024-09-13T09:18:09.972Z',
		__v: 0,
	},
	{
		_id: '66e40351b83635490e26bda4',
		name: 'Harsh',
		role: 'Frontend Developer',
		joining_date: '17-09-2024',
		reporting_manager: 'Abhinav',
		image: 'https://picsum.photos/300/300',
		deleted_at: null,
		createdAt: '2024-09-13T09:18:09.972Z',
		updatedAt: '2024-09-13T09:18:09.972Z',
		__v: 0,
	},
	{
		_id: '66e40351b83635490e26bda4',
		name: 'Abhinav',
		role: 'Engineering Manager',
		joining_date: '17-09-2024',
		reporting_manager: 'Ashwini',
		image: 'https://picsum.photos/300/300',
		deleted_at: null,
		createdAt: '2024-09-13T09:18:09.972Z',
		updatedAt: '2024-09-13T09:18:09.972Z',
		__v: 0,
	},
];

export default function Users() {
	const [teams, setTeams] = useState(data);
	console.log('triggering');

	const handleFilteredTeams = (filtered: typeof data) => {
		setTeams(filtered);
	};

	return (
		<CombinedContainer title="Users">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					<Search
						data={data}
						onFiltered={handleFilteredTeams}
						filterKey="name"
						queryName="user"
						className="p-2 rounded-md ring-2 ring-muted focus:ring-transparent"
					/>
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full">
				<Table
					data={teams}
					className="w-full"
					columns={[
						{ title: 'User', dataIndex: 'name' },
						{ title: 'Role', dataIndex: 'role' },
						{ title: 'Joining Date', dataIndex: 'joining_date' },
						{ title: 'Reporting Manager', dataIndex: 'reporting_manager' },
						{
							title: 'Actions',
							render: (data) => (
								<div className="w-full flex justify-center">
									<Icon type="OutlinedDotsVertical" color="black" />
								</div>
							),
						},
					]}
				/>
			</div>
		</CombinedContainer>
	);
}

type SearchProps<T> = {
	data: T[]; // Generic data array to filter
	filterKey: keyof T; // The key in the data to filter by
	placeholder?: string; // Optional placeholder for the input
	onFiltered: (filteredData: T[]) => void; // Callback to return filtered data
	queryName: string;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Search<T>({
	data,
	filterKey,
	queryName,
	placeholder = 'Search...',
	onFiltered,
	className,
}: SearchProps<T>) {
	const [searchTerm, setSearchTerm] = useQueryState(queryName); // Use `nuqs` for query state
	const [filteredData, setFilteredData] = useState<T[]>(data);

	// Filter the data when searchTerm or data changes
	useEffect(() => {
		if (searchTerm) {
			handleFilter(searchTerm);
		} else {
			setFilteredData(data); // Reset if no search term
		}
	}, [searchTerm, data]);

	// Filter function based on the search input
	const handleFilter = (search: string) => {
		const filtered = data.filter((item) => {
			const value = String(item[filterKey]).toLowerCase();
			return value.startsWith(search.toLowerCase());
		});
		setFilteredData(filtered);
		onFiltered(filtered); // Pass filtered data to parent component
	};

	// Handle input change
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value.toLowerCase();
		setSearchTerm(searchTerm); // Update URL query parameter
		handleFilter(searchTerm); // Filter immediately
	};

	return (
		<input
			type="text"
			value={searchTerm || ''}
			onChange={handleSearch}
			placeholder={placeholder}
			className={className}
		/>
	);
}
