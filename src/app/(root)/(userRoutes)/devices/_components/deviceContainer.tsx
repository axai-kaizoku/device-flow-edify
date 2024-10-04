'use client';

import { useState } from "react";
import Devices from "./devicesPage";
import Issue from "./issuePage";
import { Tab } from "@/app/(root)/assets/_components/Tab";

const DeviceContainer = () => {
    const [activeTab, setActiveTab] = useState('devices');
    const devices = [
        {
            id:123,
            deviceImg:"https://images.firstpost.com/wp-content/uploads/2020/11/Apple_macbook-air.jpg",
            device_name:"MacBook Air M1",
            serial_no: "EDIFY-6367"
        },
        {
            id:124,
            deviceImg:"https://brain-images-ssl.cdn.dixons.com/2/0/10185702/u_10185702.jpg",
            device_name:"BenQ 32 inches Monitor",
            serial_no: "EDIFY-6352"
        }
    ];

    // For Rendering Tabs
    const renderContent = () => {
        if (activeTab === 'devices') {
            return <Devices />;
        }
        else if(activeTab === 'issues') {
            return <Issue />
        }
    };



  return (
    <div className="flex flex-col w-full ">
        <div className="flex flex-col flex-auto">
            <div className="flex justify-between items-center w-full">
                <div className="flex gap-10">
                    <Tab
                        active={activeTab === 'devices'}
                        onClick={() => setActiveTab('devices')}
                        iconType="OutlinedLaptop"
                        label="Your Devices"
                    />

                    <Tab
                        active={activeTab === 'issues'}
                        onClick={() => setActiveTab('issues')}
                        iconType="OutlinedStore"
                        label="Issues"
                    />
                </div>
            </div>

            <div className="mt-6">{renderContent()}</div>
        </div>
        
    </div>
  )
}

export default DeviceContainer