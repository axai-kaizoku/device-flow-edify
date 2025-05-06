import { CombinedContainer } from "@/components/container/container";
import { Metadata } from "next";
import { AiAgentsMain } from "./_components/main";

export const metadata: Metadata = {
  title: "AI Agents",
};

export default function Page() {
  return (
    <CombinedContainer title="Assets">
      <AiAgentsMain />
    </CombinedContainer>
  );
}
