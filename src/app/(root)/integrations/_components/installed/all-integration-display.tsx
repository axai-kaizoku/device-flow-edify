"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { User } from "@/server/userActions";
import Link from "next/link";
import React, { useState } from "react";
import { IntBack, IntRight } from "../icons";

export default function AllIntegrationsDisplay({
  children,
  data,
  allIntegrations,
  showArrow = true,
}: {
  children: React.ReactNode;
  data?: User;
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
                <IntBack onClick={() => setOpen(false)} />
                <span className="text-base font-gilroySemiBold">
                  Integrations
                </span>
              </div>
            </DialogTitle>
            <div className="p-2">
              <Select open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <SelectTrigger
                  onMouseEnter={() => setDropdownOpen((prev) => !prev)}
                  className="w-full ring-1 px-2 py-1.5 ring-green-800 font-gilroyMedium text-green-900"
                >
                  <span>{`$${data?.totalCostPerUser}/month`}</span>
                </SelectTrigger>
                <SelectContent
                  onMouseLeave={() => setDropdownOpen((prev) => !prev)}
                  align="end"
                  side="bottom"
                  className="min-w-0 w-fit"
                >
                  {data?.integrations?.map((p) => (
                    <React.Fragment key={p?.platform}>
                      <SelectItem
                        value={p?.platform}
                        className=" focus:text-neutral-400 focus:bg-transparent bg-transparent p-2 mr-0 pr-0 font-gilroyMedium text-neutral-400 w-full flex justify-between items-center"
                      >
                        <div className=" flex justify-between items-center w-full gap-x-12">
                          <span>{p?.platform}</span>{" "}
                          <span>{`$${p?.price}/month`}</span>
                        </div>
                      </SelectItem>
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
                  <SelectItem
                    value="total"
                    className=" focus:bg-transparent w-full p-2 font-gilroyMedium pl-3"
                  >
                    <div className="w-full flex justify-between items-center gap-x-12 ">
                      <span>Total</span>{" "}
                      <span>{`$${data?.totalCostPerUser}/month`}</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* {JSON.stringify(data)} */}
          {/* Render integration details */}
          <div className="space-y-4">
            {data?.integrations?.map((integration, index) => (
              <>
                <div
                  key={index}
                  className="flex items-center  justify-center rounded-lg border gap-4 border-b p-4 "
                >
                  <img
                    src={integration?.image}
                    alt={integration?.platform}
                    className="size-12 rounded-full object-cover"
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
                      href={`/integrations?activeTab=installed&platform=${integration?.platform}`}
                    >
                      <IntRight className="size-16" />
                    </Link>
                  ) : null}
                </div>
              </>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
