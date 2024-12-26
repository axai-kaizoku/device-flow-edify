import { Icons } from "@/components/icons";
import React from "react";

function StoreNavbar() {
  return (
    <>
      <div className="h-24 px-24 sticky z-[100] top-0 bg-white  flex items-center justify-between w-full rounded-tr-3xl rounded-tl-3xl">
        <div>
          <Icons.product_logo />
        </div>
        <div className="flex text-lg font-gilroySemiBold text-black gap-12">
          <h1>Category</h1>
          <h1>Bestsellers</h1>
          <h1>Teams</h1>
        </div>
        <div className="flex items-center justify-center gap-12">
          <Icons.product_cart />
          <Icons.store_search />
        </div>
      </div>
    </>
  );
}

export default StoreNavbar;
