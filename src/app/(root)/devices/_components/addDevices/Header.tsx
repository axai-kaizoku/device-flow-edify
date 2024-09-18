'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import { Icon } from '@/components/wind/Icons';
import Form from './Form';

function Header({ button }: { button: string }) {
	return (
		<div>
			<div className="flex items-center justify-between w-full pt-5">
				<div>
					<h1 className="text-xl">100 Devices</h1>
				</div>
				<div className="flex justify-center items-center gap-8">
					<div className="flex justify-center items-center ">
						<input
							type="search"
							placeholder="Search.."
							className="border focus:outline-none rounded-3xl p-2"
						/>
						<Icon
							type="OutlinedSearch"
							color="black"
						/>
					</div>
					<div>
						<Sheet>
							<SheetTrigger>
								<button className="bg-black p-2 text-white rounded-lg hover:opacity-90 duration-300">
									{button}
								</button>
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
