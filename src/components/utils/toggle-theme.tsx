'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<button
			className="border p-1 rounded-full fixed bottom-6 left-6 "
			onClick={() => setTheme(isDark ? 'light' : 'dark')}>
			{isDark ? <Sun size={16} /> : <Moon size={16} />}
		</button>
	);
};
