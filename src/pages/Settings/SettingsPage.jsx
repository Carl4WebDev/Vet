// SettingsPage.tsx
import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import ClinicDetails from "./pages/ClinicDetails";
import ChangePassword from "./pages/ChangePassword";
import PlanPage from "./pages/PlanPage";

const SettingsPage = () => {
  return (
    <div className=" mx-auto  rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 ">Settings</h1>
      <p className="text-gray-600 mb-4">
        Manage your account settings and preferences
      </p>
      <hr className="text-gray-300 h-2.5 mb-4" />

      {/* Navigation Tabs */}
      <div className="grid grid-cols-3 w-full  border-b border-gray-200 ">
        <NavLink
          to={"/settings/clinic-details"}
          className={({ isActive }) =>
            `px-2 text-center py-2 font-medium text-[14px] sm:text-[20px] hover:bg-black hover:text-white truncate ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
        >
          Clinic Details
        </NavLink>
        <NavLink
          to="/settings/change-password"
          className={({ isActive }) =>
            `px-2 text-center py-2 font-medium text-[14px] sm:text-[20px] hover:bg-black hover:text-white text-wrap ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
        >
          Change Password
        </NavLink>
        <NavLink
          to="/settings/plans"
          className={({ isActive }) =>
            `px-2 text-center py-2 font-medium text-[14px] sm:text-[20px] hover:bg-black hover:text-white truncate ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
        >
          Plans
        </NavLink>
      </div>

      <div className="space-y-6 p-4">
        <Routes>
          <Route path="/settings" element={<ClinicDetails />} />
          <Route path="/settings/clinic-details" element={<ClinicDetails />} />
          <Route
            path="/settings/change-password"
            element={<ChangePassword />}
          />
          <Route path="/settings/plans" element={<PlanPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default SettingsPage;
