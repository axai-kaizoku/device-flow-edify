import { User } from '@/server/userActions';
import React from 'react'
import DeletedDevicesTable from './_components/deleted-devices-table';
import { Device } from '@/server/deviceActions';

interface DeletedProps {
	data: Device[];
}

const DeletedDevices = ({ data }: DeletedProps) => {
    return (
		<>
			<div className="h-10" />
			<div className="w-full">
				<DeletedDevicesTable devices={data} />
			</div>
		</>
	);
}

export default DeletedDevices