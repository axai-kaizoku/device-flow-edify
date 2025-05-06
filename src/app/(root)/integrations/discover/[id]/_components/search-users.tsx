"use client";

import React, { useState } from "react";
import { AsyncSelect } from "@/components/ui/async-select";
import { searchUsers } from "@/server/userActions";

export type UsersType = {
  _id: string;
  first_name: string;
  email: string;
  employment_type: string;
  designation: string;
  image: string;
  team: {
    _id: string;
    title: string;
    team_code: string;
  }[];
  devices: number;
};

// Mock API call
const getUsers = async (email: string = ""): Promise<UsersType[]> => {
  try {
    const res = await searchUsers(email);

    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search user");
  }
};

// Basic Demo
export function SearchUsers() {
  const [selectedUser, setSelectedUser] = useState<UsersType>();

  return (
    <div className="flex flex-col gap-2">
      <AsyncSelect<UsersType>
        fetcher={getUsers}
        renderOption={(user) => (
          <div className="flex items-center gap-2 ">
            <div className="flex flex-col">
              <div className="font-gilroyMedium">{user?.first_name}</div>
              <div className="text-xs font-gilroyRegular text-muted-foreground">
                {user?.email}
              </div>
            </div>
          </div>
        )}
        getOptionValue={(user) => user?.email}
        getDisplayValue={(user) => (
          <div className="flex items-center gap-2 text-left w-fit">
            <div className="flex flex-col leading-tight">
              <div className="font-gilroyMedium truncate min-w-0 w-[6rem]">
                {user?.email}
              </div>
              {/* <div className="text-xxs font-gilroyRegular text-muted-foreground">
                {user.Name}
              </div> */}
            </div>
          </div>
        )}
        notFound={
          <div className="py-6 text-center font-gilroyMedium text-sm">
            No users found
          </div>
        }
        label="User"
        placeholder="Enter Email"
        value={selectedUser?.first_name}
        onChange={(e) => setSelectedUser(selectedUser)}
        width="10rem"
      />
      {/* <p className="text-sm text-muted-foreground">
        Selected user ID: {selectedUser || "none"}
      </p> */}
    </div>
  );
}
