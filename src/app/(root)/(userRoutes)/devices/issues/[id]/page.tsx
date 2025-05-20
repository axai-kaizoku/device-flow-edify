import SingleIssue from "@/app/(root)/issues/[id]/main";

export default function Page({ params }: { params: { id: string } }) {
  return <SingleIssue params={params} />;
}
