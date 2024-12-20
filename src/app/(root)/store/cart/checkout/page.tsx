import { CombinedContainer } from "@/components/container/container";
import { getCart, getPaymentMethods } from "@/server/cartActions";
import Link from "next/link";
import PaymentMethods from "./_components/payment-methods";
import { CheckCircle } from "lucide-react";
import AddressSection from "./_components/addressSection";
import { Address, getAddress } from "@/server/addressActions";

export default async function Checkout() {
  try {
    const cart: any = await getCart();
    const payments: any = await getPaymentMethods(cart.totalPrice);
    const allAddresses: Address[] = await getAddress();

    return (
      <CombinedContainer title="Checkout">
        {/* Page Title */}
        <h1 className="text-3xl font-gilroySemiBold tracking-wide text-gray-800 dark:text-gray-200">
          Your Shopping Cart
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Items you&apos;ve added to your cart
        </p>

        {/* Back to Cart Link */}
        <div className="mt-6">
          <Link
            href="/store/cart"
            className="inline-block p-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Cart
          </Link>
        </div>

        <div className="flex mt-8 gap-8">
          {/* Cart Items */}
          <div className="w-2/3">
            <h2 className="text-xl font-gilroySemiBold text-gray-800 dark:text-gray-200">
              Order Summary
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-4">
              {cart.items.map((item: any, i: any) => (
                <div
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 py-4"
                >
                  <h3 className="text-lg font-gilroyMedium text-gray-700 dark:text-gray-300">
                    {item.device_name} - {item.device_type}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Brand: {item.brand} | Serial No: {item.serial_no}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Quantity: {item.quantity} | Price: ₹
                    {(item.payable * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="text-lg font-gilroySemiBold text-right mt-4">
                Total Price: ₹{cart.totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Payment Methods & Address */}
          <div className="w-1/3 flex flex-col gap-6">
            {/* Address Details */}
            <AddressSection cart={cart} allAddresses={allAddresses} />
            {/* Payment Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-gilroySemiBold text-gray-800 dark:text-gray-200">
                Payment Methods
              </h2>
              <PaymentMethods data={payments} price={cart.totalPrice} />
            </div>
          </div>
        </div>
      </CombinedContainer>
    );
  } catch (error) {
    return (
      <CombinedContainer title="Checkout">
        <div className="flex flex-col items-center text-center space-y-6 mt-16">
          <p className="text-red-600">Some Error Occurred!</p>
        </div>
      </CombinedContainer>
    );
  }
}
