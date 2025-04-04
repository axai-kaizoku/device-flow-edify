import { bulkDeleteUsers, User, UserResponse } from "@/server/userActions";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Table } from "@/components/wind/Table";
import Pagination from "../../teams/_components/pagination";
import { DeleteUser } from "../[id]/_components/delete-user";
import EditUser from "../[id]/_components/edit-user";
import { activeUsers } from "@/server/filterActions";
import Spinner from "@/components/Spinner";
import { Icons } from "../icons";

import CreateUser from "./create-user";
import DeleteTableIcon from "@/icons/DeleteTableIcon";
import EditTableIcon from "@/icons/EditTableIcon";
import { useToast } from "@/hooks/useToast";
import { DeleteModal } from "./deleteUserModal";

export default function UserMain({
  data,
  setUsers,
  onRefresh
}: {
  data: UserResponse | null;
  setUsers: React.Dispatch<React.SetStateAction<UserResponse | null>>;
  onRefresh: () => Promise<void>;
}) {
  if (!data) {
    return <Spinner />;
  }

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { openToast } = useToast();
  const [open, setOpen] = useState(false);
  // const [users, setUsers] = useState(data);

  const handlePageChange = async (page: number) => {
    const res = await activeUsers({ page });
    setUsers(res);
    setCurrentPage(page);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) {
      openToast("error", `No user selected for deletion`);
      return;
    }

    // const confirmDelete = window.confirm(
    //   `Are you sure you want to delete ${selectedIds.length} users?`
    // );
    // if (!confirmDelete) return;

    try {
      const res = await bulkDeleteUsers(selectedIds, "soft");
      if (res.status !== 200) throw new Error("Failed to delete users");
      setOpen(false);
      openToast("success", "Users deleted successfully!");
      setSelectedIds([]); // Clear selection after deletion
      await onRefresh(); // Refresh data after deletion
    } catch (error) {
      openToast("error", `Failed to delete Users : ${error}`);
    }
  };


  const handleSelectionChange = (selected: string[]) => {
    setSelectedIds(selected);
  };

  // console.log(selectedIds);

  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        {data?.users?.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center py-8">
            <Icons.no_people_display />
            <CreateUser>
              <div className="py-1.5 px-8 text-sm rounded-full text-white font-gilroySemiBold bg-black">
                Add User
              </div>
            </CreateUser>
          </div>
        ) : (
          <>
            <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className=" flex gap-3 w-fit">
                  <h1 className="text-xl font-gilroySemiBold pl-6">
                    Total People
                  </h1>
                  <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
                    {data?.total} People
                  </h1>
                </div>

                {selectedIds.length > 0 && (
                    <DeleteModal handleBulkDelete={handleBulkDelete} open={open} setOpen={setOpen}>
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
              <Suspense fallback={<div>Loading...</div>}>
                <div className="flex flex-col  w-full">
                  <Table
                    data={data?.users ?? []}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    checkboxSelection={{
                      uniqueField: "_id",
                      onSelectionChange: handleSelectionChange
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
                              {user?.first_name ?? ""} {user?.last_name ?? ""}
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

                          const formattedDate = date.toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          );

                          return <div>{formattedDate}</div>;
                        },
                      },

                      {
                        title: "Reporting Manager",
                        render: (record: User) => (
                          <div className=" whitespace-nowrap flex text-sm font-gilroyMedium text-[#6C6C6C] gap-1">
                            <h1>
                              {record?.reporting_manager?.first_name ?? "-"}
                            </h1>
                            <h1>
                              {record?.reporting_manager?.last_name ?? ""}
                            </h1>
                          </div>
                        ),
                      },
                      {
                        title: "Team",
                        render: (data) => (
                          <div className="">
                            {data?.team?.[0]?.title ?? "-"}
                          </div>
                        ),
                      },

                      {
                        title: "Devices assigned",
                        render: (data: User) =>
                          data?.devices && data?.devices > 0 ? (
                            <div className="flex justify-center items-center w-fit px-3 rounded-lg bg-[#ECFDF3] text-[#027A48]">
                              {`${data?.devices} Assigned`}
                            </div>
                          ) : (
                            <div>-</div>
                          ),
                      },

                      {
                        title: "",
                        render: (data) => (
                          <div className="flex  items-center gap-5 -ml-2">
                            {/* <button
                        className="flex flex-col"
                        onClick={() => handleRemoveUser(data)}
                      >
                        <DeleteTableIcon className="size-6" />
                      </button> */}
                            <DeleteUser id={data?._id} onRefresh={onRefresh}>
                              <DeleteTableIcon className="size-6" />
                            </DeleteUser>
                            <EditUser userData={data} onRefresh={onRefresh}>
                              <EditTableIcon className="size-5" />
                            </EditUser>
                          </div>
                        ),
                      },
                    ]}
                  />
                  <div className="mt-2">
                    <Pagination
                      current_page={currentPage}
                      total_pages={data?.total_pages!}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
}
