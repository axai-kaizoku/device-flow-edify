import React, { useEffect, useState } from 'react'
import EmpIssueTable from './empIssueTable'
import { getAllResponse, getIssueByUserId, Issues } from '@/server/issueActions';

const Issue = ({issues}:{issues:getAllResponse}) => {

  return (
    <div className='w-full'>
        <EmpIssueTable data={issues} />
    </div>
  )
}

export default Issue