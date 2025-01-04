"use client";
import React, { useState } from "react";
import Pagination from "../../teams/_components/pagination";
import { useRouter } from "next/navigation";
import { Table } from "@/components/wind/Table";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { User } from "@/server/userActions";
import { SoftDeleteAsset } from "../../assets/_components/soft-delete-asset";
import { PreviousOrder } from "@/server/orderActions";
import { ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 5;
function AllOrdersTable({ data }: { data: any[] }) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentOrder = data?.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);
  return (
    <>
      <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] py-5 flex flex-col gap-5">
        <div className="flex 2xl:gap-2 gap-1.5 w-fit px-6">
          <h1 className="2xl:text-lg text-base font-gilroySemiBold">Orders</h1>
          <h1 className="2xl:text-[12.435px] text-[10.435px] font-gilroySemiBold flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
            {data?.length} Orders
          </h1>
        </div>
        <div className="flex flex-col 2xl:gap-2 gap-1.5">
          <Table
            data={currentOrder}
            checkboxSelection={{
              uniqueField: "_id",
              //logic yet to be done
              onSelectionChange: (e) => console.log(e),
            }}
            columns={[
              {
                title: "Order ID",
                render: (data: any) => (
                  <div
                    className="2xl:w-28 w-[108px] justify-start flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/order/${data?.cartDetails?.razorpay_order_id}`
                      )
                    }
                  >
                    <div className="font-gilroySemiBold 2xl:text-[14.507px] text-[12.507px] gap-1 flex whitespace-nowrap  text-black ">
                      {data?.cartDetails?.razorpay_order_id}
                    </div>
                  </div>
                ),
              },
              {
                title: "Ordered on",
                render: (data) => (
                  <div className="text-[#7F7F7F] font-gilroyMedium 2xl:text-[14.507px] text-[12.507px]">
                    {data?.response[0]?.ordered_on
                      ? new Date(
                          data?.response[0]?.ordered_on
                        )?.toLocaleDateString()
                      : "N/A"}
                  </div>
                ),
              },
              {
                title: "QTY",
                // dataIndex: "quantity",
                render: (data) => (
                  <div className=" whitespace-nowrap flex 2xl:text-[14.507px] text-[12.507px] text-[#7F7F7F] gap-1">
                    {data?.response?.length} items
                  </div>
                ),
              },
              {
                title: "Payment Status",
                // dataIndex: "quantity",
                render: (data) => (
                  <>
                    {data?.cartDetails?.state !== "failed" ? (
                      <div className="text-[#027A48] bg-[#ECFDF3] py-1 px-2 rounded-[16.58px] whitespace-nowrap flex text-xs w-fit">
                        {data?.cartDetails?.state}
                      </div>
                    ) : (
                      <div className="bg-alert-foreground text-failure py-1 px-2 rounded-[16.58px] text-xs w-fit">{data?.cartDetails?.state}</div>
                    )}
                  </>
                ),
              },
              {
                title: "Delivery Office",
                render: (data: User) => (
                  <div className=" whitespace-nowrap flex 2xl:text-[14.507px] text-[12.507px] text-[#7F7F7F] gap-1">
                    {data?.cartDetails?.addressId?.city}
                  </div>
                ),
              },
              {
                title: "Total",
                render: (data) => (
                  <div className=" whitespace-nowrap flex 2xl:text-[14.507px] text-[12.507px] text-[#7F7F7F] gap-1">
                    {data?.cartDetails?.totalPrice || "N/A"}
                  </div>
                ),
              },
              {
                title: "",
                render: (data) => (
                  <ChevronRight className="text-[#CECECE] 2xl:text-[14.507px] text-[12.507px] cursor-pointer" />
                ),
              },
            ]}
          />
          {/* Pagination Control */}
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={data?.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default AllOrdersTable;
