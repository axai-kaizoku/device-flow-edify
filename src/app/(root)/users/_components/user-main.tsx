'use client';

import { User } from '@/server/userActions';
import CreateUser from './create-user';
import UserTable from './user-table';
import { useState } from 'react';
import { SearchInput } from './search-params';

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
						onFiltered={handleFilteredData}
						queryName="query"
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
