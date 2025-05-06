import { Metadata } from "next";
import ReportsMain from "./main";

export const metadata: Metadata = {
  title: "Reports",
};

export default function Page() {
  return <ReportsMain />;
}
