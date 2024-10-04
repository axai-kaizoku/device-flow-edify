'use client';
import { Tab } from "@/app/(root)/assets/_components/Tab";
import { Button } from "@/components/wind/Buttons"
import { useState } from "react";
import Personal from "./personalSection";
import Work from "./workSection";
import Document from "./documentSection";
import { Pencil } from "lucide-react";
import { User } from "@/server/userActions";

// import { Input } from "@/components/wind/Input";

const ProfileContainer = ({user}:{user:User}) => {
    const [activeTab, setActiveTab] = useState('Personal');
    const [isEditing, setIsEditing] = useState(false); 
    
    const [userInfo, setUserInfo] = useState({
        _id: "66fe83c9ced3fd24632800ec",
        designation:"Software Developer",
        image:"",
        first_name: "John",
        last_name: "Doe",
        about: "Some details",
        interests_and_hobbies: "Reading, Hiking",
        date_of_birth: "1990-01-01T00:00:00.000Z",
        gender: "Male",
        marital_status: "Single",
        physically_handicapped: "No",
        password: "winuall123",
        email: "john@winuall.come",
        phone: "sfggffdg",
        orgId: {
          deleted_at: null,
          _id: "66cdb429eca7ef02552984e7",
          name: "Winuall",
          legal_entity_name: "Edify by Winuall",
          office_address: [
            {
              address: "Ghaziabad delhi",
              phone: 8709139553,
              is_primary: true,
              image: "",
              _id: "66cdb429eca7ef02552984e8"
            }
          ],
          logo: "",
          __v: 0,
          email: "akshay.y@winuall.com"
        },
        role: "1",
        reporting_manager: {
          deleted_at: null,
          _id: "66f2b4abfb1ea7c81cc967ef",
          first_name: "Ayush",
          last_name: "Jhanwar",
          password: "$2b$10$a15xbHMU8TWRxaYvNjXKieeclTjCc9pl8QfFhmoRFLiu8.zBchvIK",
          email: "ayush.jhanwar@winuall.com",
          phone: "9659192919",
          orgId: "66cdb429eca7ef02552984e7",
          role: "1",
          employment_type: "Full-time",
          created_at: "2024-09-03T07:23:40.696Z",
          reporting_manager: "66f2a59efb1ea7c81cc967e6",
          __v: 0,
          date_of_birth: "2024-10-04T00:00:00.000Z",
          onboarding_date: "2024-10-04T00:00:00.000Z",
          teamId: "66f657965405df8b0ca7e086",
          updatedAt: "2024-10-03T09:29:54.704Z",
          about: "al;sdkjf;lasdf;ljkasdf",
          interests_and_hobbies: "asdflj",
          marital_status: "single",
          physically_handicapped: "no"
        },
        employment_type: "full-time",
        onboarding_date: "2024-01-01T00:00:00.000Z",
        deleted_at: null,
        __v: 0,
        createdAt: "2024-10-03T11:45:13.522Z",
        updatedAt: "2024-10-03T11:45:13.522Z"
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
                image: imageUrl
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
            return <Personal isEditing={isEditing} userInfo={user} onInputChange={handleInputChange} />;
        }
        else if(activeTab === 'Work') {
            return <Work userInfo={user}/>
        }
        else{
            return <Document userInfo={user}/>
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
                        src={userInfo.image}
                        alt="profile image"
                        className="rounded-full object-cover object-top w-full h-full"
                    />
                </div> 

                <div className="user-name-container rounded-md flex flex-col text-center gap-4">
                    <div className="user-name font-bold">
                        {user.first_name} {user.last_name}
                    </div>

                    <div className="designation">
                        <h1 className="text-slate-500">Software Engineer</h1>
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