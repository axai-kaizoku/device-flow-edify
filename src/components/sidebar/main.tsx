"use client";
import { SIDEBAR } from "@/constants";
import { ToggleTheme } from "../utils/toggle-theme";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import SidebarItem from "./sidebar-item";
import { ChevronLeft, LogOut } from "lucide-react";
import { Props } from "@/app/(root)/layout";

export default function SidebarMain({ session }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="flex flex-col z-[1000] relative mx-auto items-center justify-start min-h-screen bg-transparent">
      {session?.user.role === 2 ? (
        <>
          <div className="absolute top-0 flex flex-col mx-auto justify-between gap-8 w-full">
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

              {/* {SIDEBAR.Functions.map((page, i) => (
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
              ))} */}
            </div>

            <div className="flex gap-2 flex-col">
              <button
                className="bg-white backdrop-blur-sm dark:bg-gray-800 hover:bg-black hover:text-white
                    w-10 h-10 flex items-center justify-center rounded-full p-2"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => {
                  signOut()

                }}
              >
                <LogOut className="w-5 h-5" />
              </button>

              <ToggleTheme />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-0 flex flex-col mx-auto justify-between gap-8 w-full">
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

            <div className="flex gap-2 flex-col">
              <ToggleTheme />

              <button
                className="bg-white backdrop-blur-sm dark:bg-gray-800 hover:bg-black hover:text-white
                    w-10 h-10 flex items-center justify-center rounded-full p-2"
                style={{ marginLeft: "auto", marginRight: "auto" }}
                onClick={() => signOut()}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
