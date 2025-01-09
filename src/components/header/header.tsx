"use client";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "../wind/Icons";
import {
  Bell,
  CircleHelp,
  LogOut,
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
import { signOut } from "next-auth/react";
import { Icons } from "../icons";
// import type { RootState } from "@/app/store/store";

export default function Header({ session }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState(""); // Tracks user input
  const [isFocused, setIsFocused] = useState(false); // Tracks focus state

  const placeholders = ["Assets", "People", "Teams", "Issues"];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [animationState, setAnimationState] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      // Start the animation
      if (!isFocused && inputValue === "") {
        setAnimationState(true);

        // Update placeholder after animation
        setTimeout(() => {
          index = (index + 1) % placeholders.length;
          setCurrentPlaceholder(placeholders[index]);
          setAnimationState(false); // Reset animation state
        }, 1000); // Match the animation duration
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Closing dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

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
          </div>

          {/* Middle Search and Actions */}
          <div className="flex justify-center items-center ml-16">
            <div className="flex items-center gap-x-4 lg:gap-x-1 2xl:gap-x-4 bg-transparent border border-gray-400 bg-opacity-90 rounded-[2.6rem] px-1 py-1">
              {/* Search Bar */}
              <div className="bg-transparent overflow-hidden flex justify-between items-center border border-gray-400 rounded-[calc(2.5rem+1px)] px-2 py-1.5">
                <div className="flex gap-2">
                  <Icon type="OutlinedSearch" color="gray" />
                  <input
                    type="text"
                    placeholder={`Search ${currentPlaceholder}...`}
                    onChange={(e) => setInputValue(e.target.value)} // Update input value
                    onFocus={() => setIsFocused(true)} // Mark as focused
                    onBlur={() => setIsFocused(false)} // Remove focus
                    className={`flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500 placeholder:font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 ${
                      !isFocused && inputValue === "" && animationState
                        ? "animate-slide-up"
                        : ""
                    }`}
                  />
                </div>

                <Icons.kbar_icon/>
              </div>

              {/* Action Buttons */}
              {session?.user?.user?.role === 2 ? ( <> <CreateDevice>
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
              </CreateUser> </>) : (
                <div className="cursor-pointer" onClick={()=>{router.push('/devices');}}>
                  <div className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black group hover:text-white hover:border-white">
                    <div className="rounded-full p-1 border border-gray-400 border-dashed group-hover:border-white group">
                      <UserRound className="size-4 lg:size-3.5 2xl:size-4 group-hover:text-white text-gray-600" />
                    </div>
                    <div className="text-gray-500 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                      Report an Issue
                    </div>
                  </div>
               </div>
              )}
            </div>
          </div>

          {/* Right Icons Section */}
          <div className="flex items-center space-x-4">
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
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="p-2 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full"
              >
                <UserRound className="size-5" />
              </button>
              {dropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg pt-0.5 pb-0.5 border border-[#5F5F5F] font-gilroyMedium"
                >
                  <div className="block mx-1 text-black my-1 rounded-[5px] hover:bg-[#EEEEEE] w-[95%] cursor-pointer">
                    <button
                      onClick={() => {
                        if (session.user.user.role === 2) {
                          router.push(`/people/${session.user.user.userId}`);
                        } else {
                          router.push("/profile");
                        }
                        setDropdownVisible(false);
                      }}
                      className="w-full py-2 text-sm 2xl:text-base flex justify-center items-center gap-1.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M8.05589 3.62866H4.92486C4.50966 3.62866 4.11147 3.7936 3.81788 4.08719C3.52429 4.38078 3.35935 4.77897 3.35935 5.19417V14.5872C3.35935 15.0024 3.52429 15.4006 3.81788 15.6942C4.11147 15.9878 4.50966 16.1528 4.92486 16.1528H14.3179C14.7331 16.1528 15.1313 15.9878 15.4249 15.6942C15.7185 15.4006 15.8834 15.0024 15.8834 14.5872V11.4562M9.6214 9.89071L15.8834 3.62866M15.8834 3.62866V7.54244M15.8834 3.62866H11.9697"
                          stroke="#000000"
                          stroke-width="1.56551"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      View Profile{" "}
                    </button>
                  </div>

                  <div className="h-[1px] bg-[#F3F3F3]"></div>

                  <div className="block mx-1 text-black my-1 rounded-[5px] hover:bg-[#EEEEEE] w-[95%] cursor-pointer">
                    <button
                      onClick={() => signOut()}
                      className="w-full py-2 pr-6 text-sm 2xl:text-base flex justify-center items-center gap-1.5"
                    >
                      <LogOut className="size-4" />
                      <div>Logout</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      ) : null}
    </>
  );
}
