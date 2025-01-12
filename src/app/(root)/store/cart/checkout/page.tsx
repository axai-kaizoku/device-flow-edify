import { CombinedContainer } from "@/components/container/container";
import { Cart, getCart } from "@/server/cartActions";
import PaymentMethods from "./_components/payment-methods";
import { MoveLeft } from "lucide-react";
import AddressSection from "./_components/addressSection";
import { Address, getAddress } from "@/server/addressActions";
import Image from "next/image";
import { BackBtn } from "./_components/back-btn";

export default async function Checkout() {
  try {
    const cart: Cart = await getCart();
    const allAddresses: Address[] = await getAddress();

    // const cart = {
    //   userId: "66f2a59efb1ea7c81cc967e6",
    //   orgId: "66cdb429eca7ef02552984e7",
    //   addressId: "6704c1de78d41ea73950ea71",
    //   items: [
    //     {
    //       _id: "66f648d0322cbb297dbdc23e",
    //       device_name: "Acer aspire",
    //       device_type: "laptop",
    //       asset_serial_no: "Asset serial no",
    //       serial_no: "EDIFY-5014",
    //       ram: "",
    //       processor: "",
    //       storage: "256GB",
    //       custom_model: "",
    //       brand: "acer",
    //       warranty_status: false,
    //       warranty_expiary_date: null,
    //       ownership: "Not work",
    //       purchase_order: "",
    //       purchase_value: 1899,
    //       payable: 4000,
    //       os: "macos",
    //       image: [
    //         {
    //           url: "https://via.placeholder.com/150/FF0000",
    //           color: "#FF0000",
    //           _id: "6773d0a7d686e3f4dde147bf",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/00FF00",
    //           color: "#00FF00",
    //           _id: "6773d0a7d686e3f4dde147c0",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/0000FF",
    //           color: "#0000FF",
    //           _id: "6773d0a7d686e3f4dde147c1",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/FFFF00",
    //           color: "#FFFF00",
    //           _id: "6773d0a7d686e3f4dde147c2",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/FF00FF",
    //           color: "#FF00FF",
    //           _id: "6773d0a7d686e3f4dde147c3",
    //         },
    //       ],
    //       invoice: null,
    //       deleted_at: null,
    //       device_purchase_date: null,
    //       assigned_at: "2024-11-26T06:50:37.200Z",
    //       userName: "John Doe",
    //       email: "john.doe@example.com",
    //       userId: "66fa877f31b344da460b4cee",
    //       city: "bangalore, kasahanavalli",
    //       addressId: "6704c1de78d41ea73950ea71",
    //       perfectFor: [
    //         {
    //           title: "Tech Team",
    //           _id: "6773de34d686e3f4dde14867",
    //         },
    //         {
    //           title: "Designer Team",
    //           _id: "6773de34d686e3f4dde14868",
    //         },
    //         {
    //           title: "Finance Team",
    //           _id: "6773de34d686e3f4dde14869",
    //         },
    //         {
    //           title: "Operations Team",
    //           _id: "6773de34d686e3f4dde1486a",
    //         },
    //       ],
    //       deviceFeatures: [
    //         {
    //           title: "Screen",
    //           features: [
    //             {
    //               title: "Screen diagonal",
    //               value: '6.7"',
    //               _id: "6773e158d686e3f4dde148e5",
    //             },
    //             {
    //               title: "The screen resolution",
    //               value: "2796x1290",
    //               _id: "6773e158d686e3f4dde148e6",
    //             },
    //             {
    //               title: "The screen refresh rate",
    //               value: "120 Hz",
    //               _id: "6773e158d686e3f4dde148e7",
    //             },
    //             {
    //               title: "The pixel density",
    //               value: "460 ppi",
    //               _id: "6773e158d686e3f4dde148e8",
    //             },
    //             {
    //               title: "Screen type",
    //               value: "OLED",
    //               _id: "6773e158d686e3f4dde148e9",
    //             },
    //             {
    //               title: "Additionally",
    //               value: "HDR display",
    //               _id: "6773e158d686e3f4dde148ea",
    //             },
    //           ],
    //           _id: "6773e158d686e3f4dde148e4",
    //         },
    //         {
    //           title: "CPU",
    //           features: [
    //             {
    //               title: "CPU",
    //               value: "A16 Bionic",
    //               _id: "6773e158d686e3f4dde148ec",
    //             },
    //             {
    //               title: "Number of cores",
    //               value: "6",
    //               _id: "6773e158d686e3f4dde148ed",
    //             },
    //           ],
    //           _id: "6773e158d686e3f4dde148eb",
    //         },
    //       ],
    //       reviews: [
    //         {
    //           _id: "6773d216d686e3f4dde147dc",
    //           comment: "Perfect device",
    //           rating: 5,
    //           createdAt: "2024-12-31T11:14:30.169Z",
    //           updatedAt: "2024-12-31T11:14:30.169Z",
    //           image: "Screenshot 2024-12-23 at 17.08.48.png",
    //           designation: "Backend Developer",
    //           name: "Aniket Prakash",
    //         },
    //         {
    //           _id: "6773d2afd686e3f4dde147e7",
    //           comment: "Perfect device",
    //           rating: 2,
    //           createdAt: "2024-12-31T11:17:03.323Z",
    //           updatedAt: "2024-12-31T11:17:03.323Z",
    //           image: "Screenshot 2024-12-23 at 17.08.48.png",
    //           designation: "Backend Developer",
    //           name: "Aniket Prakash",
    //         },
    //       ],
    //       ratings: [5, 2],
    //       overallReviews: 2,
    //       overallRating: 3.5,
    //       ratingDetails: [
    //         {
    //           stars: 1,
    //           percentage: 0,
    //           reviewsCount: 0,
    //         },
    //         {
    //           stars: 2,
    //           percentage: 50,
    //           reviewsCount: 1,
    //         },
    //         {
    //           stars: 3,
    //           percentage: 0,
    //           reviewsCount: 0,
    //         },
    //         {
    //           stars: 4,
    //           percentage: 0,
    //           reviewsCount: 0,
    //         },
    //         {
    //           stars: 5,
    //           percentage: 50,
    //           reviewsCount: 1,
    //         },
    //       ],
    //       quantity: 1,
    //     },
    //     {
    //       _id: "66f648d0322cbb297dbdc23e",
    //       device_name: "Acer aspire",
    //       device_type: "laptop",
    //       asset_serial_no: "Asset serial no",
    //       serial_no: "EDIFY-5014",
    //       ram: "",
    //       processor: "",
    //       storage: "256GB",
    //       custom_model: "",
    //       brand: "acer",
    //       warranty_status: false,
    //       warranty_expiary_date: null,
    //       ownership: "Not work",
    //       purchase_order: "",
    //       purchase_value: 1899,
    //       payable: 4000,
    //       os: "macos",
    //       image: [
    //         {
    //           url: "https://via.placeholder.com/150/FF0000",
    //           color: "#FF0000",
    //           _id: "6773d0a7d686e3f4dde147bf",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/00FF00",
    //           color: "#00FF00",
    //           _id: "6773d0a7d686e3f4dde147c0",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/0000FF",
    //           color: "#0000FF",
    //           _id: "6773d0a7d686e3f4dde147c1",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/FFFF00",
    //           color: "#FFFF00",
    //           _id: "6773d0a7d686e3f4dde147c2",
    //         },
    //         {
    //           url: "https://via.placeholder.com/150/FF00FF",
    //           color: "#FF00FF",
    //           _id: "6773d0a7d686e3f4dde147c3",
    //         },
    //       ],
    //       invoice: null,
    //       deleted_at: null,
    //       device_purchase_date: null,
    //       assigned_at: "2024-11-26T06:50:37.200Z",
    //       userName: "John Doe",
    //       email: "john.doe@example.com",
    //       userId: "66fa877f31b344da460b4cee",
    //       city: "bangalore, kasahanavalli",
    //       addressId: "6704c1de78d41ea73950ea71",
    //       perfectFor: [
    //         {
    //           title: "Tech Team",
    //           _id: "6773de34d686e3f4dde14867",
    //         },
    //         {
    //           title: "Designer Team",
    //           _id: "6773de34d686e3f4dde14868",
    //         },
    //         {
    //           title: "Finance Team",
    //           _id: "6773de34d686e3f4dde14869",
    //         },
    //         {
    //           title: "Operations Team",
    //           _id: "6773de34d686e3f4dde1486a",
    //         },
    //       ],
    //       deviceFeatures: [
    //         {
    //           title: "Screen",
    //           features: [
    //             {
    //               title: "Screen diagonal",
    //               value: '6.7"',
    //               _id: "6773e158d686e3f4dde148e5",
    //             },
    //             {
    //               title: "The screen resolution",
    //               value: "2796x1290",
    //               _id: "6773e158d686e3f4dde148e6",
    //             },
    //             {
    //               title: "The screen refresh rate",
    //               value: "120 Hz",
    //               _id: "6773e158d686e3f4dde148e7",
    //             },
    //             {
    //               title: "The pixel density",
    //               value: "460 ppi",
    //               _id: "6773e158d686e3f4dde148e8",
    //             },
    //             {
    //               title: "Screen type",
    //               value: "OLED",
    //               _id: "6773e158d686e3f4dde148e9",
    //             },
    //             {
    //               title: "Additionally",
    //               value: "HDR display",
    //               _id: "6773e158d686e3f4dde148ea",
    //             },
    //           ],
    //           _id: "6773e158d686e3f4dde148e4",
    //         },
    //         {
    //           title: "CPU",
    //           features: [
    //             {
    //               title: "CPU",
    //               value: "A16 Bionic",
    //               _id: "6773e158d686e3f4dde148ec",
    //             },
    //             {
    //               title: "Number of cores",
    //               value: "6",
    //               _id: "6773e158d686e3f4dde148ed",
    //             },
    //           ],
    //           _id: "6773e158d686e3f4dde148eb",
    //         },
    //       ],
    //       reviews: [
    //         {
    //           _id: "6773d216d686e3f4dde147dc",
    //           comment: "Perfect device",
    //           rating: 5,
    //           createdAt: "2024-12-31T11:14:30.169Z",
    //           updatedAt: "2024-12-31T11:14:30.169Z",
    //           image: "Screenshot 2024-12-23 at 17.08.48.png",
    //           designation: "Backend Developer",
    //           name: "Aniket Prakash",
    //         },
    //         {
    //           _id: "6773d2afd686e3f4dde147e7",
    //           comment: "Perfect device",
    //           rating: 2,
    //           createdAt: "2024-12-31T11:17:03.323Z",
    //           updatedAt: "2024-12-31T11:17:03.323Z",
    //           image: "Screenshot 2024-12-23 at 17.08.48.png",
    //           designation: "Backend Developer",
    //           name: "Aniket Prakash",
    //         },
    //       ],
    //       ratings: [5, 2],
    //       overallReviews: 2,
    //       overallRating: 3.5,
    //       ratingDetails: [
    //         {
    //           stars: 1,
    //           percentage: 0,
    //           reviewsCount: 0,
    //         },
    //         {
    //           stars: 2,
    //           percentage: 50,
    //           reviewsCount: 1,
    //         },
    //         {
    //           stars: 3,
    //           percentage: 0,
    //           reviewsCount: 0,
    //         },
    //         {
    //           stars: 4,
    //           percentage: 0,
    //           reviewsCount: 0,
    //         },
    //         {
    //           stars: 5,
    //           percentage: 50,
    //           reviewsCount: 1,
    //         },
    //       ],
    //       quantity: 1,
    //     },
    //   ],
    //   totalPrice: 4000,
    //   status: "Processing",
    //   addressDetails: {
    //     _id: "6704c1de78d41ea73950ea71",
    //     userId: "66f4fd33f12d3d8756fcbaf8",
    //     orgId: "66cdb429eca7ef02552984e7",
    //     city: "bangalore, kasahanavalli",
    //     isPrimary: false,
    //     deleted_at: "2024-12-11T09:50:11.726Z",
    //     createdAt: "2024-10-08T05:23:42.732Z",
    //     updatedAt: "2024-12-11T09:50:11.729Z",
    //     __v: 0,
    //   },
    // };
    // const payments: any = await getPaymentMethods(cart?.totalPrice);
    // const allAddresses = [
    //   {
    //     _id: "675ab2d702d5ed70ba4e2fcb",
    //     userId: "66d6b97cee4edded829aa02d",
    //     orgId: "66cdb429eca7ef02552984e7",
    //     title: "HSR Layout",
    //     phone: "9989878967",
    //     landmark: "dsff",
    //     address: "Kasahanavalli Near paradise",
    //     state: "Karnataka",
    //     city: "Bangalore",
    //     pinCode: "560038",
    //     isPrimary: true,
    //     deleted_at: null,
    //     createdAt: "2024-12-12T09:54:31.101Z",
    //     updatedAt: "2025-01-06T13:58:59.223Z",
    //     __v: 0,
    //   },
    //   {
    //     _id: "675ac2dc02d5ed70ba4e312d",
    //     userId: "66d6b97cee4edded829aa02d",
    //     orgId: "66cdb429eca7ef02552984e7",
    //     title: "Main office HSR",
    //     phone: "989988999996777777",
    //     landmark: "",
    //     address:
    //       "Kaikondrahhali, Near polar bearnjj jjjjjaaes seresr ddrtrfytftfty ",
    //     state: "Karnatka",
    //     city: "Bengaluru",
    //     pinCode: "560102",
    //     isPrimary: false,
    //     deleted_at: null,
    //     createdAt: "2024-12-12T11:02:52.911Z",
    //     updatedAt: "2025-01-06T13:58:21.871Z",
    //     __v: 0,
    //   },
    // ];

    return (
      <>
        <div className="flex w-full justify-between h-auto min-h-[71vh] gap-10 bg-white px-8 pb-8">
          <div className="flex flex-col h-full w-[73%]">
            <div className=" flex items-center mt-4 gap-7">
              <BackBtn>
                <MoveLeft className="size-5 cursor-pointer" />
              </BackBtn>

              <div className="flex gap-7 items-center ">
                <div className="font-gilroySemiBold text-xl text-[#17183B]">
                  Address
                </div>
              </div>
            </div>
            <AddressSection cart={cart} allAddresses={allAddresses} />
          </div>

          <div className="border border-[#D1D1D8] rounded-lg h-fit mt-6 pt-5 pb-8 px-8 ">
            {/* border  h-fit mt-6 pb-8 pt-5 px-8 */}
            <div className="flex flex-col gap-4">
              <div className="text-[#17183B] text-[19px] font-gilroyBold min-w-80">
                Order Summary
              </div>

              <div className="flex flex-col gap-4 text-[#17183B] font-gilroyMedium text-base">
                {cart?.items?.map((item, i) => (
                  <div
                    key={i}
                    className="p-[15.25px] flex gap-[15.25px] rounded-[12.391px] bg-[#F6F6F6]"
                  >
                    <div>
                      <img
                        src={item?.image?.[0]?.url ?? "/media/CartProduct.png"}
                        alt="mac"
                        className="size-10 rounded-lg object-cover"
                      />
                      {/* <Image
                        src="/media/CartProduct.png"
                        alt="mac"
                        width={38}
                        height={38}
                        className="rounded-lg object-cover"
                      /> */}
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="font-gilroySemiBold text-black text-[15.25px]">
                        {item?.device_name}
                      </div>
                      <div>
                        <span className="text-[#7F7F7F] text-xs">
                          {item?.quantity} x
                        </span>{" "}
                        <span className="text-sm text-black font-gilroyBold">
                          ₹{item?.payable}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-[15.25px]">
                <div className="flex justify-between items-center">
                  <span className="font-gilroySemiBold text-[15.25px]">
                    Subtotal
                  </span>
                  <span className="font-gilroySemiBold">
                    ₹{cart?.totalPrice}
                  </span>
                </div>

                <div className="flex flex-col gap-[7.63px] font-gilroyMedium">
                  <div className="flex justify-between items-center">
                    <span className=" text-[15.25px] text-[#545454]">
                      Estimated Tax
                    </span>
                    <span className="font-gilroySemiBold">₹0</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className=" text-[15.25px] text-[#545454]">
                      Estimated shipping & Handling
                    </span>
                    <span className="font-gilroySemiBold">₹0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className=" text-[15.25px] text-[#545454]">
                      Shipment method
                    </span>
                    <span className="font-gilroySemiBold text-[#3AA39F]">
                      Free
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-[#D1D1D8] w-full"></div>

                <div className="flex flex-col gap-6 text-[#17183B] font-gilroyMedium text-base">
                  <div className="flex justify-between items-center font-gilroyBold">
                    <span>Total</span>
                    <span className="font-gilroyBold text-lg">
                      ₹{cart?.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {cart?.items?.length !== 0 && (
                <div className="flex justify-center items-center w-full">
                  <PaymentMethods
                    // data={payments}
                    price={cart?.totalPrice}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
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
