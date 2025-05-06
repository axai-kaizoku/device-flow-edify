import { CombinedContainer } from "@/components/container/container";
import NewPage from "./new-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issues",
};

function Issues() {
  return (
    <CombinedContainer title="Issues">
      <NewPage />
    </CombinedContainer>
  );
}

export default Issues;
