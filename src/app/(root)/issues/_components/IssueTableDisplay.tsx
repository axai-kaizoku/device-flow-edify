'use client';
import { Issues } from '@/server/issueActions';
import React, { useCallback, useState } from 'react';
import IssueTable from './IssueTable';
import { useRouter, useSearchParams } from 'next/navigation';
interface IssueTableDisplayProps {
	data: Issues[];
	currentPage: number;
	totalPages: number;
}
function IssueTableDisplay({
	data,
	currentPage,
	totalPages,
}: IssueTableDisplayProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();

	const handlePageChange = useCallback(
		(page: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set('page', page.toString());
			router.push(`/issues?${params.toString()}`);
		},
		[router, searchParams],
	);
	return (
		<>
			<IssueTable
				data={data}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
			{/* Pagination Controls */}
			<div className="flex justify-center mt-6 gap-4">
				<button
					onClick={() => handlePageChange(1)}
					className={`px-4 py-2 rounded ${
						currentPage === 1 ? 'bg-black text-white' : 'bg-gray-200'
					}`}>
					Load 20
				</button>
				<button
					onClick={() => handlePageChange(2)}
					className={`px-4 py-2 rounded ${
						currentPage === 2 ? 'bg-black text-white' : 'bg-gray-200'
					}`}>
					Load 100
				</button>
				<button
					onClick={() => handlePageChange(3)}
					className={`px-4 py-2 rounded ${
						currentPage === 3 ? 'bg-black text-white' : 'bg-gray-200'
					}`}>
					Load 500
				</button>
				<button
					onClick={() => handlePageChange(4)}
					className={`px-4 py-2 rounded ${
						currentPage === 4 ? 'bg-black text-white' : 'bg-gray-200'
					}`}>
					Load 2500
				</button>
			</div>

			{/* Display Current Page and Total Pages */}
			{/* <div className="flex justify-center mt-2 text-gray-600">
				Page {currentPage} of {totalPages}
			</div> */}
			<div className="flex justify-center mt-2 text-gray-600">
				Page {currentPage}
			</div>
		</>
	);
}

export default IssueTableDisplay;
