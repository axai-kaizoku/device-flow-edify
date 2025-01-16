"use client";
import React, { useState } from "react";
import PersonalDetails from "./_components/personal-details";
import OrganisationDetails from "./_components/organisation-details";
import EmailVerificaion from "./_components/email-verification";
import Welcome from "./_components/welcome-note";
import SettingPasswords from "./_components/setting-password";

function SignUp() {
  const [steps, setSteps] = useState(3);
  return (
    <>
      {steps === 1 && (
        <PersonalDetails
          setSteps={(steps: number) => {
            setSteps(steps);
          }}
        />
      )}
      {steps === 2 && (
        <OrganisationDetails
          steps={(steps: number) => {
            setSteps(steps);
          }}
        />
      )}
      {steps === 3 && (
        <EmailVerificaion
          setSteps={() => {
            setSteps(steps);
          }}
        />
      )}
      {steps === 4 && (
        <SettingPasswords
          setSteps={() => {
            setSteps(steps);
          }}
        />
      )}
      {steps === 5 && (
        <Welcome
          setSteps={() => {
            setSteps(steps);
          }}
        />
      )}
    </>
  );
}

export default SignUp;
