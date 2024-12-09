'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<button
			className="bg-white backdrop-blur-sm dark:bg-gray-800 hover:bg-black hover:text-white
					w-10 h-10 flex items-center justify-center rounded-full p-2 mb-4"
					style={{ marginLeft: 'auto', marginRight: 'auto' }}
			onClick={() => setTheme(isDark ? 'light' : 'dark')}>
			{isDark ? <Sun size={16} /> : <Moon size={16} />}
		</button>


	);
};
