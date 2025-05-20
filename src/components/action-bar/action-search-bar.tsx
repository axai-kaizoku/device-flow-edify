import { Search } from "lucide-react";

export const ActionSearchBar = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <div className="flex items-center border border-[rgba(0,0,0,0.2)] rounded-md px-2 py-2 h-full">
      <div className="flex gap-2 justify-center items-center h-full">
        <Search className=" size-[1.16rem]" />
        <input
          {...props}
          type="text"
          className={`flex-grow h-full bg-transparent outline-none text-black placeholder-black font-gilroyMedium placeholder:text-[15px] transition-all duration-1000 `}
        />
      </div>
    </div>
  );
};
