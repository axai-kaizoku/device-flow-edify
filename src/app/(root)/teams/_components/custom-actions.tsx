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
import { EditTeamForm } from './team-form';
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
				className="w-fit"
				align="end"
				hidden={hasOpenDialog}
				onCloseAutoFocus={(event) => {
					if (focusRef.current) {
						focusRef.current.focus();
						focusRef.current = null;
						event.preventDefault();
					}
				}}>
				<DropdownMenuItem className="p-3">
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

export const DropdownActionItem = ({
	type,
	children,
	triggerChildren,
	onOpenChange,
	onSelect,
}: Props) => {
	return (
		<>
			{type === 'Normal' && (
				<DropdownMenuItem className="p-3">{children}</DropdownMenuItem>
			)}
			{type === 'Sheet' && (
				<SheetItem
					triggerChildren={triggerChildren}
					onOpenChange={onOpenChange}
					onSelect={onSelect}>
					{children}
				</SheetItem>
			)}
			{type === 'Dialog' && (
				<DialogItem
					triggerChildren={triggerChildren}
					onOpenChange={onOpenChange}
					onSelect={onSelect}>
					{children}
				</DialogItem>
			)}
		</>
	);
};

type Props = {
	triggerChildren: ReactNode;
	children: ReactNode;
	onSelect: () => void;
	onOpenChange: (open: boolean) => void;
} & { type?: 'Normal' | 'Sheet' | 'Dialog' };

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

// 'use client';

// import { useState, useRef, ReactNode } from 'react';
// import { Button } from '@/components/ui/button';
// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogPortal,
// 	DialogTitle,
// 	DialogTrigger,
// } from '@/components/ui/dialog';
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from '@/components/ui/dropdown';
// import { MoreHorizontal, PencilIcon, Trash2Icon, ViewIcon } from 'lucide-react';
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetHeader,
// 	SheetPortal,
// 	SheetTitle,
// 	SheetTrigger,
// } from '@/components/ui/side-sheet';
// import { EditTeamForm } from './team-form';
// import { useRouter } from 'next/navigation';

// // Define types for props and menu items
// type DropdownItemType = 'Normal' | 'Sheet' | 'Dialog';

// type DropdownActionsProps = {
// 	data?: any;
// 	menuItems: DropdownMenuItemProps[];
// };

// export type DropdownMenuItemProps = {
// 	type?: DropdownItemType;
// 	triggerChildren: ReactNode;
// 	children: ReactNode;
// 	onOpenChange?: (open: boolean) => void;
// 	onSelect?: () => void;
// };

// // Main reusable dropdown component
// export const DropdownActions = ({ data, menuItems }: DropdownActionsProps) => {
// 	const [dropdownOpen, setDropdownOpen] = useState(false);
// 	const [hasOpenDialog, setHasOpenDialog] = useState(false);
// 	const dropdownTriggerRef = useRef<null | HTMLButtonElement>(null);
// 	const focusRef = useRef<null | HTMLButtonElement>(null);
// 	const router = useRouter();

// 	const handleDialogItemSelect = () => {
// 		focusRef.current = dropdownTriggerRef.current;
// 	};

// 	const handleDialogItemOpenChange = (open: boolean) => {
// 		setHasOpenDialog(open);
// 		if (!open) {
// 			setDropdownOpen(false);
// 		}
// 	};

// 	const handleClick = () => {
// 		router.push(`/teams/${data._id}`);
// 		router.refresh();
// 	};

// 	return (
// 		<DropdownMenu
// 			open={dropdownOpen}
// 			onOpenChange={setDropdownOpen}
// 			modal={false}>
// 			<DropdownMenuTrigger asChild>
// 				<Button variant="ghost" size="sm">
// 					<MoreHorizontal />
// 				</Button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent
// 				className="w-fit"
// 				align="end"
// 				hidden={hasOpenDialog}
// 				onCloseAutoFocus={(event) => {
// 					if (focusRef.current) {
// 						focusRef.current.focus();
// 						focusRef.current = null;
// 						event.preventDefault();
// 					}
// 				}}>
// 				{menuItems.map((item, index) => (
// 					<DropdownActionItem key={index} {...item} />
// 				))}
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// };

// // Individual action item component
// export const DropdownActionItem = ({
// 	type,
// 	children,
// 	triggerChildren,
// 	onOpenChange,
// 	onSelect,
// }: DropdownMenuItemProps) => {
// 	return (
// 		<>
// 			{type === 'Normal' && (
// 				<DropdownMenuItem className="p-3" onSelect={onSelect}>
// 					{triggerChildren}
// 				</DropdownMenuItem>
// 			)}
// 			{type === 'Sheet' && (
// 				<SheetItem
// 					triggerChildren={triggerChildren}
// 					onOpenChange={onOpenChange}
// 					onSelect={onSelect}>
// 					{children}
// 				</SheetItem>
// 			)}
// 			{type === 'Dialog' && (
// 				<DialogItem
// 					triggerChildren={triggerChildren}
// 					onOpenChange={onOpenChange}
// 					onSelect={onSelect}>
// 					{children}
// 				</DialogItem>
// 			)}
// 		</>
// 	);
// };

// // Dialog item component
// const DialogItem = ({
// 	triggerChildren,
// 	children,
// 	onSelect,
// 	onOpenChange,
// }: DropdownMenuItemProps) => {
// 	return (
// 		<Dialog onOpenChange={onOpenChange}>
// 			<DialogTrigger asChild>
// 				<DropdownMenuItem
// 					className="p-3"
// 					onSelect={(event) => {
// 						event.preventDefault();
// 						onSelect && onSelect();
// 					}}>
// 					{triggerChildren}
// 				</DropdownMenuItem>
// 			</DialogTrigger>
// 			<DialogPortal>
// 				<DialogContent closeBtn={false}>{children}</DialogContent>
// 			</DialogPortal>
// 		</Dialog>
// 	);
// };

// // Sheet item component
// const SheetItem = ({
// 	triggerChildren,
// 	children,
// 	onSelect,
// 	onOpenChange,
// }: DropdownMenuItemProps) => {
// 	return (
// 		<Sheet onOpenChange={onOpenChange}>
// 			<SheetTrigger asChild>
// 				<DropdownMenuItem
// 					className="p-3"
// 					onSelect={(event) => {
// 						event.preventDefault();
// 						onSelect && onSelect();
// 					}}>
// 					{triggerChildren}
// 				</DropdownMenuItem>
// 			</SheetTrigger>
// 			<SheetPortal>
// 				<SheetContent>{children}</SheetContent>
// 			</SheetPortal>
// 		</Sheet>
// 	);
// };
