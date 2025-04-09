"use client";
import { CombinedContainer } from "@/components/container/container";
import DeviceContainer from "./_components/deviceContainer";
import { DeviceIssueEmployee } from "./_components/new-device-container";

export default function Devices() {
  return (
    <>
      <CombinedContainer title="Assets">
        {/* <DeviceContainer /> */}
        <DeviceIssueEmployee />
      </CombinedContainer>
    </>
  );
}
