"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function UserTeamView() {
  const router = useRouter();

  useEffect(() => {
    router.push("/teams/670370b2f95db70c42788288");
    router.refresh();
  }, []);
  return <div>UserTeamView</div>;
}

export default UserTeamView;
