"use client";

// ** import components
import { LogoutBtn } from "@/components/auth/ButtonLogout";
import HankoProfile from "@/components/auth/HankoProfile";

// ** import hook
import useHankoUser from "@/lib/hook/useHankoUser";


const Profile = () => {
  const { user, error } = useHankoUser();

  if (error) {
    return <div>Error fetching user: {JSON.stringify(error)}</div>;
  }

  return (
    <>
      {user ? <>{JSON.stringify(user)}</> : <div>Loading user data...</div>}
      <HankoProfile />
      <LogoutBtn />
    </>
  );
};

export default Profile;
