"use client";
import { StoreDevice } from "@/server/deviceActions";
import { DeviceDetailedSecx } from "./device-detail-secx";
import { DeviceReviewsSecx } from "./device-review-secx";
import { DeviceSecx } from "./device-secx";
import { PerfectForSecx } from "./perfect-for-secx";
import { Cart, DeviceWithQty } from "@/server/cartActions";

export default function StoreDeviceMain({
  data,
  cart,
}: {
  data: StoreDevice;
  cart: Cart;
}) {
  // const data = {
  //   _id: "66f648d0322cbb297dbdc23e",
  //   device_name: "Acer aspire",
  //   device_type: "laptop",
  //   asset_serial_no: "Asset serial no",
  //   serial_no: "EDIFY-5014",
  //   ram: "",
  //   processor: "",
  //   storage: ["256GB"],
  //   custom_model: "",
  //   brand: "acer",
  //   warranty_status: false,
  //   warranty_expiary_date: null,
  //   ownership: "Not work",
  //   purchase_order: "",
  //   purchase_value: 1899,
  //   payable: 4000,
  //   os: "macos",
  //   image: [
  //     {
  //       url: "https://via.placeholder.com/150/FF0000",
  //       color: "#FF0000",
  //       _id: "6773d0a7d686e3f4dde147bf",
  //     },
  //     {
  //       url: "https://via.placeholder.com/150/00FF00",
  //       color: "#00FF00",
  //       _id: "6773d0a7d686e3f4dde147c0",
  //     },
  //     {
  //       url: "https://via.placeholder.com/150/0000FF",
  //       color: "#0000FF",
  //       _id: "6773d0a7d686e3f4dde147c1",
  //     },
  //     {
  //       url: "https://via.placeholder.com/150/FFFF00",
  //       color: "#FFFF00",
  //       _id: "6773d0a7d686e3f4dde147c2",
  //     },
  //     {
  //       url: "https://via.placeholder.com/150/FF00FF",
  //       color: "#FF00FF",
  //       _id: "6773d0a7d686e3f4dde147c3",
  //     },
  //   ],
  //   invoice: null,
  //   deleted_at: null,
  //   device_purchase_date: null,
  //   assigned_at: "2024-11-26T06:50:37.200Z",
  //   userName: "John Doe",
  //   email: "john.doe@example.com",
  //   userId: "66fa877f31b344da460b4cee",
  //   city: "bangalore, kasahanavalli",
  //   addressId: "6704c1de78d41ea73950ea71",
  //   perfectFor: [
  //     {
  //       title: "Tech Team",
  //       _id: "6773de34d686e3f4dde14867",
  //     },
  //     {
  //       title: "Designer Team",
  //       _id: "6773de34d686e3f4dde14868",
  //     },
  //     {
  //       title: "Finance Team",
  //       _id: "6773de34d686e3f4dde14869",
  //     },
  //     {
  //       title: "Operations Team",
  //       _id: "6773de34d686e3f4dde1486a",
  //     },
  //   ],
  //   deviceFeatures: [
  //     {
  //       title: "Screen",
  //       features: [
  //         {
  //           title: "Screen diagonal",
  //           value: '6.7"',
  //           _id: "6773e158d686e3f4dde148e5",
  //         },
  //         {
  //           title: "The screen resolution",
  //           value: "2796x1290",
  //           _id: "6773e158d686e3f4dde148e6",
  //         },
  //         {
  //           title: "The screen refresh rate",
  //           value: "120 Hz",
  //           _id: "6773e158d686e3f4dde148e7",
  //         },
  //         {
  //           title: "The pixel density",
  //           value: "460 ppi",
  //           _id: "6773e158d686e3f4dde148e8",
  //         },
  //         {
  //           title: "Screen type",
  //           value: "OLED",
  //           _id: "6773e158d686e3f4dde148e9",
  //         },
  //         {
  //           title: "Additionally",
  //           value: "HDR display",
  //           _id: "6773e158d686e3f4dde148ea",
  //         },
  //       ],
  //       _id: "6773e158d686e3f4dde148e4",
  //     },
  //     {
  //       title: "CPU",
  //       features: [
  //         {
  //           title: "CPU",
  //           value: "A16 Bionic",
  //           _id: "6773e158d686e3f4dde148ec",
  //         },
  //         {
  //           title: "Number of cores",
  //           value: "6",
  //           _id: "6773e158d686e3f4dde148ed",
  //         },
  //       ],
  //       _id: "6773e158d686e3f4dde148eb",
  //     },
  //   ],
  //   reviews: [
  //     {
  //       _id: "6773d216d686e3f4dde147dc",
  //       comment: "Perfect device",
  //       rating: 5,
  //       createdAt: "2024-12-31T11:14:30.169Z",
  //       updatedAt: "2024-12-31T11:14:30.169Z",
  //       image: "Screenshot 2024-12-23 at 17.08.48.png",
  //       designation: "Backend Developer",
  //       name: "Aniket Prakash",
  //     },
  //     {
  //       _id: "6773d2afd686e3f4dde147e7",
  //       comment: "Perfect device",
  //       rating: 2,
  //       createdAt: "2024-12-31T11:17:03.323Z",
  //       updatedAt: "2024-12-31T11:17:03.323Z",
  //       image: "Screenshot 2024-12-23 at 17.08.48.png",
  //       designation: "Backend Developer",
  //       name: "Aniket Prakash",
  //     },
  //   ],
  //   ratings: [5, 2],
  //   overallReviews: 2,
  //   overallRating: 3.5,
  //   ratingDetails: [
  //     {
  //       stars: 1,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 2,
  //       percentage: 50,
  //       reviewsCount: 1,
  //     },
  //     {
  //       stars: 3,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 4,
  //       percentage: 0,
  //       reviewsCount: 0,
  //     },
  //     {
  //       stars: 5,
  //       percentage: 50,
  //       reviewsCount: 1,
  //     },
  //   ],
  // };

  return (
    <>
      <div className="flex flex-col bg-[#fff] font-gilroyRegular">
        <DeviceSecx data={data} cart={cart} />
        <PerfectForSecx data={data} />
        <DeviceDetailedSecx data={data} />
        <DeviceReviewsSecx data={data} />
      </div>
    </>
  );
}
