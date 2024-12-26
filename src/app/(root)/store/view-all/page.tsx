"use client";
import React, { useState } from "react";
import { Icons } from "@/components/icons";
import CustomDropdown from "../_components/filter-dropdown";

// Generate an array with 20 products dynamically
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

function ViewAllProducts() {
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
    <div className="p-6 flex flex-col gap-9 bg-white">
      {/* Filter Section */}
      <div className="flex items-center justify-between py-2 px-6 w-full bg-[#F4F4F4] rounded-2xl">
        <div className="flex flex-wrap gap-4   items-center justify-start ">
          <h1 className="font-gilroyMedium text-base tracking-wide">
            Filters:
          </h1>
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
        <h1 className="font-gilroyMedium text-base tracking-wide">Clear all</h1>
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap justify-between gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-25px)]"
          >
            {/* Product Image */}
            <div className="py-16 px-5 bg-[#F7F7F7] flex items-center justify-center rounded-3xl">
              <Icons.product_card_image />
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-3 pt-4 px-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl whitespace-nowrap font-gilroySemiBold">
                  {product.title}
                </h2>
                <h2 className="flex items-center gap-1">
                  <Icons.review_star className="size-4" />
                  <span className="text-sm font-gilroyMedium">
                    {product.rating}
                  </span>
                  <span className="text-[#A2A3B1] text-sm font-gilroyMedium">
                    (556)
                  </span>
                </h2>
              </div>
              <p className="text-[#7F7F7F] text-xs font-gilroyMedium">
                {product.description}
              </p>

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-gilroySemiBold">{product.price}</p>
                </div>
                <Icons.product_card_cart />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllProducts;
