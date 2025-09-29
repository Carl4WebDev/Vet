import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";
import {
  BellIcon,
  MessageCircleMore,
  Menu,
  X,
  MessageSquareIcon,
  MessageSquareMoreIcon,
} from "lucide-react";
import navLogo from "../src/assets/images/nav-logo.png";
import navProfile from "../src/assets/images/nav-profile.png";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import PetOwnersPage from "./pages/PetOwners/PetOwnersPage";
import PatientRecords from "./pages/PatientRecords";
import SettingsPage from "./pages/Settings/SettingsPage";
import OwnerDetailPage from "./pages/PetOwners/Owner/OwnerDetailsPage";
import PetDetailsPage from "./pages/PetOwners/Pet/PetDetailsPage";
import PetNewHealthRecord from "./pages/PetOwners/Pet/PetNewHealthRecord";
import StaffPage from "./pages/Staff/StaffPage";
import MessagePage from "./pages/MessagePage";
import SchedulePage from "./pages/SchedulePage";

import ProtectedRoute from "./components/ProtectedRoute";

import { logoutClinic } from "./api/auth/logoutClinic";

function App() {
  return (
    <Router>
      <Routes>
        {/* Guest only routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute guestOnly>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ProtectedRoute guestOnly>
              <SignUpPage />
            </ProtectedRoute>
          }
        />

        {/* Authenticated users */}
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRole="clinic_owner">
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMessageIconOpen, setIsMessageIconOpen] = useState(false);
  const location = useLocation();
  // ✅ Update state when the route changes
  useEffect(() => {
    setIsMessageIconOpen(location.pathname.startsWith("/pet-owner"));
  }, [location.pathname]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen w-screen bg-white overflow-x-hidden">
      {/* Mobile Sidebar Toggle Button (fixed bottom right) */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className="fixed md:hidden bottom-4 right-4 z-50 bg-black text-white p-3 rounded-full shadow-lg"
      >
        {isMobileSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Sidebar Overlay (only shown when sidebar is open) */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0  z-40 md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar - Now with mobile version */}
      <div
        className={`fixed w-full md:relative inset-y-0 left-0 transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 md:w-auto md:block md:col-span-2 bg-[#D9D9D9]`}
      >
        <nav className="h-full">
          <ul className="space-y-2 flex flex-col flex-wrap text-center">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  ` block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pet-owner"
                className={({ isActive }) => {
                  // ❌ This runs during render
                  setIsMessageIconOpen(isActive);
                  return `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`;
                }}
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Pet Owners
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/patient-records"
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Patient Records
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staffs"
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Staffs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Appointments/
                <br />
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Messages
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block p-2 rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`
                }
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                  logoutClinic();
                }}
              >
                Logout
              </NavLink>
            </li>
            {isMessageIconOpen && (
              <li>
                <NavLink
                  to="/messages"
                  className={({ isActive }) =>
                    `p-2 rounded flex justify-center items-center gap-4 mt-10 ${
                      isActive
                        ? "bg-black text-white"
                        : "hover:bg-black hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <MessageSquareMoreIcon />
                  Message
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="md:col-span-10 flex flex-col">
        {/* Navbar */}
        <div className="bg-[#D9D9D9]">
          <div className="flex justify-between items-center px-4 md:px-11">
            <img src={navLogo} className="h-16 md:h-20" alt="Logo" />
            <div className="flex gap-3 md:gap-5 items-center">
              <div className="bg-white p-2 rounded-full">
                <BellIcon className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="bg-white p-2 rounded-full">
                <MessageCircleMore className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <img
                src={navProfile}
                className="h-8 w-8 md:h-10 md:w-10"
                alt="Profile"
              />
              <h1 className=" text-[15px] md:text-2xl font-semibold">
                Jo Capang Vetter
              </h1>
            </div>
          </div>
        </div>

        {/* Page Content Area - This is where your pages will render */}
        <div className="flex-1 overflow-auto p-4">
          <Routes>
            {/* Sidebar links */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/*" element={<PetOwnersPage />} />
            <Route path="/patient-records" element={<PatientRecords />} />
            <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/staffs" element={<StaffPage />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/schedule" element={<SchedulePage />} />

            {/* Pet pages*/}
            <Route path="/pet-details/*" element={<PetDetailsPage />} />
            <Route path="/pet-health-record" element={<PetNewHealthRecord />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
