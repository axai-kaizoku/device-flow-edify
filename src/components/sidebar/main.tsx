"use client";
import { SIDEBAR } from "@/constants";
import { ToggleTheme } from "../utils/toggle-theme";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import SidebarItem from "./sidebar-item";
import { Session } from "next-auth";
import { ChevronLeft } from "lucide-react";

type Props = {
  session: Session;
};

export default function SidebarMain({ session }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="flex flex-col relative mx-auto items-center justify-start min-h-screen bg-transparent">
      {session?.user.role === 2 ? (
        <>
          <div className="absolute top-3 flex flex-col mx-auto justify-between gap-8 w-full cursor-pointer">
            {pathname !== "/" ? (
              <div
                className="bg-white backdrop-blur-sm dark:bg-gray-800 hover:bg-black hover:text-white
							w-10 h-10 flex items-center justify-center rounded-full p-2 mb-4"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => {
                  router.back();
                }} // Center align the button
              >
                <ChevronLeft />
              </div>
            ) : (
              <div></div>
            )}

            <div className="flex flex-col gap-2 mx-auto">
              {SIDEBAR.AdminPages.map((page, i) => (
                <SidebarItem
                  href={page.path}
                  label={page.label}
                  isActive={
                    page.path === "/" // Special case for dashboard
                      ? pathname === "/"
                      : pathname.startsWith(page.path)
                  }
                  key={page.label}
                />
              ))}

              {SIDEBAR.Functions.map((page, i) => (
                <SidebarItem
                  href={page.path}
                  label={page.label}
                  isActive={
                    page.path === "/" // Special case for dashboard
                      ? pathname === "/"
                      : pathname.startsWith(page.path)
                  }
                  key={page.label}
                />
              ))}
            </div>

            <div className="">
              <ToggleTheme />
            </div>
            {/* <div>
						    <div
								onClick={() => signOut()}
								className="w-full flex justify-between cursor-pointer text-sm">
								<div className={` w-[2%] rounded-e`} />
								<div className={` p-4 rounded w-[78%] flex gap-4 items-center`}>
									<Image
										src="/media/sidebar/logout.svg"
										alt="Logout"
										width={20}
										height={20}
										className="object-contain"
									/>
									<div>Logout</div>
								</div>
								<div className="w-[1%]" />
							</div>
						</div> */}
            {/* <ToggleTheme/> */}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-between h-full w-full">
            <div>
              {SIDEBAR.UserPages.map((page, i) => (
                <SidebarItem
                  href={page.path}
                  label={page.label}
                  isActive={
                    page.path === "/" // Special case for dashboard
                      ? pathname === "/"
                      : pathname.startsWith(page.path)
                  }
                  key={page.label}
                />
              ))}
            </div>
            {/* <div>
              <div
                onClick={() => signOut()}
                className="w-full flex justify-between bg-black cursor-pointer text-sm"
              >
                <div className={` w-[2%] rounded-e`} />
                <div className={` p-4 rounded w-[78%] flex gap-4 items-center`}>
                  <div>Logout</div>
                </div>
                <div className="w-[1%]" />
              </div>
            </div> */}
          </div>
        </>
      )}
    </section>
  );
}
