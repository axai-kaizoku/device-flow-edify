'use client';

import { CombinedContainer } from '@/components/container/container';
import AddEmployee, { AddUser } from './add_employee/addEmployee';
import { useState } from 'react';
import AddTeams, { AddTeam } from './add teams/addTeams';
import { Tab } from '../assets/_components/Tab';

export default function Onboarding() {
	const [activeTab, setActiveTab] = useState('add_teams');

	const renderContent = () => {
		switch (activeTab) {
			case 'add_teams':
				// return <AddTeams />;
				return <AddTeam />;
			case 'add_employee':
				// return <AddEmployee />;
				return <AddUser />;
		}
	};

	return (
		<CombinedContainer title="Onboarding">
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
