"use client";
import { Button } from "@/components/buttons/Button";
import { SelectInput } from "@/components/dropdown/select-input";
import { Icons } from "@/components/icons";
import Spinner from "@/components/Spinner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { fetchTeams, Team } from "@/server/teamActions";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { createSignupLink } from "@/server/signupActions";
import { Input } from "@/components/inputs/Input";

export default function InvitePeople({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openToast } = useToast();

  const [link, setLink] = useState("");

  const [team, setTeam] = useState<Team>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setLink("");
      setTeam({});
      setError("");
    }
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      openToast("success", "Link copied to clipboard");
    } catch (err) {
      openToast("error", "Failed to copy to clipboard");
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
      openToast("success", "Invite people link created !");
      setDialogOpen(true);
      setLoading(false);
      router.refresh();
    } catch (error) {
      openToast("error", "Failed to create link !");
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

          <div className="group relative w-full mt-2">
            <Input
              id="copy-link"
              type="text"
              className={
                "text-[#025CE5] absolute w-full rounded-md border-[#BEBEBE] focus-visible:border-[#BEBEBE] focus:border-[#BEBEBE] font-gilroyMedium text-sm"
              }
              value={link}
              placeholder=""
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-0 top-0 bg-red pl-2 pr-[3px]  m-1 flex items-center justify-end h-10 w-24 bg-white"
            >
              <span className="top-2.5 bg-[#EDEDED] px-2.5 py-[0.6rem] text-[#808080] text-xs font-gilroySemiBold whitespace-nowrap rounded-md">
                Copy Link
              </span>
            </button>
          </div>

          <DialogFooter className="flex w-full items-center justify-center mt-14">
            <Button
              className="w-full rounded-sm font-gilroyMedium  bg-black text-white  ring-1 ring-black   flex items-center justify-center"
              onClick={() => {
                setDialogOpen(false);
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
                  <div className="flex flex-col gap-1 pb-5 w-full">
                    <div className="flex justify-start items-center pb-2 gap-4 text-2xl font-gilroySemiBold">
                      <div className="bg-black rounded-full p-1.5 flex justify-center items-center">
                        <Icons.user_form_icon className="size-6" />
                      </div>
                      <span className="font-gilroySemiBold 2xl:text-2xl text-xl">
                        Invite people
                      </span>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <div className="font-gilroySemiBold text-base mt-2 2xl:text-xl text-gray-400">
                        {"Step 1 of 1"}
                      </div>
                      <div className="h-[1px] bg-[#E7E7E7] w-full mb-3"></div>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7 justify-start relative h-full"
                  >
                    <div className="z-0">
                      <SelectInput
                        optionValue={{
                          firstV: "title",
                          secondV: "description",
                        }}
                        key={"invite-team-field"}
                        value={team?.title ?? ""}
                        placeholder="Search by team name, etc"
                        fetchOptions={async (query) => {
                          const data = await fetchTeams();
                          const filtered = data.filter((obj: any) =>
                            obj.title
                              .toLowerCase()
                              .includes(query.toLowerCase())
                          );
                          return filtered;
                        }}
                        initialOptions={fetchTeams}
                        onSelect={(data: any) => {
                          setTeam({
                            _id: data._id,
                            title: data.title,
                            description: data.description,
                            image: data.image,
                          });
                        }}
                        label="Select Team*"
                        className={cn(
                          error.length > 0 ? "border-destructive/80 border" : ""
                        )}
                      />
                      {error.length > 0 && (
                        <p className="text-destructive text-sm">{error}</p>
                      )}
                    </div>

                    {team?.title ? (
                      <div className="w-full bg-[#f5f5f5] rounded-3xl p-3 flex items-center gap-4">
                        <img
                          src={
                            team?.image && team.image.length > 0
                              ? team.image
                              : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012942444.png"
                          }
                          alt="team-image"
                          className="w-20 h-20 p-1  object-cover rounded-full "
                        />
                        <div className="w-full flex flex-col justify-center">
                          <div className="flex gap-3 items-center">
                            <div className="text-black font-gilroySemiBold text-lg 2xl:text-2xl">
                              {team?.title ?? "-"}
                            </div>
                            <div className="text-[#027A48] rounded-full w-fit bg-[#ECFDF3] text-sm 2xl:text-base font-gilroyMedium flex justify-center items-center px-2 py-0.5">
                              Active
                            </div>
                          </div>
                          <div className="text-[#7C7C7C] flex  items-center text-base 2xl:text-lg font-gilroyMedium">
                            {team?.description ?? ""}
                          </div>

                          <div className="flex gap-2 items-center">
                            <div className="text-[#ADADAC] text-sm 2xl:text-base font-gilroySemiBold">
                              Reporting Manger:
                            </div>
                            <div className="text-black font-gilroySemiBold">
                              {`${team?.manager?.[0]?.first_name ?? "-"}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="flex gap-2 absolute bottom-0 w-full mt-4">
                      <Button
                        className="rounded-full w-1/2  text-xl font-gilroySemiBold border border-black"
                        onClick={() => setOpen(false)}
                      >
                        Close
                      </Button>
                      <Button
                        className="rounded-full w-1/2 text-xl font-gilroySemiBold bg-black text-white "
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            <span>Create Link</span>
                            <ChevronRight color="white" />
                          </>
                        )}
                      </Button>
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
