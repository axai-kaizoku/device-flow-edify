'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from './app/store/store';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<SessionProvider>
				<ThemeProvider attribute="class" defaultTheme="light">
					{children}
				</ThemeProvider>
			</SessionProvider>
		</Provider>
	);
}
