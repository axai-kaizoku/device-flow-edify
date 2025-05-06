"use client";

import DeviceFlowLoader from "@/components/deviceFlowLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/server/helper";
import { fetchUsers, getUserById } from "@/server/userActions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProfileSkeleton from "../../(userRoutes)/_components/profile-main-skeleton";
import AssignDevice from "./_components/assign-device";
import { DeleteUser } from "./_components/delete-user";
import EditUser from "./_components/edit-user";
import UserGrid from "./_components/user-main";
import UserNavArrows from "./_components/user-nav";
import { RestoreUser } from "../_components/restore-user";
import { buttonVariants } from "@/components/buttons/Button";
import { PermanentUserDelete } from "../_components/permanent-user-delete";

interface UserPageProps {
  params: { id: string };
}

export default function UserPage({ params }: UserPageProps) {
  // Fetch current user data
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession();
      setSession(session);
    };
    getSessionData();
  }, []);

  const { data: user, status } = useQuery({
    queryKey: ["fetch-user-by-id", params.id],
    queryFn: async () => await getUserById(params?.id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: allUsers } = useQuery({
    queryKey: ["fetch-all-users"],
    queryFn: async () => await fetchUsers(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return (
      <>
        <UserProfileSkeleton />
      </>
    );
  }

  // const user: User = await getUserById(params?.id);
  if (!user) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="font-gilroyMedium">User does not exists</div>
      </div>
    );
  }

  // Fetch all users to determine navigation (assumes getAllUsers returns an array of User)
  const currentIndex = allUsers?.findIndex((u) => u._id === params?.id);
  const prevUserId = currentIndex > 0 ? allUsers?.[currentIndex - 1]._id : null;
  const nextUserId =
    currentIndex < allUsers?.length - 1
      ? allUsers?.[currentIndex + 1]._id
      : null;

  const userData = {
    ...user,
    team: [
      {
        _id: user?.teamId?._id,
        title: user?.teamId?.title,
        team_code: user?.teamId?.team_code,
      },
    ],
  };
  if (allUsers === undefined && user === undefined) {
    <div>
      <DeviceFlowLoader />
    </div>;
  }
  return (
    <div className="px-4 overflow-y-scroll h-full mt-4">
      {/* {JSON.stringify(user)} */}

      <div className="flex items-center gap-4 sticky top-0 z-50  justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
        <div className="flex justify-center items-center gap-2">
          <AssignDevice userData={user}>
            <div className="flex  cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)] hover:border-black p-[7px]   group">
              <div className="  px-4 text-nowrap text-sm font-gilroyMedium ">
                Assign
              </div>
            </div>
          </AssignDevice>
          <EditUser userData={userData}>
            <div className="flex  cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:border-black group">
              <div className="px-4  text-nowrap text-sm font-gilroyMedium">
                Edit
              </div>
            </div>
          </EditUser>
          {session?.user?.user?.userId !== params?.id &&
            user?.deleted_at === null && (
              <DeleteUser id={params.id}>
                <div className="flex  cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)] hover:border-black  p-[7px]   group">
                  <div className="px-4  text-nowrap text-sm font-gilroyMedium">
                    Delete
                  </div>
                </div>
              </DeleteUser>
            )}

          {user?.deleted_at !== null && (
            <>
              <PermanentUserDelete id={user?._id!}>
                <div className="flex  cursor-pointer items-center rounded-md border border-[rgba(0,0,0,0.2)] hover:border-black  p-[7px]   group">
                  <div className="px-4  text-nowrap text-sm font-gilroyMedium">
                    Delete
                  </div>
                </div>
              </PermanentUserDelete>

              <RestoreUser id={user?._id!}>
                <div
                  className={`${buttonVariants({
                    variant: "outlineTwo",
                  })} border-[rgba(0,0,0,0.2)]`}
                >
                  Restore
                </div>
              </RestoreUser>
            </>
          )}
        </div>

        <div className="flex justify-center items-center gap-3">
          <UserNavArrows prevUserId={prevUserId} nextUserId={nextUserId} />
        </div>
      </div>

      <UserGrid user={user} />
    </div>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="px-4 flex flex-col gap-4 mt-8 overflow-y-scroll h-full">
      <div className="flex justify-between w-full items-center">
        <Skeleton className="h-6 w-24" />

        <div className="flex gap-2.5 px-4">
          {/* Assign Button Skeleton */}
          <Skeleton className="h-9 w-20 rounded-full" />
          {/* Edit Button Skeleton */}
          <Skeleton className="h-9 w-20 rounded-full" />
          {/* Delete Button Skeleton */}
          <Skeleton className="h-9 w-20 rounded-full" />
          {/* Navigation Arrows Skeleton */}
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <ProfileSkeleton />
    </div>
  );
}
