'use client';
import { Icon } from '@/components/wind/Icons';
import { Table } from '@/components/wind/Table';
import { updateUser, User } from '@/server/userActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TeamTable({ data }: { data: User[] }) {
	const router = useRouter();

	const handleRemoveUser = async (data: any) => {
		const confirmDelete = confirm(
			"This User will be Removed from the Team. Are you sure you want to Remove?"
		);
		if (!confirmDelete) return;
	
		try {
			await updateUser(data._id, { ...data, teamId: null });
			router.refresh();
		} catch (error) {
			console.error("Error deleting user:", error);
			alert("Failed to delete the user. Please try again.");
		}
	};
	
	return (
		<Table
			data={data}
			columns={[
				{ title: 'User', dataIndex: 'first_name' },
				{ title: 'Role', dataIndex: 'designation' },
				{
					title: 'Joining Date',
					render: (data) => (
						<div className="w-full flex justify-center">
							<div>
								{data.onboarding_date
									? new Date(data.onboarding_date).toLocaleDateString()
									: 'NULL'}
							</div>
						</div>
					),
				},
				{
					title: 'Reporting Manager',
					render: (data) => (
						<div className="w-full flex justify-center">
							<div>
								{data.reporting_manager?.first_name
									? data.reporting_manager?.first_name
									: 'NULL'}
							</div>
						</div>
					),
				},
				{
					title: 'Actions',
					render: (data) => (
						<div className="w-full flex justify-center gap-4">
							<div className='border rounded-md p-2 cursor-pointer hover:bg-slate-100'>
                                <Link href={`/people/${data._id}`}>
                                    <Icon type="OutlinedEye" color="black"  style={{cursor:"pointer"}} />
                                </Link>
                            </div>

							<div className='border rounded-md p-2 cursor-pointer hover:bg-slate-100' onClick={()=>{handleRemoveUser(data)}}>
                                <Icon type="OutlinedBin" color="black"  style={{cursor:"pointer"}} />
                            </div>
						</div>
					),
				},
			]}
		/>
	);
}
