"use client";
import { ActionBar } from "@/components/action-bar/action-bar";
import { CombinedContainer } from "@/components/container/container";
import { Skeleton } from "@/components/ui/skeleton";

import { getIssueById, Issues } from "@/server/issueActions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IssueSection from "./_components/issue-main";
import TicketSection from "./_components/ticket-section";
import { buttonVariants, LoadingButton } from "@/components/buttons/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getTicketById,
  reopenTicket,
  resolveTicket,
  TicketData,
} from "@/server/ticketActions";
import { toast } from "sonner";
import { useState } from "react";
import UserNavArrows from "@/app/(root)/people/[id]/_components/user-nav";

interface IssuePageProps {
  params: { id: string };
}

function SingleIssue({ params }: IssuePageProps) {
  const { data, isError, status } = useQuery({
    queryKey: ["fetch-ticket-by-id", params.id],
    queryFn: () => getTicketById(params.id),
    refetchInterval: 5000,
  });

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  if (isError) {
    return (
      <CombinedContainer title="Issue Details">
        <div className="flex justify-center font-gilroyMedium items-center h-[80vh] w-full">
          Ticket not found
        </div>
      </CombinedContainer>
    );
  }

  const handleResolveTicket = async () => {
    setLoading(true);
    try {
      const payload = { ticketId: data?.[0]?._id };
      // console.log(payload);
      const res = await resolveTicket(payload);
      console.log(res);

      queryClient.invalidateQueries({
        queryKey: ["fetch-ticket-by-id"],
        exact: false,
        refetchType: "all",
      });
      toast.success("Ticket Resolved Successfully!");
    } catch (error) {
      toast.error("Failed to resolve ticket. Please try after some time.");
    } finally {
      setLoading(false);
    }
  };

  const handleReopenTicket = async () => {
    setLoading(true);
    try {
      const payload = { ticketId: data?.[0]?._id };
      console.log(payload);
      const res = await reopenTicket(payload);
      console.log(res);

      queryClient.invalidateQueries({
        queryKey: ["fetch-ticket-by-id"],
        exact: false,
        refetchType: "all",
      });
      toast.success("Ticket reopened Successfully!");
    } catch (error) {
      toast.error("Failed to resolve ticket. Please try after some time.");
    } finally {
      setLoading(false);
    }
  };

  // console.log(data);

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

            {/* <p
              className={`px-2 h-fit py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full ${
                data?.[0]?.closedAt
                  ? "bg-alert-foreground text-failure"
                  : "bg-[#ECFDF3] text-[#027A48]"
              }`}
            >
              {data?.[0] ? (data?.[0]?.closedAt ? "Closed" : "Open") : "-"}
            </p>

            <p
              className={`px-2 h-fit py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full ${
                data?.[0]?.severity === "Medium"
                  ? "bg-[#FFFACB] text-[#FF8000]"
                  : data?.[0]?.severity === "Low"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-alert-foreground text-failure"
              }`}
            >
              {data?.[0]?.severity ?? "-"}
            </p> */}
          </div>

          <div className="flex gap-2">
            {/* {(data?.[0] && data?.[0]?.closedAt) ? (
              <div
                className={buttonVariants({ variant: "primary" })}
                onClick={handleReopenTicket}
              >
                Reopen
              </div>
            ) : (
              <div
                className={buttonVariants({ variant: "primary" })}
                onClick={handleResolveTicket}
              >
                {loading ? (
                  <LoadingButton
                    loading
                    size="sm"
                    color="white"
                    className="text-white"
                  />
                ) : (
                  "Resolve"
                )}
              </div>
            )} */}

            {/* <div className="flex justify-center items-center gap-3">
              <UserNavArrows
                prevUserId={"prevUserId"}
                nextUserId={"nextUserId"}
              />
            </div> */}
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
