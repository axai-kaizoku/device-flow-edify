"use client";
import { FormField } from "@/app/(root)/settings/_components/form-field";
import { Button } from "@/components/buttons/Button";
import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { ChevronRight } from "lucide-react";

import { useState } from "react";

export default function InvitePeople({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState();
  return (
    <div className="flex justify-center items-center gap-8">
      <div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>{children}</SheetTrigger>
          <SheetContent>
            <div className="flex relative flex-col justify-start items-start pb-1 px-1 space-y-4 gap-1 h-full">
              <div className="flex justify-start items-center gap-4 font-gilroySemiBold">
                <div className="bg-black rounded-full p-1.5 flex justify-center items-center">
                  <Icons.user_form_icon className="size-6" />
                </div>
                <span className="font-gilroySemiBold 2xl:text-2xl text-xl">
                  Invite people
                </span>
              </div>

              <div className="h-[1px] bg-[#E7E7E7] w-full"></div>
              <div className="w-full relative">
                <FormField
                  label="Email"
                  id="email"
                  error={""}
                  name="email"
                  value={formData?.email ?? ""}
                  type="text"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                  }}
                  maxLength={50}
                  placeholder="Enter the invitee email ID"
                />
                <h1 className="absolute right-4 top-2 font-gilroySemiBold text-lg">
                  Add
                </h1>
              </div>
              <div className="flex gap-2 absolute bottom-0 w-full mb-2 mt-4">
                <Button className="rounded-full w-1/2  text-base font-gilroySemiBold border border-black">
                  Cancel
                </Button>
                <Button
                  className="rounded-full w-1/2 text-base font-gilroySemiBold bg-black text-white "
                  type="submit"
                >
                  <span>Invite</span>
                  <ChevronRight color="white" className="size-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
