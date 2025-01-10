import SidebarMain from "./main";
import { Props } from "@/app/(root)/layout";

export default async function Sidebar({ session }: Props) {
  return <>{session && <SidebarMain session={session} />}</>;
}
