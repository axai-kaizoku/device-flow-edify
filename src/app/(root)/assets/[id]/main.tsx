"use client";
import { ActionBar } from "@/components/action-bar/action-bar";
import { buttonVariants } from "@/components/buttons/Button";
import { CombinedContainer } from "@/components/container/container";
import { getDeviceById } from "@/server/deviceActions";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import CreateIssue from "../_components/addDevices/_components/create-issue";
import { DeleteAsset } from "./_components/delete-asset";
import { DeviceGrid } from "./_components/device-grid";
import { DeviceGridSkeleton } from "./_components/device-grid-skelton";
import EditAsset from "./_components/edit-asset";
import ReassignAsset from "./_components/reassign-asset";
import { UnassignAsset } from "./_components/unassign-asset";
import NewDeviceView from "./_components/new-device-view";

interface DevicePageProps {
  params: { id: string };
}

export default function SingleDevice({ params: id }: { params: string }) {
  const { data: newData, status } = useQuery({
    queryKey: ["fetch-single-device", id],
    queryFn: () => getDeviceById(id),
    // staleTime: 1000 * 2 * 60,
  });

  // const newData = {
  //   _id: "67f3940381b5c4b2345d4db1",
  //   device_name: "Device4",
  //   device_type: null,
  //   qty: 0,
  //   serial_no: "SN1004",
  //   is_charger_provided: null,
  //   asset_serial_no: "",
  //   ram: "16GB",
  //   processor: "Intel Core i5",
  //   config: [],
  //   storage: ["256GB"],
  //   custom_model: "Model4",
  //   brand: "Lenovo",
  //   warranty_status: false,
  //   warranty_expiary_date: "2024-12-11T00:00:00.000Z",
  //   ownership: "",
  //   purchase_order: "",
  //   purchase_value: 12500,
  //   payable: 12500,
  //   os: "Windows",
  //   image: [],
  //   invoice: null,
  //   deleted_at: null,
  //   device_purchase_date: "2023-12-12T00:00:00.000Z",
  //   assigned_at: "2025-05-07T11:36:23.913Z",
  //   userName: "Sahil Tyagi ",
  //   email: "sahiltyagi1999@gmail.com",
  //   userId: "67ff94f1c38d2f1ad19bca9b",
  //   city: null,
  //   addressId: null,
  //   perfectFor: [],
  //   deviceFeatures: [],
  //   device_condition: "Fair",
  //   description: null,
  //   reviews: [],
  //   ratings: [],
  //   overallReviews: 1,
  //   overallRating: null,
  //   ratingDetails: [
  //     {
  //       stars: 1,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 2,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 3,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 4,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 5,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //   ],
  //   bankOffers: [],
  //   recently_viewed: [
  //     {
  //       _id: "67bd66eec2b464c6e62eecbc",
  //       device_name: "Default",
  //       description: null,
  //       image: {
  //         url: "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png",
  //         _id: "67bd66eec2b464c6e62eecbd",
  //       },
  //       price: 0,
  //     },
  //   ],
  // };

  return (
    <CombinedContainer>
      <ActionBar showBackBtn>
        <div className="flex gap-2">
          <div className="flex  items-center rounded-md border border-[rgba(0,0,0,0.2)] py-2 px-4 gap-1 ">
            <div className=" text-[#7F7F7F] text-nowrap text-sm font-gilroySemiBold">
              Device ID:{" "}
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

            <DeleteAsset id={id ?? ""}>
              <div className={buttonVariants({ variant: "outlineTwo" })}>
                Delete
              </div>
            </DeleteAsset>

            <CreateIssue device={newData}>
              <div className={buttonVariants({ variant: "primary" })}>
                Raise a Ticket
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
      </ActionBar>
      {/* <Suspense fallback={<DeviceGridSkeleton />}> */}
      <NewDeviceView data={newData} status={status} />
      {/* </Suspense> */}
    </CombinedContainer>
  );
}
