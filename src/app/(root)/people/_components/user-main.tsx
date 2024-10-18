'use client';

import { User, userSearchAPI } from '@/server/userActions';
import CreateUser from './create-user';
import UserTable from './user-table';
import { useState } from 'react';
import { SearchInput } from './search-params';

interface UserMainProps {
	data: User[];
	userRole: number;
}

export default function UserMain({ data, userRole }: UserMainProps) {	

	return (
		<>
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					
					{userRole === 2 && <CreateUser />}
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full">
				<UserTable users={data} />
			</div>
		</>
	);
}
