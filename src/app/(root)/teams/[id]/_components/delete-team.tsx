'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { ErrorButton, GreyButton } from '@/components/wind/Buttons';
import { useRouter } from 'next/navigation';
import { deleteTeam } from '@/server/teamActions';

export const DeleteTeam = ({
	id,
	children,
}: {
	id: string;
	children: React.ReactNode;
}) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [initText, setInitText] = useState("Are you absolutely sure?");

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{initText}</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<GreyButton onClick={() => setOpen(false)}>Cancel</GreyButton>
					<ErrorButton
						onClick={async () => {
							if (id) {
								try {
									await deleteTeam(id);
									setOpen(false);
									router.push('/teams');
									router.refresh();
								} catch (e: any) {
									const errorMessage = e.response?.data?.message || e.message || "Failed to delete the Team.";
									setInitText(errorMessage);
								}
							}
						}}>
						Delete
					</ErrorButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
