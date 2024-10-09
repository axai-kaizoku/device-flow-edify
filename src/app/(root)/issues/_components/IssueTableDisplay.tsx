'use client';
import { Issues } from '@/server/issueActions';
import React, { useCallback, useState } from 'react';
import IssueTable from './IssueTable';
import { useRouter, useSearchParams } from 'next/navigation';

interface IssueTableDisplayProps {
	data: Issues[];
	currentPage: number;
	totalPages: number;
	currentDocumentCount: number;
	pageSize: number;
}

function IssueTableDisplay({
	data,
	currentPage,
	totalPages,
	currentDocumentCount,
	pageSize,
}: IssueTableDisplayProps) {
	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	const searchParams = useSearchParams();

	// Determine if there's enough data or if we've reached the last page
	const isNextDisabled =
		currentDocumentCount < pageSize || currentPage >= totalPages;

	const handlePageChange = useCallback(
		(page: number) => {
			if (page > currentPage && isNextDisabled) return;

			const params = new URLSearchParams(searchParams.toString());
			params.set('page', page.toString());
			router.push(`/issues?${params.toString()}`);
		},
		[router, searchParams, currentPage, isNextDisabled],
	);

	return (
		<>
			<IssueTable
				data={data}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>

			{/* Pagination Controls */}
			<div className="flex justify-between mt-6 gap-4">
				{/* Conditionally render buttons based on the current page and data availability */}
				<div className="flex gap-4">
					{currentPage !== 1 && (
						<button
							onClick={() => handlePageChange(1)}
							className="px-4 py-2 rounded bg-gray-200">
							Load 20
						</button>
					)}
					{!isNextDisabled && currentPage === 1 && (
						<button
							onClick={() => handlePageChange(2)}
							className="px-4 py-2 rounded bg-gray-200">
							Load 100
						</button>
					)}

					{!isNextDisabled && currentPage === 2 && (
						<button
							onClick={() => handlePageChange(3)}
							className="px-4 py-2 rounded bg-gray-200">
							Load 500
						</button>
					)}
				</div>

				{/* Conditionally show the next buttons only if there's more data and we're not at the last page */}

				{!isNextDisabled && currentPage < totalPages && (
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						className="px-4 py-2 rounded bg-gray-200">
						Load More
					</button>
				)}
			</div>

			{/* Display Current Page */}
			<div className="flex justify-center mt-2 text-gray-600">
				Page {currentPage}
			</div>
		</>
	);
}

export default IssueTableDisplay;
