import { User, UserResponse } from "@/server/userActions";
import React from "react";
import UserTable from "./user-table";
import DeletedUserTable from "./deleted-user-table";
import { Icons } from "@/components/icons";
import CreateUser from "./create-user";
import { deletedUsers } from "@/server/filterActions";

interface DeletedProps {
  data: User[];
}

const DeletedUser = async () => {
  const deletedUserResponse: UserResponse = await deletedUsers();
  return (
    <>
      <div className="rounded-[33px] border border-white/30 px-7 py-5 bg-white/80 backdrop-blur-[22.8px]">
        {deletedUserResponse?.users?.length === 0 ? (
          <div className="flex flex-col gap-4 justify-center items-center py-10">
            <Icons.no_memeber_table />
            <CreateUser name="Create Employee" />
          </div>
        ) : (
          <DeletedUserTable users={deletedUserResponse?.users} />
        )}
      </div>
    </>
  );
};

export default DeletedUser;
