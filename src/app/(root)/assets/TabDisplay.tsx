'use client';
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddDevices from './_components/addDevices/AddDevices';
import Inventory from './_components/inventory/Inventory';
import { Tab } from './_components/Tab';
import { Device } from '@/server/deviceActions';
import { useQueryState } from 'nuqs';

interface TabDisplayProps {
	devices: Device[];
	currentPage: number;
	totalPages: number;
	totalDocuments: number;
	currentDocumentCount: number;
	pageSize: number;
}

function TabDisplay({
	devices,
	currentPage,
	totalPages,
	totalDocuments,
	currentDocumentCount,
	pageSize,
}: TabDisplayProps) {
	const [activeTab, setActiveTab] = useQueryState('tab', {
		defaultValue: 'devices',
	});
	const router = useRouter();
	const searchParams = useSearchParams();

	// Disable next page if the data is less than pageSize or if we've reached the last page
	const isNextDisabled =
		currentDocumentCount < pageSize || currentPage >= totalPages;

	const handlePageChange = useCallback(
		(page: number) => {
			// Prevent page change if conditions for disabling the next page are met
			if (page > currentPage && isNextDisabled) return;

			const params = new URLSearchParams(searchParams.toString());
			params.set('page', page.toString());
			router.push(`/assets?${params.toString()}`);
		},
		[router, searchParams, currentPage, isNextDisabled],
	);

	const renderContent = () => {
		switch (activeTab) {
			case 'devices':
				return <AddDevices devices={devices} totalDocuments={totalDocuments} />;
			case 'inventory':
				return <Inventory devices={devices} />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex items-center w-full gap-6">
				<Tab
					active={activeTab === 'devices'}
					onClick={() => setActiveTab('devices')}
					iconType="OutlinedLaptop"
					label="Assigned Devices"
				/>
				<Tab
					active={activeTab === 'inventory'}
					onClick={() => setActiveTab('inventory')}
					iconType="OutlinedStore"
					label="Inventory"
				/>
			</div>

			<div className="mt-4">{renderContent()}</div>

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
					disabled={isNextDisabled}
					className={`px-4 py-2 rounded ${
						currentPage === 2
							? 'bg-black text-white'
							: isNextDisabled
							? 'bg-gray-300 cursor-not-allowed'
							: 'bg-gray-200'
					}`}>
					Load 100
				</button>

				<button
					onClick={() => handlePageChange(3)}
					disabled={isNextDisabled}
					className={`px-4 py-2 rounded ${
						currentPage === 3
							? 'bg-black text-white'
							: isNextDisabled
							? 'bg-gray-300 cursor-not-allowed'
							: 'bg-gray-200'
					}`}>
					Load 500
				</button>

				<button
					onClick={() => handlePageChange(4)}
					disabled={isNextDisabled}
					className={`px-4 py-2 rounded ${
						currentPage === 4
							? 'bg-black text-white'
							: isNextDisabled
							? 'bg-gray-300 cursor-not-allowed'
							: 'bg-gray-200'
					}`}>
					Load 2500
				</button>
			</div>

			{/* Display Current Page */}
			<div className="flex justify-center mt-2 text-gray-600">
				Page {currentPage}
			</div>
		</>
	);
}

export default TabDisplay;
