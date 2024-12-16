import { CombinedContainer } from '@/components/container/container';
import React from 'react';
import AllReports from './_components/allReports';
import { Icon } from '@/components/wind/Icons';
import ReportSection from './_components/reportSection';

export interface report {
	title: string,
	description:string,
	tag: string
}

const Reports = () => {
  const reportData = [
    {
      title: 'Total Members',
      description: 'Total Members',
      tag: 'people',
    },
    {
      title: 'Active Members',
      description: 'Active Members',
      tag: 'people',
    },
    {
      title: 'Deleted Members',
      description: 'Deleted Members',
      tag: 'people',
    },
    {
      title: 'Total Assets',
      description: 'Total Assets',
      tag: 'assets',
    },
    {
      title: 'Active Assets',
      description: 'Active Assets',
      tag: 'assets',
    },
    {
      title: 'Deleted Assets',
      description: 'Deleted Assets',
      tag: 'assets',
    },
  ];


  return (
    <CombinedContainer title="Reports">
      <div className="w-full overflow-hidden h-full">
        <ReportSection reportData={reportData}/>
      </div>
    </CombinedContainer>
  );
};

export default Reports;
