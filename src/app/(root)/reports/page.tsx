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
      title: 'Employee Report',
      description: 'Get the List of all the Employees based on the Onboarding Date.',
      tag: 'people',
    },
    {
      title: 'Assigned Devices Report',
      description: 'Get All the devices that are assigned based on Assigned Date',
      tag: 'devices',
    },
    {
      title: 'Devices Report',
      description: 'Summary of Current Devices Assigned Status.',
      tag: 'devices',
    },
    {
      title: 'Inventory Devices Report',
      description: 'Overview of devices sold/inventory.',
      tag: 'devices',
    },
    {
      title: 'Expense Report',
      description: 'Breakdown of all expenses incurred.',
      tag: 'money',
    },
    {
      title: 'Profit Report',
      description: 'Analysis of profit and margin over time.',
      tag: 'money',
    },
  ];


  return (
    <CombinedContainer title="Reports">
      <div className="min-h-screen ">
        <ReportSection reportData={reportData}/>
      </div>
    </CombinedContainer>
  );
};

export default Reports;
