"use client";
import { Address } from "@/server/addressActions";
import { updateCartAddress } from "@/server/cartActions";
import { Plus } from "lucide-react";
import { notFound, useRouter } from "next/navigation";
import React, { useState } from "react";

interface AddressSectionProps {
  cart?: any;
  allAddresses: Address[];
}

const AddressSection = ({ cart, allAddresses }: AddressSectionProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState(
    cart?.addressDetails?._id
  );
  const router = useRouter();

  const handleAddressChange = async (addressId: string) => {
    try {
      const updateResponse = await updateCartAddress(addressId);
      router.refresh();
    } catch (error) {
      notFound();
    }
  };

  return (
    <div className="bg-white mt-12">
        <div>
          {allAddresses?.map((address: Address, i:number) => (
            <div className="flex flex-col" key={address?._id}>
              <div
                key={address?._id}
                className="flex items-start group"
              >
                <div className="flex items-start w-full">
                  <input
                    type="radio"
                    name="address"
                    value={address?._id}
                    checked={selectedAddressId === address?._id}
                    onChange={() => {
                      setSelectedAddressId(address?._id);
                      handleAddressChange(address?._id)
                      router.refresh();
                    }}
                    className="mr-3 accent-black w-6 h-6 mt-1"
                  />
                  
                  <div className="flex flex-col w-full cursor-pointer">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex gap-2 items-center">
                        <div className="font-gilroySemiBold text-2xl text-[#17183B]">
                          {address?.title}
                        </div>
                        
                        {address?.isPrimary && (
                          <div className="rounded-[4px] border border-[#027A48] p-1 text-xs text-[#027A48] font-gilroySemiBold">
                            PRIMARY
                          </div>
                        )}
                        
                      </div>

                      <div className="cursor-pointer text-black text-base font-gilroySemiBold">Edit</div>
                    </div>

                    <div className="font-gilroyMedium text-base text-[#17183B] mt-4">
                    {`${address?.address}, ${address?.landmark}, ${address?.city}, ${address?.state}, ${address?.pinCode}`}
                    </div>

                    <div className="font-gilroyMedium text-base text-[#17183B] mt-3">
                      <span className="font-semibold">Contact</span> - {address?.phone}
                    </div>
                  </div>
                </div>

              </div>

              {i < allAddresses?.length - 1 && allAddresses?.length > 1 && (
                    <div className="h-[1px] bg-[#D1D1D8] w-full my-[27px]"></div>
              )}
              
            </div>
          ))}

            <div className="h-[1px] bg-[#D1D1D8] w-full my-8"></div>

            <div className="flex items-center gap-4 ml-6 group cursor-pointer" onClick={()=>{ router.push('/settings');}}>
              <div><Plus className="size-6"/></div>
              <div className="text-base font-gilroySemiBold text-black">Add New Address</div>
            </div>
        
        </div>
    </div>
  );
};

export default AddressSection;
