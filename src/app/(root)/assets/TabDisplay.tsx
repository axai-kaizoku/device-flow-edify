'use client';

import { useQueryState } from 'nuqs';
import AddDevices from './_components/addDevices/AddDevices';
import Inventory from './_components/inventory/Inventory';
import Issues from './_components/issues/Issues';
import { Tab } from './_components/Tab';

function TabDisplay({ devices }: { devices: any }) {
	const [activeTab, setActiveTab] = useQueryState('tab', {
		defaultValue: 'devices',
	});

	const renderContent = () => {
		switch (activeTab) {
			case 'devices':
				return <AddDevices devices={devices} />;
			case 'inventory':
				return <Inventory />;
			case 'issues':
				return <Issues />;
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
				<Tab
					active={activeTab === 'issues'}
					onClick={() => setActiveTab('issues')}
					iconType="OutlinedWarning"
					label="Reported Issues"
				/>
			</div>

			<div className="mt-4">{renderContent()}</div>
		</>
	);
}

export default TabDisplay;
