'use client';
import React, { useState } from 'react';

interface DropdownProps {
	items?: string[];
}

export const Dropdown: React.FC<DropdownProps> = ({ items = [] }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (val: string) => {
		setSelectedOption(val);
		setIsOpen(false);
	};

	return (
		<div className="inline-flex relative">
			<button
				onClick={toggleDropdown}
				className="min-w-[200px] relative flex items-center justify-between rounded-md bg-white text-gray-800 border border-gray-300 px-4 py-2 shadow-md transition-all duration-300 ease-in-out">
				<span>{selectedOption || 'Select Option'}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className={`w-6 h-auto transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>
			{isOpen && (
				<div className="absolute top-6 z-10 mt-[1.5rem] max-h-[150px] min-w-[200px] origin-top-right overflow-y-auto rounded-md border border-gray-100 bg-white shadow-lg custom-scrollbar">
					{items.map((item, index) => (
						<div
							key={index}
							onClick={() => handleOptionClick(item)}
							className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100">
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
