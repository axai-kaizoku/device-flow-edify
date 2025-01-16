"use client";

import { useEffect, useState } from "react";
import OrgChart from "./chart";
import { Employee } from "./data";
//Resolving SSR issue here
const Org = ({ data }: { data: Employee }) => {
  const [show, setShow] = useState(false);
  console.log(data);
  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <>
      {JSON.stringify(data)}
      <OrgChart orgData={data} />
    </>
  );
};

export default Org;
