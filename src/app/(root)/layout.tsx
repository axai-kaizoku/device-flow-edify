import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/server/helper";
import { Session } from "next-auth";

export type Props = {
  session: Session | null;
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div className="flex flex-col h-full min-h-screen bg-[url('/media/BG.svg')] bg-cover bg-top bg-fixed">
      {/* Header Section */}

      <div className="absolute inset-0 bg-white opacity-70 backdrop-blur-lg z-[-1]" />

      <Header session={session} />

      {/* Main Content Section */}
      <div className="flex flex-grow mt-16">
        {/* Sidebar */}
        <div className="fixed mt-14 left-0 w-36 h-[calc(100vh-4rem)] bg-transparent">
          <Sidebar session={session} />
        </div>

        {/* Main Content */}
        <div className="ml-36 mt-4 w-full">{children}</div>
      </div>
    </div>
  );
}
