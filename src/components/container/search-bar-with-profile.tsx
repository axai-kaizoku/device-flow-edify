import { getSession } from "@/server/helper";
import { AvatarCircle } from "@/components/wind/Avatar/styles/style";
import { Icon } from "@/components/wind/Icons";

export const SearchBarWithProfile = () => {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      {/* Search bar on the left */}
      <div className="flex items-center gap-3">
        <Icon type="OutlinedHamburger" className="text-gray-600" />
        <input
          type="search"
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-400"
          placeholder="Search..."
        />
      </div>

      {/* Profile section on the right */}
      <div className="flex items-center gap-4">
        <AvatarCircle />
        <div className="flex text-sm flex-col">
          <Profile />
        </div>
        <Icon
          type="OutlinedDownChevron"
          className="text-gray-600 dark:text-gray-300"
        />
      </div>
    </div>
  );
};

export const Profile = async () => {
  const session = await getSession();

  return (
    <div>
      {session && (
        <div className="whitespace-nowrap flex flex-col gap-0.5 text-gray-700 dark:text-gray-300">
          {session?.user.name ? (
            <>
              <span className="font-gilroyMedium">{session?.user.name}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Employee
              </span>
            </>
          ) : (
            <>
              <span className="font-gilroyMedium">
                {session?.user.first_name} {session?.user.last_name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {session.user.role === 1 ? "Employee" : "Admin"}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
