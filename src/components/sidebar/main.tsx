"use client";

import { Props } from "@/app/(root)/layout";
import { cn } from "@/lib/utils";
import {
  ArrowDown01Icon,
  ChartRelationshipIcon,
  DashboardSquare01Icon,
  File02Icon,
  Home12Icon,
  SearchVisualIcon,
  SmartPhone01Icon,
  Store02Icon,
  Ticket02Icon,
  UserGroupIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "../buttons/Button";
import { FeedbackDialog } from "./feedback.dialog";

export default function SidebarNavigation({ session }: Props) {
  const [storeExpanded, setStoreExpanded] = useState(false);
  const [integrationsExpanded, setIntegrationsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes("integrations")) {
      setIntegrationsExpanded(true);
    }
  }, []);

  const links = [
    {
      href: "/",
      label: "Dashboard",
      icon: (
        <HugeiconsIcon icon={DashboardSquare01Icon} className="mr-3 h-5 w-5 " />
      ),
    },
    {
      href: "/store",
      label: "Store",
      icon: <HugeiconsIcon icon={Store02Icon} className="mr-3 h-5 w-5" />,
      externalUrl: "https://edify.club",
    },
  ];

  const assetsLinks = [
    {
      href: "/assets",
      label: "Assets",
      icon: <HugeiconsIcon icon={SmartPhone01Icon} className="mr-3 size-5" />,
    },
    {
      href: "/tickets",
      label: "Tickets",
      icon: <HugeiconsIcon icon={Ticket02Icon} className="mr-3 size-5" />,
    },
    {
      href: "/diagnostic",
      label: "Diagnostics",
      icon: <HugeiconsIcon icon={SearchVisualIcon} className="mr-3 size-5" />,
    },
    {
      href: "/integrations",
      label: "Integrations",
      icon: (
        <HugeiconsIcon icon={ChartRelationshipIcon} className="mr-3 size-5" />
      ),
    },
  ];

  const peopleLinks = [
    {
      href: "/people",
      label: "People",
      icon: <HugeiconsIcon icon={UserMultipleIcon} className="mr-3 size-5" />,
    },
    {
      href: "/teams",
      label: "Team",
      icon: <HugeiconsIcon icon={UserGroupIcon} className="mr-3 size-5" />,
    },
  ];

  const userLinks = [
    {
      href: "/",
      label: "Home",
      icon: <HugeiconsIcon icon={Home12Icon} className="mr-3 size-5" />,
    },
    {
      href: "/team",
      label: "Team",
      icon: <HugeiconsIcon icon={UserGroupIcon} className="mr-3 size-5" />,
    },

    {
      href: "/devices",
      label: "Devices",
      icon: <HugeiconsIcon icon={SmartPhone01Icon} className="mr-3 size-5" />,
    },
    {
      href: "/diagnostic",
      label: "Diagnostics",
      icon: <HugeiconsIcon icon={SearchVisualIcon} className="mr-3 size-5" />,
    },
    {
      href: "/tickets",
      label: "Tickets",
      icon: <HugeiconsIcon icon={Ticket02Icon} className="mr-3 size-5" />,
    },
  ];

  return (
    <div className="flex h-screen relative">
      <div className="w-64 bg-white border-r h-full">
        <div className="p-4">
          <div className="flex items-center mb-6 pl-2">
            <img
              src="/media/Deviceflow.png"
              alt="Logo"
              className="2xl:w-[140px] w-[120px] 2xl:h-8 h-7"
            />
          </div>
          {session?.user?.user?.role !== 1 ? (
            <nav className="space-y-1.5">
              {links.map((link, index) => {
                // const isActive = pathname.startsWith(link.href);
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                // (link.href === "/" && pathname === "/") ||
                // (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <div key={index}>
                    {link.externalUrl ? (
                      <Link
                        href={link.externalUrl}
                        target="_blank"
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-gilroyMedium rounded-md cursor-pointer",
                          "hover:bg-gray-50"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        onMouseEnter={() => router.prefetch(link.href)}
                        onClick={
                          link.href === "/store"
                            ? () => setStoreExpanded(!storeExpanded)
                            : undefined
                        }
                        className={cn(
                          "flex items-center px-3 py-2 text-sm font-gilroyMedium rounded-md",
                          isActive
                            ? "bg-gray-100 hover:bg-gray-100"
                            : "hover:bg-gray-50"
                        )}
                      >
                        {link.icon}
                        {link.label}
                        {link.href === "/store" && (
                          <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            className={cn(
                              "ml-auto transition-transform duration-150 size-4",
                              "-rotate-90"
                              // storeExpanded ? "rotate-0" : "-rotate-90"
                            )}
                          />
                        )}
                      </Link>
                    )}

                    {/* {link.href === "/store" && storeExpanded && (
                      <Link
                        href="/orders"
                        onMouseEnter={() => router.prefetch("/orders")}
                        className={cn(
                          "flex items-center pl-11 py-2 my-1 text-sm font-gilroyMedium rounded-md text-gray-900",
                          pathname.includes("orders")
                            ? "bg-gray-100 hover:bg-gray-100"
                            : "hover:bg-gray-50"
                        )}
                      >
                        Orders
                      </Link>
                    )} */}
                  </div>
                );
              })}

              <div className="pt-4">
                <p className="px-3 text-sm font-gilroyMedium text-gray-400 tracking-wider">
                  Management
                </p>
                <div className="mt-2 space-y-1.5">
                  {assetsLinks?.map((link, index) => {
                    // const isActive = pathname === link.href;
                    // const isActive = pathname.startsWith(link.href);
                    const isIntegrationsParent = link.href === "/integrations";
                    const isChildOfIntegrations =
                      pathname.startsWith("/integrations/") &&
                      !pathname.endsWith("/integrations");

                    const isActive =
                      !isIntegrationsParent && pathname.startsWith(link.href);
                    return (
                      <div key={index}>
                        <Link
                          href={link.href}
                          onMouseEnter={() => router.prefetch(link.href)}
                          onClick={
                            link.href === "/integrations"
                              ? () =>
                                  setIntegrationsExpanded(!integrationsExpanded) // Add state for integrations
                              : undefined
                          }
                          className={cn(
                            "flex items-center px-3 py-2 text-sm font-gilroyMedium rounded-md",
                            isActive
                              ? "bg-gray-100 hover:bg-gray-100"
                              : "hover:bg-gray-50"
                          )}
                        >
                          {link.icon}
                          {link.label}
                          {(link.label === "Tickets" ||
                            link.label === "Assets") && (
                            <div className="bg-[#ECFDF3] flex justify-center items-center ml-2 py-1 px-2 rounded-md">
                              <div className="inset-0 flex items-center justify-center">
                                <span className="text-xs text-[#2E8016] font-gilroyMedium">
                                  New
                                </span>
                              </div>
                            </div>
                          )}

                          {isIntegrationsParent && (
                            <HugeiconsIcon
                              icon={ArrowDown01Icon}
                              className={cn(
                                "ml-auto transition-transform duration-150 size-4",
                                integrationsExpanded ? "rotate-0" : "-rotate-90"
                              )}
                            />
                          )}
                        </Link>

                        {isIntegrationsParent && integrationsExpanded && (
                          <>
                            <Link
                              onMouseEnter={() =>
                                router.prefetch("/integrations/discover")
                              }
                              href="/integrations/discover"
                              className={cn(
                                "flex items-center pl-11 py-2 my-1 text-sm font-gilroyMedium rounded-md text-gray-900",
                                pathname.includes("discover")
                                  ? "bg-gray-100 hover:bg-gray-100"
                                  : "hover:bg-gray-50"
                              )}
                            >
                              Discover
                            </Link>
                            <Link
                              onMouseEnter={() =>
                                router.prefetch("/integrations/installed")
                              }
                              href="/integrations/installed"
                              className={cn(
                                "flex items-center pl-11 py-2 my-1 text-sm font-gilroyMedium rounded-md text-gray-900",
                                pathname.includes("installed")
                                  ? "bg-gray-100 hover:bg-gray-100"
                                  : "hover:bg-gray-50"
                              )}
                            >
                              Installed
                            </Link>
                          </>
                        )}
                      </div>
                    );
                  })}

                  <Link
                    href={"/ai-agents"}
                    onMouseEnter={() => router.prefetch("/ai-agents")}
                    className="flex flex-col"
                  >
                    <div
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-gilroyMedium rounded-md text-gray-900 cursor-pointer",
                        pathname === "/ai-agents"
                          ? "bg-gray-100 hover:bg-gray-100"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <img
                        src="/media/sidebar/ai-agents.svg"
                        alt="icon"
                        className="mr-3 size-5"
                      />
                      <span>AI Agents</span>
                    </div>

                    {/* <div className="relative w-full  -ml-2">
                      <img
                        src="/media/sidebar/coming-soon.svg"
                        alt="coming-soon"
                        className="w-full h-8"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pt-1.5">
                        <span className="text-[10px] text-[#2E8016] font-gilroyMedium">
                          New Feature
                        </span>
                      </div>
                    </div> */}
                  </Link>
                </div>
              </div>

              <div className="pt-4">
                <p className="px-3 text-sm font-gilroyMedium text-gray-400  tracking-wider">
                  People
                </p>
                <div className="mt-2 space-y-1.5">
                  {peopleLinks?.map((link, index) => (
                    <SidebarNavItem key={index} {...link} />
                  ))}
                </div>
              </div>
            </nav>
          ) : (
            <nav className="space-y-1.5">
              {userLinks.map((link, index) => {
                return (
                  <div key={index}>
                    <SidebarNavItem key={index} {...link} />
                  </div>
                );
              })}
            </nav>
          )}
        </div>
      </div>
      <div className="absolute w-44 bottom-6 left-5">
        <FeedbackDialog>
          <div
            className={buttonVariants({
              variant: "primary",
              className: "w-fit px-0",
            })}
          >
            Feedback
          </div>
        </FeedbackDialog>
      </div>
    </div>
  );
}

const SidebarNavItem = (props: {
  href: string;
  label: string;
  icon: JSX.Element;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Link
      href={props.href}
      onMouseEnter={() => router.prefetch(props.href)}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-gilroyMedium rounded-md text-gray-900",
        // pathname===props.href
        props.href === "/" && pathname === "/"
          ? "bg-gray-100 hover:bg-gray-100"
          : props.href !== "/" && pathname.startsWith(props.href)
          ? "bg-gray-100 hover:bg-gray-100"
          : "hover:bg-gray-50"
      )}
    >
      {props.icon}
      {props.label}
      {props.label === "Tickets" && (
        <div className="bg-[#ECFDF3] flex justify-center items-center ml-2 py-1 px-2 rounded-md">
          <div className="inset-0 flex items-center justify-center">
            <span className="text-xs text-[#2E8016] font-gilroyMedium">
              New
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};
