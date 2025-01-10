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
import { deleteIssue } from '@/server/issueActions';

export const DeleteIssues = ({
	id,
	children,
}: {
	id: string;
	children: React.ReactNode;
}) => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<GreyButton onClick={() => setOpen(false)}>Cancel</GreyButton>
					<ErrorButton
						onClick={async () => {
							if (id) {
								await deleteIssue(id);
								setOpen(false);
								router.push('/issues');
								router.refresh();
							}
						}}>
						Delete
					</ErrorButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
