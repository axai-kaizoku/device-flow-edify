"use client";
import NotFound from "@/app/not-found";
import { CombinedContainer } from "@/components/container/container";
import { NewBackButton } from "@/components/new-back-button";
import { Skeleton } from "@/components/ui/skeleton";
import { getIssueById, Issues } from "@/server/issueActions";
import { useQuery } from "@tanstack/react-query";
import IssueSection from "./_components/issue-main";

interface IssuePageProps {
  params: { id: string };
}

function SingleIssue({ params }: IssuePageProps) {
  const { data, isError, status } = useQuery<Issues>({
    queryKey: ["fetch-issues-by-id", params.id],
    queryFn: () => getIssueById(params.id),
  });

  if (isError) {
    return (
      <CombinedContainer title="Issue Details">
        <div className="flex justify-center items-center h-[80vh] w-full">
          <NotFound />
        </div>
      </CombinedContainer>
    );
  }

  return (
    <CombinedContainer title="Issue Details">
      <div className="flex items-center gap-2 sticky top-0 z-50 p-3 rounded-lg border border-[#0000001A] bg-white">
        <NewBackButton />

        <div className="flex w-fit rounded-md border border-[rgba(0,0,0,0.2)] py-2 px-4 gap-1">
          <div className="text-[#7F7F7F] text-nowrap text-sm font-gilroySemiBold">
            Issue ID: <span className="text-black">{data?.issueId}</span>
          </div>
        </div>
      </div>
      {status === "pending" ? (
        <IssueDetailSkeleton />
      ) : (
        <IssueSection data={data} />
      )}
    </CombinedContainer>
  );
}

export default SingleIssue;

function IssueDetailSkeleton() {
  return (
    <div className="flex h-[70vh] pt-4 w-full gap-4 mt-3">
      {/* First Column */}
      <div className="flex flex-col gap-4 w-[45%]">
        {/* First Row of First Column */}
        <Skeleton className="px-6 py-4 h-16" />

        {/* Second Row of First Column */}
        <div className="flex gap-4 flex-1">
          {/* First Column of Second Row */}
          <Skeleton className="flex-1 px-6 py-4 h-full" />

          {/* Second Column of Second Row */}
          <Skeleton className="flex-1 px-6 py-4 h-full" />
        </div>
      </div>

      {/* Second Column */}
      <div className="flex flex-col w-[55%]">
        {/* First Row of Second Column */}
        <Skeleton className="px-6 py-4 h-16" />

        <div className="flex flex-col gap-2 pt-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
    </div>
  );
}
