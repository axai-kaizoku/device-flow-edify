'use client';

import { CombinedContainer } from '@/components/container/container';
import AddDevices from './_components/addDevices/AddDevices';
import Inventory from './_components/inventory/Inventory';
import Issues from './_components/issues/Issues';
import { Tab } from './_components/Tab';
import { useQueryState } from 'nuqs';

export default function Assets() {
	const [activeTab, setActiveTab] = useQueryState('tab', {
		defaultValue: 'devices',
	});

	const renderContent = () => {
		switch (activeTab) {
			case 'devices':
				return <AddDevices />;
			case 'inventory':
				return <Inventory />;
			case 'issues':
				return <Issues />;
		}
	};

	return (
		<CombinedContainer title="Assets">
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
		</CombinedContainer>
	);
}
