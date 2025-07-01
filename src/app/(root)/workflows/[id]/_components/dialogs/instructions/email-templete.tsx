import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/ui/input";
import { Delete01Icon, PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const EmailTemplate = ({
  setIsEdit,
}: {
  setIsEdit: (val: boolean) => void;
}) => (
  <div>
    <div className="bg-[#F9F9F9] rounded p-4 flex flex-col gap-3 text-[13px] font-gilroyMedium">
      <div className="flex items-end justify-start gap-2">
        <span className="text-[#A5A5A5]">To:</span>
        <div>
          <Input
            readOnly
            value={"{Employee email}"}
            className="w-28 max-w-fit px-1 py-0 h-fit md:text-[13px]"
          />
        </div>
      </div>
      <div className="flex items-end justify-start gap-2">
        <span className="text-[#A5A5A5]">From:</span>
        <div>lalityasahu02@gmail.com</div>
      </div>
      <div className="flex items-end justify-start gap-2">
        <span className="text-[#A5A5A5]">Subject:</span>
        <div className="flex items-end gap-2">
          Welcome to the team
          <Input
            readOnly
            value={"{Employee name}"}
            className="w-[7.2rem] max-w-fit px-1 py-0 h-fit md:text-[13px]"
          />
        </div>
      </div>

      <div className="flex items-center justify-start gap-2">
        <span className="text-[#A5A5A5]">Body:</span>
        <div className="flex items-end gap-2">
          <div>
            <div className="flex gap-2 items-end">
              Hii
              <Input
                readOnly
                value={"{Employee name}"}
                className="w-[7.2rem] max-w-fit px-1 py-0 h-fit md:text-[13px]"
              />
              ,
            </div>
            Hope you are doing well ! Welcome to the team. Thanks
          </div>
        </div>
      </div>
      <div className="flex items-end justify-start gap-2">
        <span className="text-[#A5A5A5]">Attachments:</span>
        <div className="text-[#0062FF]">onboarding.pdf</div>
      </div>
    </div>

    <div className="flex mt-3 gap-3">
      <Button
        className="text-[#FF0000] w-full flex-1"
        type="button"
        variant="outlineTwo"
      >
        <HugeiconsIcon icon={Delete01Icon} size={16} />
        Delete
      </Button>
      <Button
        className="text-[#0062FF] w-full flex-1"
        type="button"
        variant="outlineTwo"
        onClick={() => setIsEdit(true)}
      >
        <HugeiconsIcon
          icon={PencilEdit01Icon}
          className="text-black"
          size={18}
        />
        Edit
      </Button>
    </div>
  </div>
);
