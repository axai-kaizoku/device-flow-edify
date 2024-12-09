import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import { ScreenSize } from "@/components/utils/screen-size";
import KbarWrapper from "./KbarWrapper";
import { getSession } from "@/server/helper";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "DeviceFlow by Edify",
  description: "A better way to manage assets in orgs",
};

const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/gilroy/Gilroy-Thin.ttf",
      weight: "100", // font-thin
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-UltraLight.ttf",
      weight: "200", // font-extralight
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Light.ttf",
      weight: "300", // font-light
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Regular.ttf",
      weight: "400", // font-normal
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Medium.ttf",
      weight: "500", // font-medium
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-SemiBold.ttf",
      weight: "600", // font-semibold
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Bold.ttf",
      weight: "700", // font-bold
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-ExtraBold.ttf",
      weight: "800", // font-extrabold
      style: "normal",
    },
    {
      path: "../../public/fonts/gilroy/Gilroy-Heavy.ttf",
      weight: "900", // font-black
      style: "normal",
    },
  ],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const userRole: number | undefined = session?.user.role;

  return (
    <html lang="en">
      <body className={gilroy.className}>
        <KbarWrapper userRole={userRole} /> {/* Render KbarWrapper here */}
        <Providers>
          <ScreenSize />
          {children}
        </Providers>
      </body>
    </html>
  );
}
