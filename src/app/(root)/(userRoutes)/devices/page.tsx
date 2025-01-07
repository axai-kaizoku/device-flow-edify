"use client";
import { CombinedContainer } from "@/components/container/container";
import DeviceContainer from "./_components/deviceContainer";

export default function Devices() {
  return (
    <>
      <CombinedContainer title="Assets">
        <DeviceContainer />
      </CombinedContainer>
    </>
  );
}
