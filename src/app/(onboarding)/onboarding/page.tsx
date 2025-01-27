"use client";
import { useEffect, useState } from "react";
import { Address } from "./Address";
import { CompanyDetails } from "./CompanyDetails";
import { Teams } from "./Teams";
import { Employee } from "./Employee";
import { DeviceComponent } from "./Device";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    if (sessionStorage.getItem("employee-count")) {
      const count = parseInt(sessionStorage.getItem("employee-count")!);
      if (count >= 2) {
        router.push("/");
      }
    }
    // if (sessionStorage.getItem("employee-count") === "2") {
    //   router.push("/");
    // }
  }, [router]);

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
