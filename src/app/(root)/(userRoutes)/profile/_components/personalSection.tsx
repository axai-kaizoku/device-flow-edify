import { Textarea } from "@/components/wind/Input";
import InfoDisplay from "./infoDisplay";
import AboutDisplay from "./aboutDisplay";


// Define the shape of userInfo object
interface UserInfo {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    marital_status: string;
    gender: string;
    physically_handicapped: string;
    interests_and_hobbies: string;
    about: string;
}

// Define the type for onInputChange function
type OnInputChange = (fieldName: string, value: string) => void;

// Update the component's props with appropriate types
interface PersonalProps {
    isEditing: boolean;
    userInfo: UserInfo;
    onInputChange: OnInputChange;
}

const Personal: React.FC<PersonalProps> = ({ isEditing, userInfo, onInputChange }) => {
    return (
        <div className="flex flex-col py-4 gap-4 overflow-y-auto">
            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.first_name} 
                    infoLabel="First Name"
                    isEditing={false}
                    infoName="first_name"
                    // onInputChange={(value: string) => onInputChange('first_name', value)}
                />
                <InfoDisplay 
                    infoText={userInfo.last_name} 
                    infoLabel="Second Name"
                    isEditing={false}
                    infoName="last_name"
                    // onInputChange={(value: string) => onInputChange('last_name', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.email} 
                    infoLabel="Email Address"
                    infoName="email"
                    isEditing={false} // Email is read-only
                />
                <InfoDisplay 
                    infoText={userInfo.phone} 
                    infoLabel="Phone Number"
                    infoName="phone"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('phone', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.date_of_birth} 
                    infoLabel="D.O.B"
                    infoName="date_of_birth"
                    isEditing={false}
                    // onInputChange={(value: string) => onInputChange('city', value)}
                />
                <InfoDisplay 
                    infoText={userInfo.marital_status} 
                    infoLabel="Marital Status"
                    infoName="marital_status"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('marital_status', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.gender} 
                    infoLabel="Gender"
                    infoName="gender"
                    isEditing={false}
                    // onInputChange={(value: string) => onInputChange('gender', value)}
                />
                <InfoDisplay 
                    infoText={userInfo.physically_handicapped} 
                    infoLabel="Physically Handicapped"
                    infoName="physically_handicapped"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('physically_handicapped', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.interests_and_hobbies} 
                    infoLabel="Hobbies and Interests"
                    isEditing={isEditing}
                    infoName="interests_and_hobbies"
                    onInputChange={(value: string) => onInputChange('interests_and_hobbies', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between w-full">
                <AboutDisplay
                    infoText={userInfo.about}
                    infoLabel="About"
                    isEditing={isEditing}
                    infoName="about"
                    onInputChange={(value: string) => onInputChange('about', value)}
                />
            </div>
        </div>
    );
}

export default Personal;
