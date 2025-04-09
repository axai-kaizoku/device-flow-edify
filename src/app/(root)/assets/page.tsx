"use client";
import NotFound from "@/app/not-found";
import { CombinedContainer } from "@/components/container/container";

// import dynamic from "next/dynamic";
import NewPage from "./new-page";

// const TabDisplay = dynamic(() => import("./TabDisplay"), { ssr: false });

export default function Assets() {
  try {
    return (
      <CombinedContainer title="Assets">
        {/* <TabDisplay /> */}
        <NewPage />
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Assets">
        <NotFound />
      </CombinedContainer>
    );
  }
}
