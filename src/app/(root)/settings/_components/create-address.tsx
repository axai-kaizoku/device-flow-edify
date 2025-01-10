'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { useState } from 'react';
import { AddressForm } from './address-form';

export default function CreateAddress({
	children,
}: {
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent>
				<AddressForm closeBtn={setOpen} />
			</SheetContent>
		</Sheet>
	);
}
