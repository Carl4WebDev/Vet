import React, { useState, useMemo } from "react";
import PetOwnerCard from "../components/PetOwnerCard";

const ownerData = [
  {
    id: "00000000001",
    name: "Horgie L. Bangong",
    petCount: 2,
    address: "Davao City",
    contact: "09123456789",
    photo: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "00000000002",
    name: "Jack S. Lou",
    petCount: 4,
    address: "Davao City",
    contact: "09123456789",
    photo: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "00000000001",
    name: "Horgie",
    petCount: 2,
    address: "Davao City",
    contact: "09123456789",
    photo: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "00000000001",
    name: "Horgie",
    petCount: 2,
    address: "Davao City",
    contact: "09123456789",
    photo: "https://i.pravatar.cc/150?u=4",
  },
];

export default function PetOwnersPage() {
  // 🟡 You were missing these two lines
  const [filter, setFilter] = useState("");

  const filteredOwners = useMemo(() => {
    return ownerData.filter((owner) =>
      owner.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOwners.map((owner, idx) => (
            <PetOwnerCard key={idx} owner={owner} />
          ))}
        </div>
      </div>
    </div>
  );
}
