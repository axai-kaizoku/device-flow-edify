// OrgChart.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import { findOriginalNode, mapEmployeeToRawNodeDatum } from './utils';
import { renderCustomNodeElement } from './RenderNode';
// import { orgData } from './data';

export default function OrgChart({orgData}:any) {
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
		const updatedData = JSON.parse(JSON.stringify(data)); // Deep clone the data

		const toggleNode = (node: any) => {
			if (node.name === nodeDatum.name) {
				if (node.children) {
					node.children = undefined;
				} else {
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
		setData(updatedData);
	};

	return (
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
						orgData
					})
				}
				separation={{ siblings: 1, nonSiblings: 1 }}
				zoomable={true}
				scaleExtent={{ min: 0.5, max: 2 }}
			/>
		</div>
	);
}
