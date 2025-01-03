"use client";
import { CombinedContainer } from "@/components/container/container";
import ProfileContainer from "./_components/profileContainer";
import { getUserById, User } from "@/server/userActions";
import { getSession } from "@/server/helper";
import { useSelector } from "react-redux";
import { UserData } from "@/app/store/authSlice";
import UserGrid from "./_components/profile-main";
import { useEffect, useState } from "react";
import { getCurrentOrg } from "@/server/orgActions";

export default function Profile() {
  const userDetails: UserData = useSelector(
    (state: any) => state.auth.userData
  );

  return (
    <>
      <div className="flex w-full h-full">
        <UserGrid user={userDetails} />
      </div>
    </>
  );
}
