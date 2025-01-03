"use client";
import { CombinedContainer } from "@/components/container/container";

import { getUsersByTeamId, User } from "@/server/userActions";
import TeamHeader from "./_components/team-header";
import TeamMembers from "./_components/team-members";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function TeamPage() {
  const teamState = useSelector((state: any) => state.auth.userData);
  const [users, setUsers] = useState<User[] | null>(null);
  const data = teamState?.teamId;

  useEffect(() => {
    if (!data?._id) return;

    const fetchData = async () => {
      try {
        console.log(data);
        const fetchedUsers: User[] = await getUsersByTeamId(data._id);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <CombinedContainer title="Teams">
      <div className="bg-white p-8 my-4 mx-8 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <TeamHeader
            image={data?.image}
            title={data?.title ?? "N/A"}
            description={data?.description ?? "N/A"}
          />
        </div>
        {users === null ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <TeamMembers users={users} />
          </>
        )}
      </div>
    </CombinedContainer>
  );
}
