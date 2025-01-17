import {
  Bug,
  Calendar,
  ChartColumnBig,
  LayoutDashboard,
  Settings,
  Settings2,
  ShoppingBag,
  Smartphone,
  Store,
  Upload,
  UserRound,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../icons";

type SidebarItemProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

const SidebarItem = ({ href, label, isActive }: SidebarItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsHovered(true);
    router.prefetch(href); // Prefetch the route on hover
  };

  return (
    <Link href={href} className="flex flex-col items-center justify-center">
      <div
        className="font-gilroyRegular group z-[1000] flex items-center justify-center rounded-full transition-all"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`${
            isActive
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-white backdrop-blur-sm dark:bg-gray-800"
          } w-10 h-10 flex items-center justify-center rounded-full p-2`}
        >
          {label === "Dashboard" ? (
            <LayoutDashboard className="w-5 h-5" />
          ) : label === "Teams" || label === "Team" ? (
            <Users className="w-5 h-5" />
          ) : label === "Assets" ? (
            <Smartphone className="w-5 h-5" />
          ) : label === "People" ? (
            <UserRound className="w-5 h-5" />
          ) : label === "Org Chart" ? (
            <ChartColumnBig className="w-5 h-5" />
          ) : label === "Store" ? (
            <Store className="w-5 h-5" />
          ) : label === "Orders" ? (
            <ShoppingBag className="w-5 h-5" />
          ) : label === "Reports" ? (
            !isActive ? <Icons.reports_icon className="size-5"/> : <Icons.reports_icon_white className="size-5"/>
          ) : label === "Onboarding" ? (
            <Upload className="w-5 h-5" />
          ) : label === "Issues" ? (
            !isActive ? <Icons.issue_icon className="size-5"/> : <Icons.issue_icon_white className="size-5"/>
          ) : label === "Settings" ? (
            <Wrench className="w-5 h-5" />
          // ) : label === "Profile" ? (
          //   <UserRound className="w-5 h-5" />
          ) : label === "Devices" ? (
            <Smartphone className="w-5 h-5" />
          ) : label === "Home" ? (
            <LayoutDashboard className="w-5 h-5" />
          ) : (
            <div />
          )}
        </div>

      </div>
      <div className="text-black text-xs font-gilroyMedium py-1 px-2 whitespace-nowrap">
        {label}
      </div>
    </Link>
  );
};

export default SidebarItem;
