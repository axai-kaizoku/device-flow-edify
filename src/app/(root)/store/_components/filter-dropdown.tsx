import { Icons } from "@/components/icons";
import React, { useState } from "react";

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

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
  };

  return (
    <div className="relative w-32 h-8">
      {/* Dropdown Label */}
      <button
        className="w-full text-base font-gilroyMedium py-1 px-4 flex justify-center items-center gap-2.5 bg-white  rounded-md shadow-sm focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedValues.length > 0 ? (
          <div className=" flex items-center justify-center gap-1">
            {selectedValues.map((value, index) => (
              <span
                key={index}
                className="py-2 px-4 bg-gray-100 text-xs text-gray-700 font-gilroyMedium rounded-md border border-gray-300"
              >
                {
                  options.find((option) => option.value.toString() === value)
                    ?.label
                }
              </span>
            ))}
          </div>
        ) : (
          <>
            <span className="font-gilroyMedium text-sm">{label}</span>
            <Icons.arrow_down
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10">
          <div className="p-3 ">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between gap-2 py-2 px-3 rounded-md hover:bg-gray-100 cursor-pointer "
                onClick={() => handleOptionClick(option.value.toString())}
              >
                {/* Checkbox and Label */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value.toString())}
                    readOnly
                    className="form-checkbox h-4 w-4 text-blue-500 border-gray-300  rounded-md"
                  />
                  <span className="text-base text-[#344054]">
                    {option.label}
                  </span>
                </label>
              </div>
            ))}
          </div>
          {/* Apply Button */}
          <div className="flex justify-center p-3 items-center w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-black w-full text-white text-base font-gilroyMedium rounded-md  focus:outline-none "
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
