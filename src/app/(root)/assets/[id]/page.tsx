import { CombinedContainer } from "@/components/container/container";
import { Device, getDeviceById, StoreDevice } from "@/server/deviceActions";
import { AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { DeleteAsset } from "./_components/delete-asset";
import { UnassignAsset } from "./_components/unassign-asset";
import ReassignAsset from "./_components/reassign-asset";
import { DeviceGrid } from "./_components/device-grid";
import CreateIssue from "../_components/addDevices/_components/create-issue";
import EditAsset from "./_components/edit-asset";
import EditTableIcon from "@/icons/EditTableIcon";
import UserDetailIcons from "@/icons/UserDetailedViewIcons";
import { NewBackButton } from "@/components/new-back-button";
import { buttonVariants } from "@/components/buttons/Button";
import { Suspense } from "react";
import { DeviceGridSkeleton } from "./_components/device-grid-skelton";

interface DevicePageProps {
  params: { id: string };
}

export default async function SingleDevice({ params }: DevicePageProps) {
  const data: any = await getDeviceById(params?.id);
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
              <UnassignAsset id={params?.id ?? ""}>
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

            <DeleteAsset id={params?.id ?? ""}>
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
