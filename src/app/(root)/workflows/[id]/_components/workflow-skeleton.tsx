"use client";

import { CombinedContainer } from "@/components/container/container";
import { Skeleton } from "@/components/ui/skeleton";

export const WorkflowSkeleton = () => {
  return (
    <CombinedContainer className="w-full">
      <section className="w-full h-full">
        {/* Workflow Header Skeleton */}
        <div className="flex items-center justify-between p-4 border rounded-t-[10px] bg-white">
          <div className="flex gap-3">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-48 rounded-md" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-7 w-16 rounded-lg" />
          </div>

          <div className="flex gap-2.5">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>

        {/* Flow Editor Skeleton with Dot Grid */}
        <div className="border-b border-l border-r rounded-[10px] rounded-t-none h-[75vh] relative overflow-hidden bg-white">
          {/* Dot Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)
              `,
              backgroundSize: "24px 24px",
              backgroundPosition: "center center",
            }}
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center relative">
              {/* Start Node */}
              <Skeleton className="h-10 w-24 rounded-[10px]" />

              {/* Connector Line to App Node */}
              <div className="h-1 w-12 bg-gray-200 rounded  left-[110px] top-1/2 -translate-y-1/2 z-10" />

              {/* App Node */}
              <Skeleton className="h-32 w-60 rounded-[10px]" />

              {/* Connector Line to Split Node */}
              <div className="h-1 w-6 bg-gray-200 rounded  left-[340px] top-1/2 -translate-y-1/2 z-10" />

              {/* Split Node */}
              <Skeleton className="h-16 w-16 rounded-[10px] rotate-45" />
            </div>
          </div>
        </div>
      </section>
    </CombinedContainer>
  );
};
