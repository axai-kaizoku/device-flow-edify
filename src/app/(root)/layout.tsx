import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/server/helper";
import type { Session } from "next-auth";
import { LandingPage } from "./_landing-page";

export type Props = {
  session: Session | null;
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return (
      <div className="w-full min-h-screen">
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="bg-[url('/media/BG.svg')] bg-cover bg-top bg-fixed h-full min-h-screen"
      ></div>
      <div className="absolute inset-0 bg-black opacity-[3%] backdrop-blur-lg z-10" />
      <div
        className="flex flex-col h-full min-h-screen  fixed z-20 mt-1"
        style={{ top: 1, width: "100%" }}
      >
        {/* Header Section */}
        <Header session={session} />
        <div className="h-14 pointer-events-none w-full" />

        {/* Main Content Section */}
        <div className="flex flex-grow  w-full  h-[calc(100vh-9rem)]">
          {/* Sidebar */}
          <div
            className="fixed  mt-11 left-0 w-36 h-[calc(100vh-4rem)] bg-transparent"
            style={{ zIndex: 10 }}
          >
            <Sidebar session={session} />
          </div>

          {/* Main Content */}
          <div className="ml-36 mt-2 w-full z-10">
            <div className="h-8 pointer-events-none w-full" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
