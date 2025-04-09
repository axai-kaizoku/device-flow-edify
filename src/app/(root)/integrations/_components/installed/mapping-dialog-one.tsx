"use client";
import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { BlueTickCircle } from "../icons";
import { AddIntegrationRes } from "@/server/integrationActions";

export default function MappingDialogOne({
  children,
  open,
  setOpen,
  response,
  setNextSteps,
}: {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setNextSteps?: React.Dispatch<React.SetStateAction<number>>;
  response?: AddIntegrationRes;
}) {
  const descriptionDetails = [
    "Deactivating unused licenses will revoke access for the associated users.",

    "I have read and agree to the Terms & Conditions.",
  ];

  const active = response?.data?.filter((u) => u.userId !== null)?.length;
  const inActive = response?.data?.filter((u) => u.userId === null)?.length;

  return (
    <>
      <Dialog open={open} onOpenChange={() => setNextSteps(0)}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="rounded-2xl bg-white p-6 shadow-lg max-w-[32rem] w-full text-center">
          <DialogTitle className="text-lg font-gilroySemiBold">
            Found
          </DialogTitle>
          <div className="flex gap-1 text-[#2E8016] items-center justify-center">
            <span className="text-4xl font-gilroyBold">{active} Users</span>
          </div>
          <p className="text-[#7f7f7f] text-sm font-gilroyMedium">
            All the members are successfully imported from Slack.
          </p>

          <div className="h-[1px] bg-gray-200 my-2"></div>
          <h1 className="text-center text-base font-gilroySemiBold">
            Deviceflow has found{" "}
          </h1>
          <div className="bg-[#FCF3F6] rounded-xl flex justify-start gap-2 items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
            >
              <path
                d="M5.84764 8.80554C8.06018 5.24642 9.16644 3.46685 10.6845 3.00877C11.5196 2.75676 12.4192 2.75676 13.2543 3.00877C14.7724 3.46685 15.8786 5.24642 18.0912 8.80554C20.3037 12.3646 21.41 14.1442 21.0781 15.5942C20.8955 16.392 20.4457 17.1155 19.7932 17.6612C18.607 18.6531 16.3945 18.6531 11.9694 18.6531C7.54433 18.6531 5.33179 18.6531 4.14562 17.6612C3.49306 17.1155 3.04326 16.392 2.86069 15.5942C2.52883 14.1442 3.6351 12.3646 5.84764 8.80554Z"
                stroke="#DC060D"
                stroke-width="1.12756"
              />
              <path
                d="M11.9629 14.0698H11.9716"
                stroke="#DC060D"
                stroke-width="1.50342"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9697 11.5698V8.23645"
                stroke="#DC060D"
                stroke-width="1.12756"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <h1 className="text-[#DC060D] text-base font-gilroyMedium">
              {inActive} Unmapped users
            </h1>
          </div>
          <h1 className="text-xs font-gilroyMedium">
            {inActive} users are currently unmapped. They will be saved as guest
            users by default, or you can map them to existing members.
          </h1>
          <h1 className="text-base font-gilroySemiBold text-start ">
            By proceeding, I acknowledge that:{" "}
          </h1>
          <div className="flex flex-col gap-1 text-start ">
            {descriptionDetails.map((item) => (
              <div className="flex items-start gap-1 py-0.5">
                <BlueTickCircle />
                <p className="text-sm font-gilroyMedium">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-sm font-gilroyMedium text-start ">
            By clicking <strong>Agree & Proceed</strong>, you authotize
            deviceflow to deactivate the licences on your behalf.
          </p>

          <DialogFooter className="flex w-full items-center justify-between mt-4">
            <Button
              className="w-[48%] rounded-sm font-gilroyMedium  bg-white text-black  ring-1 ring-[#B4B4B4] flex items-center justify-center"
              onClick={() => setNextSteps(0)}
            >
              Skip
            </Button>
            <Button
              className="w-[48%] rounded-sm font-gilroyMedium  bg-black text-white  ring-1 ring-black   flex items-center justify-center"
              onClick={() => setNextSteps(2)}
            >
              Map Users
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
