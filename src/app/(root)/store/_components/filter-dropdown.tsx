import { Icons } from "@/components/icons";
import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
  };

  return (
    <div className="relative w-32 h-8" ref={dropdownRef}>
      <button
        className="w-full text-base font-gilroyMedium py-1 px-4 flex justify-center items-center gap-2.5 bg-white  rounded-md shadow-sm focus:outline-none relative"
        onClick={toggleDropdown}
      >
        <span className="font-gilroyMedium text-sm">{label}</span>
        <Icons.arrow_down
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
        {selectedValues.length > 0 && (
          <div className=" absolute top-0 right-0 rounded-full text-white size-3.5 bg-red-500 flex justify-center items-center">
            <span className=" text-[10px] font-gilroyMedium">
              {selectedValues.length}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
          <div className="p-3 ">
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={option.label}
                className="flex w-full h-fit items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={option.label}
                  checked={selectedValues.includes(option.value.toString())}
                  onChange={() => handleOptionClick(option.value.toString())}
                  className="size-4 text-black checked:text-black border-gray-300 rounded-md"
                />
                <span className="text-sm font-gilroyMedium w-full text-[#344054]">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          <div className="flex justify-center p-3 items-center w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-black w-full text-white text-sm font-gilroyMedium rounded-md  focus:outline-none "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
