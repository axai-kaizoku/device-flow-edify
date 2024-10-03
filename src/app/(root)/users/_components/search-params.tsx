'use client';
import { useQueryState } from 'nuqs';
import { InputHTMLAttributes, useEffect, useState } from 'react';

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

//////////////////////USAGE////////////////////////

// const [teams, setTeams] = useState(data);
// 	console.log('triggering');

// 	const handleFilteredTeams = (filtered: typeof data) => {
// 		setTeams(filtered);
// 	};

// 	return (
// 		<CombinedContainer title="Users">
// 			<div className="flex justify-end w-full">
// 				<div className="flex gap-5">
// 					<Search
// 						data={data}
// 						onFiltered={handleFilteredTeams}
// 						filterKey="name"
// 						queryName="user"
// 						className="p-2 rounded-md ring-2 ring-muted focus:ring-transparent"
// 					/>
// 				</div>
// 			</div>
