export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="flex h-full w-full">{children}</main>;
}
