"use client";
import { CombinedContainer } from "@/components/container/container";

import { Skeleton } from "@/components/ui/skeleton";
import { getTeamById, Team } from "@/server/teamActions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TeamActions from "./_components/team-action";
import TeamHeader from "./_components/team-header";
import TeamMembers from "./_components/team-members";
import { ActionBar } from "@/components/action-bar/action-bar";

interface TeamPageProps {
  params: { id: string };
}

export default function TeamPage({ params }: TeamPageProps) {
  const { data, status } = useQuery<Team>({
    queryKey: ["fetch-team-by-id", params?.id],
    queryFn: () => getTeamById(params?.id),
    refetchOnWindowFocus: false,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  return (
    <CombinedContainer title="Teams">
      <ActionBar showBackBtn>
        <div className="text-[#7F7F7F] flex w-full text-nowrap text-sm font-gilroySemiBold">
          <TeamActions
            team={data}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </ActionBar>

      <div className="  p-3 mt-4 border border-gray-200 bg-white  rounded-lg ">
        <div className="flex justify-between items-center mb-3">
          {status === "pending" ? (
            <TeamHeaderSkeleton />
          ) : (
            <TeamHeader
              image={data?.image}
              title={data?.title ?? "-"}
              description={data?.description ?? "-"}
              active_manager={data?.manager[0]?.first_name ?? "-"}
            />
          )}
        </div>
        <TeamMembers
          teamData={data}
          status={status}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          handleSelectionChange={handleSelectionChange}
        />
      </div>
    </CombinedContainer>
  );
}

function TeamHeaderSkeleton() {
  return (
    <div className="flex gap-4 pl-3 items-center">
      {/* Team image */}
      <Skeleton className="size-16 rounded-full" />

      {/* Text content */}
      <div className="flex flex-col gap-y-2">
        {/* Title */}
        <Skeleton className="h-5 w-40" />

        {/* Reporting manager line */}
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-52" />
        </div>
      </div>
    </div>
  );
}
