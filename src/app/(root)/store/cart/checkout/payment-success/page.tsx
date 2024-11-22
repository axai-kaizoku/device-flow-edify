import { CombinedContainer } from '@/components/container/container'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PaymentSuccess = () => {
    return (
        <CombinedContainer title="Checkout">
            <div className="flex flex-col items-center text-center space-y-6 mt-16">
                {/* Success Icon and Message */}
                <CheckCircle className="text-green-500 text-7xl animate-pulse" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    Payment Successful!
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Thank you for your purchase. Your order has been successfully
                    placed.
                </p>

                {/* Navigation Options */}
                <div className="flex space-x-4 mt-8">
                    <Link
                        href="/store"
                        className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105">
                        Back to Store
                    </Link>
                    <Link
                        href="/assets?tab=new"
                        className="px-6 py-3 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all transform hover:scale-105">
                        View Newly Added Devices
                    </Link>
                </div>
            </div>
        </CombinedContainer>
    );
}

export default PaymentSuccess