"use client";
import NotFound from "@/app/not-found";
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
    return (
      <CombinedContainer title="Assets">
        <NotFound/>
      </CombinedContainer>
    );
  }
}
