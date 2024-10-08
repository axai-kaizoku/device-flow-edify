import Sidebar from '@/components/sidebar';

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex h-full w-full">
			<div className="w-[20%]">
				<Sidebar />
			</div>
			<div className="w-[80%]">{children}</div>
		</main>
	);
}
