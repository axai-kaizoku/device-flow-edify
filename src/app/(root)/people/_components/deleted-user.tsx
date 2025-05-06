import { bulkDeleteUsers, User, UserResponse } from "@/server/userActions";
import React, { SetStateAction, useState } from "react";
import { Icons } from "../icons";
import CreateUser from "./create-user";
import { inActiveUsers } from "@/server/filterActions";
import { useRouter } from "next/navigation";
import Pagination from "../../teams/_components/pagination";
import { PermanentUserDelete } from "./permanent-user-delete";
import { RestoreUser } from "./restore-user";
import { Table } from "@/components/wind/Table";
import DeleteTableIcon from "@/icons/DeleteTableIcon";
import { toast } from "sonner";
import { DeleteModal } from "./deleteUserModal";

function DeletedUser({
  data,
  setUsers,
  onRefresh,
}: {
  data: UserResponse | null;
  setUsers?: React.Dispatch<SetStateAction<UserResponse | null>>;
  onRefresh?: () => Promise<void>;
}) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true); // Set loading to true when changing pages
    try {
      const res = await inActiveUsers({ page });
      setUsers(res);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching Members:", error);
    } finally {
      setIsLoading(false); // Set loading to false when done
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      toast.error(`No user selected for deletion`);
      return;
    }

    // const confirmDelete = window.confirm(
    //   `Are you sure you want to delete ${selectedIds.length} users?`
    // );
    // if (!confirmDelete) return;

    try {
      const res = await bulkDeleteUsers(selectedIds, "permanent");

      if (res.status !== 200) throw new Error("Failed to delete users");

      toast.success("Users deleted successfully!");
      setSelectedIds([]); // Clear selection after deletion
      // await onRefresh(); // Refresh data after deletion
    } catch (error) {
      toast.error(`Failed to delete Users : ${error}`);
    }
  };

  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        {!isLoading && data?.users?.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center py-10">
            <Icons.no_people_display />
            <CreateUser>
              <div className="py-1.5 px-8 text-sm rounded-full text-white font-gilroySemiBold bg-black">
                Add User
              </div>
            </CreateUser>
          </div>
        ) : (
          <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className=" flex gap-3 w-fit">
                <h1 className="text-xl font-gilroySemiBold pl-6">People</h1>
                <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
                  {data?.total} People
                </h1>
              </div>

              {selectedIds.length > 0 && (
                <DeleteModal
                  handleBulkAction={handleBulkDelete}
                  open={open}
                  setOpen={setOpen}
                  type="Delete"
                >
                  <button
                    // onClick={handleBulkDelete}
                    className="bg-black flex items-center gap-2 text-white px-3 py-1 font-gilroySemiBold w-fit mr-8 rounded-full"
                  >
                    Delete
                  </button>
                </DeleteModal>
                // {selectedIds.length} Users
              )}
            </div>
            <div className="flex flex-col ">
              <Table
                data={data?.users ?? []}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                isLoading={isLoading}
                checkboxSelection={{
                  uniqueField: "_id",
                  onSelectionChange: handleSelectionChange,
                }}
                columns={[
                  {
                    title: "Name",
                    render: (user: User) => (
                      <div
                        className="w-28 justify-start flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push(`/people/${user?._id}`)}
                      >
                        <img
                          src={
                            user?.image && user.image.length > 0
                              ? user?.image
                              : user?.gender === "Male"
                              ? "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012636473.png"
                              : "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1737012892650.png"
                          }
                          alt="Profile Image"
                          className="size-10 object-cover rounded-full"
                        />

                        {/* Truncated Text */}
                        <div className="font-gilroySemiBold text-sm gap-1 flex whitespace-nowrap  text-black ">
                          {user?.first_name ?? "-"} {user?.last_name}
                        </div>
                      </div>
                    ),
                  },
                  {
                    title: "Role",
                    render: (record: User) => (
                      <div>{record?.designation ?? "-"}</div>
                    ),
                  },
                  {
                    title: "Joining Date",
                    render: (record) => {
                      const onboardingDate = record?.onboarding_date;

                      // Check if onboardingDate is null, undefined, or empty
                      if (!onboardingDate) {
                        return <div>-</div>; // Return "-" for null, undefined, or empty value
                      }

                      const date = new Date(onboardingDate);

                      // Check if the date is valid
                      if (isNaN(date.getTime())) {
                        return <div>-</div>; // Return "-" for invalid date
                      }

                      const formattedDate = date.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return <div>{formattedDate}</div>;
                    },
                  },
                  {
                    title: "Reporting Manager",
                    render: (record: User) => (
                      <div className=" whitespace-nowrap flex text-sm font-gilroyMedium text-[#6C6C6C] gap-1">
                        <h1>{record?.reporting_manager?.first_name ?? "-"}</h1>
                        <h1>{record?.reporting_manager?.last_name}</h1>
                      </div>
                    ),
                  },
                  {
                    title: "Team",
                    render: (data) => (
                      <div className="">{data?.team?.title ?? "-"}</div>
                    ),
                  },

                  {
                    title: "",
                    render: (record: User) => (
                      <div className="flex gap-5 -ml-2 justify-center items-center">
                        <PermanentUserDelete
                          id={record?._id!}
                          // onRefresh={onRefresh}
                        >
                          <DeleteTableIcon className="size-6" />
                        </PermanentUserDelete>

                        <RestoreUser id={record?._id!} onRefresh={onRefresh}>
                          <div className="rounded-md text-white bg-black font-gilroySemiBold text-sm py-2 px-4">
                            Restore
                          </div>
                        </RestoreUser>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DeletedUser;
