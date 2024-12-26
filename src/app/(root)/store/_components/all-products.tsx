"use client";

import { useState, useEffect } from "react";
import { Tab } from "../../teams/_components/Tab";
import Spinner from "@/components/Spinner";
import BestSellerContent from "./best-seller-content";
import { getAllDevicesProp } from "@/server/deviceActions";
import Link from "next/link";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center w-full py-5 p-24 bg-white">
      {/* Section Title */}
      <h1 className="font-gilroySemiBold text-4xl py-8">All Products</h1>

      {/* Tab Content */}
      <div className="mt-6 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <Spinner />
          </div>
        ) : (
          <div>
            <BestSellerContent />
          </div>
        )}
      </div>
      <div className="flex justify-center items-center py-14 w-full">
        <Link href={"/store/view-all"}>
          <button
            type="button"
            className="bg-black text-white rounded-sm w-60 py-2 font-gilroySemiBold text-base"
          >
            View All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;
