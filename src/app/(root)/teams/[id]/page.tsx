import { CombinedContainer } from "@/components/container/container";
import TeamTable from "./_components/team-table";
import { getTeamById, Team } from "@/server/teamActions";
import { DeleteTeam } from "./_components/delete-team";
import { getUsersByTeamId, User } from "@/server/userActions";
import { getSession } from "@/server/helper";
import { Plus, Search, Trash2 } from "lucide-react";
import CreateTeam from "../_components/create-team";

interface TeamPageProps {
  params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  try {
    const data: Team = await getTeamById(params.id);
    const users: User[] = await getUsersByTeamId(params.id);

    return (
      <CombinedContainer title="Teams">
        <div className="bg-white p-8 my-6 mx-8 rounded-3xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-5 items-center">
              <img
                src={data?.image}
                alt="team-image"
                className="w-24 h-24 object-cover rounded-full"
              />
              <div>
                <h1 className="text-2xl flex gap-6 items-center font-semibold text-black">
                  {data?.title}
                  <span className=" py-1 px-3 text-sm bg-green-100 text-green-600 rounded-full">
                    Active
                  </span>
                </h1>
                <p className="text-[#7C7C7C] text-lg font-medium">
                  {data?.description}
                </p>
                <p className="text-sm font-medium text-[#ADADAC]">
                  Reporting Manager:{" "}
                  <span className="font-semibold text-xl text-black">
                    Abhinav Prakash
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 pl-3 pr-12 py-2 border rounded-full text-gray-600 hover:text-black hover:border-black">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search teams"
                  className="focus:outline-none bg-transparent text-sm"
                />
              </div>
              <div className="flex cursor-pointer items-center gap-2 px-4 py-2 border rounded-full text-gray-600 hover:text-black hover:border-black">
                <Plus size={18} />
                Add member
              </div>
              <DeleteTeam id={data._id!}>
                <button className="flex items-center gap-2 px-4 py-2 border  rounded-full text-gray-600 hover:text-black hover:border-black">
                  <Trash2 size={18} />
                  Delete Team
                </button>
              </DeleteTeam>
            </div>
          </div>
          <div className=" p-4 border rounded-3xl flex flex-col gap-4 ">
            <div className="flex gap-3 p-6 items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Team Members
              </h2>
              <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
                {users?.length} Members
              </span>
            </div>
            <TeamTable data={users} />
          </div>
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Teams">
        <div className="text-red-500">
          Failed to load data. Try again later.
        </div>
      </CombinedContainer>
    );
  }
}
