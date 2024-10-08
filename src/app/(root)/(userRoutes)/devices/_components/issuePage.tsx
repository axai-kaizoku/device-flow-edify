import React, { useEffect, useState } from 'react'
import EmpIssueTable from './empIssueTable'
import { getIssueByUserId, Issues } from '@/server/issueActions';

const Issue = ({issues}:any) => {
  // const [issues, setIssues] = useState<Issues[]>([]); // State to store the fetched issues
  const data = [
    {
      "deleted_at": null,
      "serial_no":123,
      "_id": "66f27b494a564c42900d6aa7",
      "userId": "66d6b97cee4edded829aa02d",
      "orgId": "66cdb429eca7ef02552984e7",
      "deviceId": "66e3fbf7b83635490e26bd98",
      "title": "Issue Title",
      "createdAt": "2024-09-24T08:41:45.871Z",
      "updatedAt": "2024-10-01T12:32:19.656Z",
      "__v": 0,
      "priority": "low",
      "status": "Recieved"
    },
    {
      "deleted_at": null,
      "serial_no":124,
      "_id": "66f27bbf4a564c42900d6aac",
      "userId": "66d6b97cee4edded829aa02d",
      "orgId": "66cdb429eca7ef02552984e7",
      "deviceId": "66e3fbf7b83635490e26bd98",
      "title": "Issue is big",
      "status": "Status of the issue",
      "createdAt": "2024-09-24T08:43:43.142Z",
      "updatedAt": "2024-09-24T08:44:22.935Z",
      "__v": 0
    }
  ]

  // async function fetchUserIssues() {
  //   try {
  //     const issuesList = await getIssueByUserId();
  //     if (issuesList) {
  //       setIssues(issuesList); // Set the fetched issues into state
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user issues:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchUserIssues(); // Fetch issues when the component mounts
  // }, []);

  useEffect(() => {
    fetchUserIssues(); // Fetch issues when the component mounts
  }, []);

  return (
    <div className='w-full'>
        <EmpIssueTable data={issues} />
    </div>
  )
}

export default Issue