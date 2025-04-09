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
      {/* <div className="bg-[url('/media/BG.svg')] bg-cover bg-top bg-fixed h-full min-h-screen"></div> */}
      {/* <div className="absolute inset-0 bg-black opacity-[3%] backdrop-blur-lg z-10" /> */}
      <div
        className="flex flex-row h-full min-h-screen  fixed z-20"
        style={{ width: "100%" }}
      >
        {/* Main Content Section */}
        <div className="flex flex-grow  w-full  ">
          {/* Sidebar */}
          <div className="fixed top-0 z-30 left-0 w-56 h-full bg-transparent border bg-white">
            <Sidebar session={session} />
          </div>

          <div className="flex flex-col w-full h-full ml-56">
            {/* Header Section */}
            <Header session={session} />

            {/* Main Content */}
            <div className=" w-full z-10 bg-[#FAFBFC] h-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
