'use client';

import { OrdersProps } from '../orders/components/orderPage';
import { Tab } from './_components/Tab';
import { Device } from '@/server/deviceActions';
import { useQueryState } from 'nuqs';
import UserMain from './_components/user-main';
import { User, UserResponse } from '@/server/userActions';
import DeletedUser from './_components/deleted-user';

interface TabDisplayProps {
	users: User[];
	currentPage: number;
	totalPages: number;
	totalDocuments: number;
	currentDocumentCount: number;
	pageSize: number;
    userRole:number,
    deletedUserResponse:UserResponse
}

function TabDisplay({
	users,
	currentPage,
	totalPages,
	totalDocuments,
	currentDocumentCount,
	pageSize,
    userRole,
    deletedUserResponse
}: TabDisplayProps) {
	const [activeTab, setActiveTab] = useQueryState('tab', {
		defaultValue: 'active',
	});

	const renderContent = () => {
		switch (activeTab) {
			case 'active':
				return  <UserMain data={users} userRole={userRole}/>;
			case 'deleted':
				return <DeletedUser data={deletedUserResponse?.users}/>;
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
					label="Active Users"
				/>

                <Tab
					active={activeTab === 'deleted'}
					onClick={() => setActiveTab('deleted')}
					iconType="OutlinedAdmissions"
					label="Deleted Users"
				/>
				
			</div>

			<div className="mt-4">{renderContent()}</div>
		</>
	);
}

export default TabDisplay;
