'use client'
import React, { useState } from 'react'
import { convertToCSV, downloadCSV } from './util';
import { getUserReports } from '@/server/reportsAction';

const EmployeeReport = () => {
    const [operator, setOperator] = useState('>');
    const [date, setDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleDownloadClick = async () => {
        try {
            const filters = [];
            if (operator === 'between' && fromDate && toDate) {
            filters.push(['onboarding_date', 'Between', [fromDate, toDate]]);
            } else if (operator && date) {
            filters.push(['onboarding_date', operator, date]);
            }

            const data = await getUserReports({filters});
            if (data && data.users && data.users.length > 0) {
              
                const csv = convertToCSV(data.users);
        
                
                downloadCSV(csv, `user_report.csv`);
              } else {
                alert('No data available');
              }
            } catch (error) {
              console.error("Error downloading the report:", error);
              alert("Failed to download the report. Please try again.");
          }
        // onDownload(filters);
        setFromDate('');
        setToDate('');
        setDate('');
    };
  return (
    <div>
        <label className="block text-gray-700 font-medium mb-2">Operator:</label>
        <select
            className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
        >
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value="between">Between</option>
        </select>

        {operator === 'between' ? (
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-gray-600">From:</label>
                    <input
                        type="date"
                        className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-gray-600">To:</label>
                    <input
                        type="date"
                        className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
            </div>
        ) : (
            <div className="mb-4">
                <label className="text-gray-600">Date:</label>
                <input
                    type="date"
                    className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
        )}

        <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            onClick={handleDownloadClick}
        >
            Download Report
        </button>
    </div>
  )
}

export default EmployeeReport