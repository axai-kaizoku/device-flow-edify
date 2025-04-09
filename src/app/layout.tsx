// import "./globals.css";
import "./globals.min.css";
import type { Metadata } from "next";
import Providers from "@/providers";
import KbarWrapper from "./KbarWrapper";
import { getSession } from "@/server/helper";
import localFont from "next/font/local";
import InternetCheck from "./InternetCheck";

export const metadata: Metadata = {
  metadataBase: new URL("https://deviceflow.ai"),
  title: "DeviceFlow - Track and Optimize IT Asset Management | By Edify",
  description:
    "DeviceFlow by Edify is your comprehensive solution for tracking, managing, and optimizing IT assets. Gain actionable insights, improve efficiency, and reduce costs with our intuitive SaaS platform.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deviceflow.ai",
    title: "DeviceFlow - Track and Optimize IT Asset Management | By Edify",
    description:
      "DeviceFlow by Edify is your comprehensive solution for tracking, managing, and optimizing IT assets. Gain actionable insights, improve efficiency, and reduce costs with our intuitive SaaS platform.",
    siteName: "DeviceFlow - Track and Optimize IT Asset Management | By Edify",
    images: `https://deviceflow.ai/og_main.webp`,
  },
  twitter: {
    card: "summary_large_image",
    title: "DeviceFlow - Track and Optimize IT Asset Management | By Edify",
    description:
      "DeviceFlow by Edify is your comprehensive solution for tracking, managing, and optimizing IT assets. Gain actionable insights, improve efficiency, and reduce costs with our intuitive SaaS platform.",
    images: `https://deviceflow.ai/og_main.webp`,
  },
  icons: {
    icon: "/logo.png",
  },
};

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
  src: "../../public/fonts/gilroy2/Gilroy-Semibold.ttf",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const userRole: number | undefined = session?.user.user.role;

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`
          ${gilroyRegular.variable} 
          ${gilroyMedium.variable} 
          ${gilroySemiBold.variable} 
          ${gilroyBold.variable}
        `}
      >
        {/* {session?.user && <KbarWrapper userRole={userRole} />}{" "} */}
        <Providers>{children}</Providers>
        <InternetCheck />

        <div className="fixed bottom-4 right-4 z-[1000] flex h-12 w-12 items-center justify-center rounded-md border">
          <div className="block sm:hidden">sm</div>
          {/* Small screens (smaller than 640px) */}
          <div className="hidden sm:block md:hidden">md</div>
          {/* Medium screens (640px - 768px) */}
          <div className="hidden md:block lg:hidden">lg</div>
          {/* Large screens (768px - 1024px) */}
          <div className="hidden lg:block xl:hidden">xl</div>
          {/* Extra large screens (1024px - 1280px) */}
          <div className="hidden xl:block 2xl:hidden">2xl</div>
          {/* 2X large screens (1280px - 1536px) */}
          <div className="hidden 2xl:block">2xl+</div>
          {/* 2X large and above (1536px and up) */}
        </div>
      </body>
    </html>
  );
}
