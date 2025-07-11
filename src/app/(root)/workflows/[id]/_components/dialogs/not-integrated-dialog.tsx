"use client";

import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertSuccess from "@/icons/AlertSuccess";
import WarningDelete from "@/icons/WarningDelete";
import WarningIcon from "@/icons/WarningIcon";

export const NotIntegratedDialog = ({
  children,
  open,
  setOpen,
  description,
  title,
  type,
}: {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (text: boolean) => void;
  description: string;
  title?: string;
  type?: string;
}) => {
  // type-> failure, success, warning
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={"w-full"}
          asChild
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </DialogTrigger>

        <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center" onClick={(e)=> e.stopPropagation()}>
          <div className="flex justify-center ">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600">
              {type === "failure" ? (
                <WarningDelete />
              ) : type === "warning" ? (
                <WarningIcon />
              ) : (
                <AlertSuccess />
              )}
            </div>
          </div>

          <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
            {title}
          </DialogTitle>

          <DialogDescription className="p-1 -mt-4 text-sm text-gray-600">
            {description}
          </DialogDescription>

          {/* Footer Buttons */}
          {/* <DialogFooter className="flex w-full items-center justify-between ">
            <DialogClose asChild onClick={(e) => e.stopPropagation()}>
              <Button
                className="w-1/2 rounded-md border border-[#D0D5DD] bg-[#FFF] shadow-sm text-[#344054]"
                onClick={(e) => e.stopPropagation()}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className={`w-1/2 rounded-md ${
                type === "failure" ? "bg-[#D92D20]" : "bg-[#039855]"
              } text-white capitalize`}
              onClick={(e) => {
                e.stopPropagation();
                functionToBeExecuted?.();
              }}
            >
              Oka
            </Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};
