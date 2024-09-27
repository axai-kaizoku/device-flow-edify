'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { Icon } from '@/components/wind/Icons';
import Form from './Form';

function Header({ button, total }: { button: string; total: number }) {
	return (
		<div>
			<div className="flex items-center justify-between w-full pt-5">
				<div>
					<h1 className="text-xl">{total} Devices</h1>
				</div>
				<div className="flex justify-center items-center gap-8">
					<div className="flex justify-center items-center gap-4">
						<input
							type="search"
							placeholder="Search.."
							className="border focus:outline-none rounded-3xl p-2"
						/>
						<Icon type="OutlinedSearch" color="black" />
					</div>
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
