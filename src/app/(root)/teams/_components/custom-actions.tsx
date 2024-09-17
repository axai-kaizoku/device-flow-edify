'use client';

import { useState, useRef, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { MoreHorizontal, PencilIcon, Trash2Icon, ViewIcon } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetPortal,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/side-sheet';
import { CreateTeamForm, EditTeamForm } from './team-form';
import { useRouter } from 'next/navigation';

export const DropdownActions = ({ data }: { data?: any }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const dropdownTriggerRef = useRef<null | HTMLButtonElement>(null);
	const focusRef = useRef<null | HTMLButtonElement>(null);
	const router = useRouter();

	const handleDialogItemSelect = () => {
		focusRef.current = dropdownTriggerRef.current;
	};

	const handleDialogItemOpenChange = (open: boolean) => {
		setHasOpenDialog(open);
		if (open === false) {
			setDropdownOpen(false);
		}
	};

	const handleClick = () => {
		router.push(`/teams/${data._id}`);
		router.refresh();
	};

	return (
		<DropdownMenu
			open={dropdownOpen}
			onOpenChange={setDropdownOpen}
			modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-56"
				align="end"
				hidden={hasOpenDialog}
				onCloseAutoFocus={(event) => {
					if (focusRef.current) {
						focusRef.current.focus();
						focusRef.current = null;
						event.preventDefault();
					}
				}}>
				<DropdownMenuItem>
					<div className="flex" onClick={handleClick}>
						<ViewIcon className="mr-4 h-4 w-4" />
						<span>View Team</span>
					</div>
				</DropdownMenuItem>

				<SheetItem
					triggerChildren={
						<>
							<PencilIcon className="mr-4 h-4 w-4" />
							<span>Edit Team</span>
						</>
					}
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}>
					<SheetHeader>
						<SheetTitle>Edit Team</SheetTitle>
					</SheetHeader>
					<EditTeamForm />
				</SheetItem>

				<DialogItem
					triggerChildren={
						<>
							<Trash2Icon className="mr-4 h-4 w-4" />
							<span>Delete Team</span>
						</>
					}
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}>
					<DialogTitle className="DialogTitle">Delete</DialogTitle>
					<DialogDescription className="DialogDescription">
						Are you sure you want to delete this record?
					</DialogDescription>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Delete</Button>
						</DialogClose>
					</DialogFooter>
				</DialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

type Props = {
	triggerChildren: ReactNode;
	children: ReactNode;
	onSelect: () => void;
	onOpenChange: (open: boolean) => void;
};

const DialogItem = ({
	triggerChildren,
	children,
	onSelect,
	onOpenChange,
}: Props) => {
	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					className="p-3"
					onSelect={(event) => {
						event.preventDefault();
						onSelect && onSelect();
					}}>
					{triggerChildren}
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogPortal>
				<DialogContent>{children}</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};

const SheetItem = ({
	triggerChildren,
	children,
	onSelect,
	onOpenChange,
}: Props) => {
	return (
		<Sheet onOpenChange={onOpenChange}>
			<SheetTrigger asChild>
				<DropdownMenuItem
					className="p-3"
					onSelect={(event) => {
						event.preventDefault();
						onSelect && onSelect();
					}}>
					{triggerChildren}
				</DropdownMenuItem>
			</SheetTrigger>
			<SheetPortal>
				<SheetContent>{children}</SheetContent>
			</SheetPortal>
		</Sheet>
	);
};
