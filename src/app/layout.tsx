import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";
import { ScreenSize } from "@/components/utils/screen-size";
import KbarWrapper from "./KbarWrapper";
import { getSession } from "@/server/helper";
import localFont from "next/font/local";
import InternetCheck from "./InternetCheck";

export const metadata: Metadata = {
  title: "DeviceFlow by Edify",
  description: "A better way to manage assets in orgs",
};

const gilroyThin = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-Thin.ttf",
  // weight: "100",
  display: "block",
  variable: "--font-gilroy-thin",
});

const gilroyExtraLight = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-UltraLight.ttf",
  // weight: "200",
  display: "block",

  variable: "--font-gilroy-extralight",
});

const gilroyLight = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-Light.ttf",
  // weight: "300",
  display: "block",

  variable: "--font-gilroy-light",
});

const gilroyRegular = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-Regular.ttf",
  // weight: "400",
  display: "block",

  variable: "--font-gilroy-regular",
});

const gilroyMedium = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-Medium.ttf",
  // weight: "500",
  display: "block",

  variable: "--font-gilroy-medium",
});

const gilroySemiBold = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-SemiBold.ttf",
  // weight: "100 1000",
  display: "block",
  variable: "--font-gilroy-semibold",
});

const gilroyBold = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-Bold.ttf",
  // weight: "700",
  display: "block",

  variable: "--font-gilroy-bold",
});

const gilroyExtraBold = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-ExtraBold.ttf",
  // weight: "800",
  display: "block",

  variable: "--font-gilroy-extrabold",
});

const gilroyBlack = localFont({
  src: "../../public/fonts/gilroy2/Gilroy-Heavy.ttf",
  // weight: "900",
  display: "block",

  variable: "--font-gilroy-black",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const userRole: number | undefined = session?.user.user.role;

  return (
    <html lang="en">
      <body
        className={`
          ${gilroyThin.variable} 
          ${gilroyExtraLight.variable} 
          ${gilroyLight.variable} 
          ${gilroyRegular.variable} 
          ${gilroyMedium.variable} 
          ${gilroySemiBold.variable} 
          ${gilroyBold.variable} 
          ${gilroyExtraBold.variable} 
          ${gilroyBlack.variable}
        `}
      >
        <KbarWrapper userRole={userRole} /> {/* Render KbarWrapper here */}
        <Providers>
          <ScreenSize />
          {children}
        </Providers>
        <InternetCheck />
      </body>
    </html>
  );
}
