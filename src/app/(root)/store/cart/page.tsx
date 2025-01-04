import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { DeviceWithQty, getCart } from "@/server/cartActions";
import CartMain from "./_components/cart-main";

export default async function Cart() {
  const cart: any = await getCart();
  
  return (
    <>
      <CartMain cart={cart} />
    </>
  );
}

export const CartComponent = async () => {
  const cart = await getCart();
  const totalQty = cart.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item?.quantity!,
    0
  );
  return (
    <Link href="/store/cart" className="relative p-2 rounded-full">
      <div className="w-4 h-4 absolute top-1 right-0 rounded-full bg-slate-600 text-white flex justify-center items-center text-xs">
        {totalQty}
      </div>
      <ShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-200 cursor-pointer hover:text-gray-800 dark:hover:text-white transition" />
    </Link>
  );
};
