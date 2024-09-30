import { Textarea } from "@/components/wind/Input";
import InfoDisplay from "./infoDisplay";

const Personal = ({ isEditing, userInfo, onInputChange }: any) => {
    return (
        <div className="flex flex-col py-4 gap-4 overflow-y-auto">
            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.firstName} 
                    infoLabel="First Name"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('firstName', value)}
                />
                <InfoDisplay 
                    infoText={userInfo.lastName} 
                    infoLabel="Second Name"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('lastName', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.email} 
                    infoLabel="Email Address"
                    isEditing={false} // Email is read-only
                />
                <InfoDisplay 
                    infoText={userInfo.phone} 
                    infoLabel="Phone Number"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('phone', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.city} 
                    infoLabel="City"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('city', value)}
                />
                <InfoDisplay 
                    infoText={userInfo.stateCountry} 
                    infoLabel="State/Country"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('stateCountry', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.pincode} 
                    infoLabel="Pincode"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('pincode', value)}
                />
                <InfoDisplay 
                    infoText={userInfo.country} 
                    infoLabel="Country"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('country', value)}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                {/* <InfoDisplay 
                    infoText={userInfo.bio} 
                    infoLabel="Bio"
                    isEditing={isEditing}
                    onInputChange={(value: string) => onInputChange('bio', value)}
                /> */}
                {/* <Textarea
                  onChange={(event)=>{
                    onInputChange('bio',event.target.value);
                  }}
                  disabled={!isEditing}
                  placeholder="Tell Something about yourself..."
                  style={{
                    width: 380
                  }}
                  value={userInfo.bio}
                /> */}
            </div>
        </div>
    );
}

export default Personal;
