'use client';

import { CombinedContainer } from '@/components/container/Container';
import AddDevices from '../devices/_components/addDevices/AddDevices';
import AddEmployee from './add_employee/addEmployee';
import { Tab } from '../devices/_components/Tab';
import { useState } from 'react';
import AddTeams from './add teams/addTeams';

export default function Onboarding() {
	const [activeTab, setActiveTab] = useState('add_teams');

	const renderContent = () => {
		switch (activeTab) {
			case 'add_teams':
				return <AddTeams />;
			case 'add_employee':
				return <AddEmployee />;
		}
	};

	return (
		<CombinedContainer title="Devices">
			<div className="flex items-center w-full gap-6">
				<Tab
					active={activeTab === 'add_teams'}
					onClick={() => setActiveTab('add_teams')}
					iconType="OutlinedLaptop"
					label="Add Teams"
				/>
				<Tab
					active={activeTab === 'add_employee'}
					onClick={() => setActiveTab('add_employee')}
					iconType="OutlinedStore"
					label="Add Employee"
				/>
			</div>

			<div className="mt-4">{renderContent()}</div>
		</CombinedContainer>
	);
}
