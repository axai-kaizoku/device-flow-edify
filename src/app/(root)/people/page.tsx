"use client";
import { CombinedContainer } from "@/components/container/container";
import dynamic from "next/dynamic";
import NotFound from "@/app/not-found";
import { NewPage } from "./new-page";
const TabDisplay = dynamic(() => import("./TabDisplay"), { ssr: false });

export default function People() {
  try {
    return (
      <CombinedContainer title="Assets">
        <NewPage />
        {/* <TabDisplay /> */}
      </CombinedContainer>
    );
  } catch (error) {
    console.error("Error fetching Users:", error);
    return (
      <CombinedContainer title="Users">
        <NotFound />
      </CombinedContainer>
    );
  }
}
