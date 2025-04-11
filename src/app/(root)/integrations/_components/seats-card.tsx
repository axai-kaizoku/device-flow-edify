import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { MemberIcon } from "../../teams/_components/member-icon";

interface SeatsCardProps {
  type: "total" | "unmapped" | "unused";
  totalSeats?: number | string;
  onClick?: () => void;
  className?: string;
}

const SeatsCard = ({
  type,
  totalSeats,
  onClick,
  className,
}: SeatsCardProps) => {
  const renderMembers = () => {
    if (1) {
      return Array(3)
        .fill(null)
        .map((_, index) => (
          <MemberIcon
            key={index}
            isPlaceholder={false}
            className="bg-neutral-300 text-neutral-50 size-6"
          />
        ));
    }
    return (
      <>
        <MemberIcon src="https://picsum.photos/300/300" isPlaceholder={false} />
        <MemberIcon src="https://picsum.photos/301/300" isPlaceholder={false} />
        <MemberIcon src="https://picsum.photos/302/300" isPlaceholder={false} />
      </>
    );
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "max-w-52 w-full h-32 rounded-lg flex flex-col justify-between border p-3 cursor-pointer text-sm hover:border-black",
        className
      )}
    >
      <div className="space-y-3">
        <span className="font-gilroyMedium capitalize">{type} Seats</span>
        <div className="font-gilroyBold text-3xl">{totalSeats}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex -space-x-2 justify-end -mb-8">
          {renderMembers()}
        </div>
        <div className="rounded-full bg-[#F6F6F6] size-5 flex justify-center items-center">
          <ChevronRight className="size-3.5 ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export default SeatsCard;
