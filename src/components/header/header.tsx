"use client";
import CreateDevice from "@/app/(root)/assets/_components/addDevices/_components/create-device";
import ReAssign from "@/app/(root)/assets/_components/re-assign";
import { Props } from "@/app/(root)/layout";
import CreateUser from "@/app/(root)/people/_components/create-user";
import { login } from "@/app/store/authSlice";
import ViewProfileIcon from "@/icons/ViewProfileIcon";
import {
  PlusSignIcon,
  RefreshIcon,
  Settings02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function Header({ session }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // console.log(session);
    if (parseInt(localStorage?.getItem("employee-count")) >= 2) {
      return;
    } else if (session?.user?.user?.employeeCount === 0) {
      localStorage.setItem("employee-count", "0");
      router.push("/onboarding");
    }
  }, [session?.user?.user?.employeeCount]);

  const handleMouseEnter = (href: string) => {
    setIsHovered(true);
    router.prefetch(href); // Prefetch the route on hover
  };
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Tracks user input
  const [isFocused, setIsFocused] = useState(false); // Tracks focus state

  const placeholders = ["Assets", "People", "Teams", "Issues"];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [animationState, setAnimationState] = useState(false);
  const pathname = usePathname();

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

  const pathParts = pathname.split("/").filter(Boolean);
  const pageName =
    pathname === "/" ? "Dashboard" : pathParts[0].replace(/-/g, " ");

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

  const handleLogout = () => {
    signOut();
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <>
      {session ? (
        <header className="bg-white border border-b border-t-0 border-l-0 border-r-0  top-0 font-gilroyRegular py-12 w-full h-14 bg-transparent backdrop-blur-3xl z-20 flex justify-between items-center px-12 pl-4">
          {/* Logo Section */}
          {/* <div
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
          </div> */}

          <h1 className="font-gilroyMedium  w-40 capitalize text-base text-[#c8c8c8]">
            {pageName}
          </h1>

          {/* Middle Search and Actions */}
          <div className="flex justify-center items-center ">
            <div className="flex items-center gap-x-2 bg-transparent  bg-opacity-90  px-1 py-1">
              {/* Search Bar */}
              <div className="bg-transparent overflow-hidden flex justify-between items-center border border-[rgba(0,0,0,0.2)] rounded-md px-2 py-1.5">
                <div className="flex gap-2 items-center">
                  <Search className=" size-[1.16rem]" />
                  <input
                    type="text"
                    placeholder={`Search ${currentPlaceholder}...`}
                    onChange={(e) => setInputValue(e.target.value)} // Update input value
                    onFocus={() => setIsFocused(true)} // Mark as focused
                    onBlur={() => setIsFocused(false)} // Remove focus
                    className={`flex-grow bg-transparent outline-none text-black placeholder-black placeholder:font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 ${
                      !isFocused && inputValue === "" && animationState
                        ? "animate-slide-up"
                        : ""
                    }`}
                  />
                </div>

                {/* <KBarIcon.kbar_icon /> */}
              </div>
              {/* {isLoading && <div>Searching…</div>}
              {isError && <div>Error: {error.message}</div>}
              {!isLoading && !isError && searchData && (
                <pre>{JSON.stringify(searchData, null, 2)}</pre>
              )} */}
              {/* Action Buttons */}
              {session?.user?.user?.role === 2 ? (
                <>
                  {" "}
                  <CreateDevice>
                    <div className="flex gap-x-1.5 cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)]  p-2 px-3  hover:bg-black hover:text-white hover:border-white group">
                      <HugeiconsIcon
                        icon={PlusSignIcon}
                        className="size-4 lg:size-3.5 2xl:size-4  group-hover:text-white"
                        strokeWidth={2.5}
                      />
                      <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                        Add Device
                      </div>
                    </div>
                  </CreateDevice>
                  <ReAssign>
                    <div className="flex gap-x-1.5 cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)]  p-2 px-3  hover:bg-black hover:text-white hover:border-white group">
                      <HugeiconsIcon
                        icon={RefreshIcon}
                        className="size-4 lg:size-3.5 2xl:size-4  group-hover:text-white"
                        strokeWidth={2.5}
                      />

                      <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                        Reassign
                      </div>
                    </div>
                  </ReAssign>
                  <CreateUser>
                    <div className="flex gap-x-1.5 cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)] p-2 px-3 gap-1 hover:bg-black hover:text-white hover:border-white group">
                      <HugeiconsIcon
                        icon={UserIcon}
                        className="size-4 lg:size-3.5 2xl:size-4  group-hover:text-white"
                        strokeWidth={2.25}
                      />
                      <div className=" group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                        Add Employee
                      </div>
                    </div>
                  </CreateUser>{" "}
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Right Icons Section */}
          <div className="flex items-center space-x-4">
            {/* Settings Icon */}
            {session?.user?.user?.role === 2 && (
              <button
                onClick={() => router.push("/settings")}
                className=" bg-white hover:bg-black rounded-full hover:text-white flex items-center justify-center p-2"
                onMouseEnter={() => {
                  handleMouseEnter("/settings");
                }}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* <Settings className="size-5" /> */}
                <HugeiconsIcon icon={Settings02Icon} className="size-6" />
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
                  <HugeiconsIcon icon={UserIcon} className="size-6" />
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
                        <ViewProfileIcon />
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
                className="p-2 bg-white hover:bg-black hover:text-white flex items-center justify-center rounded-full cursor-pointer mx-auto"
                onClick={handleLogout}
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
