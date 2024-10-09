import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import { ScreenSize } from '@/components/utils/screen-size';
import KbarWrapper from './KbarWrapper';
import { getSession } from '@/server/helper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Edify for Startups',
	description: 'A better way to manage assets in orgs',
};



export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const session = await getSession();
  	const userRole = session?.user.role;

	return (
		<html lang="en">
			<body className={inter.className}>
				<KbarWrapper userRole={userRole}/> {/* Render KbarWrapper here */}
				<Providers>
					<ScreenSize />
					{children}
				</Providers>
			</body>
		</html>
	);
}
