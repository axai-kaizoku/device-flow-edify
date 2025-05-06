"use client";
import { Button, LoadingButton } from "@/components/buttons/Button";
import { GetAvatar } from "@/components/get-avatar";
import { Input } from "@/components/inputs/Input";
import { AsyncSelect } from "@/components/ui/async-select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { createSignupLink } from "@/server/signupActions";
import { fetchTeams, Team } from "@/server/teamActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function InvitePeople({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [link, setLink] = useState("");

  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!team?._id) {
      setError("Team required");
      return;
    }

    setLoading(true);
    try {
      const res = await createSignupLink(team._id);
      setLink(res.link);
      setOpen(false);
      toast.success("Invite people link created !");
      setDialogOpen(true);
      setLoading(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to create link !");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl bg-white p-4 shadow-lg w-96 text-center">
          <DialogTitle className="text-lg font-gilroySemiBold text-gray-900">
            Invite people
          </DialogTitle>
          <p className="text-[#B1B1B1] text-sm font-gilroyMedium -mt-2">
            Share this link to onboard your employees easily.
          </p>

          <div className="w-full mt-2 flex items-center  justify-between gap-x-2">
            <Input
              id="copy-link"
              type="text"
              className={
                "text-[#025CE5] select-none w-[17rem]  rounded-lg border-[#BEBEBE] focus-visible:border-[#BEBEBE] focus:border-[#BEBEBE] font-gilroyMedium text-sm h-10"
              }
              defaultValue={link}
              value={link}
              readOnly
              placeholder=""
            />
            <Button
              variant="outlineTwo"
              onClick={handleCopy}
              className="w-fit border-[#BEBEBE]"
            >
              Copy
            </Button>
          </div>

          <DialogFooter className="flex w-full items-center justify-center mt-4">
            <Button
              variant="primary"
              onClick={() => {
                setDialogOpen(false);
                setTeam({});
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center items-center gap-8">
        <div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent>
              <div className="flex justify-center w-full h-full items-start">
                <div className="flex flex-col w-[97%] h-full justify-start items-center">
                  <h1 className="font-gilroyMedium w-full text-center text-lg mb-2">
                    Invite people
                  </h1>

                  <div className="h-[1px] bg-[#E7E7E7] w-full my-4 mb-6"></div>

                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7 justify-start relative h-full"
                  >
                    <div className="flex flex-col gap-2 pt-3">
                      <AsyncSelect<Team>
                        fetcher={fetchTeams}
                        preload
                        // fixInputClear={false}
                        renderOption={(team) => (
                          <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                              <div className="font-gilroyMedium">
                                {team?.title}
                              </div>
                              <div className="text-xs font-gilroyRegular text-muted-foreground">
                                {team?.description}
                              </div>
                            </div>
                          </div>
                        )}
                        filterFn={(team, query) =>
                          team?.title
                            ?.toLowerCase()
                            ?.includes(query?.toLowerCase()) ||
                          team?.description
                            ?.toLowerCase()
                            ?.includes(query?.toLowerCase())
                        }
                        getOptionValue={(team) => team?._id}
                        getDisplayValue={() => (
                          <div className="flex items-center gap-2 text-left w-full">
                            <div className="flex flex-col leading-tight">
                              <div className="font-gilroyMedium">
                                {team?.title ?? ""}
                              </div>
                            </div>
                          </div>
                        )}
                        notFound={
                          <div className="py-6 text-center font-gilroyMedium text-sm">
                            No teams found
                          </div>
                        }
                        label="Team"
                        placeholder="Search Teams"
                        value={team?.title || "null"}
                        onChange={(selected) =>
                          setTeam({
                            _id: selected?._id,
                            title: selected?.title,
                            description: selected?.description,
                            image: selected?.image,
                          })
                        }
                        width="100%"
                      />
                      {error.length > 0 && (
                        <p className="text-destructive/80 text-xs ml-1 font-gilroyMedium">
                          {error}
                        </p>
                      )}
                    </div>

                    {team?.title ? (
                      <div className="w-full bg-[#f5f5f5]  rounded-md p-3 flex items-center gap-4">
                        {team?.image && team?.image?.length > 0 ? (
                          <img
                            src={team?.image}
                            alt={team?.title}
                            className="size-14 object-cover rounded-full flex-shrink-0"
                          />
                        ) : (
                          <GetAvatar name={team?.title ?? ""} size={56} />
                        )}
                        <div className="w-full flex flex-col justify-center">
                          <div className="flex gap-3 items-center">
                            <div className="text-black font-gilroySemiBold text-base">
                              {team?.title ?? "-"}
                            </div>
                            <div className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm  font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                              Active
                            </div>
                          </div>
                          <div className="text-[#7C7C7C] flex  items-center text-sm  font-gilroyMedium">
                            {team?.description ?? ""}
                          </div>

                          <div className="flex gap-2 items-center">
                            <div className="text-[#ADADAC] text-sm  font-gilroySemiBold">
                              Reporting Manger:
                            </div>
                            <div className="text-black font-gilroySemiBold">
                              {`${team?.manager?.[0]?.first_name ?? "-"} `}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="flex gap-2 absolute bottom-0 w-full mt-4">
                      <Button
                        type="button"
                        className=" w-full"
                        variant="outlineTwo"
                        onClick={() => setOpen(false)}
                      >
                        Close
                      </Button>
                      <LoadingButton
                        loading={loading}
                        variant="primary"
                        className="w-full"
                        type="submit"
                      >
                        Create Link
                      </LoadingButton>
                    </div>
                  </form>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
