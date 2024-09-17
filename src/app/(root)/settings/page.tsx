'use client';
import { CombinedContainer } from '@/components/container/Container';
import { DropdownActions } from './_components/drop-down-table-sheet';
// import { SheetDemo } from '../teams/page';
import { Table } from '@/components/wind/Table';
import { Team } from '@/server/teamActions';

export default function Settings() {
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
	return (
		<CombinedContainer title="Settings" description="Manage your settings">
			<div className="flex justify-end w-full">
				<div className="flex gap-5">
					<input className="border rounded-md p-1" />
					{/* <SheetDemo /> */}
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
									<DropdownActions />
								</div>
							),
						},
					]}
				/>
			</div>
		</CombinedContainer>
	);
}
