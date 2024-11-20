import React from 'react';
import { report } from '../page';
import { Icon } from '@/components/wind/Icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/side-sheet';
import AllReports from './allReports';

const ReportSection = ({ reportData }: { reportData: report[] }) => {
  const groupedReports = reportData.reduce((acc, report) => {
    if (!acc[report.tag]) acc[report.tag] = [];
    acc[report.tag].push(report);
    return acc;
  }, {} as Record<string, typeof reportData>);

  return (
    <div className="min-h-screen">
      {Object.entries(groupedReports).map(([tag, reports]) => (
        <div key={tag} className="mb-12">
          {/* Section Header */}
          <h2 className="text-2xl font-bold mb-6 text-gray-800 capitalize border-l-4 pl-4 border-l-blue-600">
            {tag.toUpperCase()}
          </h2>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <Sheet key={index}>
                {/* Card */}
                <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between">
                  {/* Title with Icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <Icon type="OutlinedArrowRight" color="#2563eb" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {report.title}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-gray-300 mb-4"></div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-6">{report.description}</p>

                  {/* Button as Sheet Trigger */}
                  <SheetTrigger className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Download Report
                  </SheetTrigger>
                </div>

                {/* Sheet Content */}
                <SheetContent>
                  <div className="pt-12 px-4">
                    <AllReports report={report} index={index}/>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportSection;
