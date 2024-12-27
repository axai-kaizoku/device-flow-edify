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
    <div className="flex flex-col h-full min-h-screen overflow-hidden bg-[url('/media/BG.svg')] bg-cover bg-top bg-fixed">
      {/* Header Section */}
      <div className="absolute inset-0 bg-white opacity-70 backdrop-blur-lg z-[-1]" />

      <Header session={session} />
      <div className="h-14 pointer-events-none w-full" />

      {/* Main Content Section */}
      <div className="flex flex-grow h-[calc(100vh-9rem)] w-full overflow-hidden">
        {/* Sidebar */}
        <div className="fixed mt-14 left-0 w-36 h-[calc(100vh-4rem)] bg-transparent">
          <Sidebar session={session} />
        </div>

        {/* Main Content */}
        <div className="ml-36 mt-4 w-full">
          <div className="h-8 pointer-events-none w-full" />
          {children}
        </div>
      </div>
    </div>
  );
}
