import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFreelancePetOwners } from "../../api/pet-owners/getFreelancePetOwners";

const PetOwners = () => {
  const [owners, setOwners] = useState([]);
  const vetId = localStorage.getItem("vet_id");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!vetId) return;
    (async () => {
      const data = await getFreelancePetOwners(vetId);
      setOwners(data);
    })();
  }, [vetId]);

  const filteredOwners = owners.filter((owner) =>
    owner.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Pet Owners</h2>

      {/* 🔎 Search bar */}
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full border rounded px-3 py-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🐾 Owners List */}
      <div className="flex flex-col gap-4">
        {filteredOwners.length > 0 ? (
          filteredOwners.map((owner) => (
            <div
              key={owner.client_id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() => toggleExpand(owner.client_id)}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={owner.owner_image || "/profile.png"}
                  alt="Owner"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {owner.owner_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Visits: {owner.visit_count} | 📞 {owner.contact_number}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {owner.address || "No address available"}
                  </p>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {expandedId === owner.client_id ? "▲" : "▼"}
                </p>
              </div>

              {/* Expanded Info */}
              {expandedId === owner.client_id && (
                <div className="mt-4 border-t pt-4">
                  {/* Owner info section */}
                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-gray-50 p-4 rounded-md shadow-sm">
                    <div className="flex items-center gap-4">
                      <img
                        src={owner.owner_image || "/profile.png"}
                        alt="Owner"
                        className="w-20 h-20 rounded-full border object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          Pet Owner Information
                        </h3>
                        <p className="text-sm text-gray-700">
                          <strong>Full Name:</strong> {owner.owner_name}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Phone Number:</strong> {owner.contact_number}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Email:</strong> {owner.email || "N/A"}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Gender:</strong> {owner.gender || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <h4 className="font-semibold text-gray-800">
                        Statistics
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>Times Visited Clinic:</strong>{" "}
                        {owner.visit_count || 0}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Number of Pets:</strong>{" "}
                        {owner.pets ? owner.pets.length : 0}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Last Visited:</strong> {owner.last_visit || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Pet List Section */}
                  <div className="mt-6">
                    <h3 className="bg-black text-white px-3 py-2 rounded-t-md font-semibold">
                      Pet List
                    </h3>

                    {owner.pets && owner.pets.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                        {owner.pets.map((pet) => (
                          <div
                            key={pet.pet_id}
                            className="bg-white shadow-sm border rounded-lg overflow-hidden flex flex-col"
                          >
                            <div className="flex flex-col items-center p-4">
                              <img
                                src={pet.image_url || "/pet-default.png"}
                                alt="Pet"
                                className="w-20 h-20 rounded-full border object-cover mb-2"
                              />
                              <h4 className="font-semibold text-gray-800">
                                {pet.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {pet.species}
                              </p>
                            </div>

                            <div className="border-t px-4 py-3 text-sm text-gray-700">
                              <p>
                                🎂 <strong>Birthday:</strong>{" "}
                                {pet.birth_date || "N/A"}
                              </p>
                              <p>
                                ⚤ <strong>Gender:</strong> {pet.gender || "N/A"}
                              </p>
                              <p>
                                🐾 <strong>Breed:</strong> {pet.breed || "N/A"}
                              </p>
                              <p>
                                ⚖️ <strong>Weight:</strong>{" "}
                                {pet.weight || "N/A"}
                              </p>
                              <p>
                                🎯 <strong>Age:</strong> {pet.age || "N/A"}
                              </p>
                              <p className="mt-1">
                                <strong>About:</strong>{" "}
                                {pet.description || "No bio available"}
                              </p>
                            </div>

                            <Link
                              to={`/vet-freelancer/home/pet-details/${pet.pet_id}`}
                              className="border-t text-center py-2 text-blue-600 text-sm font-medium hover:underline"
                            >
                              More Info →
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic mt-3">
                        No pets found for this owner.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">
            No matching owners found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PetOwners;
