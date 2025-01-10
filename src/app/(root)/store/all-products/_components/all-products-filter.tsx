"use client";

import { useState } from "react";
import CustomDropdown from "../../_components/filter-dropdown";
import { MoveLeft } from "lucide-react";
import { BackBtn } from "../../cart/checkout/_components/back-btn";

const products = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  image: `/images/product${(index % 3) + 1}.jpg`, // Cycle through product images
  title: `Product ${index + 1}`,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  price: `$${(99.99 + index * 10).toFixed(2)}`, // Increment price for variety
  ram: `${[4, 6, 8, 12][index % 4]}GB`, // Dynamic RAM options
  storage: `${[128, 256, 512][index % 3]}GB`, // Dynamic Storage options
  brand: ["Apple", "Samsung", "OnePlus", "Google"][index % 4], // Dynamic Brand options
  rating: (4.5 + (index % 5) * 0.1).toFixed(1), // Increment rating for variety
}));
export default function AllProductsFilter({ setData }: { setData?: any }) {
  const [selectedRam, setSelectedRam] = useState<string[]>([]);
  const [selectedStorage, setSelectedStorage] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string[]>([]);

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesRam =
      selectedRam.length === 0 || selectedRam.includes(product.ram);
    const matchesStorage =
      selectedStorage.length === 0 || selectedStorage.includes(product.storage);
    const matchesBrand =
      selectedBrand.length === 0 || selectedBrand.includes(product.brand);
    return matchesRam && matchesStorage && matchesBrand;
  });

  return (
    <div className="flex items-center justify-between py-2 px-6 w-full bg-[#F4F4F4] rounded-2xl">
      <div className="flex flex-wrap gap-4   items-center justify-start ">
        <BackBtn className="pr-3">
          <MoveLeft className="size-5 cursor-pointer" />
        </BackBtn>
        <h1 className="font-gilroyMedium text-base tracking-wide">Filters:</h1>
        <div className="flex gap-2.5">
          <CustomDropdown
            label="RAM"
            options={[
              { value: "4GB", label: "4GB" },
              { value: "6GB", label: "6GB" },
              { value: "8GB", label: "8GB" },
              { value: "12GB", label: "12GB" },
            ]}
            selectedValues={selectedRam}
            onChange={setSelectedRam}
          />
          <CustomDropdown
            label="Storage"
            options={[
              { value: "128GB", label: "128GB" },
              { value: "256GB", label: "256GB" },
              { value: "512GB", label: "512GB" },
            ]}
            selectedValues={selectedStorage}
            onChange={setSelectedStorage}
          />
          <CustomDropdown
            label="Storage"
            options={[
              { value: "128GB", label: "128GB" },
              { value: "256GB", label: "256GB" },
              { value: "512GB", label: "512GB" },
            ]}
            selectedValues={selectedStorage}
            onChange={setSelectedStorage}
          />
          <CustomDropdown
            label="Storage"
            options={[
              { value: "128GB", label: "128GB" },
              { value: "256GB", label: "256GB" },
              { value: "512GB", label: "512GB" },
            ]}
            selectedValues={selectedStorage}
            onChange={setSelectedStorage}
          />
          <CustomDropdown
            label="Storage"
            options={[
              { value: "128GB", label: "128GB" },
              { value: "256GB", label: "256GB" },
              { value: "512GB", label: "512GB" },
            ]}
            selectedValues={selectedStorage}
            onChange={setSelectedStorage}
          />
          <CustomDropdown
            label="Brand"
            options={[
              { value: "Apple", label: "Apple" },
              { value: "Samsung", label: "Samsung" },
              { value: "OnePlus", label: "OnePlus" },
              { value: "Google", label: "Google" },
            ]}
            selectedValues={selectedBrand}
            onChange={setSelectedBrand}
          />
        </div>
      </div>
      <h6 className="font-gilroyMedium text-sm tracking-wide flex items-center">
        <div className="cursor-pointer">Clear all</div>
      </h6>
    </div>
  );
}
