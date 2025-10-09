import { NavLink } from "react-router-dom";
import {
  FaPaw,
  FaVenusMars,
  FaBirthdayCake,
  FaWeightHanging,
} from "react-icons/fa";

export default function PetList({ pets }) {
  if (!pets || pets.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded text-center text-white">
        <p>No pets found.</p>
      </div>
    );
  }

  console.log("pets");
  console.log(pets);
  return (
    <div>
      <h2 className="text-xl font-semibold text-white bg-black py-2 px-4 rounded-t">
        Pet List
      </h2>

      <div className="bg-gray-100 p-6 rounded-b grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.pet_id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            {/* 🐾 Image Section */}
            <div className="flex flex-col items-center bg-gray-50 p-4">
              <img
                src={pet.image_url || "/default-pet.png"}
                alt={pet.name}
                className="w-24 h-24 mb-2 object-cover rounded-full border border-gray-300"
              />

              <h3 className="text-lg font-bold">{pet.name}</h3>
              <p className="text-gray-600 capitalize">{pet.species}</p>
            </div>

            {/* 📋 Details Section */}
            <div className="p-4 text-sm text-gray-700">
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                <div className="flex items-center gap-1">
                  <FaBirthdayCake className="text-gray-500" />
                  <span className="font-medium">Birthday:</span>
                </div>
                <div>
                  {pet.birthday
                    ? new Date(pet.birthday).toLocaleDateString()
                    : "—"}
                </div>

                <div className="flex items-center gap-1">
                  <FaVenusMars className="text-gray-500" />
                  <span className="font-medium">Gender:</span>
                </div>
                <div className="capitalize">{pet.gender || "—"}</div>

                <div className="flex items-center gap-1">
                  <FaPaw className="text-gray-500" />
                  <span className="font-medium">Breed:</span>
                </div>
                <div>{pet.breed || "—"}</div>

                <div className="flex items-center gap-1">
                  <FaWeightHanging className="text-gray-500" />
                  <span className="font-medium">Weight:</span>
                </div>
                <div>{pet.weight ? `${pet.weight} kg` : "—"}</div>

                <div className="flex items-center gap-1">
                  <span className="font-medium">Age:</span>
                </div>
                <div>
                  {pet.age ? `${pet.age} year${pet.age > 1 ? "s" : ""}` : "—"}
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-3">
                <span className="font-medium">About:</span>
                <p className="text-gray-600 text-justify text-sm">
                  {pet.bio?.trim() ? pet.bio : "No information provided."}
                </p>
              </div>
            </div>

            {/* More Info Link */}
            <div className="border-t p-3 text-center bg-gray-50">
              <NavLink
                to={`/pet-details/${pet.pet_id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                More Info →
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
