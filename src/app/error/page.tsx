import Link from 'next/link';

export default function Error() {
	return (
		<div className="flex flex-col justify-center items-center h-[95vh] sm:h-screen -mt-10 sm:-mt-20 lg:-mt-1 w-full">
			<img
				src="/assets/loading-man.svg"
				alt="404"
				className="w-48 h-48 sm:w-60 sm:h-60 object-contain"
			/>
			<h1 className="text-[1.2rem] lg:text-5xl font-bold font-manuale text-gray-800 mb-4">
				Something Went Wrong.
			</h1>
			<h2 className="text-[0.9rem] lg:text-2xl font-medium font-manuale text-gray-600 mb-4 text-center">
				We&apos;re sorry for the inconvenience
			</h2>
			<Link href="/" className="px-3 py-2 ring-2 ring-muted rounded-md ">
				Try Again
			</Link>
		</div>
	);
}
