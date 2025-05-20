"use client";

import { ActionBar } from "@/components/action-bar/action-bar";
import { buttonVariants } from "@/components/buttons/Button";
import DeviceFlowLoader from "@/components/deviceFlowLoader";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/lib/providers/session-provider";
import { fetchUsers, getUserById } from "@/server/userActions";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import ProfileSkeleton from "../../(userRoutes)/_components/profile-main-skeleton";
import { PermanentUserDelete } from "../_components/permanent-user-delete";
import { RestoreUser } from "../_components/restore-user";
import AssignDevice from "./_components/assign-device";
import { DeleteUser } from "./_components/delete-user";
import EditUser from "./_components/edit-user";
import UserMain from "./new-main";

interface UserPageProps {
  params: { id: string };
}

export default function UserPage({ params }: UserPageProps) {
  const session = useSession();
  const userId = useMemo(() => params?.id, [params?.id]);

  const { data: user, status } = useQuery({
    queryKey: ["fetch-user-by-id", userId],
    queryFn: async () => await getUserById(userId),
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
  const currentIndex = allUsers?.findIndex((u) => u._id === userId);
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
    <div className="px-3 overflow-y-scroll h-full mt-4">
      <ActionBar showBackBtn>
        <div className="flex gap-2">
          <AssignDevice userData={user}>
            <div
              className={buttonVariants({
                variant: "outlineTwo",
              })}
            >
              Assign asset
            </div>
          </AssignDevice>
          <EditUser userData={userData}>
            <div
              className={buttonVariants({
                variant: "outlineTwo",
              })}
            >
              Edit
            </div>
          </EditUser>
          {session?.session?.user?.user?.userId !== userId &&
            user?.deleted_at === null && (
              <DeleteUser id={userId}>
                <div
                  className={buttonVariants({
                    variant: "outlineTwo",
                  })}
                >
                  Delete
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
      </ActionBar>

      {/* <UserGrid user={user} /> */}
      <UserMain user={user} />
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
