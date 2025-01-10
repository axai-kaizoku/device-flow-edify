"use client";
import { useState } from "react";
import { Address } from "./Address";
import { CompanyDetails } from "./CompanyDetails";
import { Teams } from "./Teams";
import { Employee } from "./Employee";
import { DeviceComponent } from "./Device";

export default function Page() {
  const [steps, setSteps] = useState(5);
  return (
    <>
      {steps === 1 && (
        <CompanyDetails
          setSteps={(steps: number) => {
            setSteps(steps);
          }}
        />
      )}
      {steps === 2 && (
        <Address
          steps={(steps: number) => {
            setSteps(steps);
          }}
        />
      )}
      {steps === 3 && (
        <Teams
          setSteps={() => {
            setSteps(4);
          }}
        />
      )}
      {steps === 4 && (
        <Employee
          setSteps={() => {
            setSteps(5);
          }}
        />
      )}
      {steps === 5 && <DeviceComponent />}
    </>
  );
}
