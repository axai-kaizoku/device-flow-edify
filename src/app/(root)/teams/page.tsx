'use client';
import { CombinedContainer } from '@/components/container/Container';
import { CreateTeamForm, EditTeamForm } from './_components/team-form';

import { Table } from '@/components/wind/Table';
import { Team } from '@/server/teamActions';

import { DropdownActions } from './_components/custom-actions';

export default function Teams() {
	const teams = [
		{
			_id: '66e40351b83635490e26bda4',
			title: 'Tech Team',
			size: '8',
			description: 'Tech team description',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:18:09.972Z',
			updatedAt: '2024-09-13T09:18:09.972Z',
			__v: 0,
		},
		{
			_id: '66e403aeb83635490e26bda7',
			title: 'Finance',
			size: '8',

			description: 'Finance team description',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-13T09:19:42.679Z',
			updatedAt: '2024-09-13T09:19:42.679Z',
			__v: 0,
		},
		{
			_id: '66e7daacb83635490e26bdd3',
			title: 'Display',
			size: '8',

			description: 'Display team desciption',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-16T07:13:48.625Z',
			updatedAt: '2024-09-16T07:13:48.625Z',
			__v: 0,
		},
		{
			_id: '66e7f8fab83635490e26bdf6',
			title: 'Physical QC',
			size: '8',

			description: 'Physical QC description bruh',
			image: 'https://picsum.photos/300/300',
			deleted_at: null,
			createdAt: '2024-09-16T09:23:06.437Z',
			updatedAt: '2024-09-16T09:23:06.437Z',
			__v: 0,
		},
	];

	const menuItems: any[] = [
		{
			type: 'Normal',
			triggerChildren: (
				<>
					<div className="mr-4 h-4 w-4" />
					<span>View Team</span>
				</>
			),
			children: null, // No children since it's a normal action
			onSelect: () => {
				// Navigate to the team page or handle view action
				console.log('View team clicked');
			},
		},
		{
			type: 'Sheet',
			triggerChildren: (
				<>
					<div className="mr-4 h-4 w-4" />
					<span>Edit Team</span>
				</>
			),
			children: <EditTeamForm />, // Form for editing team
			onOpenChange: (open: boolean) => console.log(`Sheet open: ${open}`),
			onSelect: () => console.log('Edit team selected'),
		},
		{
			type: 'Dialog',
			triggerChildren: (
				<>
					<div className="mr-4 h-4 w-4" />
					<span>Delete Team</span>
				</>
			),
			children: (
				<>
					<h2 className="text-lg font-semibold">Delete Team</h2>
					<p>
						Are you sure you want to delete this team? This action is
						irreversible.
					</p>
					<button>Confirm Delete</button>
				</>
			),
			onOpenChange: (open: boolean) => console.log(`Dialog open: ${open}`),
			onSelect: () => console.log('Delete team selected'),
		},
	];

	return (
		<CombinedContainer title="Teams">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					<input
						className="border-2 rounded-md p-2"
						placeholder="Search Teams .."
					/>
					<CreateTeamForm />
				</div>
			</div>
			<div className="h-10" />
			<div className="w-full">
				<Table
					data={teams}
					className="w-full"
					columns={[
						{ title: 'Teams', dataIndex: 'title' },
						{ title: 'Total Employees', dataIndex: 'size' },
						{
							title: 'Actions',
							render: (data: Team) => (
								<div className="w-full flex justify-center">
									<DropdownActions data={data} />
								</div>
							),
						},
					]}
				/>
			</div>
		</CombinedContainer>
	);
}
