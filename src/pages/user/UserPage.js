import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarUser from "../../components/SidebarUser";
import Profile from "./modules/Profile/Main";
import Test from "./modules/Test/Main";

function UserPage() {
  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <div className="w-64 h-full min-h-screen bg-gray-800 text-white">
        <SidebarUser />
      </div>
      <div className="flex-1 p-4">
        <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserPage;
