'use client';

import { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { Icon } from '@/components/wind/Icons';
import Form from './Form';
import { searchAPI } from '@/server/deviceActions';

function Header({
	button,
	total,
	searchTerm,
	setSearchTerm,
}: {
	button: string;
	total: number;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	return (
		<div>
			<div className="flex items-center justify-between w-full pt-5">
				<div>
					<h1 className="text-xl">{total} Devices</h1>
				</div>
				<div className="flex justify-center items-center gap-8">
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder="Search by Device Name, Brand, or Custom Model"
						className="border focus:outline-none rounded-3xl p-2"
					/>
					<div>
						<Sheet>
							<SheetTrigger className="bg-black p-2 text-white rounded-lg hover:opacity-90 duration-300">
								{button}
							</SheetTrigger>
							<SheetContent>
								<Form />
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
