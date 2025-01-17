"use client";
import { CombinedContainer } from "@/components/container/container";
import TabDisplay from "./TabDisplay";

export default function Issues() {
  return (
    <>
      <CombinedContainer title="Issues">
        {/* <DeviceContainer /> */}
        <TabDisplay/>
      </CombinedContainer>
    </>
  );
}
