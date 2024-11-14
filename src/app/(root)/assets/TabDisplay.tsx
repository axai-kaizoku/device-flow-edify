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
		(device) => device.userName !== '' && device.userId,
	);
	console.log(assignedDevices.length);
	const invenotryDevices = devices.filter(
		(device) => device?.userName?.trim() === '' && !device.userId,
	);
	console.log(devices);

	const renderContent = () => {
		switch (activeTab) {
			case 'devices':
				return (
					<AddDevices
						devices={assignedDevices}
						totalDocuments={totalDocuments}
					/>
				);
			case 'inventory':
				return <Inventory devices={invenotryDevices} />;
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
		</>
	);
}

export default TabDisplay;
