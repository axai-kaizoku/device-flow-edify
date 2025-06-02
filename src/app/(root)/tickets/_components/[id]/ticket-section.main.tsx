import Dropdown from "@/components/accordian";
import { GetAvatar } from "@/components/get-avatar";
import { addTags, removeTags, TicketData } from "@/server/ticketActions";
import {
  AddCircleIcon,
  Call02Icon,
  Mail01Icon,
  StarAward02Icon,
  User03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
// import ChatInterface from "./chat-interface";
import Link from "next/link";
import ChatInterface from "./chat-interface/chat-interface";

const TicketSection = ({
  data,
  isAdmin = false,
}: {
  data: TicketData;
  isAdmin: boolean;
}) => {
  const [tags, setTags] = useState<any[]>([]);
  const [newTag, setNewTag] = useState("");
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleAddTags = async () => {
    if (tags?.length === 0) {
      return;
    }
    setLoading(true);
    try {
      const payload = { tag: tags, ticketId: data?._id };
      await addTags(payload);

      queryClient.invalidateQueries({
        queryKey: ["fetch-ticket-by-id"],
        exact: false,
        refetchType: "all",
      });
      setClick(false);
      setTags([]);
      setNewTag("");
    } catch (error) {
      toast.error("Some Error Occured. Please try after some time.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDeleteTag = async (tag_id: string) => {
    try {
      const payload = { tag_id, ticketId: data?._id };
      console.log(payload);
      const res = await removeTags(payload);
      console.log(res);

      queryClient.invalidateQueries({
        queryKey: ["fetch-ticket-by-id"],
        exact: false,
        refetchType: "all",
      });
      setClick(false);
    } catch (error) {
      toast.error("Some Error Occured. Please try after some time.");
    } finally {
    }
  };

  const handleInsertTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="bg-white rounded-[10px] w-full border border-[rgba(0, 0, 0, 0.10)]  mt-3 flex h-[90vh] overflow-y-hidden">
      {/* Left Side */}
      <div className="w-[40%] h-full border border-r border-l-0 border-t-0 border-b-0 border-[rgba(0, 0, 0, 0.05)] overflow-y-auto">
        <div className="px-6">
          <div className="flex gap-2 items-center">
            <div className="mt-6 font-gilroySemiBold text-lg">
              {data?.category}
            </div>

            <div className="flex gap-2 mt-6">
              <p
                className={`px-2 h-fit py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full ${
                  data?.closedAt
                    ? "bg-alert-foreground text-failure"
                    : "bg-[#ECFDF3] text-[#027A48]"
                }`}
              >
                {data ? (data?.closedAt ? "Closed" : "Open") : "-"}
              </p>

              <p
                className={`px-2 h-fit py-1 justify-center items-center font-gilroyMedium flex text-xs rounded-full ${
                  data?.severity === "Medium"
                    ? "bg-[#FFFACB] text-[#FF8000]"
                    : data?.severity === "Low"
                    ? "bg-[#ECFDF3] text-[#027A48]"
                    : "bg-alert-foreground text-failure"
                }`}
              >
                {data?.severity ?? "-"}
              </p>
            </div>
          </div>
          {/* Name, serial no, image, status */}
          {data?.deviceDetails && (
            <Link
              href={`/assets/${data?.deviceDetails?._id}`}
              className="border-[#E5E5E5] hover:border-black border mt-2 p-2 flex justify-between items-center rounded-md w-[18rem]"
            >
              <div className="flex gap-2 items-center">
                <GetAvatar
                  name={data?.deviceDetails?.custom_model ?? "-"}
                  size={40}
                  isDeviceAvatar
                />
                <div className=" flex flex-col gap-1">
                  <h1 className="text-sm font-gilroyMedium">
                    {data?.deviceDetails?.custom_model ?? "-"}
                  </h1>
                  <h3 className="text-[#808080] text-xs font-gilroyMedium">
                    {data?.deviceDetails?.serial_no ?? "-"} |{" "}
                    {data?.deviceDetails?.ram ?? "-"} |{" "}
                    {data?.deviceDetails?.storage[0] ?? "-"}
                  </h3>
                </div>
              </div>
            </Link>
          )}

          {/* Opened on and Closed on Section */}

          <div className="flex text-sm font-gilroyMedium flex-col gap-6 my-6 relative pl-4">
            {data?.openedOn && (
              <p>Opened on {formatDate(data?.openedOn) ?? "-"}</p>
            )}
            {data?.closedAt ? (
              <p>Closed on {formatDate(data?.closedAt) ?? "-"}</p>
            ) : (
              <p className="text-gray-500">Ongoing</p>
            )}

            {/* Circles */}
            {data?.openedOn && (
              <div className="border border-[#E6E6E6] size-[10px] bg-[#FB0000] absolute top-1 left-0 rounded-full"></div>
            )}
            {data?.closedAt ? (
              <div className="border border-[#E6E6E6] size-[10px] bg-[#008910] absolute bottom-1 left-0 rounded-full"></div>
            ) : (
              <div className="border border-[#E6E6E6] size-[10px] bg-gray-400 absolute bottom-1 left-0 rounded-full"></div>
            )}

            {/* Vertical Line */}

            {
              <div className="h-9 border-dashed border border-[#E6E6E6] absolute left-1 top-3.5"></div>
            }
          </div>

          {/* Tags */}

          <div className="space-y-2">
            {click && (
              <div className="flex flex-col gap-1">
                <div className="flex gap-3 px-2 py-2.5 w-full rounded-md border-[#E5E5E5] border text-sm overflow-x-auto flex-nowrap">
                  <div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap overflow-x-auto scrollbar-hide gap-2 max-w-full">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="group inline-flex items-center gap-1 bg-[#EEF7FF] px-3 py-1.5 text-xs font-gilroyMedium rounded-md text-[#025CE5]"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-blue-600 hidden ease-in duration-100 group-hover:block transition-opacity"
                            >
                              <X className="size-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleInsertTag()}
                    className="block outline-none placeholder:text-[#B3B3B3] font-gilroyMedium text-sm text-nowrap max-w-full"
                    placeholder="Add more"
                  />
                </div>

                <div className="flex w-full justify-end gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-[#E5E5E5] py-2 px-3 font-gilroyMedium text-xs"
                    onClick={() => {
                      setClick(false);
                      setTags([]);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-[#008910] py-2 px-4 text-white font-gilroyMedium text-xs"
                    onClick={handleAddTags}
                  >
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Display fields */}

            <div className="flex gap-2 items-center">
              <div>
                {data?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data?.tags?.map((tag: any) => (
                      <span
                        key={tag?._id}
                        className="group inline-flex items-center gap-1 bg-[#EEF7FF] px-3 py-1.5 text-xs font-gilroyMedium rounded-md text-[#025CE5]"
                      >
                        {tag?.tag}
                        <button
                          type="button"
                          onClick={() => handleDeleteTag(tag?._id)}
                          className="text-blue-600  hidden ease-in duration-100 group-hover:block transition-opacity"
                        >
                          <X className="size-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div
                className="flex gap-2 items-center text-[#025CE5] cursor-pointer"
                onClick={() => {
                  setClick(true);
                }}
              >
                <HugeiconsIcon
                  icon={AddCircleIcon}
                  className="text-[#025CE5] size-4"
                />
                <span className="text-sm">Tag</span>
              </div>
            </div>
          </div>

          {/* Raised By Information */}
          <Dropdown title="Raised By" headerClassName="bg-[#F6F6F6] mt-6">
            <div className="space-y-3 px-2">
              <div className="flex items-center gap-12">
                <p className="flex items-center justify-between gap-2">
                  <HugeiconsIcon
                    icon={User03Icon}
                    className="text-[#a09f9f] size-5"
                  />
                  <span className="text-[#a09f9f] font-gilroyMedium text-sm leading-[18.652px]">
                    Name:
                  </span>
                </p>
                <p className="text-sm font-gilroyMedium underline leading-[18.652px] pl-3">
                  {data?.openedByDetails?.first_name}
                </p>
              </div>
              <div className="flex items-center gap-12">
                <p className="flex items-center justify-between gap-2">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    className="text-[#a09f9f] size-5"
                  />
                  <span className="text-[#a09f9f] font-gilroyMedium text-sm leading-[18.652px]">
                    Email:
                  </span>
                </p>
                <p className="text-sm text-[#025CE5] font-gilroyMedium leading-[18.652px] pl-3.5">
                  {data?.openedByDetails?.email ?? "-"}
                </p>
              </div>
              <div className="flex items-center gap-12">
                <p className="flex items-center justify-between gap-2">
                  <HugeiconsIcon
                    icon={Call02Icon}
                    className="text-[#a09f9f] size-5"
                  />
                  <span className="text-[#a09f9f] font-gilroyMedium text-sm leading-[18.652px]">
                    Phone:
                  </span>
                </p>
                <p className="text-sm text-[#000] font-gilroyMedium leading-[18.652px] pl-2">
                  +91 {data?.openedByDetails?.phone ?? "-"}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="flex items-center justify-between gap-2">
                  <HugeiconsIcon
                    icon={StarAward02Icon}
                    className="text-[#a09f9f] size-5"
                  />
                  <span className="text-[#a09f9f] font-gilroyMedium text-sm leading-[18.652px]">
                    Designation:
                  </span>
                </p>
                <p className="text-sm text-[#000] font-gilroyMedium leading-[18.652px]">
                  {data?.openedByDetails?.designation ?? "-"}
                </p>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[60%] lg:h-[66dvh] 2xl:h-[66dvh]">
        <ChatInterface data={data} />
      </div>
    </div>
  );
};

export default TicketSection;
