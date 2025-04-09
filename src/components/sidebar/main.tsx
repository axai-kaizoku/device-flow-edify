"use client";

import { useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ChartRelationshipIcon,
  File02Icon,
  Home12Icon,
  SearchVisualIcon,
  SmartPhone01Icon,
  Store02Icon,
  TvIssueIcon,
  UserGroupIcon,
  UserMultipleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Props } from "@/app/(root)/layout";
import { ChartPieSlice } from "./chart-pie.icon";

export default function SidebarNavigation({ session }: Props) {
  const [storeExpanded, setStoreExpanded] = useState(false);
  const [integrationsExpanded, setIntegrationsExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      href: "/",
      label: "Dashboard",
      icon: <ChartPieSlice className="mr-3 h-5 w-5" />,
    },
    {
      href: "/store",
      label: "Store",
      icon: <HugeiconsIcon icon={Store02Icon} className="mr-3 h-5 w-5" />,
    },
  ];

  const assetsLinks = [
    {
      href: "/assets",
      label: "Assets",
      icon: <HugeiconsIcon icon={SmartPhone01Icon} className="mr-3 size-5" />,
    },
    {
      href: "/issues",
      label: "Issues",
      icon: <HugeiconsIcon icon={TvIssueIcon} className="mr-3 size-5" />,
    },
    {
      href: "/diagonistic",
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
    {
      href: "/reports",
      label: "Reports",
      icon: <HugeiconsIcon icon={File02Icon} className="mr-3 size-5" />,
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
      href: "/diagonistic",
      label: "Diagnostics",
      icon: <HugeiconsIcon icon={SearchVisualIcon} className="mr-3 size-5" />,
    },
  ];

  return (
    <div className="flex  h-screen">
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <div className="flex items-center mb-6 pl-2">
            <img
              src="/media/Deviceflow.png"
              alt="Logo"
              className="2xl:w-[140px] w-[120px] 2xl:h-8 h-7"
            />
          </div>

          {session.user.user.role === 2 ? (
            <nav className="space-y-1.5">
              {links.map((link, index) => {
                const isActive =
                  pathname === link.href ||
                  (link.href === "/store" && pathname.includes("store")) ||
                  (link.href === "/integrations" &&
                    pathname.includes("integrations"));

                return (
                  <div key={index}>
                    <Link
                      href={link.href}
                      onMouseEnter={() => router.prefetch(link.href)}
                      onClick={
                        link.href === "/store"
                          ? () => setStoreExpanded(!storeExpanded)
                          : link.href === "/integrations"
                          ? () => setIntegrationsExpanded(!integrationsExpanded) // Add state for integrations
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
                            storeExpanded ? "rotate-0" : "-rotate-90"
                          )}
                        />
                      )}
                    </Link>
                    {link.href === "/store" && storeExpanded && (
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
                    )}
                  </div>
                );
              })}

              <div className="pt-4">
                <p className="px-3 text-sm font-gilroyMedium text-gray-400 tracking-wider">
                  Management
                </p>
                <div className="mt-2 space-y-1.5">
                  {assetsLinks?.map((link, index) => {
                    const isActive = pathname === link.href;
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

                          {link.href === "/integrations" && (
                            <HugeiconsIcon
                              icon={ArrowDown01Icon}
                              className={cn(
                                "ml-auto transition-transform duration-150 size-4",
                                integrationsExpanded ? "rotate-0" : "-rotate-90"
                              )}
                            />
                          )}
                        </Link>

                        {link.href === "/integrations" &&
                          integrationsExpanded && (
                            <>
                              <Link
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
        pathname.includes(props.href)
          ? "bg-gray-100 hover:bg-gray-100"
          : "hover:bg-gray-50"
      )}
    >
      {props.icon}
      {props.label}
    </Link>
  );
};
