"use client";
import { ActionBar } from "@/components/action-bar/action-bar";
import { buttonVariants } from "@/components/buttons/Button";
import { CombinedContainer } from "@/components/container/container";
import { getDeviceById } from "@/server/deviceActions";
import { useQuery } from "@tanstack/react-query";
import CreateIssue from "../_components/addDevices/_components/create-issue";
import { DeleteAsset } from "./_components/delete-asset";
import EditAsset from "./_components/edit-asset";
import NewDeviceView from "./_components/new-device-view";
import ReassignAsset from "./_components/reassign-asset";
import { UnassignAsset } from "./_components/unassign-asset";

export default function SingleDevice({ params: id }: { params: string }) {
  const { data: newData, status } = useQuery({
    queryKey: ["fetch-single-device", id],
    queryFn: () => getDeviceById(id),
  });

  return (
    <CombinedContainer>
      <ActionBar showBackBtn>
        <div className="flex gap-2">
          <div className="flex  items-center rounded-md border py-[7px] px-4 gap-1 ">
            <div className=" text-[#7F7F7F] text-nowrap text-sm font-gilroySemiBold">
              Serial Number:{" "}
              <span className="text-black">{newData?.serial_no ?? ""}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-5 ">
          <div className="flex gap-2">
            {newData?.userId ? (
              <UnassignAsset id={id ?? ""}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Unassign
                </div>
              </UnassignAsset>
            ) : null}
            {newData?.userId ? (
              <ReassignAsset deviceData={newData}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Reassign
                </div>
              </ReassignAsset>
            ) : (
              <ReassignAsset deviceData={newData}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Assign
                </div>
              </ReassignAsset>
            )}

            <EditAsset deviceData={newData}>
              <div className={buttonVariants({ variant: "outlineTwo" })}>
                Edit
              </div>
            </EditAsset>

            {newData?.deleted_at === null && (
              <DeleteAsset id={id ?? ""}>
                <div className={buttonVariants({ variant: "outlineTwo" })}>
                  Delete
                </div>
              </DeleteAsset>
            )}

            <CreateIssue>
              <div className={buttonVariants({ variant: "primary" })}>
                Raise a Ticket
              </div>
            </CreateIssue>
          </div>
        </div>
      </ActionBar>
      <NewDeviceView data={newData} status={status} />
    </CombinedContainer>
  );
}
