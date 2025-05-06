"use client";
import { buttonVariants } from "@/components/buttons/Button";
import { CombinedContainer } from "@/components/container/container";
import { NewBackButton } from "@/components/new-back-button";
import { getDeviceById } from "@/server/deviceActions";
import { Suspense } from "react";
import CreateIssue from "../_components/addDevices/_components/create-issue";
import { DeleteAsset } from "./_components/delete-asset";
import { DeviceGrid } from "./_components/device-grid";
import { DeviceGridSkeleton } from "./_components/device-grid-skelton";
import EditAsset from "./_components/edit-asset";
import ReassignAsset from "./_components/reassign-asset";
import { UnassignAsset } from "./_components/unassign-asset";
import { useQuery } from "@tanstack/react-query";

interface DevicePageProps {
  params: { id: string };
}

export default function SingleDevice({ params: id }: { params: string }) {
  const { data, status } = useQuery({
    queryKey: ["fetch-single-device", id],
    queryFn: () => getDeviceById(id),
    // staleTime: 1000 * 2 * 60,
  });

  if (status === "pending") {
    <DeviceGridSkeleton />;
  }

  return (
    <CombinedContainer>
      <div className="flex  gap-4 sticky top-0 z-50 items-center justify-between p-3 rounded-lg border border-[#0000001A] bg-white">
        <div className="flex gap-2">
          <NewBackButton />
          <div className="flex  items-center rounded-md border border-[rgba(0,0,0,0.2)] py-2 px-4 gap-1 ">
            <div className=" text-[#7F7F7F] text-nowrap text-sm font-gilroySemiBold">
              Device ID:{" "}
              <span className="text-black">{data?.serial_no ?? ""}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 ">
          <div className="flex gap-2">
            {data?.userId ? (
              <UnassignAsset id={id ?? ""}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Unassign
                </div>
              </UnassignAsset>
            ) : null}
            {data?.userId ? (
              <ReassignAsset deviceData={data}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Reassign
                </div>
              </ReassignAsset>
            ) : (
              <ReassignAsset deviceData={data}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Assign
                </div>
              </ReassignAsset>
            )}

            <EditAsset deviceData={data}>
              <div className={buttonVariants({ variant: "outlineTwo" })}>
                Edit
              </div>
            </EditAsset>

            <DeleteAsset id={id ?? ""}>
              <div className={buttonVariants({ variant: "outlineTwo" })}>
                Delete
              </div>
            </DeleteAsset>

            <CreateIssue device={data}>
              <div className={buttonVariants({ variant: "primary" })}>
                Add Issue
              </div>
            </CreateIssue>
            {/* <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronLeft className="text-[#6C6C6C]" />
            </div>
            <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronRight className="text-[#6C6C6C]" />
            </div> */}
          </div>
        </div>
      </div>
      <Suspense fallback={<DeviceGridSkeleton />}>
        <DeviceGrid data={data} />
      </Suspense>
    </CombinedContainer>
  );
}
