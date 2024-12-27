"use client";
import React from "react";
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

export default function Header({ session }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {session ? (
        <header className="fixed top-0 font-gilroyRegular py-12 left-0 w-full h-16 bg-transparent backdrop-blur-3xl z-50 flex justify-between items-center px-12 ">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pl-2">
            <Image
              src="/media/logo/logo.png"
              alt="Logo"
              width={107.3}
              height={30.77}
              className="mr-4"
            />

            {pathname === "/" && session?.user.role === 1 ? (
              <div className="border-0 border-l-2 pl-4">Home</div>
            ) : pathname === "/" && session?.user.role === 2 ? (
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
            )}
          </div>

          {/* Middle Search and Actions */}
          <div className="flex justify-center items-center ">
            <div className="flex items-center gap-x-4 lg:gap-x-2 2xl:gap-x-4 bg-transparent border border-gray-400 bg-opacity-90 rounded-[2.5rem] px-2.5 py-2">
              {/* Search Bar */}
              <div className="bg-transparent flex items-center gap-2 border border-gray-400 rounded-[calc(2.5rem+1px)] p-2">
                <Icon type="OutlinedSearch" color="gray" />
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Action Buttons */}
              <div
                className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[0.43rem] hover:bg-black hover:text-white hover:border-white group"
                onClick={() => {
                  router.push("/assets");
                }}
              >
                <div className="rounded-full border p-1 border-gray-400 border-dashed group-hover:border-white">
                  <Plus className="size-4 lg:size-3.5 2xl:size-4 text-gray-500 group-hover:text-white" />
                </div>
                <div className="text-gray-500 group-hover:text-white text-nowrap xl:text-base lg:text-sm 2xl:text-base">
                  Add Device
                </div>
              </div>

              <div className="flex gap-2 items-center rounded-full border border-gray-400 p-[0.43rem] hover:bg-black group">
                {/* Icon Section */}
                <div className="rounded-full border border-gray-400 p-1 border-dashed group-hover:border-white">
                  <RefreshCw className="size-4 lg:size-3.5 2xl:size-4 text-gray-500 group-hover:text-white" />
                </div>

                {/* Text Section */}
                <div className="text-gray-500 group-hover:text-white text-nowrap xl:text-base lg:text-sm 2xl:text-base">
                  Re/Assign
                </div>
              </div>

              <div
                className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[0.43rem] hover:bg-black group hover:text-white hover:border-white"
                onClick={() => {
                  router.push("/people");
                }}
              >
                <div className="rounded-full p-1 border border-gray-400 border-dashed group-hover:border-white group">
                  <UserRound className="size-4 lg:size-3.5 2xl:size-4 group-hover:text-white text-gray-600" />
                </div>
                <div className="text-gray-500 group-hover:text-white text-nowrap xl:text-base lg:text-sm 2xl:text-base">
                  Add Employee
                </div>
              </div>
            </div>
          </div>

          {/* Right Icons Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="w-10 h-10 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full">
              <Bell />
            </button>

            {/* Settings Icon */}
            <button className="w-10 h-10 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full">
              <Settings />
            </button>

            {/* Query Icon */}
            <button className="w-10 h-10 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full">
              <CircleHelp />
            </button>

            {/* Profile Icon */}
            <button className="w-10 h-10 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full">
              <UserRound />
            </button>
          </div>
        </header>
      ) : null}
    </>
  );
}
