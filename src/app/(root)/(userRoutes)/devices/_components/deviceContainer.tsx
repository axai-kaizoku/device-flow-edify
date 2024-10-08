'use client';

import { useState } from "react";
import Devices from "./devicesPage";
import Issue from "./issuePage";
import { Tab } from "@/app/(root)/assets/_components/Tab";
import { DeviceResponse } from "@/server/deviceActions";

const DeviceContainer = ({devices, issues}:any) => {
    const [activeTab, setActiveTab] = useState('devices');

    // For Rendering Tabs
    const renderContent = () => {
        if (activeTab === 'devices') {
            return <Devices devices={devices}/>;
        }
        else if(activeTab === 'issues') {
            return <Issue issues={issues}/>
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
