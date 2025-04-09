import SidebarNavigation from "./main";
import SidebarMain from "./main";
import { Props } from "@/app/(root)/layout";

export default async function Sidebar({ session }: Props) {
  return <>{session && <SidebarNavigation session={session} />}</>;
}
