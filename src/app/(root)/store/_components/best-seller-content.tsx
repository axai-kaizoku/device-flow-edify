import React from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"; // Icons for slider and cart
import Image from "next/image"; // For optimized images in Next.js
import { Icons } from "@/components/icons";
import { getAllDevicesProp } from "@/server/deviceActions";
import Link from "next/link";

const products = [
  {
    id: 1,
    image: "/images/product1.jpg",
    title: "Mackbook Pro 14",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    price: "$99.99",
    rating: 4.5,
  },
  {
    id: 2,
    image: "/images/product2.jpg",
    title: "Product 2",
    description:
      "ELorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    price: "$149.99",
    rating: 4.7,
  },
  {
    id: 3,
    image: "/images/product3.jpg",
    title: "Product 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    price: "$199.99",
    rating: 4.9,
  },
  {
    id: 4,
    image: "/images/product3.jpg",
    title: "Product 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    price: "$179.99",
    rating: 4.8,
  },
  {
    id: 5,
    image: "/images/product3.jpg",
    title: "Product 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    price: "$189.99",
    rating: 4.7,
  },
];

const BestSellerContent = () => {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft -= 300;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft += 300;
  };

  return (
    <div className="w-full flex justify-center items-center my-8  flex-col">
      {/* Slider */}
      <div className="relative group w-full">
        {/* Left Arrow */}
        <button className="absolute top-1/3 -left-7  z-10" onClick={slideLeft}>
          <Icons.product_card_left_arrow />
        </button>

        {/* Product Cards Container */}
        <div
          id="slider"
          className="flex gap-6 overflow-x-scroll hide-scrollbar scrollbar-hide scroll-smooth w-[1063px]  "
        >
          {products.map((product) => (
            <div key={product.id} className=" ">
              {/* Product Image */}
              <Link href={`/store/${product.id}`}>
                <div className="py-20 px-5 bg-[#F7F7F7] rounded-3xl">
                  <Icons.product_card_image />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl whitespace-nowrap font-gilroySemiBold ">
                      {product.title}"
                    </h2>
                    <h2 className="flex items-center gap-1 justify-center">
                      <Icons.review_star className="size-4" />
                      <span className="text-sm font-gilroyMedium">4.6</span>
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
                      <p className="text-xl flex items-center justify-center font-gilroySemiBold ">
                        {product.price}
                      </p>
                    </div>
                    <Icons.product_card_cart />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute top-1/3 -right-7  z-10"
          onClick={slideRight}
        >
          <Icons.product_card_right_arrow />
        </button>
      </div>
    </div>
  );
};

export default BestSellerContent;
