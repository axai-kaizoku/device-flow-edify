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
      description: 'Download the full report with up-to-date details on all the members in your organisation.',
      tag: 'people',
    },
    {
      title: 'Assigned Members',
      description: 'Download the full report of all the members based on Onboarding Date.',
      tag: 'people',
    },
    {
      title: 'Deleted Members',
      description: 'Download the detailed report containing information on all the deleted members.',
      tag: 'people',
    },
    {
      title: 'Total Assets',
      description: 'Download the complete report showcasing the total assets under management.',
      tag: 'assets',
    },
    {
      title: 'Assigned Assets',
      description: 'Download the report highlighting all the assets assigned to an Employee in the organisation.',
      tag: 'assets',
    },
    {
      title: 'Deleted Assets',
      description: 'Download the full report providing insights into assets that have been decommissioned.',
      tag: 'assets',
    },
    {
      title: 'Unassigned Assets',
      description: 'Download the latest report highlighting all the assets not assigned to any Employee in the organisation.',
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
