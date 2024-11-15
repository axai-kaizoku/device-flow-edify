'use client'
import React, { useState } from 'react'
import { convertToCSV, downloadCSV } from './util';
import { getDeviceReport } from '@/server/reportsAction';
import { filterDevice } from '@/server/filterActions';

const DevicesReport = () => {
    const [status, setStatus] = useState('all');

    const handleDownloadReport = async () => {
        try {
            console.log(status)
            if(status === 'all'){
                const data = await filterDevice({pageLength:1000});

                if (data.devices && data.devices.length > 0) {
                
                    const csv = convertToCSV(data.devices);
            
                    
                    downloadCSV(csv, `Device_Report_${status}.csv`);
                } 
                else {
                    alert('No data available for the selected status.');
                }

            } else { 
                const data = await getDeviceReport(status);
            
                if (data && data.devices && data.devices.length > 0) {
                    
                    const csv = convertToCSV(data.devices);
            
                    
                    downloadCSV(csv, `Device_Report_${status}.csv`);
                    
                } else {
                    alert('No data available for the selected status.');
                }
            }
        } catch (error) {
          console.error("Error downloading the report:", error);
          alert("Failed to download the report. Please try again.");
        }
    };
  return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <label className="text-gray-700 font-medium text-lg">
                    Select Status:
                </label>
                <select
                    className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Unassigned</option>
                    <option value="all">All Devices</option>
                </select>
            </div>

            <button
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                onClick={handleDownloadReport}
            >
                Download Report
            </button>
        </div>
  )
}

export default DevicesReport