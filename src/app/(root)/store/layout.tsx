import { CombinedContainer } from "@/components/container/container";
import StoreNavbar from "./_components/store-navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CombinedContainer>
      <div className="w-full h-full flex flex-col relative">
        <StoreNavbar />
        <div className="flex-1 overflow-y-auto ">{children}</div>
      </div>
    </CombinedContainer>
  );
}
