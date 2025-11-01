import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import vetConnect from "../assets/nav-logo.png";
import { getFreelanceVetProfile } from "../api/dashboard/getVetFreelanceProfile";
import { useNavigate } from "react-router-dom";

const FreelanceDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vetData, setVetData] = useState(null);
  const location = useLocation();
  const userId = localStorage.getItem("user_id");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    localStorage.removeItem("vet_id");
    localStorage.removeItem("vet_name");

    console.log("👋 Logged out successfully");
    navigate("/vet-freelancer/login");
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const data = await getFreelanceVetProfile(userId);
      setVetData(data);
    })();
  }, [userId]);

  const vetName = vetData?.vet_name || "Dr. Freelance Vet";
  const vetImage = vetData?.image_url || "/profile.png";

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 md:z-40 h-full bg-gray-100 border-r p-6 flex flex-col justify-between transform transition-transform duration-300 
        ${
          sidebarOpen
            ? "translate-x-0 w-full"
            : "-translate-x-full w-64 md:translate-x-0"
        } 
        md:w-64`}
      >
        <div>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <img src={vetConnect} alt="VetConnect" className="w-10 h-10" />
              <h1 className="text-lg font-bold text-gray-700">VetConnect</h1>
            </div>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-4 text-gray-700">
            <Link
              to="/vet-freelancer/home/dashboard"
              className={`block font-medium hover:text-red-500 ${
                location.pathname === "/vet-freelancer/dashboard"
                  ? "text-red-500"
                  : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/vet-freelancer/home/pet-owners"
              className={`block font-medium hover:text-red-500 ${
                location.pathname.includes("pet-owners") ? "text-red-500" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Pet Owners
            </Link>
            <Link
              to="/vet-freelancer/home/patients"
              className={`block font-medium hover:text-red-500 ${
                location.pathname.includes("patients") ? "text-red-500" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              My Patients
            </Link>
            <Link
              to="/vet-freelancer/home/appointments"
              className={`block font-medium hover:text-red-500 ${
                location.pathname.includes("appointments") ? "text-red-500" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Appointments
            </Link>
            <Link
              to="/vet-freelancer/home/messages"
              className={`block font-medium hover:text-red-500 ${
                location.pathname.includes("messages") ? "text-red-500" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Messages
            </Link>
            <Link
              to="/vet-freelancer/settings"
              className={`block font-medium hover:text-red-500 ${
                location.pathname.includes("settings") ? "text-red-500" : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Settings
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-600 font-medium"
        >
          Logout
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main area */}
      <main className="flex-1 p-4 md:p-6 w-full overflow-y-auto md:ml-64">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-6 sticky top-0 bg-gray-50 z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h2 className="text-xl font-semibold text-gray-700 capitalize">
              {location.pathname.split("/").pop() || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link to={"/vet-freelancer/home/vet-notifications"}>
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            </Link>
            <div className="flex items-center gap-2">
              <img
                src={vetImage}
                alt="Vet Profile"
                className="w-8 h-8 rounded-full border object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-gray-700 truncate max-w-[120px]">
                {vetName}
              </span>
            </div>
          </div>
        </div>

        {/* 🔹 All pages render here */}
        <Outlet />
      </main>
    </div>
  );
};

export default FreelanceDashboardLayout;
