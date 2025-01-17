import { CombinedContainer } from "@/components/container/container";
import TabDisplay from "./TabDisplay";
import NotFound from "@/app/not-found";

function Issues() {
  try {
    return (
      <CombinedContainer title="Issues">
        <div className="flex flex-col pt-[14px]">
          <h1 className="text-gray-400 font-gilroyMedium 2xl:text-lg text-base">
            Issues
          </h1>
          <h1 className="2xl:text-3xl text-2xl font-gilroyBold pt-[10px]">
            Manage Issues
          </h1>
          <TabDisplay />
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Issues">
        <NotFound />
      </CombinedContainer>
    );
  }
}

export default Issues;
