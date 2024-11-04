'use client';
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddDevices from './_components/addDevices/AddDevices';
import Inventory from './_components/inventory/Inventory';
import { Tab } from './_components/Tab';
import { Device, updateDevice } from '@/server/deviceActions';
import { useQueryState } from 'nuqs';
import AddPaybleField from './_components/addPaybleField';

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

	// Check if there's less data or if we're on the last page
	const isNextDisabled =
		currentDocumentCount < pageSize || currentPage >= totalPages;

	const handlePageChange = useCallback(
		(page: number) => {
			if (page > currentPage && isNextDisabled) return;

			const params = new URLSearchParams(searchParams.toString());
			params.set('page', page.toString());
			router.push(`/assets?${params.toString()}`);
		},
		[router, searchParams, currentPage, isNextDisabled],
	);

	const assignedDevices = devices.filter(
		(device) => device.userName !== '' && device.userId
	);
	console.log(assignedDevices);

	const renderContent = () => {
		switch (activeTab) {
			case 'devices':
				return <AddDevices devices={assignedDevices} totalDocuments={totalDocuments} />;
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
			<div className="flex justify-between mt-6 gap-4">
				<div className="flex gap-4">
					{/* Show this button only if currentPage is not 1 */}
					{currentPage !== 1 && (
						<button
							onClick={() => handlePageChange(1)}
							className="px-4 py-2 rounded bg-gray-200">
							Load 20
						</button>
					)}

					{/* Show this button only if there's enough data for next page */}
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

				{/* Show "Load More" only if there are more pages */}
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

export default TabDisplay;
