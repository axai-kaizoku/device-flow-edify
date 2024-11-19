import { CombinedContainer } from '@/components/container/container';
import React from 'react';
import AllReports from './_components/allReports';

const Reports = () => {
	// Sample data for the cards
	const reportData = [
		{
			title: 'Employee Report',
			description: 'All the Employees based on the Onboarding Date.',
		},
		{
			title: 'Assigned Devices Report',
			description:
				'Get All the devices that are assigned based on Assigned Date',
		},
		{
			title: 'Devices Report',
			description: 'Summary of Current Devices Assigned Status.',
		},
		{
			title: 'Inventory Devices Report',
			description: 'Overview of devices sold/inventory.',
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
			<div className="flex items-start justify-center min-h-screen">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-6xl w-full">
					{reportData.map((report, index) => (
						<AllReports report={report} index={report.title} />
					))}
				</div>
			</div>
		</CombinedContainer>
	);
};

export default Reports;
