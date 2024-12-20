import { CombinedContainer } from "@/components/container/container";
import { CartItem } from "./_components/cart-item";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { DeviceWithQty, getCart } from "@/server/cartActions";

export default async function Cart() {
  const cart = await getCart();

  return (
    <CombinedContainer title="Cart">
      <h1 className="text-2xl font-gilroySemiBold tracking-wide text-gray-800 dark:text-gray-200">
        Your Shopping Cart
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        Items you&apos;ve added to your cart
      </p>
      <div className="h-10" />
      <Link
        href="/store"
        className="inline-block text-xs p-1.5 w-fit rounded-md text-white bg-gray-600 hover:bg-gray-700 transition-colors"
      >
        Back to Store
      </Link>
      <div className="h-10" />

      <div className="flex sm:flex-row flex-col w-full h-full justify-evenly">
        <div className="flex sm:w-[60%] w-full flex-col gap-6">
          {cart.items.length > 0 ? (
            cart.items.map((data: DeviceWithQty, i) => (
              <CartItem key={i} data={data} />
            ))
          ) : (
            <div className="text-gray-700 dark:text-gray-300">
              No items in cart :(
            </div>
          )}
        </div>
        <div className="w-full flex justify-end items-center sm:w-[30%] h-full">
          <div className="w-full rounded-lg bg-gray-100 dark:bg-gray-800 h-full p-6">
            <h2 className="text-lg font-gilroySemiBold mb-4 dark:text-gray-100">
              Order Summary
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>
                  {cart.items.reduce(
                    (acc, item: DeviceWithQty) => acc + item.quantity!,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cart.totalPrice}</span>
              </div>
              <div className="border-t mt-4 pt-2 flex justify-between font-gilroySemiBold dark:text-gray-100">
                <span>Total</span>
                <span>₹{cart.totalPrice}</span>
              </div>
            </div>
            {cart.items.length !== 0 && (
              <Link
                href="/store/cart/checkout"
                className="p-2 rounded-md w-full mt-6 text-white bg-muted-foreground dark:bg-blue-600 hover:bg-muted-foreground/90 dark:hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </CombinedContainer>
  );
}

export const CartComponent = async () => {
  const cart = await getCart();
  const totalQty = cart.items.reduce(
    (acc, item: DeviceWithQty) => acc + item.quantity!,
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
