'use client';
import { Tab } from "@/app/(root)/assets/_components/Tab";
import { Button } from "@/components/wind/Buttons"
import { useState } from "react";
import Personal from "./personalSection";
import Work from "./workSection";
import Document from "./documentSection";
import { Pencil } from "lucide-react";
import { updateUser, User } from "@/server/userActions";
import { useRouter } from "next/navigation";


// import { Input } from "@/components/wind/Input";

const ProfileContainer = ({user}:{user:User}) => {
    const [activeTab, setActiveTab] = useState('Personal');
    const [isEditing, setIsEditing] = useState(false); 
    const router = useRouter()
    
    const [formData, setFormData] = useState({
		firstN: user ? user.first_name : '',
		lastN: user ? user.last_name : '',
		phone: user ? user.phone : '',
		email: user ? user.email : '',
		designation: user ? user.designation : '',
		team: user?.teamId ? user.teamId.name : '',
		reportM: user?.reporting_manager ? user.reporting_manager.name : '',
		gender: user ? user.gender : '',
		employment: user ? user.employment_type : '',
		dob: user ? user.date_of_birth : '',
		onboarding: user ? user.onboarding_date : '',
		marital_status: user ? user.marital_status : '',
		physically_handicapped: user ? user.physically_handicapped : '',
		interests_and_hobbies: user ? user.interests_and_hobbies : '',
		about: user ? user.about : '',
	});


    // Handling input changes during edit
    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({
                ...formData,
                image: imageUrl
            });
        }
    };


    // Toggle between editing and saving - Update
    const handleEditClick = async () => {
        if (isEditing) {
            // When clicking 'Update', stop editing
            setIsEditing(false);

            const userDetails = {
                first_name: formData.firstN,
                last_name: formData.lastN,
                email: formData.email,
                phone: formData.phone,
                designation: formData.designation,
                teamId: formData.team,
                onboarding_date: formData.onboarding,
                reporting_manager: formData.reportM,
                employment_type: formData.employment,
                date_of_birth: formData.dob,
                gender: formData.gender,
                marital_status: formData.marital_status,
                physically_handicapped: formData.physically_handicapped,
                interests_and_hobbies: formData.interests_and_hobbies,
                about: formData.about,
            };

            if (user) {
				await updateUser(user?._id!, userDetails);
				router.refresh();
			}
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
                        src={user?.image}
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