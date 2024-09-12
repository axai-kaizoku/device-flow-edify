import Sidebar from '@/components/sidebar';

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex h-full w-full">
			<Sidebar />
			{children}
		</main>
	);
}
