import InfoDisplay from "./infoDisplay"

const Work = ({userInfo}:any) => {
  return (
        <div className="flex flex-col py-4 gap-4">
            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.role} 
                    infoLabel="Designation"
                    isEditing={false}
                />
                <InfoDisplay 
                    infoText={userInfo.employeeNo} 
                    infoLabel="Employee Number"
                    isEditing={false}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.reportingManager} 
                    infoLabel="Reporting Manager"
                    isEditing={false}
                />
                <InfoDisplay 
                    infoText={userInfo.joiningDate} 
                    infoLabel="Joining Date"
                    isEditing={false}
                />
            </div>

            <div className="flex flex-wrap justify-between">
                <InfoDisplay 
                    infoText={userInfo.department} 
                    infoLabel="Department"
                    isEditing={false}
                />
            </div>
        </div>
    )
}

export default Work