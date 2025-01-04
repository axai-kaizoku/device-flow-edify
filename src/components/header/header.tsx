"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Icon } from "../wind/Icons";
import {
  Bell,
  CircleHelp,
  Plus,
  RefreshCw,
  Settings,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Props } from "@/app/(root)/layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/store/authSlice";
import CreateUser from "@/app/(root)/people/_components/create-user";
import CreateDevice from "@/app/(root)/assets/_components/addDevices/_components/create-device";
import { Icons } from "../icons";
// import type { RootState } from "@/app/store/store";

export default function Header({ session }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session?.user?.user) {
      dispatch(
        login({
          userData: {
            token: session.user.user.token,
            userId: session.user.user.userId,
            email: session.user.user.email,
            firstName: session.user.user.firstName ?? "",
            lastName: session.user.user.lastName ?? "",
            role: session.user.user.role ?? 1,
            orgId: session.user.user.orgId!,
            teamId: session.user.user.teamId!,
            addressDetails: session.user.user.addressDetails!,
          },
        })
      );
    }
  }, [session, dispatch]);

  // const userData = useSelector((state: RootState) => state.auth.userData);
  // console.log(userData);

  return (
    <>
      {session ? (
        <header className="fixed  top-0 font-gilroyRegular py-12 left-0 w-full h-14 bg-transparent backdrop-blur-3xl z-50 flex justify-between items-center px-12 ">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <img
              src="/media/Deviceflow.png"
              alt="Logo"
              className="2xl:w-[170px] w-[150px] 2xl:h-10 h-9"
            />
            {/* <Icons.main_Logo /> */}

            {/* {pathname === "/" && session?.user.user.role === 1 ? (
              <div className="border-0 border-l-2 pl-4">Home</div>
            ) : pathname === "/" && session?.user.user.role === 2 ? (
              <div className="border-0 border-l-2 pl-4">Dashboard</div>
            ) : pathname === "/assets" ? (
              <div className="border-0 border-l-2 pl-4">Assets</div>
            ) : pathname === "/teams" ? (
              <div className="border-0 border-l-2 pl-4">Teams</div>
            ) : pathname === "/reports" ? (
              <div className="border-0 border-l-2 pl-4">Reports</div>
            ) : pathname === "/onboarding" ? (
              <div className="border-0 border-l-2 pl-4">Onboarding</div>
            ) : pathname === "/issues" ? (
              <div className="border-0 border-l-2 pl-4">Issues</div>
            ) : pathname === "/store" ? (
              <div className="border-0 border-l-2 pl-4">Store</div>
            ) : pathname === "/people" ? (
              <div className="border-0 border-l-2 pl-4">People</div>
            ) : pathname === "/orders" ? (
              <div className="border-0 border-l-2 pl-4">Orders</div>
            ) : pathname === "/org-chart" ? (
              <div className="border-0 border-l-2 pl-4">Org Chart</div>
            ) : pathname === "/settings" ? (
              <div className="border-0 border-l-2 pl-4">Settings</div>
            ) : (
              <div></div>
            )} */}
          </div>

          {/* Middle Search and Actions */}
          <div className="flex justify-center items-center ml-16">
            <div className="flex items-center gap-x-4 lg:gap-x-1 2xl:gap-x-4 bg-transparent border border-gray-400 bg-opacity-90 rounded-[2.6rem] px-1 py-1">
              {/* Search Bar */}
              <div className="bg-transparent flex items-center gap-2 border border-gray-400 rounded-[calc(2.5rem+1px)] px-2 py-1.5">
                <Icon type="OutlinedSearch" color="gray" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 placeholder:font-gilroyMedium placeholder:text-[15px]"
                />
              </div>

              {/* Action Buttons */}
              <CreateDevice>
                <div className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black hover:text-white hover:border-white group">
                  <div className="rounded-full border p-1 border-gray-400 border-dashed group-hover:border-white">
                    <Plus className="size-4 lg:size-3.5 2xl:size-4 text-gray-500 group-hover:text-white" />
                  </div>
                  <div className="text-gray-500 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                    Add Device
                  </div>
                </div>
              </CreateDevice>

              <div className="flex cursor-pointer gap-2 items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black group">
                {/* Icon Section */}
                <div className="rounded-full border border-gray-400 p-1 border-dashed group-hover:border-white">
                  <RefreshCw className="size-4 lg:size-3.5 2xl:size-4 text-gray-500 group-hover:text-white" />
                </div>

                {/* Text Section */}
                <div className="text-gray-500 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                  Re/Assign
                </div>
              </div>

              <CreateUser>
                <div className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black group hover:text-white hover:border-white">
                  <div className="rounded-full p-1 border border-gray-400 border-dashed group-hover:border-white group">
                    <UserRound className="size-4 lg:size-3.5 2xl:size-4 group-hover:text-white text-gray-600" />
                  </div>
                  <div className="text-gray-500 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                    Add Employee
                  </div>
                </div>
              </CreateUser>
            </div>
          </div>

          {/* Right Icons Section */}
          <div className="flex items-center space-x-2">
            {/* Notification Icon */}
            <button className="p-2 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full">
              <Bell className="size-5" />
            </button>

            {/* Settings Icon */}
            <button
              onClick={() => router.push("/settings")}
              className=" bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full p-2"
            >
              <Settings className="size-5" />
            </button>

            {/* Query Icon */}
            <button className=" bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full p-2">
              <CircleHelp className="size-5" />
            </button>

            {/* Profile Icon */}
            <button className=" bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full p-2">
              <UserRound className="size-5" />
            </button>
          </div>
        </header>
      ) : null}
    </>
  );
}
