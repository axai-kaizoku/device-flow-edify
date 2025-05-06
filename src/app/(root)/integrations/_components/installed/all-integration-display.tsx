"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { User } from "@/server/userActions";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React, { useState } from "react";
import { IntRight } from "../icons";
import { formatNumber } from "@/lib/utils";

export default function AllIntegrationsDisplay({
  children,
  data,
  allIntegrations,
  isIntegrationFilter = false,
  showArrow = true,
}: {
  children: React.ReactNode;
  data?: User;
  isIntegrationFilter?: boolean;
  allIntegrations?: User["integrations"];
  showArrow?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="rounded-2xl bg-white p-6 shadow-lg max-w-[32rem] w-full">
          <div className="flex justify-between items-center pb-5">
            <DialogTitle className="text-lg font-gilroySemiBold">
              <div className="flex gap-2 items-center">
                <div className="bg-neutral-100 size-7 mr-2 rounded-full cursor-pointer flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    onClick={() => setOpen(false)}
                    className="size-4"
                    strokeWidth={1.8}
                  />
                </div>
                <span className="text-base font-gilroySemiBold">
                  Integrations
                </span>
              </div>
            </DialogTitle>
            <div className="">
              <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <PopoverTrigger
                  asChild
                  onMouseEnter={() => setDropdownOpen((prev) => !prev)}
                  className="w-full ring-1 p-1.5 text-sm ring-green-800 rounded-md font-gilroyMedium text-green-900"
                >
                  <span>{`₹${formatNumber(
                    data?.totalCostPerUser ?? 0
                  )}/month`}</span>
                </PopoverTrigger>
                <PopoverContent
                  onMouseLeave={() => setDropdownOpen((prev) => !prev)}
                  align="end"
                  className="min-w-0 w-fit p-1"
                  side="bottom"
                >
                  {isIntegrationFilter ? (
                    <>
                      {data?.integrations?.map((p) => (
                        <React.Fragment key={p?.platform}>
                          <div
                            // value={p?.platform}
                            className=" focus:text-neutral-400 cursor-default select-auto focus:bg-transparent bg-transparent p-1.5 text-sm  font-gilroyMedium text-neutral-400 w-full flex justify-between items-center"
                          >
                            <div className=" flex justify-between items-center w-full gap-x-12">
                              <span>{p?.platform}</span>{" "}
                              <span>{`₹${formatNumber(
                                parseInt(p?.price ?? 0)
                              )}/month`}</span>
                            </div>
                          </div>
                          <div className="w-full flex justify-center items-center">
                            <div
                              className="w-[90%] h-px my-1"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to right, #ccc 0 4px, transparent 2px 10px)",
                              }}
                            />
                          </div>
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <>
                      {allIntegrations?.map((p) => (
                        <React.Fragment key={p?.platform}>
                          <div
                            // value={p?.platform}
                            className=" focus:text-neutral-400 cursor-default select-auto focus:bg-transparent bg-transparent p-1.5 text-sm  font-gilroyMedium text-neutral-400 w-full flex justify-between items-center"
                          >
                            <div className=" flex justify-between items-center w-full gap-x-12">
                              <span>{p?.platform}</span>{" "}
                              {/* <span>{`₹${p?.price}/month`}</span> */}
                              <span>{`₹${formatNumber(
                                parseInt(p?.price ?? 0)
                              )}/month`}</span>
                            </div>
                          </div>
                          <div className="w-full flex justify-center items-center">
                            <div
                              className="w-[90%] h-px my-1"
                              style={{
                                backgroundImage:
                                  "repeating-linear-gradient(to right, #ccc 0 4px, transparent 2px 10px)",
                              }}
                            />
                          </div>
                        </React.Fragment>
                      ))}
                    </>
                  )}

                  <div
                    // value="total"
                    className=" focus:bg-transparent cursor-default select-auto w-full p-1.5 text-sm font-gilroyMedium"
                  >
                    <div className="w-full flex justify-between items-center  ">
                      <span>Total</span>{" "}
                      <span>{`₹${formatNumber(
                        data?.totalCostPerUser ?? 0
                      )}/month`}</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="space-y-4 -mt-5">
            {isIntegrationFilter ? (
              <>
                {data?.integrations?.map((integration, index) => (
                  <>
                    <div
                      key={index}
                      className="flex items-center  justify-center rounded-lg border gap-4 border-b p-4 "
                    >
                      <img
                        src={integration?.image}
                        alt={integration?.platform}
                        className="size-12  object-contain "
                      />
                      <div className="text-left">
                        <h4 className="font-gilroySemiBold">
                          {integration?.platform}
                        </h4>
                        <p className="text-sm text-gray-500 font-gilroyMedium">
                          {integration?.description?.slice(0, 60)}...
                        </p>
                      </div>
                      {showArrow ? (
                        <Link
                          href={`/integrations/installed?platform=${integration?.platform}`}
                          onClick={() => setOpen(false)}
                        >
                          <IntRight className="size-16" />
                        </Link>
                      ) : null}
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                {allIntegrations?.map((integration, index) => (
                  <>
                    <div
                      key={index}
                      className="flex items-center  justify-center rounded-lg border gap-4 border-b p-4 "
                    >
                      <img
                        src={integration?.image}
                        alt={integration?.platform}
                        className="size-12  object-contain "
                      />
                      <div className="text-left">
                        <h4 className="font-gilroySemiBold">
                          {integration?.platform}
                        </h4>
                        <p className="text-sm text-gray-500 font-gilroyMedium">
                          {integration?.description?.slice(0, 60)}...
                        </p>
                      </div>
                      {showArrow ? (
                        <Link
                          href={`/integrations/installed?platform=${integration?.platform}`}
                          onClick={() => setOpen(false)}
                        >
                          <IntRight className="size-16" />
                        </Link>
                      ) : null}
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
