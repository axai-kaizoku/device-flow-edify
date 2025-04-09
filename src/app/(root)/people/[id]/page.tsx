"use client";

import {
  CreateUserArgs,
  fetchUsers,
  getUserById,
  searchUsers,
  User,
} from "@/server/userActions";
import EditUser from "./_components/edit-user";
import { DeleteUser } from "./_components/delete-user";
import UserGrid from "./_components/user-main";
import AssignDevice from "./_components/assign-device";
import UserNavArrows from "./_components/user-nav";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileSkeleton from "../../(userRoutes)/_components/profile-main-skeleton";

interface UserPageProps {
  params: { id: string };
}

export default function UserPage({ params }: UserPageProps) {
  // Fetch current user data

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
    return <div>Data not found</div>;
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
      <div className="flex gap-4 sticky top-0 z-50  justify-between p-3 rounded-[10px] border border-[#0000001A] bg-white">
        <div className="flex justify-center items-center gap-3">
          <AssignDevice userData={user}>
            <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
              <div className=" group-hover:text-white px-4 text-nowrap text-sm font-gilroyMedium">
                Assign
              </div>
            </div>
          </AssignDevice>
          <EditUser userData={userData}>
            <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
              <div className="px-4 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                Edit
              </div>
            </div>
          </EditUser>
          <DeleteUser id={params.id}>
            <div className="flex  cursor-pointer items-center rounded-lg border border-[rgba(0,0,0,0.2)]  p-[7px]  hover:bg-black hover:text-white hover:border-white group">
              <div className="px-4 group-hover:text-white text-nowrap text-sm font-gilroyMedium">
                Delete
              </div>
            </div>
          </DeleteUser>
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
    <div className="px-4 overflow-y-scroll h-full">
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
