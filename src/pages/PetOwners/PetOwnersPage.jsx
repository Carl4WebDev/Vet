import React, { useState, useMemo } from "react";
import PetOwnerCard from "./Owner/PetOwnerCard";
import { NavLink, Router, Route, Routes, useLocation } from "react-router-dom";
import OwnerDetailPage from "./Owner/OwnerDetailsPage";
import PetDetailsPage from "./Pet/PetDetailsPage";
const ownerData = [
  {
    id: "1",
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    petCount: 3,
    address: "123 Pet Street, Dogville",
    contact: "555-1234",
    memberSince: "2022-03-15",
    lastVisit: "2023-06-20",
    pets: [
      { name: "Max", type: "Dog", age: 3, notes: "Neutered" },
      { name: "Whiskers", type: "Cat", age: 5, notes: "Vaccinated" },
      { name: "Snowball", type: "Rabbit", age: 1, notes: "Needs checkup" },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    petCount: 2,
    address: "456 Cat Lane, Meowtown",
    contact: "555-5678",
    memberSince: "2021-11-10",
    lastVisit: "2023-06-18",
    pets: [
      { name: "Fluffy", type: "Cat", age: 2, notes: "Allergic to fish" },
      { name: "Buddy", type: "Dog", age: 4, notes: "On special diet" },
    ],
  },
];

export default function PetOwnersPage() {
  const location = useLocation();
  const isViewingDetail = location.pathname.startsWith("/pet-owner/owner/");

  // 🟡 You were missing these two lines
  const [filter, setFilter] = useState("");

  const filteredOwners = useMemo(() => {
    return ownerData.filter((owner) =>
      owner.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

  const [selectedOwnerId, setSelectedOwnerId] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold mb-4">Pet Owners</h1>

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

        {isViewingDetail ? (
          <div className="grid grid-cols-1 gap-4">
            <Routes>
              <Route
                path="/pet-owner/owner/:id"
                element={<OwnerDetailPage />}
              />
            </Routes>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOwners.map((owner, idx) => (
              <NavLink key={idx} to={`/pet-owner/owner/${owner.id}`}>
                <PetOwnerCard owner={owner} />
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
