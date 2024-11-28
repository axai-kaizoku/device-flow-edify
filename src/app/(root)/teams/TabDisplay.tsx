'use client';

import { OrdersProps } from '../orders/components/orderPage';
import { Device } from '@/server/deviceActions';
import { useQueryState } from 'nuqs';
import { User, UserResponse } from '@/server/userActions';
import { Tab } from './_components/Tab';
import { Team } from '@/server/teamActions';
import TeamsMain from './_components/teams-main';
import DeletedTeams from './_components/deleted-teams';

interface TabDisplayProps {
    sess:any
	teams: Team[];
    deletedTeams:Team[]
}

function TabDisplay({
    sess,
	teams,
    deletedTeams
}: TabDisplayProps) {
	const [activeTab, setActiveTab] = useQueryState('tab', {
		defaultValue: 'active',
	});

	const renderContent = () => {
		switch (activeTab) {
			case 'active':
				return  <TeamsMain teams={teams} sess={sess} />;
			case 'deleted':
				return <DeletedTeams teams={deletedTeams}/>;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex items-center w-full gap-6">
				<Tab
					active={activeTab === 'active'}
					onClick={() => setActiveTab('active')}
					iconType="OutlinedAdmissions"
					label="Active Teams"
				/>

                <Tab
					active={activeTab === 'deleted'}
					onClick={() => setActiveTab('deleted')}
					iconType="OutlinedAdmissions"
					label="Deleted Teams"
				/>
				
			</div>

			<div className="mt-4">{renderContent()}</div>
		</>
	);
}

export default TabDisplay;
