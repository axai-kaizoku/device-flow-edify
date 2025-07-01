import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../buttons/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddNewLocation from "./add-new-location";
import SettingsSidebar, { sideBarItems } from "./settings-sidebar";

type SettingsDialogProps = {
  children: React.ReactNode;
};

function SettingsDialog({ children }: SettingsDialogProps) {
  const [selectItem, setSelectItem] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const isAdminAccess = sideBarItems().at(selectItem).label === "Admin Access";
  const isAssetLocationAccess =
    sideBarItems().at(selectItem).label === "Asset Locations";
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeButton={!isAdminAccess && !isAssetLocationAccess}
        className="rounded-lg max-w-[600px] p-0 min-h-[80vh] overflow-y-auto"
      >
        <DialogHeader className="relative ">
          <DialogTitle className=" px-4 pt-3 w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-gilroySemiBold border border-white p-2">
                Settings
              </h1>
              {isAdminAccess && (
                <div className="flex gap-36  items-center">
                  {" "}
                  <div className=" flex mr-1   justify-between items-center  border border-[#E5E5E5] rounded-md ">
                    <input
                      placeholder="Search user"
                      value={searchTerm}
                      onChange={(e: any) => {
                        setSearchTerm(e.target.value);
                      }}
                      type="text"
                      className={`flex-grow text-xs p-2 h-full bg-transparent outline-none text-black placeholder-[#B2B2B2] font-gilroyMedium placeholder:text-xs transition-all duration-1000 `}
                    />
                    <Search className=" size-3 text-[#B2B2B2] mr-2" />
                  </div>
                </div>
              )}
              {isAssetLocationAccess && (
                <AddNewLocation isEdit={false}>
                  <Button variant="outlineTwo" className="text-xs h-8">
                    {" "}
                    Add New Locations
                  </Button>
                </AddNewLocation>
              )}
            </div>
          </DialogTitle>
          <div className="h-[1px] bg-gray-200  "></div>
          <SettingsSidebar
            onSelect={setSelectItem}
            selectItem={selectItem}
            searchTerm={searchTerm}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
