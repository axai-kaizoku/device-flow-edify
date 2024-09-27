'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { TeamForm } from './team-form';
import { useState } from 'react';

export default function CreateTeam() {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="focus:outline-none ring-2 py-2 hover:ring-muted-foreground ring-muted px-2 rounded-md">
				Create Team
			</SheetTrigger>
			<SheetContent>
				<TeamForm closeBtn={setOpen} />
			</SheetContent>
		</Sheet>
	);
}
