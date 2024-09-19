import Sidebar from '@/components/sidebar';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex h-full w-full">
			<Sidebar />
			{children}
		</main>
	);
}
