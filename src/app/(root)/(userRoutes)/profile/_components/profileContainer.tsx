'use client';
import { Tab } from "@/app/(root)/assets/_components/Tab";
import { Button } from "@/components/wind/Buttons"
import { useState } from "react";
import Personal from "./personalSection";
import Work from "./workSection";
import Document from "./documentSection";
import { Pencil } from "lucide-react";

// import { Input } from "@/components/wind/Input";

const ProfileContainer = () => {
    const [activeTab, setActiveTab] = useState('Personal');
    const [isEditing, setIsEditing] = useState(false); 
    const [userInfo, setUserInfo] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe12@gmail.com",
        phone: "9985746956",
        city: "Bengaluru",
        stateCountry: "Karnataka, India",
        pincode: "208001",
        country: "India",
        employeeNo: 12345,
        role: "Software Developer",
        reportingManager: "Jay Jenkins",
        joiningDate: "01-07-2017",
        department: "Tech",
        bio:"This is About me.",
        profileImage:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
        adhaar:"https://indiadarpan.com/wp-content/uploads/2018/10/Aadhaar-Card-sample.png"
    });

    // Handling input changes during edit
    const handleInputChange = (field: string, value: string) => {
        setUserInfo({
            ...userInfo,
            [field]: value
        });
    };

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserInfo({
                ...userInfo,
                profileImage: imageUrl
            });
        }
    };


    // Toggle between editing and saving - Update
    const handleEditClick = () => {
        if (isEditing) {
            // When clicking 'Update', stop editing
            setIsEditing(false);
        } else {
            // Enable edit mode
            setIsEditing(true);
        }
    };

    // For Rendering Tabs
    const renderContent = () => {
        if (activeTab === 'Personal') {
            return <Personal isEditing={isEditing} userInfo={userInfo} onInputChange={handleInputChange} />;
        }
        else if(activeTab === 'Work') {
            return <Work userInfo={userInfo}/>
        }
        else{
            return <Document userInfo={userInfo}/>
        }
    };

    return (
        <div className="flex justify-between w-full gap-8">

            {/* Left Section */}
            <div className="flex flex-col gap-6  p-6 shadow-lg rounded-md">
                <div className="w-52 h-52 overflow-hidden rounded-full relative border">
                    <div
                        onClick={() => document.getElementById('profileImageInput')?.click()}
                        className="absolute right-20 z-20 -bottom-1 w-10 h-10 rounded-full bg-white flex justify-center items-center cursor-pointer"
                    >
                        <Pencil style={{ fontSize: "16px" }} />
                    </div>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="profileImageInput"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    <img
                        src={userInfo.profileImage}
                        alt="profile image"
                        className="rounded-full object-cover object-top w-full h-full"
                    />
                </div> 

                <div className="user-name-container rounded-md flex flex-col text-center gap-4">
                    <div className="user-name font-bold">
                        {userInfo.firstName} {userInfo.lastName}
                    </div>

                    <div className="designation">
                        <h1 className="text-slate-500">Software Developer</h1>
                    </div>
                </div>

                <hr />
            </div>

            {/* Right Section */}

            <div className="flex flex-col flex-auto shadow-md p-5">
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-10">
                        <Tab
                            active={activeTab === 'Personal'}
                            onClick={() => setActiveTab('Personal')}
                            iconType="OutlinedLaptop"
                            label="Personal"
                        />
                        <Tab
                            active={activeTab === 'Work'}
                            onClick={() => setActiveTab('Work')}
                            iconType="OutlinedStore"
                            label="Work"
                        />

                        <Tab
                            active={activeTab === 'Document'}
                            onClick={() => setActiveTab('Document')}
                            iconType="OutlinedStore"
                            label="Documents"
                        />
                    </div>

                    {activeTab === "Personal" && 
                        <div>
                            <Button
                                onClick={handleEditClick}
                                focusColor="black"
                                color="black"
                                hoverColor="gray"
                            >
                                {isEditing ? "Update" : "Edit Profile"}
                            </Button>
                        </div>
                    }
                </div>

                <div className="mt-4">{renderContent()}</div>
            </div>
            
        </div>
    );
}

export default ProfileContainer;