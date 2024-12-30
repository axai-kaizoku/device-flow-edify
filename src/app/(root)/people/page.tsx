import { CombinedContainer } from "@/components/container/container";
import dynamic from "next/dynamic";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
const TabDisplay = dynamic(() => import("./TabDisplay"), { ssr: false });

export default async function Users() {
  // const userData = useSelector((state: RootState) => state.auth.userData);
  // const userRole = userData?.role;
  try {
    return (
      <CombinedContainer title="Users">
        <TabDisplay/>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="People">
        <div className="text-red-500">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}
