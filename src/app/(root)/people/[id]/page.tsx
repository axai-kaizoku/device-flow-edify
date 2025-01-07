import { CombinedContainer } from "@/components/container/container";
import { CreateUserArgs, getUserById, User } from "@/server/userActions";
import EditUser from "./_components/edit-user";
import { DeleteUser } from "./_components/delete-user";
import { ChevronLeft, ChevronRight } from "lucide-react";
import UserGrid from "./_components/user-main";
import AssignDevice from "./_components/assign-device";

interface UserPageProps {
  params: { id: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const user: User = await getUserById(params.id);

  if (!user) {
    return <div>Data not found</div>;
  }

  return (
    <div className="px-4">
      <div className="flex justify-between w-full items-center pr-36 xl:pr-24">
        <div className="text-gray-500 font-gilroySemiBold">Profile</div>
        <div className="flex gap-5">
          <div className="flex gap-2.5">
            <AssignDevice userData={user}>
              <div className="flex items-center justify-center py-1.5 gap-1  px-5  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <span className="text-[15px]   whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Assign
                </span>
              </div>
            </AssignDevice>
            <EditUser userData={user as unknown as CreateUserArgs}>
              <div className="flex items-center justify-center py-1.5 gap-1  px-5  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <span className="text-[15px]   whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Edit
                </span>
              </div>
            </EditUser>

            <DeleteUser id={params.id ?? ""}>
              <div className="flex items-center justify-center py-1.5 gap-1  px-5  text-[#7F7F7F] group border border-gray-400 rounded-full hover:text-black hover:border-black transition-all duration-300">
                <span className="text-[15px]   whitespace-nowrap text-[#6C6C6C] group-hover:text-black font-gilroyMedium rounded-lg ">
                  Delete
                </span>
              </div>
            </DeleteUser>
            {/* <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronLeft className="text-[#6C6C6C]" />
            </div>
            <div className="rounded-full border border-[#6C6C6C] w-10 h-10 flex justify-center items-center cursor-pointer">
              <ChevronRight className="text-[#6C6C6C]" />
            </div> */}
          </div>
        </div>
      </div>

      <UserGrid user={user} />
    </div>
  );
}
