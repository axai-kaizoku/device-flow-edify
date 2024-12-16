import { CombinedContainer } from "@/components/container/container";
import { getCurrentOrg, Org } from "@/server/orgActions";
import { MapPinned } from "lucide-react";
import CreateAddress from "./_components/create-address";
import EditAddress from "./_components/edit-address";
import { DeleteAddress } from "./_components/delete-address";
import { getSession } from "@/server/helper";
import SettingsHeader from "./_components/settings-header";
import SettingAddress from "./_components/setting-address";
import NotFound from "@/app/not-found";

export default async function Settings() {
  try {
    const org: Org = await getCurrentOrg();
    const sess = await getSession();

    return (
      <CombinedContainer
        title="Settings"
        description="Manage your organization's settings"
      >
        <div className="flex flex-col gap-8">
          <SettingsHeader data={org} />
          <SettingAddress data={org} />
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    <NotFound />;
    return (
      <CombinedContainer title="Settings">
        <div className="text-red-500">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}
