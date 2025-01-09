import { User, UserResponse } from "@/server/userActions";
import React, { SetStateAction, useState } from "react";
import { Icons } from "@/components/icons";
import CreateUser from "./create-user";
import { deletedUsers, inActiveUsers } from "@/server/filterActions";
import { useRouter } from "next/navigation";
import Pagination from "../../teams/_components/pagination";
import { PermanentUserDelete } from "./permanent-user-delete";
import { RestoreUser } from "./restore-user";
import { Table } from "@/components/wind/Table";

function DeletedUser({
  data,
  setUsers,
}: {
  data: UserResponse;
  setUsers: SetStateAction<UserResponse>;
}) {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page: number) => {
    const res = await inActiveUsers({ page });
    setUsers(res);
    setCurrentPage(page);
  };

  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        {data?.users?.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center py-10">
            <Icons.no_member_table />
            <CreateUser>
              <div className="bg-black rounded-full text-white text-lg font-gilroySemiBold px-10 py-2">
                Create User
              </div>
            </CreateUser>
          </div>
        ) : (
          <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
            <div className=" flex gap-3 w-fit">
              <h1 className="text-xl font-gilroySemiBold pl-6">People</h1>
              <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
                {data?.total} People
              </h1>
            </div>
            <div className="flex flex-col ">
              <Table
                data={data?.users ?? []}
                checkboxSelection={{
                  uniqueField: "_id",
                  //logic yet to be done
                  onSelectionChange: (e) => console.log(e),
                }}
                columns={[
                  {
                    title: "Name",
                    render: (users: User) => (
                      <div
                        className="w-28 justify-start flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push(`/people/${users?._id}`)}
                      >
                        <img
                          src={
                            users?.image ||
                            "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                          }
                          alt="Profile Image"
                          className="size-10 object-cover rounded-full"
                        />

                        {/* Truncated Text */}
                        <div className="font-gilroySemiBold text-sm gap-1 flex whitespace-nowrap  text-black ">
                          {users?.first_name} {users?.last_name}
                        </div>
                      </div>
                    ),
                  },
                  {
                    title: "Role",
                    dataIndex: "designation",
                  },
                  {
                    title: "Joining Date",
                    render: (record) => {
                      const date = new Date(record?.onboarding_date);

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
                        <h1>{record?.reporting_manager?.first_name}</h1>
                        <h1>{record?.reporting_manager?.last_name}</h1>
                      </div>
                    ),
                  },
                  {
                    title: "Team",
                    render: (data) => (
                      <div className="">
                        {data?.onboarding_date
                          ? new Date(data.onboarding_date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    ),
                  },

                  // {
                  //   title: "Assets assigned",
                  //   render: (data: User) => (
                  //     <div className="text-center rounded-lg bg-[#ECFDF3] text-[#027A48]">
                  //       {data?.devices?.length > 0
                  //         ? `${data.devices.length} Assigned`
                  //         : "N/A"}
                  //     </div>
                  //   ),
                  // },
                  {
                    title: "",
                    render: (record: User) => (
                      <div className="flex gap-5 -ml-2 justify-center items-center">
                        <PermanentUserDelete id={record?._id!}>
                          <Icons.table_delete className="size-6" />
                        </PermanentUserDelete>

                        <RestoreUser id={record?._id!}>
                          <div className="rounded-full text-white bg-black font-gilroySemiBold text-sm py-1.5 px-5">
                            Restore
                          </div>
                        </RestoreUser>
                      </div>
                    ),
                  },
                ]}
              />
              {/* Pagination Control */}
              <div className="mt-2">
                <Pagination
                  current_page={currentPage}
                  total_pages={data?.total_pages!}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DeletedUser;
