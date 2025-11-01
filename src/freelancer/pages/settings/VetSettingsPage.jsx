import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import VetDetails from "./VetDetails";
import ChangeVetPassword from "./ChangeVetPassword";
import VetPlanPage from "./VetPlanPage";

export default function VetSettingsPage() {
  return (
    <div className="mx-auto rounded-md font-roboto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
      <p className="text-gray-600 mb-4">
        Manage your account settings and preferences
      </p>
      <hr className="text-gray-300 h-2.5 mb-4" />

      <div className="grid grid-cols-3 w-full border-b border-gray-200">
        <NavLink
          to="/vet-freelancer/home/settings/"
          className={({ isActive }) =>
            `px-2 text-center py-2 font-medium text-[14px] sm:text-[20px] ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
        >
          Profile Details
        </NavLink>

        <NavLink
          to="/vet-freelancer/home/settings/change-password"
          className={({ isActive }) =>
            `px-2 text-center py-2 font-medium text-[14px] sm:text-[20px] ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
        >
          Change Password
        </NavLink>

        <NavLink
          to="/vet-freelancer/home/settings/plans"
          className={({ isActive }) =>
            `px-2 text-center py-2 font-medium text-[14px] sm:text-[20px] ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
        >
          Plans
        </NavLink>
      </div>

      <div className="p-4">
        <Routes>
          <Route path="/" element={<VetDetails />} />
          <Route path="/change-password" element={<ChangeVetPassword />} />
          <Route path="/plans" element={<VetPlanPage />} />
        </Routes>
      </div>
    </div>
  );
}
