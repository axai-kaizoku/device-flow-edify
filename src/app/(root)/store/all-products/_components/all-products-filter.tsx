"use client";

import { SetStateAction, useEffect, useState } from "react";
import { MoveLeft } from "lucide-react";
import { BackBtn } from "../../cart/checkout/_components/back-btn";
import { StoreDevice } from "@/server/deviceActions";
import { searchStoreDevices } from "@/server/storeActions";
import { useAlert } from "@/hooks/useAlert";
import { FilterDropdown } from "../../_components/filter-dropdown";

export default function AllProductsFilter({
  setData,
}: {
  setData: React.Dispatch<SetStateAction<StoreDevice[]>>;
}) {
  const { showAlert } = useAlert();
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[][]>([]);

  const updateFilters = () => {
    let newFilters: string[][] = [];

    selectedRam.forEach((ram) => {
      newFilters.push(["ram", "Like", ram]);
    });
    selectedStorage.forEach((storage) => {
      newFilters.push(["storage", "Like", storage]);
    });
    selectedOS.forEach((os) => {
      newFilters.push(["os", "Like", os]);
    });
    selectedBrand.forEach((brand) => {
      newFilters.push(["brand", "Like", brand]);
    });

    setFilters(newFilters);
  };

  useEffect(() => {
    updateFilters();
  }, [selectedRam, selectedStorage, selectedOS, selectedBrand]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await searchStoreDevices({ filters });
        setData(res);
      } catch (error) {
        showAlert({
          isFailure: true,
          description: "Device not found",
          title: "Failed to fetch data",
          key: "store-filters-api",
        });
      }
    };
    fetch();
  }, [filters]);

  const clearAllFilters = () => {
    setSelectedRam([]);
    setSelectedStorage([]);
    setSelectedOS([]);
    setSelectedBrand([]);
    setFilters([]); // Clear all filters
  };

  return (
    <div className="flex items-center justify-between py-2 px-6 w-full bg-[#F4F4F4] rounded-2xl">
      <div className="flex flex-wrap gap-4   items-center justify-start ">
        <BackBtn className="pr-3">
          <MoveLeft className="size-5 cursor-pointer" />
        </BackBtn>
        <h1 className="font-gilroyMedium text-base tracking-wide">Filters:</h1>
        <div className="flex gap-2.5">
          <FilterDropdown
            label="RAM"
            options={[
              { value: "4GB", label: "4GB" },
              { value: "6GB", label: "6GB" },
              { value: "8GB", label: "8GB" },
              { value: "16GB", label: "16GB" },
            ]}
            selectedValues={selectedRam}
            onChange={setSelectedRam}
          />

          <FilterDropdown
            label="Storage"
            options={[
              { value: "128GB", label: "128GB" },
              { value: "256GB", label: "256GB" },
              { value: "512GB", label: "512GB" },
              { value: "1TB", label: "1TB" },
            ]}
            selectedValues={selectedStorage}
            onChange={setSelectedStorage}
          />

          <FilterDropdown
            label="OS"
            options={[
              { value: "windows", label: "Windows" },
              { value: "mac", label: "Mac" },
              { value: "linux", label: "Linux" },
            ]}
            selectedValues={selectedOS}
            onChange={setSelectedOS}
          />

          <FilterDropdown
            label="Brand"
            options={[
              { value: "apple", label: "Apple" },
              { value: "dell", label: "Dell" },
              { value: "lenovo", label: "Lenovo" },
              { value: "acer", label: "Acer" },
            ]}
            selectedValues={selectedBrand}
            onChange={setSelectedBrand}
          />
        </div>
      </div>
      {filters.length > 0 && (
        <span
          className="font-gilroyMedium text-sm tracking-wide flex items-center cursor-pointer text-black"
          onClick={clearAllFilters}
        >
          Clear All
        </span>
      )}
    </div>
  );
}
