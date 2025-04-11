import { PropsWithChildren } from "react";
import { CombinedContainer } from "@/components/container/container";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <CombinedContainer title="Assets" className="mt-16 ml-2 ">
      {children}
    </CombinedContainer>
  );
}
