"use client";
import { ActionBar } from "@/components/action-bar/action-bar";
import { CombinedContainer } from "@/components/container/container";
import { Skeleton } from "@/components/ui/skeleton";

import { buttonVariants } from "@/components/buttons/Button";
import { getAllTickets, getTicketById } from "@/server/ticketActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import IssueNavArrows from "./_components/issue-nav-arrows";
import { RemarksDialog } from "./_components/remarks.dialog";
import TicketSection from "./_components/ticket-section";

interface IssuePageProps {
  params: { id: string };
}

function SingleIssue({ params }: IssuePageProps) {
  const { data, isError, status } = useQuery({
    queryKey: ["fetch-ticket-by-id", params.id],
    queryFn: () => getTicketById(params.id),
    refetchInterval: 5000,
  });

  const activeTab = data?.closedAt ? "open" : "close";

  const { data: allTickets, status: allTicketStatus } = useQuery({
    queryKey: ["fetch-all-tickets", activeTab],
    queryFn: async () => {
      const query = {
        searchQuery: "",
        status: data?.closedAt !== null ? "open" : "close",
      };

      return getAllTickets(query);
    },
    // staleTime: 1000 * 60 * 5,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const currentIndex = allTickets?.findIndex((u) => u._id === params?.id);
  const prevUserId =
    currentIndex > 0 ? allTickets?.[currentIndex - 1]._id : null;
  const nextUserId =
    currentIndex < allTickets?.length - 1
      ? allTickets?.[currentIndex + 1]._id
      : null;

  if (isError) {
    return (
      <CombinedContainer title="Issue Details">
        <div className="flex justify-center font-gilroyMedium items-center h-[80vh] w-full">
          Ticket not found
        </div>
      </CombinedContainer>
    );
  }

  return (
    <CombinedContainer title="Issue Details">
      <ActionBar showBackBtn>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2 items-center">
            <div className="flex w-fit rounded-md border border-[rgba(0,0,0,0.2)] py-2 px-4 gap-1">
              <div className="text-[#7F7F7F] text-nowrap text-sm font-gilroySemiBold">
                Ticket ID:{" "}
                <span className="text-black">{data?.[0]?.code ?? "-"}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {data?.[0] && data?.[0]?.closedAt ? (
              <RemarksDialog isReopen={true} ticketId={data?.[0]?._id}>
                <div className={buttonVariants({ variant: "primary" })}>
                  Reopen
                </div>
              </RemarksDialog>
            ) : (
              <RemarksDialog isReopen={false} ticketId={data?.[0]?._id}>
                <div className={buttonVariants({ variant: "primary" })}>
                  Resolve
                </div>
              </RemarksDialog>
            )}

            <div className="flex justify-center items-center gap-3">
              <IssueNavArrows prevUserId={prevUserId} nextUserId={nextUserId} />
            </div>
          </div>
        </div>
      </ActionBar>
      {status === "pending" ? (
        <IssueDetailSkeleton />
      ) : (
        <>
          {/* {JSON.stringify(data)} */}
          <TicketSection data={data?.[0]} />
        </>
      )}
    </CombinedContainer>
  );
}

export default SingleIssue;

function IssueDetailSkeleton() {
  return (
    <div className="flex h-[70vh] pt-4 w-full gap-4 mt-3">
      <div className="flex flex-col gap-4 w-[45%]">
        <Skeleton className="px-6 py-4 h-16" />

        <div className="flex gap-4 flex-1">
          <Skeleton className="flex-1 px-6 py-4 h-full" />

          <Skeleton className="flex-1 px-6 py-4 h-full" />
        </div>
      </div>

      <div className="flex flex-col w-[55%]">
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
