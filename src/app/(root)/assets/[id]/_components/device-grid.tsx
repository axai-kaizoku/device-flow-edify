import { GetAvatar } from "@/components/get-avatar";
import { StoreBannerCard } from "@/components/store-banner";
import { getUserById, User } from "@/server/userActions";

// Helper to format a date string into the required "en-GB" format.
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Helper to calculate remaining days of warranty.
const remainingDays = (expiryDate?: string): number => {
  if (!expiryDate) return 0;
  const diff = new Date(expiryDate).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const DeviceGrid = async ({ data }: { data: any }) => {
  // Determine if a valid userId is provided.
  const isAssigned = Boolean(data?.userId && data.userId.length > 0);

  // Fetch the assigned user if applicable.
  let assignedTo: User = {} as User;
  if (isAssigned) {
    try {
      assignedTo = await getUserById(data.userId);
    } catch (error) {
      assignedTo = {} as User;
    }
  }

  // Device info fields common to the Device Info card.
  const deviceInfoFields = [
    { label: "Brand", value: data?.brand ?? "-" },
    { label: "Model", value: data?.custom_model ?? "-" },
    { label: "OS", value: data?.os ?? "-" },
    { label: "Processor", value: data?.processor ?? "-" },
    { label: "RAM", value: data?.ram ? `${data.ram}` : "-" },
    { label: "Storage", value: data?.storage ?? "-" },
    { label: "Condition", value: data?.device_condition ?? "-" },
    { label: "Serial Number", value: data?.serial_no ?? "-" },
  ];

  // Assigned Info fields for the Assigned Info card.
  const assignedInfoFields = [
    { label: "Role", value: assignedTo?.designation ?? "-" },
    { label: "Department", value: assignedTo?.teamId?.description ?? "-" },
    { label: "Employment Type", value: assignedTo?.employment_type ?? "-" },
    { label: "Team", value: assignedTo?.teamId?.title ?? "-" },
    { label: "Email ID", value: assignedTo?.email ?? "-" },
    { label: "Contact", value: assignedTo?.phone ?? "-" },
    {
      label: "Reporting Manager",
      value: `${assignedTo?.reporting_manager?.first_name ?? "-"} ${
        assignedTo?.reporting_manager?.last_name ?? ""
      }`,
    },
    {
      label: "Assigned on",
      value: formatDate(data?.assigned_at),
    },
  ];

  // Common Device Status fields (used in one variant of the UI)
  const deviceStatusFields = [
    {
      label: "Warranty Expiry",
      value: formatDate(data?.warranty_expiary_date),
    },
    {
      label: "Purchased On",
      value: formatDate(data?.device_purchase_date),
    },
    {
      label: "Purchase Value",
      value: `₹${data?.purchase_value ?? "-"} /-`,
    },
  ];

  // Calculate remaining warranty days.
  const daysRemaining = remainingDays(data?.warranty_expiary_date);
  const warrantyStatus =
    daysRemaining > 0 ? (
      <>
        In Warranty: <span>{daysRemaining} Days Remaining</span>
      </>
    ) : (
      <span className="text-red-500">Out of Warranty</span>
    );

  return (
    <div className="w-full h-full mt-1 flex justify-center items-center mb-6 hide-scrollbar">
      <div className="flex w-full h-[96%] items-start gap-4">
        <div className="w-[58%] flex justify-between gap-4">
          {/* Device Info Card */}
          <div className="rounded-lg w-[52%] h-full border border-[#C3C3C34F] bg-white px-6 py-4 2xl:p-7 flex flex-col gap-3">
            <h1 className="font-gilroyMedium text-base">Device Info</h1>
            <div className="flex gap-2 items-center">
              <img
                src={
                  data?.image?.[0]?.url ??
                  "https://api-files-connect-saas.s3.ap-south-1.amazonaws.com/uploads/1736748407441.png"
                }
                alt={data?.custom_model ?? "device"}
                className="size-16 rounded-full object-cover"
              />
              <div className="flex flex-col justify-center">
                <div className="text-[#737373] font-gilroyMedium text-sm">
                  {data?.brand ?? "Brand"}
                </div>
                <div className="text-black font-gilroySemiBold text-sm">
                  {data?.custom_model ?? "Model"}
                </div>
              </div>
            </div>
            <div className="h-[1px] bg-gray-200"></div>
            {deviceInfoFields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-[#737373] font-gilroyMedium text-sm">
                  {field.label}
                </div>
                <div className="text-black font-gilroySemiBold text-sm">
                  {field.value}
                </div>
              </div>
            ))}
          </div>

          {/* Conditional: show Assigned Info card if device is assigned. Otherwise, show Device Status card */}
          {isAssigned ? (
            <div className="rounded-lg w-[52%] h-full border border-[#C3C3C34F] bg-white px-6 py-4 2xl:p-7 flex flex-col gap-3">
              <h1 className="text-base font-gilroyMedium">Assigned Info</h1>
              <div className="flex gap-2 items-center">
                {assignedTo?.image && assignedTo?.image?.length > 0 ? (
                  <img
                    src={assignedTo?.image}
                    alt={assignedTo?.first_name}
                    className="size-16 object-cover rounded-full flex-shrink-0"
                  />
                ) : (
                  <GetAvatar name={assignedTo?.first_name ?? ""} size={64} />
                )}
                <div className="flex flex-col justify-center">
                  <div className="text-black font-gilroySemiBold text-sm">
                    {`${assignedTo?.first_name ?? "-"} ${
                      assignedTo?.last_name ?? ""
                    }`}
                  </div>
                  <h1 className="text-sm text-[#737373] font-gilroyMedium">
                    EMP ID
                  </h1>
                </div>
              </div>
              <div className="h-[1px] bg-gray-200"></div>
              {assignedInfoFields.map((field, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-[#737373] font-gilroyMedium text-sm">
                    {field.label}
                  </div>
                  <div className="text-black font-gilroySemiBold text-sm">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-[52%] h-full flex flex-col gap-4">
              <div className="px-6 py-4 w-full border border-[#C3C3C34F] bg-white rounded-lg 2xl:p-7 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="font-gilroySemiBold flex w-full items-center justify-between text-lg 2xl:text-xl">
                    <h1 className="text-base font-gilroyMedium">
                      Device Status
                    </h1>
                    <div className="flex justify-center items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF3]">
                      <span className="text-center text-[#027A48] text-sm font-gilroyMedium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-[#737373] font-gilroyMedium text-sm">
                    Warranty
                  </div>
                  <div className="text-[#027947] font-gilroySemiBold text-sm">
                    {warrantyStatus}
                  </div>
                </div>
                {deviceStatusFields.map((field, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="text-[#737373] font-gilroyMedium text-sm">
                      {field.label}
                    </div>
                    <div className="text-black font-gilroySemiBold text-sm">
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>
              <StoreBannerCard />
            </div>
          )}
        </div>
        {/* Optional second column for assigned devices */}
        {isAssigned && (
          <div className="w-[38%] h-full flex flex-col gap-4">
            <div className="px-6 py-4 w-full border border-[#C3C3C34F] bg-white rounded-lg 2xl:p-7 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="font-gilroySemiBold flex w-full items-center justify-between text-lg 2xl:text-xl">
                  <h1 className="text-base font-gilroyMedium">Device Status</h1>
                  <div className="flex justify-center items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF3]">
                    <span className="text-center text-[#027A48] text-sm font-gilroyMedium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-[#737373] font-gilroyMedium text-sm">
                  Warranty
                </div>
                <div className="text-[#027947] font-gilroySemiBold text-base">
                  {warrantyStatus}
                </div>
              </div>
              {deviceStatusFields.map((field, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-[#737373] font-gilroyMedium text-sm">
                    {field.label}
                  </div>
                  <div className="text-black font-gilroySemiBold text-base">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
            <StoreBannerCard />
          </div>
        )}
      </div>
    </div>
  );
};
