'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import Form from './Form';
import { useState } from 'react';

function DevicesHeader({
	button,
	total,
	searchTerm,
	totalDocuments,
	setSearchTerm,
}: {
	button: string;
	totalDocuments: number;
	total: number;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(false);
	return (
		<div>
			<div className="flex items-center justify-between w-full pt-5">
				<div>
					<h1 className="text-xl">{totalDocuments} 🖥️</h1>
				</div>

				<div className="flex justify-center items-center gap-8">
					{/* <input
						type="text"
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder="Search by Device Name, Brand, or Custom Model"
						className="border focus:outline-none rounded-3xl p-2"
					/> */}
					<div>
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger className="bg-black p-2 text-white rounded-lg hover:opacity-90 duration-300">
								{button}
							</SheetTrigger>
							<SheetContent>
								<Form closeBtn={handleClose} />
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DevicesHeader;
