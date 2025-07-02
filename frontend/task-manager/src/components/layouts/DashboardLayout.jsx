import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-lg text-gray-700">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return null; // Or navigate to login optionally
  }

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow px-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
