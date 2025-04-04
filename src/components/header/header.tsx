"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  LogOut,
  Plus,
  RefreshCw,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Props } from "@/app/(root)/layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/store/authSlice";
import CreateUser from "@/app/(root)/people/_components/create-user";
import CreateDevice from "@/app/(root)/assets/_components/addDevices/_components/create-device";
import { signOut } from "next-auth/react";
import { Icons } from "../icons";
import ReAssign from "@/app/(root)/assets/_components/re-assign";
import KBarIcon from "@/icons/KBarIcons";
import ViewProfileIcon from "@/icons/ViewProfileIcon";

export default function Header({ session }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("employee-count") === "2") {
      return;
    } else if (session?.user.user.employeeCount === 0) {
      sessionStorage.setItem("employee-count", "0");
      router.push("/onboarding");
    }
  }, [session?.user.user.employeeCount]);

  const handleMouseEnter = (href: string) => {
    setIsHovered(true);
    router.prefetch(href); // Prefetch the route on hover
  };
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
      // @ts-ignore
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
            firstName: session.user.user.firstName!,
            lastName: session.user.user.lastName!,
            employeeCount: session.user.user.employeeCount ?? 0,
            designation: session.user.user.designation,
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
        <header className="fixed  top-0 left-0 right-0 font-gilroyRegular py-12 w-full h-14 bg-transparent backdrop-blur-3xl z-20 flex justify-between items-center px-12 ">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
            onMouseEnter={() => handleMouseEnter("/")}
            onMouseLeave={() => setIsHovered(false)}
          >
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
                <div className="flex gap-2 items-center">
                  <Search className="text-gray-500 size-[1.16rem]" />
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

                <KBarIcon.kbar_icon />
              </div>

              {/* Action Buttons */}
              {session?.user?.user?.role === 2 ? (
                <>
                  {" "}
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
                  <ReAssign>
                    <div className="flex cursor-pointer gap-2 items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black group">
                      <div className="rounded-full border border-gray-400 p-1 border-dashed group-hover:border-white">
                        <RefreshCw className="size-4 lg:size-3.5 2xl:size-4 text-gray-500 group-hover:text-white" />
                      </div>

                      <div className="text-gray-500 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                        Re/Assign
                      </div>
                    </div>
                  </ReAssign>
                  <CreateUser>
                    <div className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black group hover:text-white hover:border-white">
                      <div className="rounded-full p-1 border border-gray-400 border-dashed group-hover:border-white group">
                        <UserRound className="size-4 lg:size-3.5 2xl:size-4 group-hover:text-white text-gray-600" />
                      </div>
                      <div className="text-gray-500 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                        Add Employee
                      </div>
                    </div>
                  </CreateUser>{" "}
                </>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/devices");
                  }}
                >
                  <div className="flex gap-2 cursor-pointer items-center rounded-full border border-gray-400 p-[6px] pr-[12px] hover:bg-black group hover:text-white hover:border-white">
                    <div className="rounded-full p-1 border border-gray-400 border-dashed group-hover:border-white group">
                      <AlertTriangle className="size-4 lg:size-3.5 2xl:size-4 group-hover:text-white text-gray-600" />
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
            {session?.user?.user?.role === 2 && (
              <button
                onClick={() => router.push("/settings")}
                className=" bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full p-2"
                onMouseEnter={() => {
                  handleMouseEnter("/settings");
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Settings className="size-5" />
              </button>
            )}

            {/* Query Icon */}
            {/* <button className=" bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full p-2">
              <CircleHelp className="size-5" />
            </button> */}

            {/* Profile Icon */}
            {session?.user?.user?.role !== 1 ? (
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
                    className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg pt-0.5 pb-0.5 font-gilroyMedium"
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
                        <ViewProfileIcon/>
                        View Profile{" "}
                      </button>
                    </div>

                    <div className="h-[1px] bg-[#F3F3F3]"></div>

                    <div className="block mx-1 text-black my-1 rounded-[5px] hover:bg-[#EEEEEE] w-[95%] cursor-pointer">
                      <button
                        onClick={() => 
                          
                          // signOut({redirect: true,callbackUrl: "https://deviceflow.ai"})
                          signOut()
                           
                          }
                        className="w-full py-2 pr-6 text-sm 2xl:text-base flex justify-center items-center gap-1.5"
                      >
                        <LogOut className="size-4" />
                        <div>Logout</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="p-2 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full cursor-pointer"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => 
                  // signOut({redirect: true,callbackUrl: "https://deviceflow.ai"})
                  signOut()

                } // Center align the button
              >
                <LogOut className="w-5 h-5" />
              </div>
            )}
          </div>
        </header>
      ) : null}
    </>
  );
}
