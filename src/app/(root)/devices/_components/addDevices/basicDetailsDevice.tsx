// import { Icon } from '@/components/wind/Icons';
// import React, { useState } from 'react';

// function BasicDetails() {
// 	const [selectedOS, setSelectedOS] = useState<string | null>(null);

// 	const operatingSystems = [
// 		{
// 			id: 'macos',
// 			name: 'MacOS',
// 			description: 'High Sierra, Monterey, Ventura',
// 			icon: (
// 				<Icon
// 					type={'OutlinedNote'}
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'windows',
// 			name: 'Windows',
// 			description: 'Windows 8, Windows 10, Windows 11',
// 			icon: (
// 				<Icon
// 					type={'OutlinedNote'}
// 					color="black"
// 				/>
// 			),
// 		},
// 		{
// 			id: 'others',
// 			name: 'Others',
// 			description: 'Linux, DOS, Chrome OS',
// 			icon: (
// 				<Icon
// 					type={'OutlinedNote'}
// 					color="black"
// 				/>
// 			),
// 		},
// 	];

// 	return (
// 		<>
// 		<div className="flex flex-col">
// 			<h1 className="text-2xl font-bold py-5">Basic Details</h1>
// 			<p className="text-lg ">Operating System</p>

// 			<div className="flex flex-wrap mb-4 gap-4">
// 				{operatingSystems.map((os) => (
// 					<div
// 						key={os.id}
// 						className={p-4 flex items-start border rounded-lg w-80 cursor-pointer ${
// 							selectedOS === os.id ? 'border-black' : 'border-gray-300'
// 						}}
// 						onClick={() => setSelectedOS(os.id)}>
// 						<input
// 							type="radio"
// 							id={os.id}
// 							checked={selectedOS === os.id}
// 							onChange={() => setSelectedOS(os.id)}
// 							className="mr-3 h-4 w-4 mt-1 accent-black"
// 						/>
// 						<label
// 							htmlFor={os.id}
// 							className="flex flex-col">
// 							<p className="flex items-center font-medium gap-2">
// 								{os.icon}
// 								{os.name}
// 							</p>
// 							<span className="text-sm text-gray-500">{os.description}</span>
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 			<div>
// 				<p className="text-lg ">Models</p>
// 				<input
// 					type="text"
// 					placeholder="What is the laptop lineup "
// 					className="px-2 focus:outline-none py-3 w-full rounded-lg border border-gray-200"
// 				/>
// 				<div className="py-4 flex justify-between flex-wrap gap-3">
// 					<div className="flex flex-col">
// 						<label>Processor</label>
// 						<input
// 							type="text"
// 							className="focus:outline-none px-2 w-48 py-3 rounded-lg border border-gray-200"
// 						/>
// 					</div>
// 					<div className="flex flex-col">
// 						<label>RAM</label>
// 						<input
// 							type="text"
// 							className="focus:outline-none px-2 w-48 py-3 rounded-lg border border-gray-200"
// 						/>
// 					</div>
// 					<div className="flex flex-col">
// 						<label>Storage</label>
// 						<input
// 							type="text"
// 							className="focus:outline-none px-2 w-48 py-3 rounded-lg border border-gray-200"
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</div></>
// 	);
// }

// export default BasicDetails;
import { Icon } from '@/components/wind/Icons';
import React, { useState } from 'react';

function BasicDetails() {
	const [selectedOS, setSelectedOS] = useState<string | null>(null);

	const operatingSystems = [
		{
			id: 'macos',
			name: 'MacOS',
			description: 'High Sierra, Monterey, Ventura',
			icon: (
				<Icon
					type={'OutlinedNote'}
					color="black"
				/>
			),
		},
		{
			id: 'windows',
			name: 'Windows',
			description: 'Windows 8, Windows 10, Windows 11',
			icon: (
				<Icon
					type={'OutlinedNote'}
					color="black"
				/>
			),
		},
		{
			id: 'others',
			name: 'Others',
			description: 'Linux, DOS, Chrome OS',
			icon: (
				<Icon
					type={'OutlinedNote'}
					color="black"
				/>
			),
		},
	];

	return (
		<>
			<div className="flex flex-col">
				<h1 className="text-2xl font-bold py-5">Basic Details</h1>
				<p className="text-lg ">Operating System</p>

				<div className="flex flex-wrap mb-4 gap-4">
					{operatingSystems.map((os) => (
						<div
							key={os.id}
							className={`p-4 flex items-start border rounded-lg w-80 cursor-pointer ${
								selectedOS === os.id ? 'border-black' : 'border-gray-300'
							}`}
							onClick={() => setSelectedOS(os.id)}>
							<input
								type="radio"
								id={os.id}
								checked={selectedOS === os.id}
								onChange={() => setSelectedOS(os.id)}
								className="mr-3 h-4 w-4 mt-1 accent-black"
							/>
							<label
								htmlFor={os.id}
								className="flex flex-col">
								<p className="flex items-center font-medium gap-2">
									{os.icon}
									{os.name}
								</p>
								<span className="text-sm text-gray-500">{os.description}</span>
							</label>
						</div>
					))}
				</div>
				<div>
					<p className="text-lg ">Models</p>
					<input
						type="text"
						placeholder="What is the laptop lineup "
						className="px-2 focus:outline-none py-3 w-full rounded-lg border border-gray-200"
					/>
					<div className="py-4 flex justify-between flex-wrap gap-3">
						<div className="flex flex-col">
							<label>Processor</label>
							<input
								type="text"
								className="focus:outline-none px-2 w-48 py-3 rounded-lg border border-gray-200"
							/>
						</div>
						<div className="flex flex-col">
							<label>RAM</label>
							<input
								type="text"
								className="focus:outline-none px-2 w-48 py-3 rounded-lg border border-gray-200"
							/>
						</div>
						<div className="flex flex-col">
							<label>Storage</label>
							<input
								type="text"
								className="focus:outline-none px-2 w-48 py-3 rounded-lg border border-gray-200"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BasicDetails;
