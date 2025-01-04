import { User, UserResponse } from "@/server/userActions";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Table } from "@/components/wind/Table";
import Pagination, { ITEMS_PER_PAGE } from "../../teams/_components/pagination";
import { DeleteUser } from "../[id]/_components/delete-user";
import EditUser from "../[id]/_components/edit-user";

export default function UserMain({ data }: { data: UserResponse }) {
  if (!data) {
    return <div>Not Found</div>;
  }

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = data.users.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => setCurrentPage(page);
  return (
    <>
      <div className="rounded-[33px] border border-[#C3C3C34F] p-3 bg-white/80 backdrop-blur-[22.8px]  flex flex-col gap-5">
        {data?.users?.length === 0 ? (
          <div className="flex justify-center items-center py-10">
            <Icons.no_member_table />
          </div>
        ) : (
          <>
            <div className="rounded-[21px] border border-[#F6F6F6] bg-[rgba(255,255,255,0.80)] backdrop-blur-[22.8px] pt-5 pb-2 flex flex-col gap-5">
              <div className=" flex gap-3 w-fit">
                <h1 className="text-xl font-gilroySemiBold pl-6">
                  Total People
                </h1>
                <h1 className="text-xs font-gilroyMedium  flex justify-center items-center rounded-full px-2 bg-[#F9F5FF] text-[#6941C6]">
                  {data?.totalCount} People
                </h1>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <div className="flex flex-col  w-full">
                  <Table
                    data={currentUsers}
                    checkboxSelection={{
                      uniqueField: "_id",
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
                              ? new Date(
                                  data.onboarding_date
                                ).toLocaleDateString()
                              : "N/A"}
                          </div>
                        ),
                      },

                      // {
                      //   title: "People assigned",
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
                        render: (data) => (
                          <div className="flex  items-center gap-5 -ml-2">
                            {/* <button
                        className="flex flex-col"
                        onClick={() => handleRemoveUser(data)}
                      >
                        <Icons.table_delete className="size-6" />
                      </button> */}
                            <DeleteUser id={data?._id}>
                              <Icons.table_delete className="size-6" />
                            </DeleteUser>
                            <EditUser userData={data}>
                              <Icons.table_edit className="size-5" />
                            </EditUser>
                          </div>
                        ),
                      },
                    ]}
                  />
                  <div className="my-2">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={data.users?.length}
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
