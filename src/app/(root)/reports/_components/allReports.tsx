'use client';
import { getSoldInventoryReport } from '@/server/reportsAction';
import AssignedDevicesReport from './assignedDevicesReport';
import DevicesReport from './devicesReport';
import EmployeeReport from './employeeReport';
import { convertToCSV, downloadCSV } from './util';

const AllReports = ({ index, report }: any) => {
	const handleDownloadInventoryReport = async () => {
		try {
			const data = await getSoldInventoryReport();

			if (data && data.soldInventory && data.soldInventory.length > 0) {
				const csv = convertToCSV(data.soldInventory);

				downloadCSV(csv, `Sold_Inventory_report.csv`);
			} else {
				alert('No data available');
			}
		} catch (error) {
			console.error('Error downloading the report:', error);
			alert('Failed to download the report. Please try again.');
		}
	};

	return (
		<div
			key={index}
			className="bg-white border border-gray-300 rounded-xl shadow-lg p-6 transition transform  hover:scale-105 hover:shadow-2xl hover:bg-blue-50 max-w-md mx-auto">
			<h2 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
				{report.title}
			</h2>
			<p className="text-gray-600 mb-5 leading-relaxed">{report.description}</p>
			{report.title === 'Devices Report' ? (
				<DevicesReport />
			) : report.title === 'Employee Report' ? (
				<EmployeeReport />
			) : report.title === 'Inventory Devices Report' ? (
				<button
					className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
					onClick={handleDownloadInventoryReport}>
					Download Report
				</button>
			) : report.title === 'Assigned Devices Report' ? (
				<AssignedDevicesReport />
			) : (
				<div className="text-gray-500 italic">
					No action available right now
				</div>
			)}
		</div>
	);
};

export default AllReports;
