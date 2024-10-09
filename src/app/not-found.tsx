import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col justify-center items-center h-[95vh] sm:h-screen -mt-10 sm:-mt-20 lg:-mt-1 w-full">
			<img
				src="/media/loading-man.svg"
				alt="404"
				className="w-48 h-48 sm:w-60 sm:h-60 object-contain"
			/>
			<h1 className="text-[1.2rem] pl-7 lg:text-8xl font-bold font-manuale text-gray-800 mb-4">
				404.
			</h1>
			<h2 className="text-[0.9rem] lg:text-2xl font-medium font-manuale text-gray-600 mb-4 text-center">
				Page Not Found
			</h2>
			<Link href="/" className="hover:underline">
				Go to home
			</Link>
		</div>
	);
}
