import React from "react";
import { useLocation, Link } from "react-router-dom";

const PetOwnerDetails = () => {
  const { state } = useLocation();
  const owner = state?.owner; // ✅ read passed data

  if (!owner) return <p>No owner data available.</p>;

  return (
    <div>
      <Link to="/vet-freelancer/pet-owners" className="text-blue-500 text-sm">
        ← Back to Owners
      </Link>

      <div className="mt-4 bg-white shadow rounded-lg p-4">
        <div className="flex items-center gap-4">
          <img
            src={owner.owner_image || "/profile.png"}
            alt="Owner"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-lg font-bold">{owner.owner_name}</h2>
            <p className="text-sm text-gray-600">
              📍 {owner.address} | 📞 {owner.contact_number}
            </p>
            <p className="text-sm text-gray-500">
              {owner.email} | Gender: {owner.gender || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Visits: {owner.visit_count || 0}
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-6 mb-3 font-semibold text-gray-800">Pet List</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {owner.pets.length > 0 ? (
          owner.pets.map((pet) => (
            <div
              key={pet.pet_id}
              className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={pet.image_url || "/pet-default.png"}
                alt="Pet"
                className="w-24 h-24 rounded-full border object-cover mb-2"
              />
              <h4 className="font-semibold">{pet.name}</h4>
              <p className="text-sm text-gray-500">{pet.species}</p>
              <p className="text-sm text-gray-500">
                {pet.gender} • {pet.age} yrs
              </p>
              <p className="text-xs text-gray-400 italic mt-1">{pet.bio}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No pets listed for this owner.</p>
        )}
      </div>
    </div>
  );
};

export default PetOwnerDetails;
