"use client";
import ReportPreview from "@/app/(root)/(userRoutes)/diagnostic/_components/report-preview";
import { buttonVariants } from "@/components/buttons/Button";
import { GetAvatar } from "@/components/get-avatar";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/timeline/timeline";
import { LogEntry } from "@/server/activityActions";
import { getQcDataById } from "@/server/checkMateActions";
import { Attachment02Icon, File01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function UserTimelineTable({ data }: { data: any }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  queryClient.invalidateQueries({
    queryKey: ["user-timeline"],
    refetchType: "all",
    exact: false,
  });
  // queryClient.invalidateQueries({
  //   queryKey: ["device-timeline"],
  //   refetchType: "all",
  //   exact: false,
  // });

  return (
    <div className="ml-7 mt-6 h-[60vh] xl:h-[65vh] overflow-y-auto">
      <Timeline>
        {data?.logs.map((log) => {
          const { action, actor, target, createdAt } = log;
          const time = formatDate(createdAt);
          const actorName = actor?.name || "Unknown";

          return (
            <>
              {/* Issue */}
              {action === "issue-raised" && (
                <>
                  <TimelineItem key={log._id}>
                    <TimelineHeading className="text-sm text-black font-gilroyMedium">
                      New issue{" "}
                      <span className="text-gray-600"> created by </span>
                      <span className="underline">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>{" "}
                        <span className="text-gray-600">
                          <Link href={`/issues/${target?.issueId}`}>
                            (ID: {target.issueID || "-"})
                          </Link>
                        </span>
                      </span>
                    </TimelineHeading>
                    <TimelineDot status="new-issue" />
                    <TimelineLine done />
                    <TimelineContent className="space-y-3">
                      <Link href={`/issues/${target?.issueId}`}>
                        <div className="border hover:border-black border-gray-200 w-[18rem]  rounded-md p-2 space-y-1">
                          <h1 className="text-sm font-gilroyMedium text-black">
                            {target?.issueTitle || "-"}
                          </h1>
                          <p className="text-[13px] text-gray-600 font-gilroyMedium line-clamp-2">
                            {target?.issueDescription || "-"}
                          </p>
                          {target?.IssueImages && (
                            <p className="flex items-center text-xs text-gray-600">
                              <HugeiconsIcon
                                icon={Attachment02Icon}
                                className="text-[#808080] size-3"
                              />
                              <span className=" font-gilroyMedium">
                                {target?.Issueimages?.length} attachments
                              </span>
                            </p>
                          )}
                        </div>
                      </Link>
                      <p className="text-xs text-gray-400 font-gilroyMedium">
                        {time}
                      </p>
                    </TimelineContent>
                  </TimelineItem>
                </>
              )}
              {action === "ticket-raised" && (
                <>
                  <TimelineItem key={log._id}>
                    <TimelineHeading className="text-sm text-black font-gilroyMedium">
                      New ticket is{" "}
                      <span className="text-gray-600"> raised by </span>
                      <span className="underline">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>{" "}
                        <span className="text-gray-600">
                          <Link href={`/issues/${target?.issueId}`}>
                            (ID: {target.ticketCode || "-"})
                          </Link>
                        </span>
                      </span>
                    </TimelineHeading>
                    <TimelineDot status="new-issue" />
                    <TimelineLine done />
                    <TimelineContent className="space-y-3">
                      <Link href={`/issues/${target?.issueId}`}>
                        <div className="border hover:border-black border-gray-200 w-[18rem] rounded-md p-2 space-y-3">
                          <h1 className="text-sm font-gilroyMedium text-black">
                            {target?.ticketCategory || "-"}
                          </h1>
                          <p className="text-xs text-gray-600 font-gilroyMedium line-clamp-2">
                            {target?.ticketDescription || "-"}
                          </p>
                        </div>
                      </Link>
                      <p className="text-xs text-gray-400 font-gilroyMedium">
                        {time}
                      </p>
                    </TimelineContent>
                  </TimelineItem>
                </>
              )}
              {action === "issue-closed" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">Issue closed</span> by{" "}
                      <span className="text-black underline">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>{" "}
                      </span>{" "}
                      <Link href={`/issues/${target?.issueId}`}>
                        (ID: {target.issueID || "-"})
                      </Link>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="issue-closed" />
                  <TimelineLine />

                  <TimelineContent className="w-full">
                    <div className="flex flex-col gap-2 mt-1 w-full">
                      <div className="rounded-[5px] hover:border-black border border-[#E5E5E5] px-4 py-2 flex justify-between items-center w-[22rem]">
                        <p className="font-gilroyMedium text-sm text-black">
                          Display is broken (ID: {target?.issueID || "-"})
                        </p>
                        <div
                          className={buttonVariants({ variant: "outlineTwo" })}
                          style={{ cursor: "pointer" }}
                          onClick={() => router.push(`/issues/${log._id}`)}
                        >
                          View
                        </div>
                      </div>
                      <p className="text-[13px] font-gilroyMedium text-[#CCCCCC]">
                        {time || "-"}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "ticket-closed" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-1 font-gilroyMedium text-[#808080]">
                      Ticket
                      <span className="text-black">
                        <Link href={`/issues/${target?.ticketId}`}>
                          (ID: {target?.ticketCode || "-"})
                        </Link>
                      </span>
                      closed by{" "}
                      <span className="text-black underline">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>{" "}
                      </span>{" "}
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="issue-closed" />
                  <TimelineLine />

                  <TimelineContent className="space-y-3">
                    <Link href={`/issues/${target?.issueId}`}>
                      <div className="border hover:border-black border-gray-200 w-[18rem] rounded-md p-2 space-y-1">
                        <h1 className="text-sm font-gilroyMedium text-black">
                          {target?.ticketCategory || "-"}
                        </h1>
                        <p className="text-[13px] text-gray-600 font-gilroyMedium line-clamp-2">
                          {target?.ticketDescription || "-"}
                        </p>
                      </div>
                    </Link>
                    <p className="text-xs text-gray-400 font-gilroyMedium">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {/* Device */}
              {action === "assign-device" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                      assigned to{" "}
                      <span className="text-black underline">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>{" "}
                      by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          <Link href={`/people/${actor?.userId}`}>
                            {actorName || "-"}{" "}
                          </Link>{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="asset-assigned" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[18rem]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target.deviceName ? target.deviceName : "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target.deviceName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target.deviceSerialNumber || "-"} | 16GB | 512GB
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "re-assign-device" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-1 font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                      re-assigned to{" "}
                      <span className="text-black underline ">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>{" "}
                      from
                      <span className="text-black underline">
                        <Link href={`/people/${target?.oldAssignedID}`}>
                          {target?.oldAssigneduserName || "-"}
                        </Link>
                      </span>
                      by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          <Link href={`/people/${actor?.userId}`}>
                            {actorName || "-"}{" "}
                          </Link>{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="asset-assigned" />
                  <TimelineLine />
                  <TimelineContent className="w-full flex flex-col  gap-2 mt-1">
                    <Link href={`/assets/${target.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black w-[18rem]  border p-2 flex justify-between items-center rounded-md ">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target.deviceName ? target.deviceName : "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target.deviceName ? target.deviceName : "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.deviceSerialNumber ?? "-"} |{" "}
                              {target?.deviceRam ?? "-"} |{" "}
                              {target?.deviceStorage ?? "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "un-assign-device" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                      is unassigned from{" "}
                      <span className="text-black underline">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>{" "}
                      by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>{" "}
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="un-assign-device" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target.deviceName || "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm font-gilroyMedium text-black">
                              {target?.deviceName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.deviceSerialNumber ?? "-"} |{" "}
                              {target?.deviceRam ?? "-"} |{" "}
                              {target?.deviceStorage ?? "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "temp-assigned" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                      is temporarily assigned to{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>{" "}
                      by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="asset-assigned" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target?.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.deviceName || "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.deviceName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.deviceSerialNumber || "-"} |{" "}
                              {target?.deviceRam || "-"} |{" "}
                              {target?.deviceStorage || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "device-deleted" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                      is deleted by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="device-deleted" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target?.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.deviceName || "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.deviceName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.deviceSerialNumber || "-"} |{" "}
                              {target?.deviceRam || "-"} |{" "}
                              {target?.deviceStorage || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "assigned-device-acknowledged" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <Link href={`/people/${target?.userId}`}>
                        <span className="text-black">
                          {target.userName ? target.userName : "-"}
                        </span>
                      </Link>{" "}
                      acknowledged the assigned device{" "}
                      <span className="text-black underline">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="assigned-device-acknowledged" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target.deviceName ? target.deviceName : "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target.deviceName ? target.deviceName : "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target.deviceSerialNumber || "-"} |{" "}
                              {target.deviceRam || "-"} |{" "}
                              {target.deviceStorage || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "assigned-device-not-acknowledged" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          <span className="text-black">
                            {target.userName ? target.userName : "-"}
                          </span>
                        </Link>
                      </span>{" "}
                      declined the assigned device{" "}
                      <span className="text-black underline">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="assigned-device-not-acknowledged" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target.deviceName ? target.deviceName : "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target.deviceName ? target.deviceName : "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target.deviceSerialNumber || "-"} |{" "}
                              {target.deviceRam || "-"} |{" "}
                              {target.deviceStorage || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "device-added" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/assets/${target?.deviceId}`}>
                          {target?.deviceName || "-"}
                        </Link>
                      </span>{" "}
                      is added by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="asset-assigned" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target?.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.deviceName || "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.deviceName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.deviceSerialNumber || "-"} |{" "}
                              {target?.deviceRam || "-"} |{" "}
                              {target?.deviceStorage || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "added-to-shelf" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <Link href={`/assets/${target?.deviceId}`}>
                        <span className="text-black">
                          {target?.deviceName || "-"} (
                          {target?.deviceSerialNumber || "-"})
                        </span>
                      </Link>{" "}
                      is added to shelf by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="added-to-shelf" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <div className="border-[#E5E5E5] hover:border-black border p-2 font-gilroyMedium flex justify-between items-center rounded-md w-[80%]">
                      <div className="flex text-sm gap-2 ">
                        <h1 className="flex items-center gap-0.5">
                          Shelf Floor Number:
                          {target?.shelfFloorNumber || "-"}
                        </h1>
                        |
                        <h1 className="flex  gap-0.5">
                          Shelf Room Number:
                          {target?.shelfRoomNumber || "-"}
                        </h1>
                      </div>
                    </div>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "collected" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <Link href={`/assets/${target?.deviceId}`}>
                        <span className="text-black">
                          {target?.deviceName || "-"} (
                          {target?.deviceSerialNumber || "-"})
                        </span>
                      </Link>{" "}
                      is collected by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        {target?.shelfAssetCollectorName || "-"}
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="asset-assigned" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <div className="border-[#E5E5E5] hover:border-black border p-2 font-gilroyMedium flex justify-between items-center rounded-md w-[80%]">
                      <div className="flex text-sm gap-2 ">
                        <h1 className="flex items-center gap-0.5">
                          Shelf Floor Number:
                          {target?.shelfFloorNumber || "-"}
                        </h1>
                        |
                        <h1 className="flex  gap-0.5">
                          Shelf Room Number:
                          {target?.shelfRoomNumber || "-"}
                        </h1>
                      </div>
                    </div>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "device-active" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <Link href={`/assets/${target?.deviceId}`}>
                        <span className="text-black">
                          {target?.deviceName || "-"}
                        </span>
                      </Link>{" "}
                      is set as active by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="asset-assigned" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/assets/${target?.deviceId}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.deviceName || "-"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.deviceName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.deviceSerialNumber || "-"} |{" "}
                              {target.deviceRam || "-"} |{" "}
                              {target?.deviceStorage || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "device-inactive" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <Link href={`/assets/${target?.deviceId}`}>
                        <span className="text-black">
                          {target?.deviceName || "-"}
                        </span>
                      </Link>{" "}
                      is set as inactive by{" "}
                      <span className="text-black pl-[1px]">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="device-inactive" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    {target?.deviceId ? (
                      <Link href={`/assets/${target.deviceId}`}>
                        <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                          <div className="flex gap-2">
                            <GetAvatar
                              name={target?.deviceName || "-"}
                              size={40}
                            />
                            <div>
                              <h1 className="text-sm text-black font-gilroyMedium">
                                {target?.deviceName || "-"}
                              </h1>
                              <h3 className="text-gray-600 text-xs font-gilroyMedium">
                                {target?.deviceSerialNumber || "-"} |{" "}
                                {target?.deviceRam || "-"} |{" "}
                                {target?.deviceStorage || "-"}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="text-sm text-gray-400 font-gilroyMedium italic">
                        Device info unavailable
                      </div>
                    )}

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "quality-check" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading className="text-sm text-gray-400 flex gap-1 font-gilroyMedium">
                    Diagonistic done on{" "}
                    <Link href={`/assets/${target?.deviceId}`}>
                      <span className="underline text-black">
                        {target?.deviceName || "-"}
                      </span>
                    </Link>
                    <span className="text-gray-400">done by</span>{" "}
                    <span className="underline text-black">
                      <Link href={`/people/${target?.userId}`}>
                        {target?.userName || "-"}
                      </Link>
                    </span>
                  </TimelineHeading>

                  <TimelineDot status="new-scan" />
                  <TimelineLine done />

                  <TimelineContent className="space-y-3">
                    <div className="border border-gray-200 flex justify-between items-center w-[22rem] rounded-md p-2">
                      <h1 className="flex gap-2 justify-center items-center text-sm text-black font-gilroyMedium">
                        <HugeiconsIcon
                          icon={File01Icon}
                          className="size-10  bg-blue-50 rounded-full p-2 text-[#025CE5]"
                        />
                        New Scan report
                      </h1>

                      <ReportPreview id={target?.qcReportId}>
                        <div
                          className={buttonVariants({ variant: "outlineTwo" })}
                          style={{ cursor: "pointer" }}
                        >
                          {" "}
                          View
                          {/* )} */}
                        </div>
                      </ReportPreview>
                    </div>

                    <p className="text-xs text-gray-400 font-gilroyMedium">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {/* User */}
              {action === "added-reporting-manager" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      made{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${target?.reporting_managerId}`}>
                          {target?.managerName}
                        </Link>
                      </span>{" "}
                      reporting manager of
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="user-added" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "removed-reporting-manager" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      removed{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${target?.reporting_managerId}`}>
                          {target?.managerName}
                        </Link>
                      </span>{" "}
                      as reporting manager of
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="user-deleted" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "user-deleted" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      is deleted from organisation by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="user-deleted" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "user-inactive" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      is set as inactive by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="user-inactive" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "user-active" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      is set as active by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>{" "}
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="user-active" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {action === "user-added" && (
                <TimelineItem key={log?._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      is added to the organisation by{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>{" "}
                      <span className="text-black pl-[1px]">
                        {" "}
                        {target?.userCreationType || "-"}
                      </span>
                    </div>
                  </TimelineHeading>
                  <TimelineDot status="user-added" />
                  <TimelineLine />
                  <TimelineContent className="w-[22rem] flex flex-col gap-2 ">
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
              {/* Team */}
              {action === "created-team" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black ">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>
                      team is created by{" "}
                      <span className="text-black ">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="add-to-team" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "delete-team" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>
                      team is deleted by
                      <span className="text-black">
                        {" "}
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="delete-team" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "removed-team-manager" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>
                      removed as the team manager of{" "}
                      <span className="text-black">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>
                      by{" "}
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="user-deleted" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "add-to-team" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>
                      is added to{" "}
                      <span className="text-black">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>
                      by{" "}
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="add-to-team" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "moved-from-team" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>
                      is moved to{" "}
                      <span className="text-black">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>{" "}
                      team from{" "}
                      <span className="text-black">
                        <Link href={`/teams/${target?.oldTeamId}`}>
                          {target?.oldTeamName || "-"}
                        </Link>
                      </span>{" "}
                      team by{" "}
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="moved-from-team" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "remove-from-team" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>{" "}
                      is removed from{" "}
                      <span className="text-black">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>{" "}
                      by{" "}
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="remove-from-team" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5 hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}

              {action === "added-team-manager" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm flex gap-[2px] font-gilroyMedium text-[#808080]">
                      <span className="text-black">
                        <Link href={`/people/${target?.userId}`}>
                          {target?.userName || "-"}
                        </Link>
                      </span>{" "}
                      assigned as the team manager for{" "}
                      <span className="text-black">
                        <Link href={`/teams/${target?.teamId}`}>
                          {target?.teamName || "-"}
                        </Link>
                      </span>{" "}
                      by{" "}
                      <span className="text-black">
                        <Link href={`/people/${actor?.userId}`}>
                          {actorName || "-"}{" "}
                        </Link>
                      </span>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="user-added" />
                  <TimelineLine />

                  <TimelineContent className="w-[22rem] flex flex-col gap-2 mt-1">
                    <Link href={`/teams/${target?.teamId || "#"}`}>
                      <div className="border-[#E5E5E5] hover:border-black border p-2 flex justify-between items-center rounded-md w-[80%]">
                        <div className="flex gap-2">
                          <GetAvatar
                            name={target?.teamName || "Team"}
                            size={40}
                          />
                          <div>
                            <h1 className="text-sm text-black font-gilroyMedium">
                              {target?.teamName || "-"}
                            </h1>
                            <h3 className="text-gray-600 text-xs font-gilroyMedium">
                              {target?.teamCode || "-"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                      {time || "-"}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              )}
            </>
          );
        })}
      </Timeline>
    </div>
  );
}

export default UserTimelineTable;
