// "use client";
// import { getStoreDevices, searchStoreDevices } from "@/server/storeActions";
// import { Cart, DeviceWithQty, getCart } from "@/server/cartActions";
// import { StoreDeviceCard } from "../_components/store-device-card";
// import { AllProductsMain } from "./_components/main";
// import { useEffect, useState } from "react";
// import { StoreDevice } from "@/server/deviceActions";
// import Spinner from "@/components/Spinner";

// export default async function AllProducts() {
//   const [data, setData] = useState<StoreDevice[]>([]);
//   const [cart, setCart] = useState<Cart>();
//   const [loading, setLoading] = useState(false);
//   // const data = await getStoreDevices();
//   // const cart = await getCart();

//   useEffect(() => {
//     url = get('q')
//     const fetch = async () => {
//       setLoading(true);
//       const res = await searchStoreDevices({ searchQuery: url });
//       const cartt = await getCart();
//       setCart(cartt);
//       setData(res);
//       setLoading(false);
//     };
//     fetch();
//   }, []);

//   const findItemQuantityById = (itemId: string): number => {
//     if (cart?.items?.length > 0) {
//       //@ts-ignore
//       return cart.items.reduce((acc: number, item: DeviceWithQty) => {
//         return item._id === itemId ? acc + (item.quantity || 0) : acc;
//       }, 0);
//     }
//     return 0; // Return 0 if there are no items in the cart
//   };

//   return (
//     <div className="py-6 px-[5.5rem] flex flex-col gap-9 bg-white">
//       {/* <AllProductsFilter /> */}
//       {!loading ? (
//         data?.map((product) => {
//           const res = findItemQuantityById(product?._id ?? "");
//           return (
//             <StoreDeviceCard key={product._id} product={product} res={res} />
//           );
//         })
//       ) : (
//         <Spinner />
//       )}
//       {/* <div className="grid grid-cols-4 gap-x-10 gap-y-8 w-full">

//         {data?.map((product) => {
//           const res = findItemQuantityById(product?._id ?? "");
//           return (
//             <StoreDeviceCard
//               key={`${product._id}-unique`}
//               product={product}
//               res={res}
//             />
//           );
//         })}
//       </div> */}
//       {/* <AllProductsMain cart={cart} data={data} /> */}
//       <div className="pointer-events-none h-[5.5rem] w-full" />
//     </div>
//   );
// }
"use client";
import { getStoreDevices, searchStoreDevices } from "@/server/storeActions";
import { Cart, DeviceWithQty, getCart } from "@/server/cartActions";
import { StoreDeviceCard } from "../_components/store-device-card";
import { useEffect, useState } from "react";
import { StoreDevice } from "@/server/deviceActions";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import AllProductsFilter from "./_components/all-products-filter";

export default function AllProducts() {
  const [data, setData] = useState<StoreDevice[]>([]);
  const [cart, setCart] = useState<Cart>();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await searchStoreDevices({ searchQuery });
        const cartData = await getCart();
        setData(products);
        setCart(cartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const findItemQuantityById = (itemId: string): number => {
    return (
      cart?.items?.reduce((acc: number, item: DeviceWithQty) => {
        return item._id === itemId ? acc + (item.quantity || 0) : acc;
      }, 0) || 0
    );
  };

  return (
    <div className="py-6 px-[5.5rem] flex flex-col gap-9 bg-white">
      <AllProductsFilter setData={setData} />
      {!loading ? (
        data.length > 0 ? (
          <div className="grid grid-cols-4 gap-x-10 gap-y-8 w-full ">
            {data.map((product) => {
              const quantity = findItemQuantityById(product._id ?? "");
              return (
                <StoreDeviceCard
                  key={product._id}
                  product={product}
                  res={quantity}
                />
              );
            })}
          </div>
        ) : (
          <p>No products found.</p>
        )
      ) : (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="pointer-events-none h-[5.5rem] w-full" />
    </div>
  );
}
