import { CombinedContainer } from "@/components/container/container";
import NewPage from "./new-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets",
};

export default function Assets() {
  return (
    <CombinedContainer title="Assets">
      <NewPage />
    </CombinedContainer>
  );
}
