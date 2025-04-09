// "use client";
// import { Button } from "@/components/buttons/Button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { SelectSeparator } from "@/components/ui/select";
// import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";
// import { useState } from "react";
// import { SearchUsers, UsersType } from "./search-users";
// import { IntBack } from "../../../_components/icons";
// import {
//   AddIntegrationRes,
//   mapIntegrationUsers,
// } from "@/server/integrationActions";
// import { AsyncSelect } from "@/components/ui/async-select";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// type UsersType = {
//   _id: string;
//   first_name: string;
//   email: string;
//   employment_type: string;
//   designation: string;
//   image: string;
//   team: {
//     _id: string;
//     title: string;
//     team_code: string;
//   }[];
//   devices: number;
// }

// type AddIntegrationRes = {
//   message: string;
//   integrationId: string;
//   status: string;
//   data: {
//     _id: string;
//     orgId: string;
//     __v: number;
//     createdAt: string;
//     email: string;
//     image: null;
//     name: string;
//     subscriptions: {
//       integrationId: string;
//       refId: string;
//       _id: string;
//     }[];
//     updatedAt: string;
//     userId: null;
//   }[];
//   totalCount: number;
//   unMapped: UsersType[];
//   unMappedCount: number;
// };

// export default function MappingDialogTwo({
//   children,
//   open,
//   setOpen,
//   response,
//   setNextSteps,
// }: {
//   children?: React.ReactNode;
//   open?: boolean;
//   setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
//   setNextSteps?: React.Dispatch<React.SetStateAction<number>>;
//   response?: AddIntegrationRes;
// }) {
//   const [selectedUser, setSelectedUser] = useState<UsersType>();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: mapIntegrationUsers,
//     mutationKey: ["map-integration-users"],
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({
//         queryKey: ["get-integration-by-id"],
//         exact: true,
//         refetchType: "active",
//       });
//       await queryClient.invalidateQueries({
//         queryKey: ["user-by-integrations", "all-data"],
//         exact: true,
//         refetchType: "active",
//       });
//       await queryClient.invalidateQueries({
//         queryKey: ["all-integrations", "discover"],
//         exact: true,
//         refetchType: "active",
//       });
//       await queryClient.invalidateQueries({
//         queryKey: ["all-integrations"],
//         exact: true,
//         refetchType: "active",
//       });
//       setNextSteps(0);
//     },
//   });

//   // const [mappings, setMappings] = useState(
//   //   Array(7).fill({ source: "lalityasahu05", target: "" })
//   // );

//   // const handleSourceChange = (index: number, value: string) => {
//   //   const newMappings = [...mappings];
//   //   newMappings[index] = { ...newMappings[index], source: value };
//   //   setMappings(newMappings);
//   // };

//   // const handleTargetChange = (index: number, value: string) => {
//   //   const newMappings = [...mappings];
//   //   newMappings[index] = { ...newMappings[index], target: value };
//   //   setMappings(newMappings);
//   // };

//   // const clearAll = () => {
//   //   setMappings(Array(7).fill({ source: "", target: "" }));
//   // };

//   const filteredData = response?.data
//     ? response?.data?.filter((u) => u.userId === null)
//     : [];

//   const getUsers = (email: string = ""): UsersType[] => {
//     try {
//       // Assuming response is defined and has the unMapped property
//       const data = response?.unMapped;
//       console.log(data);

//       const res = data.filter((v) => {
//         return (
//           v.first_name.includes(email) ||
//           v.email.includes(email) ||
//           v.last_name.includes(email)
//         );
//       });
//       console.log(res);

//       return res;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Failed to fetch user");
//     }
//   };

//   const handleMapping = async () => {
//     mutation.mutate({
//       payload: [
//         {
//           integrationId: "",
//           userId: "",
//           userIntegrationId: "",
//         },
//       ],
//     });
//   };

//   return (
//     <>
//       <Dialog open={open} onOpenChange={() => setNextSteps(0)}>
//         <DialogTrigger>{children}</DialogTrigger>
//         <DialogContent className="rounded-2xl bg-white p-6 shadow-lg max-w-[32rem] w-full">
//           <DialogTitle className="text-lg flex gap-3 font-gilroySemiBold">
//             <IntBack onClick={() => setNextSteps(1)} />
//             Map Users
//           </DialogTitle>

//           {/* {JSON.stringify(response?.unMapped)} */}

//           <div className="w-full space-y-4 px-4">
//             {filteredData?.map((mapping, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between gap-x-5"
//               >
//                 <Input
//                   value={mapping?.name ?? mapping?.email ?? ""}
//                   defaultValue={mapping?.name ?? mapping?.email ?? ""}
//                   className="rounded-md border border-gray-200 w-[9.5rem]"
//                   placeholder="Enter value"
//                   readOnly
//                 />
//                 <HugeiconsIcon
//                   icon={ArrowRight02Icon}
//                   className="text-gray-900 size-5"
//                 />

//                 {/* <SearchUsers /> */}
//                 <div className="flex flex-col gap-2">
//                   <AsyncSelect<UsersType>
//                     fetcher={getUsers}
//                     renderOption={(user) => (
//                       <div className="flex items-center gap-2 ">
//                         <div className="flex flex-col">
//                           <div className="font-gilroyMedium">
//                             {user?.first_name}
//                           </div>
//                           <div className="text-xs font-gilroyRegular text-muted-foreground">
//                             {user?.email}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     getOptionValue={(user) => user?.email}
//                     getDisplayValue={(user) => (
//                       <div className="flex items-center gap-2 text-left w-fit">
//                         <div className="flex flex-col leading-tight">
//                           <div className="font-gilroyMedium truncate min-w-0 w-[6rem]">
//                             {user?.email}
//                           </div>
//                           {/* <div className="text-xxs font-gilroyRegular text-muted-foreground">
//                                 {user.Name}
//                               </div> */}
//                         </div>
//                       </div>
//                     )}
//                     notFound={
//                       <div className="py-6 text-center font-gilroyMedium text-sm">
//                         No users found
//                       </div>
//                     }
//                     label="User"
//                     placeholder="Enter Email"
//                     value={selectedUser?.first_name}
//                     onChange={(e) => setSelectedUser(selectedUser)}
//                     width="10rem"
//                   />
//                   {/* <p className="text-sm text-muted-foreground">
//                         Selected user ID: {selectedUser || "none"}
//                       </p> */}
//                 </div>
//               </div>
//             ))}
//           </div>

//           <SelectSeparator className="w-full bg-neutral-300" />
//           <DialogFooter className="flex w-full items-center justify-between mt-1">
//             <Button
//               className="w-[48%] rounded-sm font-gilroyMedium  bg-white text-black  ring-1 ring-[#B4B4B4] flex items-center justify-center"
//               // onClick={() => setOpen(false)}
//             >
//               Clear All
//             </Button>
//             <Button
//               className="w-[48%] rounded-sm font-gilroyMedium  bg-black text-white  ring-1 ring-black   flex items-center justify-center"
//               onClick={handleMapping}
//             >
//               Confirm
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";
import { Button } from "@/components/buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SelectSeparator } from "@/components/ui/select";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { AsyncSelect } from "@/components/ui/async-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IntBack } from "../../../_components/icons";
import {
  AddIntegrationRes,
  mapIntegrationUsers,
} from "@/server/integrationActions";

type UsersType = {
  _id: string;
  first_name: string;
  email: string;
  employment_type: string;
  designation: string;
  image: string;
  team: {
    _id: string;
    title: string;
    team_code: string;
  }[];
  devices: number;
  // If last_name is applicable, you might include:
  last_name?: string;
};

type AddIntegrationResType = {
  message: string;
  integrationId: string;
  status: string;
  data: {
    _id: string;
    orgId: string;
    __v: number;
    createdAt: string;
    email: string;
    image: null;
    name: string;
    subscriptions: {
      integrationId: string;
      refId: string;
      _id: string;
    }[];
    updatedAt: string;
    userId: null;
  }[];
  totalCount: number;
  unMapped: UsersType[];
  unMappedCount: number;
};

interface MappingDialogTwoProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setNextSteps?: React.Dispatch<React.SetStateAction<number>>;
  response?: AddIntegrationResType;
}

export default function MappingDialogTwo({
  children,
  open,
  setOpen,
  setNextSteps,
  response,
}: MappingDialogTwoProps) {
  const queryClient = useQueryClient();

  // Object to keep track of user selections for each mapping row.
  // Key: index, Value: selected user (or null if none selected)
  const [mappingSelections, setMappingSelections] = useState<
    Record<number, UsersType | null>
  >({});
  const [error, setError] = useState<string>("");

  // Filter out the integration records which have a null userId
  const filteredData = response?.data
    ? response?.data?.filter((u) => u?.userId === null)
    : [];

  // Fetcher function to search for users from unmapped list based on email
  const getUsers = (query: string = ""): UsersType[] => {
    try {
      const data = response?.unMapped || [];
      // Check first name, email and last_name if available
      const res = data?.filter((user) => {
        const searchStr = query?.toLowerCase();
        return (
          user?.first_name?.toLowerCase().includes(searchStr) ||
          user?.email?.toLowerCase().includes(searchStr) ||
          (user?.last_name &&
            user?.last_name?.toLowerCase().includes(searchStr))
        );
      });
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch user");
    }
  };

  // Update the mapping selection for a given row index
  const updateMappingSelection = (index: number, user: UsersType | null) => {
    setMappingSelections((prev) => ({
      ...prev,
      [index]: user,
    }));
    // Clear any previous error if a valid selection is made
    if (user) setError("");
  };

  // Reset mapping selections (clearing AsyncSelect fields)
  const clearAll = () => {
    setMappingSelections({});
    setError("");
  };

  // API Mutation handler
  const mutation = useMutation({
    mutationFn: mapIntegrationUsers,
    mutationKey: ["map-integration-users"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-integration-by-id"],
        exact: true,
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["user-by-integrations", "all-data"],
        exact: true,
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["all-integrations", "discover"],
        exact: true,
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["all-integrations"],
        exact: true,
        refetchType: "active",
      });
      setNextSteps && setNextSteps(0);
    },
  });

  // Handle the Confirm button click
  const handleMapping = async () => {
    // Validate that every mapping row has a selected user
    const incompleteMapping = filteredData?.some(
      (_, index) => !mappingSelections?.[index]
    );
    if (incompleteMapping) {
      setError("Please select a user for every mapping.");
      return;
    }
    // Build payload: each mapping object includes keys as required.
    const payload = filteredData?.map((mapping, index) => {
      const selectedUser = mappingSelections?.[index] as UsersType;
      return {
        integrationId: response?.integrationId,
        userId: selectedUser?._id,
        userIntegrationId: mapping?._id, // adjust if different data is needed
      };
    });
    // Call the API with the payload
    mutation.mutate({ payload });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={() => setNextSteps && setNextSteps(0)}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="rounded-2xl bg-white p-6 shadow-lg max-w-[32rem] w-full">
          <DialogTitle className="text-lg flex gap-3 font-gilroySemiBold">
            <IntBack onClick={() => setNextSteps && setNextSteps(1)} />
            Map Users
          </DialogTitle>

          <div className="w-full space-y-4 px-4">
            {filteredData.map((mapping, index) => (
              <div
                key={mapping?._id || index}
                className="flex items-center justify-between gap-x-5"
              >
                <Input
                  value={mapping?.name || mapping?.email || ""}
                  defaultValue={mapping?.name || mapping?.email || ""}
                  className="rounded-md border border-gray-200 w-[9.5rem]"
                  placeholder="Enter value"
                  readOnly
                />
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  className="text-gray-900 size-5"
                />

                <div className="flex flex-col gap-2">
                  <AsyncSelect<UsersType>
                    fetcher={getUsers}
                    renderOption={(user) => (
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col">
                          <div className="font-gilroyMedium">
                            {user?.first_name}
                          </div>
                          <div className="text-xs font-gilroyRegular text-muted-foreground">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    )}
                    getOptionValue={(user) => user?.email}
                    getDisplayValue={(user) => (
                      <div className="flex items-center gap-2 text-left w-fit">
                        <div className="flex flex-col leading-tight">
                          <div className="font-gilroyMedium truncate min-w-0 w-[6rem]">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    )}
                    notFound={
                      <div className="py-6 text-center font-gilroyMedium text-sm">
                        No users found
                      </div>
                    }
                    label="User"
                    placeholder="Enter Email"
                    // Provide the value from mappingSelections for this row
                    value={mappingSelections?.[index]?.email || "null"}
                    // Update the mapping selection on change
                    onChange={(selected: UsersType | null) =>
                      updateMappingSelection(index, selected)
                    }
                    width="10rem"
                  />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <SelectSeparator className="w-full bg-neutral-300" />
          <DialogFooter className="flex w-full items-center justify-between mt-1">
            <Button
              className="w-[48%] rounded-sm font-gilroyMedium bg-white text-black ring-1 ring-[#B4B4B4] flex items-center justify-center"
              onClick={clearAll}
            >
              Clear All
            </Button>
            <Button
              disabled={mutation.isPending}
              className="w-[48%] rounded-sm font-gilroyMedium bg-black text-white ring-1 ring-black flex items-center justify-center"
              onClick={handleMapping}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
