import { CombinedContainer } from "@/components/container/container";
import React from "react";
import { getIssueById, Issues } from "@/server/issueActions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import IssueSection from "./_components/issue-main";

interface IssuePageProps {
  params: { id: string };
}

async function SingleIssue({ params }: IssuePageProps) {
  try {
    const data: Issues = await getIssueById(params.id);
    return (
      <CombinedContainer title="Issue Details">
        <div className="flex flex-col gap-3 pt-[10px]">
          <div className="flex justify-between items-center">
            <div className="text-[#7F7F7F] font-gilroySemiBold text-lg">
              Issues <span className=" text-black">(ID: {data?._id})</span>
            </div>
            {/* <div className="flex gap-3">
              <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
                <ChevronLeft className="text-[#6C6C6C]" />
              </div>
              <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
                <ChevronRight className="text-[#6C6C6C]" />
              </div>
            </div> */}
          </div>

          <IssueSection data={data} />
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    <CombinedContainer title="Issue Details">
      FAILED TO FETCH DATA
    </CombinedContainer>;
  }
}

export default SingleIssue;
