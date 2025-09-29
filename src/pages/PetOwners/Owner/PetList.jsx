import { NavLink } from "react-router-dom";

export default function PetList({ pets }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white bg-black py-2 px-4 rounded-t">
        Pet List
      </h2>
      <div className="bg-gray-800 p-6 rounded-b grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 text-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt={pet.name}
              className="w-20 h-20 mx-auto mb-2"
            />
            <h3 className="text-lg font-bold">{pet.name}</h3>
            <p>
              <strong>Age:</strong> {pet.age} Years Old
            </p>
            <p>
              <strong>Species:</strong> {pet.species}
            </p>
            <NavLink to={`/pet-details/${pet.pet_id}`}>
              <p className="text-blue-600 mt-1 underline cursor-pointer">
                More info
              </p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
