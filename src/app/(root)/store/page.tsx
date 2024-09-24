import { CombinedContainer } from '@/components/container/container';
import { Filter, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Store() {
	return (
		<CombinedContainer title="Store">
			<div className="flex justify-between w-full mb-8">
				<h1 className="text-2xl font-semibold text-gray-800">
					Explore Our Collection
				</h1>
				<div className="flex gap-4 items-center">
					<input
						className="border rounded-lg px-4 py-2 w-[16rem] text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-muted outline-none transition"
						placeholder="Search store .."
					/>
					<Filter className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition" />
					<Link href="/store/cart" className="relative p-2 rounded-full">
						<div className="w-4 h-4 absolute top-1 right-0 rounded-full bg-slate-600 text-white flex justify-center items-center text-xs">
							1
						</div>
						<ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800 transition" />
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
				{[...Array(8)].map((_, i) => (
					<StoreItem key={i} />
				))}
			</div>
		</CombinedContainer>
	);
}

const StoreItem = () => {
	return (
		<div className="w-full h-fit rounded-lg shadow-lg bg-white p-6 flex flex-col items-center justify-between transition-transform transform hover:scale-105 hover:shadow-xl">
			<Image
				src="/assets/mac.jpeg"
				alt="Macbook Air"
				width={225}
				height={225}
				className="rounded-lg object-cover"
			/>
			<div className="flex flex-col gap-2 text-center mt-4">
				<span className="text-lg font-medium text-gray-800">Macbook Air</span>
				<span className="text-sm text-gray-500">
					13&apos; Retina display with True Tone technology.
				</span>
			</div>
			<span className="font-bold text-xl text-slate-900 mt-2">$1,500</span>
			<button className="p-2 mt-4 w-full text-black dark:text-white bg-muted hover:bg-muted/95 transition">
				Add to Cart
			</button>
		</div>
	);
};
