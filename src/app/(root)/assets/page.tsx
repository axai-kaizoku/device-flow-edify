"use client";
import Error from "@/app/error/page";
import { CombinedContainer } from "@/components/container/container";

import dynamic from "next/dynamic";

const TabDisplay = dynamic(() => import("./TabDisplay"), { ssr: false });

export default function Assets() {
  try {
    return (
      <CombinedContainer title="Assets">
        <TabDisplay />
      </CombinedContainer>
    );
  } catch (error) {
    console.error("Error fetching devices:", error);
    return (
      <CombinedContainer title="Assets">
        <Error />
      </CombinedContainer>
    );
  }
}
