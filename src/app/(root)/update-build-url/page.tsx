import { CombinedContainer } from "@/components/container/container";
import { BaseUrlManager } from "@/components/base-url-manager";

export default function Page() {
  return (
    <CombinedContainer>
      <div className="container mx-auto py-8">
        <BaseUrlManager />
      </div>
    </CombinedContainer>
  );
}
