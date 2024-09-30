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
import { deleteDevice } from '@/server/deviceActions';

export const DeleteDevice = ({
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
								await deleteDevice(id);
								setOpen(false);
								router.push('/assets');
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
