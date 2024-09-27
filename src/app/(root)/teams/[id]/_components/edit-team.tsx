'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { TeamForm } from '../../_components/team-form';
import { useState } from 'react';

export default function EditTeam({
	children,
	_id,
	title,
	description,
	image,
}: {
	children: React.ReactNode;
	_id: string;
	title: string;
	description: string;
	image: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent>
				<TeamForm
					closeBtn={setOpen}
					isEditForm={true}
					id={_id}
					title={title}
					description={description}
					image={image}
				/>
			</SheetContent>
		</Sheet>
	);
}
