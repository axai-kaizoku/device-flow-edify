import ReportPreview from "@/app/(root)/diagnostic/_components/report-preview";
import DeviceTimeLine from "@/app/(root)/people/[id]/_components/device-timeline";
import { formatDate } from "@/app/(root)/people/[id]/_components/user-timeline-table";
import { buttonVariants } from "@/components/buttons/Button";
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/timeline/timeline";
import { Attachment02Icon, File01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import { useRouter } from "next/navigation";

export function TimelineDemo({ data }) {
  const router = useRouter();
  return (
    <div className="ml-7 mt-6 overflow-y-auto xl:h-[56dvh] h-[58dvh]">
      <Timeline>
        {data?.logs.map((log) => {
          const { action, actor, target, createdAt } = log;
          const time = formatDate(createdAt);
          const actorName = actor?.name || "Unknown";
          const deviceLink = `/assets/${target?.deviceId}`;
          const userLink = `/people/${target?.userId}`;
          const oldUserLink = `/people/${target?.oldAssignedID}`;
          const actorLink = `/people/${actor?.userId}`;
          const issueLink = `/tickets/${target?.ticketId}`;

          const userName = target?.userName;

          return (
            <>
              {/* Issue */}
              {action === "issue-raised" && (
                <>
                  <TimelineItem key={log._id}>
                    <TimelineHeading className="text-sm font-gilroyMedium">
                      New issue{" "}
                      <span className="text-gray-600"> created by </span>
                      <span className="underline">
                        <Link href={actorLink}>{actorName || "-"} </Link>{" "}
                        <span className="text-gray-600">
                          <Link href={issueLink}>
                            (ID: {target.issueID || "-"})
                          </Link>
                        </span>
                      </span>
                    </TimelineHeading>
                    <TimelineDot status="new-issue" />
                    <TimelineLine done />
                    <TimelineContent className="space-y-3">
                      <Link href={issueLink}>
                        <div className="border border-gray-200 w-[27rem] rounded-md p-3 space-y-3">
                          <h1 className="text-base font-gilroyMedium text-black">
                            {target?.issueTitle || "-"}
                          </h1>
                          <p className="text-xs text-gray-600 font-gilroyMedium line-clamp-2">
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
              {action === "issue-closed" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading>
                    <div className="text-sm font-gilroyMedium text-[#808080]">
                      <span className="text-black">Issue closed</span> by{" "}
                      <span className="text-black underline">
                        <Link href={actorLink}>{actorName || "-"} </Link>{" "}
                      </span>{" "}
                      <Link href={issueLink}>
                        (ID: {target.issueID || "-"})
                      </Link>
                    </div>
                  </TimelineHeading>

                  <TimelineDot status="issue-closed" />
                  <TimelineLine />

                  <TimelineContent className="w-full">
                    <div className="flex flex-col gap-2 mt-1 w-full">
                      <div className="rounded-[5px] border border-[#E5E5E5] px-4 py-2 flex justify-between items-center w-[80%]">
                        <p className="font-gilroyMedium text-sm text-black">
                          Display is broken (ID: {target?.issueID || "-"})
                        </p>
                        <div
                          className={buttonVariants({ variant: "outlineTwo" })}
                          style={{ cursor: "pointer" }}
                          onClick={() => router.push(issueLink)}
                        >
                          View
                        </div>
                      </div>
                      <p className="text-xs font-gilroyMedium text-[#CCCCCC]">
                        {time || "-"}
                      </p>
                    </div>
                  </TimelineContent>
                </TimelineItem>
              )}
              <DeviceTimeLine
                userName={userName}
                userLink={userLink}
                time={time}
                target={target}
                oldUserLink={oldUserLink}
                log={log}
                action={action}
                actorLink={actorLink}
                actorName={actorName}
                deviceLink={deviceLink}
              />

              {action === "quality-check" && (
                <TimelineItem key={log._id}>
                  <TimelineHeading className="text-sm text-gray-400 flex gap-1 font-gilroyMedium">
                    Diagonistic done on{" "}
                    <Link href={deviceLink}>
                      <span className="underline text-black">
                        {target?.deviceName || "-"}
                      </span>
                    </Link>
                    <span className="text-gray-400">done by</span>{" "}
                    <span className="underline text-black">
                      <Link href={userLink}>{target?.userName || "-"}</Link>
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
            </>
          );
        })}
      </Timeline>
    </div>
  );
}
