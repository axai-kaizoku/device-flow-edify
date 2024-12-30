"use client";
import { CombinedContainer } from "@/components/container/container";
import ProfileContainer from "./_components/profileContainer";
import { getUserById, User } from "@/server/userActions";
import { getSession } from "@/server/helper";
import { useSelector } from "react-redux";
import { UserData } from "@/app/store/authSlice";
import UserGrid from "./_components/profile-main";
import { useEffect, useState } from "react";
import { getCurrentOrg } from "@/server/orgActions";

export default function Profile() {
  try {
    const userDetails: UserData = useSelector(
      (state: any) => state.auth.userData
    );
    const [orgDetails, setOrgDetails] = useState({});
    // console.log(userDetails.orgId);

    // console.log(userDetails);
    // const session = await getSession();
    // const userId = session?.user && session?.user.id;
    // // console.log(typeof userId)
    // const userDetails: User = await getUserById(userId!);
    useEffect(() => {
      const fetchData = async () => {
        const orgData = await getCurrentOrg();
        console.log(orgData);
        setOrgDetails(orgData);
      };

      fetchData().then((v) => console.log(v));
    }, []);

    // console.log({ orgDetails });

    return (
      <>
        {/* <CombinedContainer title="Profile" description="Manage your profile"> */}
        {/* <ProfileContainer user={userDetails} /> */}
        <div className="flex w-full h-full">
          <UserGrid orgDetails={orgDetails} user={userDetails} />
        </div>
        {/* </CombinedContainer> */}
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <CombinedContainer title="Profile">
        <div className="text-red-500">
          Failed to load data. Please try again later. <br />{" "}
          <a href="/" className="underline text-blue-500">
            Back to home
          </a>
        </div>
      </CombinedContainer>
    );
  }
}
