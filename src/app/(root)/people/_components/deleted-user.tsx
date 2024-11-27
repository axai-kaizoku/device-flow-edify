import { User } from '@/server/userActions';
import React from 'react'
import UserTable from './user-table';
import DeletedUserTable from './deleted-user-table';

interface DeletedProps {
	data: User[];
}

const DeletedUser = ({ data }: DeletedProps) => {
    return (
		<>
			<div className="h-10" />
			<div className="w-full">
				<DeletedUserTable users={data} />
			</div>
		</>
	);
}

export default DeletedUser