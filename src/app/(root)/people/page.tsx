"use client";
import { CombinedContainer } from "@/components/container/container";
import dynamic from "next/dynamic";
import { filterUsers } from "@/server/filterActions";
import { useEffect, useState } from "react";
import Error from "@/app/error/page";
import NotFound from "@/app/not-found";
import { UserResponse } from "@/server/userActions";
const TabDisplay = dynamic(() => import("./TabDisplay"), { ssr: false });

export default function People() {
  try {
    return (
      <CombinedContainer title="Assets">
        <TabDisplay />
      </CombinedContainer>
    );
  } catch (error) {
    console.error("Error fetching Users:", error);
    return (
      <CombinedContainer title="Users">
        <Error />
      </CombinedContainer>
    );
  }
}
