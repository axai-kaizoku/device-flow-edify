import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className="flex flex-col h-full min-h-screen bg-[url('/media/BG.svg')] bg-cover bg-top bg-fixed"
		>
			{/* Header Section */}
			<Header />

			{/* Main Content Section */}
			<div className="flex flex-grow mt-16">
				{/* Sidebar */}
				<div className="fixed mt-14 left-0 w-36 h-[calc(100vh-4rem)] bg-transparent">
					<Sidebar />
				</div>

				{/* Main Content */}
				<div className="ml-36 mt-12 w-full p-4">
					{children}
				</div>
			</div>
		</div>
	);
}
