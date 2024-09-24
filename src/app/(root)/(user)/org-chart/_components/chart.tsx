'use client';
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';

// Define the types for the org chart data
interface Employee {
	name: string;
	role: string;
	profile: string;
	children?: Employee[];
}

// Org chart data
const orgData: Employee = {
	name: 'John Doe',
	role: 'CEO',
	profile: '/assets/sidebar/profile.svg',
	children: [
		{
			name: 'Jane Smith',
			role: 'CTO',
			profile: '/assets/sidebar/profile.svg',
			children: [
				{
					name: 'David Clark',
					role: 'Lead Developer',
					profile: '/assets/sidebar/profile.svg',
					children: [
						{
							name: 'Alex Turner',
							role: 'Developer',
							profile: '/assets/sidebar/profile.svg',
						},
						{
							name: 'Katie Holmes',
							role: 'Junior Developer',
							profile: '/assets/sidebar/profile.svg',
						},
					],
				},
				{
					name: 'Emily Johnson',
					role: 'Head of AI',
					profile: '/assets/sidebar/profile.svg',
					children: [
						{
							name: 'Alice Williams',
							role: 'AI Engineer',
							profile: '/assets/sidebar/profile.svg',
						},
						{
							name: 'Ethan Brown',
							role: 'ML Specialist',
							profile: '/assets/sidebar/profile.svg',
						},
					],
				},
			],
		},
		{
			name: 'Mike Brown',
			role: 'CFO',
			profile: '/assets/sidebar/profile.svg',
			children: [
				{
					name: 'Paul Adams',
					role: 'Finance Manager',
					profile: '/assets/sidebar/profile.svg',
				},
				{
					name: 'Nancy White',
					role: 'Accountant',
					profile: '/assets/sidebar/profile.svg',
				},
			],
		},
		{
			name: 'Laura King',
			role: 'Head of HR',
			profile: '/assets/sidebar/profile.svg',
			children: [
				{
					name: 'Susan Hill',
					role: 'HR Manager',
					profile: '/assets/sidebar/profile.svg',
				},
				{
					name: 'Tom White',
					role: 'Recruiter',
					profile: '/assets/sidebar/profile.svg',
				},
			],
		},
		{
			name: 'Michael Young',
			role: 'Head of Sales',
			profile: '/assets/sidebar/profile.svg',
			children: [
				{
					name: 'David Brown',
					role: 'Sales Manager',
					profile: '/assets/sidebar/profile.svg',
				},
				{
					name: 'Jessica Green',
					role: 'Sales Executive',
					profile: '/assets/sidebar/profile.svg',
				},
			],
		},
	],
};

// Function to map Employee to RawNodeDatum format and collapse beyond first level
const mapEmployeeToRawNodeDatum: any = (
	employee: Employee,
	level = 0,
	maxInitialLevel = 1,
) => ({
	name: employee.name,
	attributes: {
		role: employee.role,
		childrenCount: employee.children?.length || 0, // Add children count
	},
	children:
		level < maxInitialLevel
			? employee.children?.map((child) =>
					mapEmployeeToRawNodeDatum(child, level + 1, maxInitialLevel),
			  )
			: undefined, // Collapse children beyond the first level
});
const countTotalEmployees = (employee: Employee): number => {
	if (!employee.children || employee.children.length === 0) {
		return 0; // No children means no employees under this person
	}

	// Recursively count children plus their children
	return employee.children.reduce(
		(total, child) => total + 1 + countTotalEmployees(child),
		0,
	);
};

const renderCustomNodeElement = ({ nodeDatum, toggleNode }: any) => {
	const isCEO = nodeDatum.name === 'John Doe'; // Check if it's the CEO node
	const totalEmployees = isCEO ? countTotalEmployees(orgData) : 0; // Total employee count for CEO
	const isExpanded = !!nodeDatum.children; // Check if the node is expanded
	const childrenCount = nodeDatum.attributes?.childrenCount; // Get the number of children

	return (
		<g
			transform="translate(-50, -30)"
			style={{ cursor: 'pointer' }}
			onClick={toggleNode}>
			<foreignObject
				width="100"
				height="80"
				style={{
					overflow: 'visible',

					borderTop: '2px solid #000',

					borderRadius: '5px',
				}}>
				<div className="bg-white shadow-lg rounded-md p-1 flex flex-col items-center justify-center border border-gray-300 hover:shadow-zinc-400 transition-shadow duration-300">
					<img
						src={nodeDatum.profile || '/assets/sidebar/profile.svg'}
						alt={nodeDatum.name}
						className="w-6 h-6 rounded-full"
					/>
					<div className="flex justify-center items-center flex-col">
						<p className="text-xs font-semibold">{nodeDatum.name}</p>
						<p className="text-[10px] text-gray-500">
							{nodeDatum.attributes?.role}
						</p>

						{/* CEO Card - Show Total Number of Employees */}
						{isCEO ? (
							<p className="flex justify-center items-center text-[9px] text-gray-400 border rounded-full w-4 h-4 ">
								{totalEmployees}
							</p>
						) : (
							// Non-CEO Card - Show Direct Reports or Minus Icon when expanded (but only if there are children)
							childrenCount > 0 && (
								<p className="flex justify-center items-center text-[9px] text-gray-400 border rounded-full w-4 h-4">
									{isExpanded ? '-' : childrenCount}
								</p>
							)
						)}
					</div>
				</div>
			</foreignObject>
		</g>
	);
};

export default function OrgChart() {
	const [translate, setTranslate] = useState({ x: 0, y: 0 });
	const [data, setData] = useState(mapEmployeeToRawNodeDatum(orgData));

	useEffect(() => {
		const dimensions = document
			.getElementById('treeWrapper')
			?.getBoundingClientRect();
		if (dimensions) {
			setTranslate({ x: dimensions.width / 2, y: 100 });
		}
	}, []);

	const handleNodeClick = (nodeDatum: any) => {
		// Toggle the node's children
		const updatedData = JSON.parse(JSON.stringify(data)); // Deep clone the data

		const toggleNode = (node: any) => {
			if (node.name === nodeDatum.name) {
				if (node.children) {
					node.children = undefined; // Collapse the node
				} else {
					// Expand the node if it was collapsed
					const originalNode = findOriginalNode(orgData, node.name);
					if (originalNode) {
						node.children = originalNode.children
							? originalNode.children.map(mapEmployeeToRawNodeDatum)
							: [];
					}
				}
			}
			node.children?.forEach(toggleNode);
		};

		toggleNode(updatedData);
		setData(updatedData); // Update state with modified data
	};

	const findOriginalNode = (node: Employee, name: string): Employee | null => {
		if (node.name === name) {
			return node;
		}
		if (node.children) {
			for (const child of node.children) {
				const found = findOriginalNode(child, name);
				if (found) return found;
			}
		}
		return null;
	};

	return (
		<>
			<div
				id="treeWrapper"
				className="w-full h-screen p-8 bg-gray-50 overflow-auto">
				<Tree
					data={data}
					translate={translate}
					orientation="vertical"
					collapsible={false}
					pathFunc="diagonal"
					enableLegacyTransitions={true}
					transitionDuration={300}
					renderCustomNodeElement={(rd3tProps) =>
						renderCustomNodeElement({
							...rd3tProps,
							toggleNode: () => handleNodeClick(rd3tProps.nodeDatum),
						})
					}
					separation={{ siblings: 1, nonSiblings: 1 }}
					zoomable={true}
					scaleExtent={{ min: 0.5, max: 2 }}
				/>
			</div>
		</>
	);
}
