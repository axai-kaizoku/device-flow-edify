'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUsers, searchUsers } from '@/server/userActions';

export type Option = {
	_id: string;
	email: string;
	username: string;
	title?: string;
	city?: string;
};

type SelectInputProps = {
	value: string;
	fetchOptions: (query: string) => Promise<Option[]>;
	initialOptions: () => Promise<Option[]>;
	onSelect: (data: Option) => void;
	createOptionText: string; // Text for the "create new" option
	createOptionUrl: string; // URL for redirecting when "create new" is selected
};

export const SelectInput = ({
	value,
	fetchOptions,
	initialOptions,
	onSelect,
	createOptionText,
	createOptionUrl,
}: SelectInputProps) => {
	const router = useRouter();
	const [query, setQuery] = useState(value);
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [options, setOptions] = useState<Option[]>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		setQuery(value); // Sync input with parent value on updates
	}, [value]);

	// Debounce query updates
	useEffect(() => {
		const handler = setTimeout(() => setDebouncedQuery(query), 300);
		return () => clearTimeout(handler);
	}, [query]);

	// Fetch options based on debounced query
	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiData = debouncedQuery
					? await fetchOptions(debouncedQuery)
					: await initialOptions();

				setOptions([
					...apiData,
					{ _id: 'create_new', email: createOptionText } as Option,
				]);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [debouncedQuery, fetchOptions, initialOptions, createOptionText]);

	// Close dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Scroll to the highlighted option
	const scrollToOption = (index: number) => {
		optionRefs.current[index]?.scrollIntoView({ block: 'nearest' });
	};

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!isDropdownOpen || options.length === 0) return;

			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					setHighlightedIndex((prev) =>
						prev === null || prev === options.length - 1 ? 0 : prev + 1,
					);
					scrollToOption(highlightedIndex === null ? 0 : highlightedIndex + 1);
					break;
				case 'ArrowUp':
					event.preventDefault();
					setHighlightedIndex((prev) =>
						prev === null || prev === 0 ? options.length - 1 : prev - 1,
					);
					scrollToOption(
						highlightedIndex === null
							? options.length - 1
							: highlightedIndex - 1,
					);
					break;
				case 'Enter':
					if (highlightedIndex !== null) {
						const selectedOption = options[highlightedIndex];
						if (selectedOption._id === 'create_new') {
							router.push(createOptionUrl);
						} else {
							handleSelect(selectedOption);
						}
					}
					break;
				case 'Escape':
					setIsDropdownOpen(false);
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isDropdownOpen, options, highlightedIndex, createOptionUrl]);

	const handleSelect = (option: Option) => {
		setQuery(option.email);
		setIsDropdownOpen(false);
		onSelect(option);
	};

	return (
		<div className="relative w-full max-w-sm" ref={dropdownRef}>
			<input
				type="text"
				className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Search or select..."
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
					setIsDropdownOpen(true);
					setHighlightedIndex(null);
				}}
				onFocus={() => setIsDropdownOpen(true)}
			/>
			{isDropdownOpen && (
				<div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-52 overflow-y-auto">
					{options.map((option, index) => (
						<div
							key={option._id}
							ref={(el) => (optionRefs.current[index] = el)}
							className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
								highlightedIndex === index ? 'bg-gray-100' : ''
							}`}
							onClick={() => {
								if (option._id === 'create_new') {
									router.push(createOptionUrl);
								} else {
									handleSelect(option);
								}
							}}>
							{option.email ?? option.title ?? option.city}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

// Demo Component
export function SelectDemo() {
	const handleSelect = (data: any) => {
		console.log('Selected:', data);
	};

	return (
		<div className="p-4">
			<SelectInput
				fetchOptions={searchUsers}
				initialOptions={fetchUsers}
				onSelect={handleSelect}
				createOptionText="Create a new user"
				createOptionUrl="/onboarding?tab=create_user"
				value=""
			/>
		</div>
	);
}
