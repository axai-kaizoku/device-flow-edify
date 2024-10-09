'use client';

import { User, userSearchAPI } from '@/server/userActions';

import { useState } from 'react';
import { SearchInput } from './search-params';
import UserTable from '../../people/_components/user-table';
import CreateUser from '../../people/_components/create-user';

export default function UserMain({ data }: { data: User[] }) {
	const [users, setUsers] = useState(data);
	const handleFilteredData = (filtered: typeof data) => {
		setUsers(filtered);
	};
	return (
		<>
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					{/* <Input placeholder="Search users" /> */}
					<SearchInput
						data={users}
						queryName="query"
						searchAPI={userSearchAPI}
					/>
					<CreateUser />
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full">
				<UserTable users={users} />
			</div>
		</>
	);
}
