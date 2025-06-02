import { CombinedContainer } from "@/components/container/container";
import { Metadata } from "next";
// import { AiAgentsMain } from "./_components/_main";
import { AiAgentsMain } from "./_components/main";

export const metadata: Metadata = {
  title: "AI Agents",
};

// export default function Page() {
//   return (
//     <CombinedContainer title="Assets">
//       <div className="block h-screen">
//         <AiAgentsMain />
//       </div>
//     </CombinedContainer>
//   );
// }

export default function Page() {
  return <AiAgentsMain />;
}
