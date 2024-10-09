'use client';
import { useQueryState } from 'nuqs';
import { InputHTMLAttributes, useEffect, useState } from 'react';

type SearchProps = {
	data: any[]; // Assume this data is already available for filtering
	placeholder?: string; // Optional placeholder for the input
	queryName: string; // Query parameter name for search term
	className?: string; // Additional class name for styling
	searchAPI?: (query: string) => Promise<any[]>; // Optional search API function
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({
	data,
	queryName,
	placeholder = 'Search...',
	className,
	searchAPI,
}: SearchProps) {
	const [searchTerm, setSearchTerm] = useQueryState(queryName); // Use `nuqs` for query state
	const [filteredData, setFilteredData] = useState(data); // Keep filtered data in state

	useEffect(() => {
		if (searchTerm) {
			handleFilter(searchTerm); // Perform filtering when search term changes
		} else {
			setFilteredData(data); // Reset to full data when search term is cleared
		}
	}, [searchTerm, data]);

	// Filter function to handle API search or client-side filtering
	const handleFilter = async (search: string) => {
		if (searchAPI) {
			// If a search API is provided, use it for filtering
			const apiData = await searchAPI(search);
			setFilteredData(apiData);
		} else {
			// Otherwise, perform client-side filtering
			const lowerSearch = search.toLowerCase();
			const filtered = data.filter((item) =>
				Object.values(item).some((value) =>
					String(value).toLowerCase().includes(lowerSearch),
				),
			);
			setFilteredData(filtered);
		}
	};

	// Handle input change
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm); // Update URL query parameter
	};

	return (
		<div>
			<input
				type="text"
				value={searchTerm || ''}
				onChange={handleSearch}
				placeholder={placeholder}
				className={`p-2 rounded-md ring-2 ring-muted focus:ring-transparent ${className}`}
			/>
			{/* Render filtered data */}
			<div className="mt-4">
				{filteredData.map((item, index) => (
					<div key={index}>{/* Render each item here */}</div>
				))}
			</div>
		</div>
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
