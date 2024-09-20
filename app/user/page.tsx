"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const Profile = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("userId");

  return <div>search is {search}</div>;
};

export default Profile;
