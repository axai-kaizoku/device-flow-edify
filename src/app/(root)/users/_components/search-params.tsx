'use client';
import { userSearchAPI } from '@/server/userActions';
import { useQueryState } from 'nuqs';
import { InputHTMLAttributes, useEffect, useState } from 'react';

type SearchProps = {
	data: any[];
	placeholder?: string; // Optional placeholder for the input
	onFiltered: (filteredData: any[]) => void; // Callback to return filtered data
	queryName: string;
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({
	data,
	queryName,
	placeholder = 'Search...',
	onFiltered,
	className,
}: SearchProps) {
	const [searchTerm, setSearchTerm] = useQueryState(queryName); // Use `nuqs` for query state

	useEffect(() => {
		if (searchTerm) {
			handleFilter(searchTerm);
		} else {
			onFiltered(data); // Reset if no search term
		}
	}, [searchTerm]);

	// Filter function based on the search input
	const handleFilter = async (search: string) => {
		const data = await userSearchAPI(search);
		onFiltered(data);
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
			className={`p-2 rounded-md ring-2 ring-muted focus:ring-transparent ${className}`}
		/>
	);
}

////////////////////// USAGE ////////////////////////

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
