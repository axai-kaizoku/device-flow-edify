import { CombinedContainer } from "@/components/container/container";
import dynamic from "next/dynamic";

const TabDisplay = dynamic(() => import("./TabDisplay"), { ssr: false });

export default async function Assets() {

  try {
    return (
      <CombinedContainer title="Assets">
        <TabDisplay/>
      </CombinedContainer>
    );
  } catch (error) {
    console.error("Error fetching devices:", error);
    return (
      <CombinedContainer title="Assets">
        <div className="text-red-500">
          Failed to load devices. Please try again later.
          <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}
