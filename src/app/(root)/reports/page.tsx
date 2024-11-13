import { CombinedContainer } from '@/components/container/container';
import React from 'react';

const Reports = () => {
	// Sample data for the cards
	const reportData = [
		{
			title: 'Employee Report',
			description: 'Detailed report on sales performance.',
		},
		{
			title: 'Devices Report',
			description: 'Summary of current inventory status.',
		},
		{
			title: 'Inventory Devices Report',
			description: 'Overview of customer demographics.',
		},
		{
			title: 'Issues Report',
			description: 'Monthly revenue insights and trends.',
		},
		{
			title: 'Expense Report',
			description: 'Breakdown of all expenses incurred.',
		},
		{
			title: 'Profit Report',
			description: 'Analysis of profit and margin over time.',
		},
	];

	return (
		<CombinedContainer title="Reports">
			<div className=" flex items-center justify-center">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-6xl">
					{reportData.map((report, index) => (
						<div
							key={index}
							className="bg-white border rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-2xl">
							<h2 className="text-xl font-semibold text-gray-800 mb-2">
								{report.title}
							</h2>

							<button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
								Download Report
							</button>
						</div>
					))}
				</div>
			</div>
		</CombinedContainer>
	);
};

export default Reports;
