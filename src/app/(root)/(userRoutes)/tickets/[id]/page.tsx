import { Metadata } from "next";
import SingleIssue from "./main";

export const metadata: Metadata = {
  title: "Issues",
};

export default function Page({ params }: { params: { id: string } }) {
  return <SingleIssue params={params} />;
}
