'use client'
import { Address } from '@/server/addressActions';
import { updateCartAddress } from '@/server/cartActions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface AddressSectionProps {
    cart?: any;
    allAddresses: Address[];
  }


const AddressSection = ({cart, allAddresses}:AddressSectionProps) => {
    const [flag, setFlag] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(cart?.addressDetails?._id);
    const router = useRouter();

    const handleAddressChange = async (addressId:string) => {
        try {          
            const updateResponse = await updateCartAddress(addressId);
            setFlag(false);
            router.refresh();
        } catch (error) {
          console.error("Error updating address:", error);
        }
      };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {flag === false ? (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Shipping Address
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            City: {cart?.addressDetails?.city}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Is Primary: {cart?.addressDetails?.isPrimary ? 'Yes' : 'No'}
          </p>
          <button
            className="inline-block p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-4"
            onClick={() => setFlag(true)}
          >
            Change Address
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Select a Shipping Address
          </h2>
          {allAddresses.map((address:Address) => (
            <label
              key={address._id}
              className="flex items-center mb-2 cursor-pointer"
            >
              <input
                type="radio"
                name="address"
                value={address._id}
                checked={selectedAddressId === address._id}
                onChange={() => {
                    setSelectedAddressId(address._id);
                }}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">{address.city}</span>
            </label>
          ))}
          <div className='flex justify-start gap-6'>
            <button
                className="inline-block p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-4"
                onClick={() => handleAddressChange(selectedAddressId)}
            >
                Update
            </button>

            <button
                className="inline-block p-2 rounded-md text-white bg-gray-500 hover:bg-gray-600 transition-colors mt-4"
                onClick={() => {
                    setSelectedAddressId(cart.addressDetails._id);
                    setFlag(false);
                }}
            >
                Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressSection