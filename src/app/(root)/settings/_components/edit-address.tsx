'use client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { useState } from 'react';
import { AddressForm } from './address-form';

export default function EditAddress({
	children,
	id,
	city,
	isPrimary,
}: {
	children: React.ReactNode;
	id: string;
	city: string;
	isPrimary: boolean;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent>
				<AddressForm
					closeBtn={setOpen}
					id={id}
					city={city}
					isPrimary={isPrimary}
					isEditForm={true}
				/>
			</SheetContent>
		</Sheet>
	);
}
