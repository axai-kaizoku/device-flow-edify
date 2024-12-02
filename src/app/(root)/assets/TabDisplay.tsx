'use client';

import { OrdersProps } from '../orders/components/orderPage';
import AddDevices from './_components/addDevices/AddDevices';
import DeletedDevices from './_components/DeletedDevice/deleted-devices';
import Inventory from './_components/inventory/Inventory';
import NewDevicesTab from './_components/newDevices/newDevicesTab';
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
	prevOrders : {data : OrdersProps};
	deletedDevices: Device[];
}

function TabDisplay({
	devices,
	currentPage,
	totalPages,
	totalDocuments,
	currentDocumentCount,
	pageSize,
	prevOrders,
	deletedDevices
}: TabDisplayProps) {
	const [activeTab, setActiveTab] = useQueryState('tab', {
		defaultValue: 'devices',
	});

	const renderContent = () => {
		switch (activeTab) {
			case 'devices':
				return <AddDevices devices={devices} totalDocuments={totalDocuments} />;
			case 'inventory':
				return <Inventory devices={devices} />;
			case 'new': 
				return <NewDevicesTab data={prevOrders} />
			case 'deleted':
				return <DeletedDevices data={deletedDevices} />
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex items-center w-full gap-6">
				<Tab
					active={activeTab === 'inventory'}
					onClick={() => setActiveTab('inventory')}
					iconType="OutlinedStore"
					label="Inventory"
				/>
				<Tab
					active={activeTab === 'devices'}
					onClick={() => setActiveTab('devices')}
					iconType="OutlinedLaptop"
					label="Assigned Devices"
				/>
				<Tab
					active={activeTab === 'new'}
					onClick={() => setActiveTab('new')}
					iconType="OutlinedStore"
					label="Newly Added Devices"
				/>
				<Tab
					active={activeTab === 'deleted'}
					onClick={() => setActiveTab('deleted')}
					iconType="OutlinedLaptop"
					label="Deleted Devices"
				/>
			</div>

			<div className="mt-4">{renderContent()}</div>
		</>
	);
}

export default TabDisplay;
