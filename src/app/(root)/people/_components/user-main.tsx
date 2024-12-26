"use client";

import { User } from "@/server/userActions";
import CreateUser from "./create-user";
import UserTable from "./user-table";
import { Icons } from "@/components/icons";

interface UserMainProps {
  data: User[];
}

export default function UserMain({ data }: UserMainProps) {
  return (
    <>
      {data.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <Icons.no_memeber_table />
        </div>
      ) : (
        <>
          <div>
            <CreateUser name="Add user" />
          </div>
          <div className="rounded-[33px] border border-white/30 px-7 py-5 bg-white/80 backdrop-blur-[22.8px]">
            <UserTable users={data} />
          </div>
        </>
      )}
    </>
  );
}
