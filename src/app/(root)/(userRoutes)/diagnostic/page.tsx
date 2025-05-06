import { Metadata } from "next";
import Diagonistic from "./main";

export const metadata: Metadata = {
  title: "Diagnostic",
};

export default function Page() {
  return <Diagonistic />;
}
