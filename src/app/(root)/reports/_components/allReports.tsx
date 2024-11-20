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
		<div key={index} className="flex flex-col pt-12 px-4 space-y-4">
			<h2 className="text-2xl flex justify-start items-center gap-2 font-semibold">
				{report.title}
			</h2>
			<p className="text-gray-600 mb-5 leading-relaxed">{report.description}</p>
			{report.title === 'Devices Report' ? (
				<DevicesReport />
			) : report.title === 'Employee Report' ? (
				<EmployeeReport />
			) : report.title === 'Inventory Devices Report' ? (
				<div className='flex flex-col'>
					<div className="my-4">
						<label className="text-gray-700 font-medium text-lg">File Format :</label>  
						<input type='text'
						className='w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
						value="CSV"
						readOnly
						required={true}
						/>  
					</div>

					<button
						className="w-full my-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
						onClick={handleDownloadInventoryReport}>
						Download Report
					</button>
				</div>
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
