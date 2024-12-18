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

                if (data?.devices && data?.devices?.length > 0) {
                
                    const csv = convertToCSV(data?.devices);
            
                    
                    downloadCSV(csv, `Device_Report_${status}.csv`);
                } 
                else {
                    alert('No data available for the selected status.');
                }

            } else { 
                const data = await getDeviceReport(status);
            
                if (data && data?.devices && data?.devices?.length > 0) {
                    
                    const csv = convertToCSV(data?.devices);
            
                    
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
        <div className='w-full'>
            <div className="flex flex-col items-start gap-4 my-4">
                <label className="text-gray-700 font-medium text-lg">
                    Select Status:
                </label>
                <select
                    className="w-full mb-8 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Unassigned</option>
                    <option value="all">All Devices</option>
                </select>
            </div>

            {/* <div className="mb-8">
                <label className="text-gray-700 font-medium text-lg">File Format :</label>  
                <input type='text'
                className='w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
                value="CSV"
                readOnly
                />  
            </div> */}

            <div className='flex gap-2'>
                <button className='flex-1 font-semibold text-lg py-2.5 border-[2px] border-black rounded-[49px]'>Cancel</button>
                <button className='flex-1 text-white bg-black rounded-[49px] font-semibold text-lg py-2.5' onClick={handleDownloadReport}>Download</button>
            </div>
        </div>
  )
}

export default DevicesReport