import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import { ScreenSize } from '@/components/utils/screen-size';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Edify for Startups',
	description: 'A better way to manage assets in orgs',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<ScreenSize />
					{children}
				</Providers>
			</body>
		</html>
	);
}
