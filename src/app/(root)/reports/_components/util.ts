import { report } from "../page";
import { UserRound } from 'lucide-react';

export const convertToCSV = (jsonData:any) => {
    //all unique keys across all objects
    const allKeys = Array.from(
        new Set(jsonData.flatMap((eachObj:any) => Object.keys(eachObj)))
    );

    // CSV headers from all keys
    const headers = allKeys.join(',');

    // filling missing values with empty strings
    const rows = jsonData.map((eachObj:any) =>
        allKeys.map((key:any) => (eachObj[key] !== undefined ? `"${eachObj[key]}"` : '""')).join(',')
    );

    return [headers, ...rows].join('\n');
};

//   Function to download the CSV file
  export const downloadCSV = (csvData:any, filename:any) => {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

