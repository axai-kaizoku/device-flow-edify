"use client";
import { Button } from "@/components/buttons/Button";
import { SelectInput } from "@/components/dropdown/select-input";
import { Input } from "@/components/inputs/Input";
import Spinner, { spinnerVariants } from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/side-sheet";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { createSignupLink } from "@/server/signupActions";
import { fetchTeams, Team } from "@/server/teamActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
                      <div className="w-full bg-[#f5f5f5] rounded-md p-3 flex items-center gap-4">
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
                        type="button"
                        className=" w-full"
                        variant="outlineTwo"
                        onClick={() => setOpen(false)}
                      >
                        Close
                      </Button>
                      <Button
                        className=" w-full"
                        type="submit"
                        variant="primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner
                            className={spinnerVariants({ size: "sm" })}
                          />
                        ) : (
                          <>
                            <span>Create Link</span>
                            {/* <ChevronRight color="white" /> */}
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
