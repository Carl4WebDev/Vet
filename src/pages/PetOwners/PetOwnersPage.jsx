import React, { useState, useMemo, useEffect } from "react";
import PetOwnerCard from "./Owner/PetOwnerCard";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import OwnerDetailPage from "./Owner/OwnerDetailsPage";
import { getClinicPetOwners } from "../../api/get/getClinicPetOwners"; // <-- use this

export default function PetOwnersPage() {
  const location = useLocation();
  const isViewingDetail = location.pathname.startsWith("/pet-owner/owner/");
  const clinicId = localStorage.getItem("clinic_id");

  const [owners, setOwners] = useState([]);
  const [filter, setFilter] = useState("");

  // 🟢 Fetch owners from backend
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const data = await getClinicPetOwners(clinicId);
        setOwners(data || []);
      } catch (err) {
        console.error("Error fetching clinic owners:", err);
        setOwners([]);
      }
    };
    fetchOwners();
  }, [clinicId]);

  // 🟡 Filtered list
  const filteredOwners = useMemo(() => {
    return owners.filter((owner) =>
      owner.name?.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, owners]);

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-4">Pet Owners</h1>

        {/* Search */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        {/* Content */}
        {isViewingDetail ? (
          <div className="grid grid-cols-1 gap-4">
            <Routes>
              <Route
                path="/pet-owner/owner/:clientId"
                element={<OwnerDetailPage />}
              />
            </Routes>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOwners.map((owner) => (
              <NavLink
                key={owner.id}
                to={`/pet-owner/owner/${owner.id}`}
                state={{ owner }} // <-- pass full owner data here
              >
                <PetOwnerCard owner={owner} />
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
