'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ToggleTheme = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	return (
		<button
			className=" fixed right-64 top-10 p-2 border  rounded-lg  "
			onClick={() => setTheme(isDark ? 'light' : 'dark')}>
			{isDark ? 'Light' : 'Dark'}
		</button>
	);
};
